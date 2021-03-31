from .models import ReceivedFile
# from datetime import datetime
from django.utils import timezone

def check_field_age():

    for instance in ReceivedFile.objects.all():

        file_age_seconds = (timezone.now() - instance.created).seconds
        file_age_hours = file_age_seconds / 3600
        if file_age_hours > 24:
            print("deleting file: " + str(instance.fileobject.path))
            try:
                instance.deletefile()
            except:
                pass
    return None