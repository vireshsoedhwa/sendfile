from django.db import models
import uuid
import os
# Create your models here.

def format_file_path(instance, file_name):
    return '{0}/{1}'.format(instance.id, file_name)

class ReceivedFile(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    fileobject = models.FileField(upload_to=format_file_path, blank=True, null=True)
    session = models.TextField(blank=True, null=True)

    def filename(self):
        return os.path.basename(self.fileobject.name)

    def __str__(self):
        return str(self.id)
