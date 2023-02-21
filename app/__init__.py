from flask import Flask
from flask_restx import Api
from .architecture.service     import aplication_name_bp,ns_application_name


app = Flask (__name__)


api = Api(app,version="1.0",title="Servicios [ Nombre del TFG ]", description="Servicios para el TFG: [ Nombre del TFG ]",contact="[mail_de_contacto_del_alumno]" )

# Add nameSpace our api
api.add_namespace(ns_application_name)

# add blueprint our api
app.register_blueprint(aplication_name_bp)


if __name__ == "__main__":
      app.run()

   