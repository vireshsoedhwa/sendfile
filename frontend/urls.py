from django.urls import path
from . import views


urlpatterns = [
    path('', views.index ),
    path('<uuid:uuid>/', views.downloadfilepage ),
    path('upload', views.Upload.as_view()),
    path('download/<uuid:uuid>/', views.Download.as_view()),
    path('find/<uuid:uuid>/', views.FindFile.as_view()),
]