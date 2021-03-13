#!/bin/bash
set -e

>&2 echo "Make Database migrations"
python manage.py makemigrations frontend
echo "-------------------------------------------------------------------------------------------\n"


>&2 echo "Run Database migrations"
python manage.py migrate
echo "-------------------------------------------------------------------------------------------\n"

# >&2 echo "Start Django Q task Scheduler"
# python manage.py qcluster &
# echo "-------------------------------------------------------------------------------------------\n"

>&2 echo "Collect static"
python manage.py collectstatic --noinput

>&2 echo "Create temporary superuser"
echo "from django.contrib.auth.models import User; User.objects.filter(username='admin').exists() or User.objects.create_superuser('admin', 'admin@example.com','admin')" | python manage.py shell

echo "-------------------------------------------------------------------------------------------\n"

# Start Django dev server
>&2 echo "Starting Django runserver..."
# gunicorn --bind 0.0.0.0:8000 sendfile.asgi:application -k uvicorn.workers.UvicornH11Worker
gunicorn --bind 0.0.0.0:8001 sendfile.wsgi --daemon

exec "$@"

