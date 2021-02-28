FROM python:3.9.0-slim
ENV PYTHONUNBUFFERED 1
WORKDIR /code

RUN apt-get update &&  \
    apt-get upgrade -y && \
    apt-get install nginx -y && \
    apt-get autoremove --purge && \
    apt-get -y clean

COPY requirements.txt /code   
RUN pip install --upgrade pip \
    pip install -r requirements.txt
COPY . /code


COPY /nginx/nginx.conf /etc/nginx/nginx.conf

RUN chmod +x ./docker-entrypoint.sh
EXPOSE 8000
# RUN chmod +x ./docker-entrypoint.sh
ENTRYPOINT ["./docker-entrypoint.sh"]
# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
# CMD ["tail", "-f", "requirements.txt"]
# CMD ["gunicorn ", "sendfile.asgi:application", "-k", "uvicorn.workers.UvicornH11Worker"]
CMD ["nginx", "-g", "daemon off;"]