from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

from django.core.files.storage import default_storage

from django.conf import settings

import uuid
import os
# Create your models here.


def format_file_path(instance, file_name):
    return '{0}/{1}'.format(instance.id, file_name)


class ReceivedFile(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    fileobject = models.FileField(
        upload_to=format_file_path, blank=True, null=True)
    session = models.TextField(blank=True, null=True)
    expired = models.BooleanField(blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)

    def filename(self):
        return os.path.basename(self.fileobject.name)

    def deletefile(self):
        try:
            default_storage.delete(self.fileobject.path)

            try:
                os.rmdir(str(settings.MEDIA_ROOT) + "/" + str(self.id))
            except:
                print("Error deleting dir %s" % self.id)
                pass
        except:
            print("Error: %s file not found" % self.fileobject.path)
            pass

        return None

    def __str__(self):
        return str(self.id)


# method for deleting
# @receiver(post_save, sender=ReceivedFile, dispatch_uid="delete_file")
# def delete_file_signal(sender, instance, **kwargs):

#     if instance.expired == True:
#         instance.deletefile()
