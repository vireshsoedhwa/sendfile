FROM python:3.9.0-slim
ENV PYTHONUNBUFFERED 1
ENV VIRTUAL_ENV=/opt/venv
WORKDIR /code

RUN python3 -m venv $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"


RUN apt-get update &&  \
    apt-get upgrade -y && \
    apt-get autoremove --purge && \
    apt-get -y clean

RUN pip install --upgrade pip

COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .

RUN chmod +x docker-entrypoint.sh
ENTRYPOINT ["docker-entrypoint.sh"]
EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]