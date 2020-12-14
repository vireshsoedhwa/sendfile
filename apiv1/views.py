from django.shortcuts import render
from rest_framework import generics

from rest_framework.views import APIView
from rest_framework.response import Response

import requests
import logging
logger = logging.getLogger(__name__)

from .yt import YT

from .models import Video
# from .models import bThread

# from .serializers import ImageItemSerializer

# Create your views here.

# class ImageItemListCreate(generics.ListCreateAPIView):
#     queryset = ImageItem.objects.all()
#     serializer_class = ImageItemSerializer

class submitlink(APIView):


    def post(self, request, format=None):              

        # logger.error(request.data['query'])
        logger.error(request.data['query']['link2'])

        newdownload = YT(request.data['query']['link2'])
        newdownload.run()

        return Response("hello")
