from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse, HttpResponseBadRequest
from users.models import User 
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from django.forms.models import model_to_dict
import numpy as np
import requests
import base64
import pickle

# from django.views.decorators.csrf import csrf_exempt

# @csrf_exempt
def signup(request):
    if request.method == 'POST':
        if 'username' not in request.POST or 'password' not in request.POST:
            return HttpResponseBadRequest("You should enter both username and password.")

        username = request.POST['username']
        password = request.POST['password']

        user = User.objects.create_user(username, password=password)
        user.init_vector() # save default vector
        # test print
        # np_bytes_init = base64.b64decode(user.vector)
        # np_array_init = pickle.loads(np_bytes_init)
        # print("INITIAL")
        # print(np_array_init)

        # A new user is automatically logged in
        auth_login(request, user)

        # serialized_user = model_to_dict(user)
        payload = {"id": str(user.id), "username": user.username}
        return JsonResponse(payload, status=201)
    
    else:
        return HttpResponseNotAllowed(['POST'])


# @csrf_exempt
def login(request):
    if request.method == 'POST':
        if 'username' not in request.POST or 'password' not in request.POST:
            return HttpResponseBadRequest("You should enter both username and password.")
        
        username = request.POST['username']
        password = request.POST['password']

        user = authenticate(username=username, password=password)

        if user is not None:
            auth_login(request, user)
            payload = {"id": str(user.id), "username": user.username}
            return JsonResponse(payload, status=200)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['POST'])


# @csrf_exempt
def logout(request):
    if request.method == 'POST':
        if request.user.is_authenticated: 
            auth_logout(request)
            return HttpResponse(status=204)
        else:
            return HttpResponse(status=401)

    else:
        return HttpResponseNotAllowed(['POST'])


def clean_email(request):
    if request.method == 'POST':
        email = request.POST.get('email', None)
        print("@clean_email email: ", email)
        if email is None:
            return HttpResponse(status=400)

        if User.objects.filter(email=email).exists():
            print("@clean_email email already exists")
            return HttpResponse("false")
        else:
            print("@clean_email unique email")
            return HttpResponse("true")
    else:
        return HttpResponseNotAllowed(['POST'])



def clean_username(request):
    if request.method == 'POST':
        username = request.POST.get('username', None)
        if username is None:
            return JsonResponse(status=400)
        
        if User.objects.filter(username=username).exists():
            return HttpResponse("false")
        else:
            return HttpResponse("true")
    else:
        return HttpResponseNotAllowed(['POST'])

# def detail(request, pk):
#     if request.method == 'GET':
#         try:
#             user = User.objects.get(pk=pk)
#         except User.DoesNotExist:
#             return HttpResponse(status=404)
        
#         serialized_user = model_to_dict(user)
#         return JsonResponse(serialized_user, status=200)
    
#     else:
#         return HttpResponseNotAllowed(['GET'])