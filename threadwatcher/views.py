from django.shortcuts import render
from rest_framework import generics

from rest_framework.views import APIView
from rest_framework.response import Response

import requests
import logging
logger = logging.getLogger(__name__)

from .models import ImageItem
from .models import bThread

from .serializers import ImageItemSerializer

# Create your views here.

# class ImageItemListCreate(generics.ListCreateAPIView):
#     queryset = ImageItem.objects.all()
#     serializer_class = ImageItemSerializer

class ListAllBThreads(APIView):


    def get(self, request, format=None):              

        x = requests.get('https://a.4cdn.org/b/catalog.json')

        # logger.error(x.json())

        for page in x.json():   
            for thread in page['threads']: 
                logger.error(thread['no'])
                # logger.error(thread['com'])
                # newthread = bThread.objects.create(id=thread['no'], summary=thread['com'])
                # newthread.save()

        # logger.error(x.json()[0]['page'])


        return Response(x.json())
