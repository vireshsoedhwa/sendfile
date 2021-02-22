from rest_framework import serializers
from .models import ReceivedFile

import os


def validate_file(value):
    print(str(value))
    # if value.name.split(".")[1] != "zip":
    #     raise serializers.ValidationError("Not a valid Zip file")


class UploadSerializer(serializers.Serializer):

    fileobject = serializers.FileField(
        validators=[validate_file], max_length=100, allow_empty_file=False, use_url=True)
    session = serializers.CharField(
        max_length=50, min_length=None, allow_blank=True, trim_whitespace=True)

    def create(self, validated_data):
        newreceivedfile = ReceivedFile.objects.create()
        # newreceivedfile.fileobject = validated_data.get(
        #     'fileobject', validate_file
        # )

        session = validated_data.get('session')
        up_file = validated_data.get('fileobject', validate_file)

        received_filepath = '/code/temp/'+str(newreceivedfile.id)

        if not os.path.exists(received_filepath):
            os.makedirs(received_filepath)

        with open(received_filepath + "/" + str(up_file.name), 'wb+') as destination:
            for chunk in up_file.chunks():
                destination.write(chunk)

        newreceivedfile.session = session
        newreceivedfile.fileobject.name = str(newreceivedfile.id) + "/" + str(up_file.name)
        newreceivedfile.save()

        return newreceivedfile
