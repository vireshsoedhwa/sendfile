#!/bin/sh

set -e

>&2 echo "Make Database migrations"
python manage.py makemigrations apiv1
echo "-------------------------------------------------------------------------------------------\n"


>&2 echo "Run Database migrations"
python manage.py migrate
echo "-------------------------------------------------------------------------------------------\n"



>&2 echo "Start Django Q task Scheduler"
python manage.py qcluster &
echo "-------------------------------------------------------------------------------------------\n"


>&2 echo "Create temporary superuser"
echo "from django.contrib.auth.models import User; User.objects.filter(username='admin').exists() or User.objects.create_superuser('admin', 'admin@example.com','admin')" | python manage.py shell

echo "-------------------------------------------------------------------------------------------\n"

# Start Django dev server
>&2 echo "Starting Django runserver..."
exec "$@"

# Start django dev server
# >&2 echo "Starting Django runserver..."
# python /code/manage.py runserver 0.0.0.0:8000


# >&2 echo "Create relevant directories"
# mkdir -p "/code/DATA/converted/"
# mkdir -p "/code/DATA/input/"
# mkdir -p "/code/DATA/temp/"
# >&2 echo "Relevant directories created"
# echo "-------------------------------------------------------------------------------------------\n"

# >&2 echo "Wait for database to startup"

# Check if databse is up (active)
# TRY_CONNECT=30
# >&2 echo "Checking if the database is ready and active..."
# while ! pg_isready -h db -p 5432 > /dev/null 2>&1; do
# 	if [ $TRY_CONNECT -eq 0 ]; then
# 		>&2 echo "Error connecting to the database. Verify that the database exists and if it is available for connections."
# 		sleep infinity
# 	else
# 	    >&2 echo "Database is not ready or not activated yet."
# 	    sleep 1
# 	    TRY_CONNECT=$((TRY_CONNECT-1))
# 	    >&2 echo "Trying again. Try's number: $TRY_CONNECT"
# 	fi
# done
# >&2 echo "Database is active and ready."
# echo "-------------------------------------------------------------------------------------------\n"



#Start NGINX
# >&2 echo "Starting nginx..."
# nginx -g 'daemon off;'

