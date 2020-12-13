from django.db import models
from django.core.files.storage import FileSystemStorage

# Create your models here.


def file_directory_path(instance, filename):
    return 'input/{0}/{1}'.format(instance.id, "doc")


class Video(models.Model):
    id = models.AutoField(primary_key=True)
    url = models.URLField(max_length=200, null=True, blank=True)
    inputfile = models.FileField(upload_to=file_directory_path, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.id