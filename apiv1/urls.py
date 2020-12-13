from django.urls import path
from django.conf.urls import url
from . import views


urlpatterns = [
    # path('', views.ImageItemListCreate.as_view() ),
    # path('', views.ListAllBThreads.as_view() ),
    path('', views.submitlink.as_view() )
]
