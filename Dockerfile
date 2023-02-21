FROM ubuntu:20.04

ENV HOME_DIR = /home/webapp/
ENV NAME_APP = api-cloud
ENV NAME_APP_SPV=api-cloud-spv.conf 
ENV NAME_NGINX=api-cloud-nginx.conf

RUN apt-get update

RUN apt-get install -y bash && \
    apt-get install -y nano && \
    apt-get install -y software-properties-common && \
    apt-get upgrade -y && \
    apt-get install -y python3-setuptools && \
    apt-get install -y build-essential && \
    apt-get install -y python3-pip && \
    apt-get install -y python3-dev && \
    apt-get install -y git-core && \
    apt-get install -y build-essential autoconf libtool pkg-config python-opengl python-pil && \
    apt-get install -y python-pyrex   && \
    apt-get install -y   libgle3 python-dev libssl-dev && \
    apt-get install -y libexpat1 && \
    apt-get install -y ssl-cert && \
    apt-get install -y openssh-server && \
    apt-get install -y  libpq-dev && \
    apt-get install -y libffi-dev && \
    apt-get install -y nodejs && \
    apt-get install -y nginx && \
    apt-get install -y python3-virtualenv  && \
    apt-get install -y supervisor && \
    apt-get install -y gunicorn 


#RUN useradd -m django

RUN mkdir -p ${HOME_DIR}

WORKDIR ${HOME_DIR}

RUN mkdir ${HOME_DIR}/.ssh/

#ADD id_rsa /root/.ssh/id_rsa

# Create known_hosts
RUN touch ${HOME_DIR}/.ssh/known_hosts
# Add bitbuckets key
RUN ssh-keyscan github.org >> ${HOME_DIR}/.ssh/known_hosts


#RUN git clone https://github.com/ugritlab/API_CLOUDS.git
COPY . ${HOME_DIR}/${NAME_APP}



#RUN python3 -m virtualenv .

#RUN pip install -r requirements.txt

#COPY config_deploy/gunicorn.conf.py /etc/

#RUN chmod u+x /etc/gunicorn.conf.py

#COPY config_deploy/${NAME_APP_SPV} /etc/supervisor/conf.d/  

#RUN mkdir -p ${PATH_DEPLOY}/logs/var/log/nginx/

#RUN touch ${PATH_DEPLOY}/logs/var/log/gunicorn_supervisor.log

#COPY config_deploy/${NAME_NGINX} /etc/nginx/sites-available/

#RUN ln -s /etc/nginx/sites-available/${NAME_NGINX} /etc/nginx/sites-enabled/${NAME_NGINX}

