from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import ensure_csrf_cookie
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