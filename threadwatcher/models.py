from django.db import models
from django.core.files.storage import FileSystemStorage

# Create your models here.


def file_directory_path(instance, filename):
    return 'input/{0}/{1}'.format(instance.id, "doc")


class ImageItem(models.Model):
    name = models.CharField(max_length=100)
    inputfile = models.FileField(upload_to=file_directory_path)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class bThread(models.Model):
    id = models.DecimalField(max_digits=10,decimal_places=0,primary_key=True)
    summary = models.CharField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.id)