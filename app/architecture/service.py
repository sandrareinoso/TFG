from flask import jsonify
from flask import Blueprint
from flask_restx import Api, Resource,fields,Namespace
from app.lib.database import database as dbases
from bson import json_util
import json


# Name Space BluePrint
aplication_name_bp = Blueprint('Nombre del TFG', __name__)

# BluePrint add api
api = Api( aplication_name_bp )

# Create namespace  
ns_application_name = api.namespace('Nombre del TFG', "Ejemplo de API Rest cpon flask")




# Documents service for Swagger
@ns_application_name.doc(description="Service description")
# Add url for service
@ns_application_name.route('/',endpoint='Enpoint_Name')



# Implementation service
class NameService(Resource):
    ''''
    To do: 
      Description of service implementation
      
      Important to specify:
        * Description of the function performed by this service.
        * Parameters: Description of the parameter.
        
        * Brief description of the functionality of each of the GET, POST, PUT, and DELETE services.
            Example:
                def get(parameters): GET request that returns the name of all the databases stored in our structure. 
                def post(parameters): POST request that inserts a database in our system.
                
        Important:
            The implementation will only be implemented if this documentation is verified and carried out satisfactorily.
    '''
    # Type Service: GET,POST,DELETE,UPDATE
    
    def get(self):
        '''
        To do:
                    
           Important to specify:
                * Description of the function performed by this service.
                * Parameters: Description of the parameter.
                * Dependencies, if any, on other methods. Specify this dependency
            
            Important:
                The implementation will only be implemented if this documentation is verified and satisfactorily completed.          
        
        '''
        return jsonify({"Hola":"Mundo GET"})
        
    
    def post(self):
        return jsonify({"Hola":"Mundo POST"})
    
    def put(self):
        return jsonify({"Hola":"Mundo PUT"})
    
    def delete(self):
        return jsonify({"Hola":"Mundo DELETE"})