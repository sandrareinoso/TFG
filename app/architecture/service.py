from flask import jsonify
from flask import Blueprint
from flask_restx import Api, Resource,fields,Namespace
from app.lib.database import database as dbases
from bson import json_util
import json
import pymongo
import pandas as pd
import numpy as np
from sklearn.cluster import AgglomerativeClustering
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from flask import Flask, request
import requests
from flask import Flask, request, render_template,redirect, send_file
from flask_cors import CORS
import matplotlib.pyplot as plt
import io
from pymongo import MongoClient
from mlxtend.frequent_patterns import apriori
from mlxtend.frequent_patterns import association_rules as arules



# Name Space BluePrint
aplication_name_bp = Blueprint('Nombre del TFG de Sandra Reinoso', __name__)


# BluePrint add api
api = Api( aplication_name_bp )

# Create namespace  
ns_application_name = api.namespace('Integración de Algoritmos de Reglas de Asociación y Clustering', "Ejemplo de API Rest cpon flask")

CORS(aplication_name_bp, resources={r"/*": {"origins": ""}})



# Documents service for Swagger
@ns_application_name.doc(description="Service description")
# Add url for service
@ns_application_name.route('/',endpoint='Enpoint_Name')

# app = Flask(__name__)

# Implementation service
class NameService(Resource):
    # Type Service: GET,POST,DELETE,UPDATE
    
  
    def get(self):
       
        return jsonify({"Hola":"Mundo GET"})

    def post(self):

        numero = request.form['numero']
        metodo = request.form['metodo']
        algoritmo = request.form['algoritmo']
        valorX = request.form['valorX']
        valorY = request.form['valorY']

        #Conexión BD
        MONGO_HOST="localhost"
        MONGO_PUERTO="27017"
        MONGO_TIEMPO_FUERA=1000

        MONGO_URL="mongodb://"+MONGO_HOST+":"+MONGO_PUERTO+"/"
        Mongo_BD = "Datos_Medicos"
        Mongo_Coleccion = "Datos"
        Mongo_Coleccion_normalizada = "Datos_normalizados"

        cliente=pymongo.MongoClient(MONGO_URL,serverSelectionTimeoutMS=MONGO_TIEMPO_FUERA)
        baseDatos=cliente[Mongo_BD]
        coleccion=baseDatos[Mongo_Coleccion]
        coleccion2=baseDatos[Mongo_Coleccion_normalizada]

        data = pd.DataFrame(list(coleccion.find()))
        # Seleccionar las columnas a utilizar para el clustering
        if valorX == "sex" or valorY=='sex':
            data["sex"] = data["sex"].map({"female": 0, "male": 1})
       
        if valorX == "smoker" or valorY=='smoker':
            data["smoker"] = data["smoker"].map({"yes": 0, "no": 1})
       
       

        #Según el tipo de algoritmo
        if(int(algoritmo) == 1): #clustering jerárquico
            X = data[[valorX, valorY]].values
            
            # Escalar los datos
            scaler = StandardScaler()
            X = scaler.fit_transform(X)
            # Inicializar el modelo de clustering jerárquico con el método de enlace completo
            clustering = AgglomerativeClustering(n_clusters=int(numero), linkage=metodo)

            # Ajustar el modelo a los datos
            clustering.fit(X)

            # Obtener las etiquetas de cluster para cada fila de datos
            labels = clustering.labels_

            # Añadir las etiquetas de cluster al dataframe original
            data["Cluster"] = labels

            # Guardar los resultados en un nuevo archivo CSV
            data.to_csv("base-app-django/app/core/static/csv/data_clusters2-Jerárquico.csv", index=False)

        elif(int(algoritmo) == 2):  #Clustering KNN
            X = data[[valorX, valorY]].values
            
            # Escalar los datos
            scaler = StandardScaler()
            X = scaler.fit_transform(X)
            if(metodo == "random"):
                kmeans = KMeans(n_clusters=int(numero), init=metodo)
            else:
                kmeans = KMeans(n_clusters=int(numero), init=metodo+"++")

            # Ajustar el modelo a los datos
            kmeans.fit(X)

            # Obtener las etiquetas de cluster para cada fila de datos
            labels = kmeans.labels_

            # Añadir las etiquetas de cluster al dataframe original
            data["Cluster"] = labels

            # Guardar los resultados en un nuevo archivo CSV
            data.to_csv("base-app-django/app/core/static/csv/data_clusters2-Kmeans.csv", index=False)
        elif(int(algoritmo) == 3):  #Regla de asociación
            # Seleccione las columnas relevantes para la regla de asociación
            
            data2 = pd.DataFrame(list(coleccion2.find()))
            # Seleccionar todas las columnas excepto la primera
            data2 = data2.iloc[:, 1:]
            columnas_modificadas = data2.columns 
       
            # columnas_modificadas = columnas_modificadas.delete(columnas_modificadas.get_loc('_id'))
            # print(columnas_modificadas)
            transacciones = pd.get_dummies(data2, columns=columnas_modificadas, prefix_sep='=')
            
            # print(data_encoded)
            # Aplica el algoritmo Apriori para obtener los itemsets frecuentes
            frequent_itemsets = apriori(transacciones, min_support=0.1, use_colnames=True)
            # # Genera las reglas de asociación a partir de los itemsets frecuentes
            rules = arules(frequent_itemsets, metric="confidence", min_threshold=float(numero))

            # # Muestra las reglas de asociación obtenidas
            comparativa = 'CosteSeguro=' + metodo
            consecuente_deseado = frozenset([comparativa])
            # antecedente_pedido = frozenset(['charges=JustiPrecio'])
            
            reglas_cumplidas = []

            for index, row in rules.iterrows():
                if row['consequents'] == consecuente_deseado:
                   reglas_cumplidas.append(str(row['antecedents']))
            print(reglas_cumplidas)

           
            return jsonify(reglas_cumplidas)
        
        data_id_cluster = data[[valorX, valorY, 'Cluster', 'id']]
        data_dict = data_id_cluster.to_dict(orient='records')
        

        # Devolver los datos en formato json
        return jsonify(data_dict)

        
    def put(self):
        return jsonify({"Hola":"Mundo PUT"})
        
    def delete(self):
        return jsonify({"Hola":"Mundo DELETE"})
    


    # if __name__ == '__main__':
    #     app.run()