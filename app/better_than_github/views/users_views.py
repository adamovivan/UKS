# -*- coding: utf-8 -*-
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
import requests
from django.core import serializers
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_201_CREATED

from ..models import User, Project
API = 'https://api.github.com/'

@api_view(['GET'])
def get_user(request, username=None):
    user = requests.get(API + 'users/{0}'.format(username))
    return HttpResponse(user)

@api_view(['GET'])
def get_repositories(request, username=None):
    repositories = requests.get(API + 'users/{0}/repos'.format(username))
    return HttpResponse(repositories)


api_view(['GET'])
def get_all_users(request):
    print("Get all users")
    users = User.objects.all()
    data = serializers.serialize("json", users)
    return HttpResponse(data, content_type="json")


api_view(['POST'])
def register(request):
    print("ADD USER: ")
    data = request.data
    print(data["username"])
    print(data["email"])
    find_user = User.objects.get(username=data["username"])
    if find_user != None:
        return HttpResponse("Already exist user with same username!", status=HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.create()
        user.username = data["username"]
        user.email = data["email"]
        user.save()
        repositories = requests.get(API+'/users/{0}/repos'.format(data["username"])) #preuzmemo sve repozitorijume od korisnika i ubacimo ih u bazu
        for r in repositories:
            project = Project.objects.create()
            project.title = project.name
            project.save()
        return HttpResponse("Successfully registered user!", status=HTTP_201_CREATED)
    except:
        return HttpResponse("Unsuccessfully registered user!", status=HTTP_400_BAD_REQUEST)
