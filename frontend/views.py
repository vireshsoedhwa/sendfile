from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import FileUploadParser, MultiPartParser
from django.http import FileResponse

from .serializers import UploadSerializer
from .models import ReceivedFile

from django.core.exceptions import PermissionDenied
from django.http import HttpResponse, HttpResponseNotFound
from django.http import Http404
# Create your views here.


@ensure_csrf_cookie
def index(request):

    if request.session.test_cookie_worked():
        print(str(request.headers['Cookie']))

    # if request.method == 'GET':
    #     if request.session.test_cookie_worked():
    #         request.session.delete_test_cookie()
    #         return HttpResponse("You're logged in.")
    #     else:
    #         return HttpResponse("Please enable cookies and try again.")
    request.session.set_test_cookie()

    return render(request, 'frontend/index.html')


def downloadfilepage(request, uuid):

    if request.session.test_cookie_worked():
        print(str(request.headers['Cookie']))

    # if request.method == 'GET':
    #     if request.session.test_cookie_worked():
    #         request.session.delete_test_cookie()
    #         return HttpResponse("You're logged in.")
    #     else:
    #         return HttpResponse("Please enable cookies and try again.")
    request.session.set_test_cookie()

    return render(request, 'frontend/index.html')


class Upload(APIView):
    parser_classes = [MultiPartParser]
    def put(self, request, format=None):

        # file_obj = request.data['file']
        file_obj = request.FILES['file']
        session_id = request.headers['Cookie'].split("=")[1]
        # print(request.headers['Cookie'].split("=")[1])
        # print(file_obj)
        serializer = UploadSerializer(
            data={'fileobject': file_obj, 'session': session_id})
        if serializer.is_valid():
            instance = serializer.save()
            return Response(str(instance.id))

        # return Response("HA")

        return Response(serializer.errors, status=400)


# class Downloadlink(APIView)


class FindFile(APIView):
    def get(self, request, uuid, format=None):
        # getfile = ReceivedFile.objects.get(id=uuid)

        try:
            getfile = ReceivedFile.objects.get(id=uuid)
        except ReceivedFile.DoesNotExist:
            return HttpResponseNotFound('<h1>Not found</h1>')

        # print(str(getfile.filename()))
        # filename = getfile.filename()
        # file_response = FileResponse(getfile.fileobject)
        # file_response['Content-Type'] = 'application/octet-stream'
        # file_response['Content-Disposition'] = 'attachment; filename="'+filename + '"'

        return Response(getfile.id, status=200)

class Download(APIView):
    def get(self, request, uuid, format=None):

        try:
            getfile = ReceivedFile.objects.get(id=uuid)
        except ReceivedFile.DoesNotExist:
            return HttpResponseNotFound('<h1>Not found</h1>')

        print(str(getfile.filename()))
        filename = getfile.filename()
        file_response = FileResponse(getfile.fileobject)
        file_response['Content-Type'] = 'application/zip'
        file_response['Access-Control-Expose-Headers'] = 'X-Suggested-Filename'
        file_response['Content-Disposition'] = 'attachment; filename="'+filename + '"'

        return file_response
