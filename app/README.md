# API CLOUD

## Descarga y puesta en marcha de manera local

Primeramente, debemos tener instalados en nuestro sistema:
~~~
python>=3
pypi >=20.17.1 
virtualenv 
~~~

A continuación se llevará a cabo una explicación de como realizar una puesta en marcha de la ApiRest del grupo para poder utilizarla de  manera local para desarrollar los diferentes proyectos del grupo. 

### Clonación del proyecto
En primer lugar debemos hacer un clone  del proyecto que se encuentra en el repositorio  http://ugritailab.ugr.es:8000/tfgs2223/flask-api-rest-base.git mediante la siguiente orden:

~~~
git clone http://ugritailab.ugr.es:8000/tfgs2223/flask-api-rest-base.git NombreDelProyectoEnTuMáquinaLocal
~~~

Una vez tengamos el proyecto en nuestro entorno  en nuestra máquina local pasaremos al siguiente paso que será crear un entorno virtual. 

### Creación entorno virtual 

Para crear un entorno virtual necesitaremos ejecutar la siguiente orden:

~~~
virtalenv nombredelespaciovirtual
~~~

Para más información sobre virtualenv puedes consultar en su sitio web. https://virtualenv.pypa.io/en/latest/

Una vez creado el entorno virtual, tan solo se necesita activar el entorno de virtual:

~~~
source venv-apicloud/bin/activate
~~~

Finalmente, pasaremos a instalar los paquetes responsables del correcto funcionamiento de nuestra API.  

### Instalar paquetes

Para instalar los paquetes necesarios tan solo necesitas ejecutar la siguiente orden:

~~~
pip3  install -r requirements.txt
~~~

Importante siempre tener activado el entorno virtual antes de ejecutar este comando. 

### Ejecutar FLASK

Una vez realizado este proceso, ejecuta la siguiente orden para comprobar que todo va correctamente.

~~~
flask run
~~~

El resultado mostrado debería ser algo como sigue:

![img]

[img]: img/flask-run.png

[Siguiente Paso]

[Siguiente Paso]: <http://ugritailab.ugr.es:8000/tfgs2223/flask-api-rest-base/-/tree/main/app/architecture>
