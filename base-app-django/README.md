# base-application-django
Repositorio base para la creación de aplicaciones orientada al desarrollo de herramientas de aplicaciones dentro del grupo de investigación. 

## Puesta en marcha del proyecto.


Primeramente, debemos tener instalados en nuestro sistema:
~~~
python>=3
pypi >=20.17.1 
virtualenv 
~~~

A continuación se llevará a cabo una explicación de como realizar una puesta en marcha del proyecto base django del grupo para poder utilizarla de  manera local y conseguir desarrollar los diferentes proyectos del grupo. 

### Fork del proyecto

El investigador que quiera usar esta base para comenzar la interfaz de su proyecto debe de crear un fork del proyecto en su repositorio para poder comenzar a trabajar con él sin necesidad de tocar el proyecto original.

Una vez realizado el fork en el repositorio ya podrá trabajar sobre ese repositorio sin temer eliminar cualquier cosa del proyecto original que pueda afectar al resto del grupo. 

### Clonación del proyecto
Una vez realizado el fork en la propia cuenta del investigador se  usarán los siguiente comandos para comenzar a realizar las diferentes actividades sobre el repositorio. 

En primer lugar debemos clonar el proyecto que se encuentra en el repositorio http://ugritailab.ugr.es:8000/ugritailab/base-app-django.git mediante la siguiente orden:

~~~
git clone url-donde-se-encuentra-nuestro-fork-en-nuestro-repo NombreDelProyectoEnTuMáquinaLocal


> git remote -v  

ouput: 

origin	http://ugritailab.ugr.es:8000/ugritailab/base-app-django.git (fetch)
origin	http://ugritailab.ugr.es:8000/ugritailab/base-app-django.git (push)

~~~

Si necesita cambiar donde apunta el repositorio del proyecto hacia el repositorio creado para nuestro nuevo proyecto. Se realizaría de la siguiente forma:

~~~
> git remote remove origin ( en el caso anterior)

> git remote add alias_del_repo ( p.e origin ) http://ugritailab.ugr.es:8000/ugritailab/base-app-django ( esto es un ejemplo )

> git pull alias_del_repo ( p.e origin ) url-del-repositorio

> git add [ los cambios que queramos añadir al repo ]

> git  commit -a

> git push alias_del_repo ( p.e origin )  url-del-repositorio

~~~

Una vez preparamos el repositorio, comenzamos con la puesta en marcha del proyecto en nuestra rama local. 



### Creación entorno virtual 

Para crear un entorno virtual necesitaremos ejecutar la siguiente orden:

~~~
virtalenv nombredelespaciovirtual
~~~

Para más información sobre virtualenv puedes consultar en su sitio web. https://virtualenv.pypa.io/en/latest/

Una vez creado el entorno virtual, tan solo se necesita activar el entorno de virtual:

~~~
source venv-nombredelespaciovirtual/bin/activate
~~~

Finalmente, pasaremos a instalar los paquetes responsables del correcto funcionamiento de nuestro proyecto.  

### Instalar paquetes

Para instalar los paquetes necesarios tan solo necesitas ejecutar la siguiente orden:

~~~
pip install -r requirements.txt
~~~

Importante siempre tener activado el entorno virtual antes de ejecutar este comando. 

Si todo ha ido bien deberíamos de ejecutar el siguiente comando y ejecutarse nuestra aplicación en el servidor.

~~~
> python3 manage.py runserver
~~~

# Realizar migraciones
En la primera puesta en marcha, existe la necesidad de crear la estructura de la  base de datos de la interfaz, sobre todo la primera vez que se depliega el proyecto, para ello se realiza las migraciones ( denominación propia de  Django ) de la siguiente forma:

~~~
> python3 manage.py makemigrations ( crea las migraciones )

> python3 manage.py migrate ( las ejecuta )

> python3 manage.py runserver

~~~

Ya estaría ejecutándose nuestro proyecto en local, en este momento ya empezaríamos a desarrollar nuestro proyecto. 


