# -*- coding: utf-8 -*-
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.shortcuts import render
from requests import Response
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
import requests
from django.core import serializers
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_201_CREATED, HTTP_200_OK
from django.views.decorators.csrf import  csrf_exempt

from ..models import User, Project
API = 'https://api.github.com/'

@api_view(['GET'])
def get_user(request, username=None):
    user = requests.get(API + 'users/{0}'.format(username))
    return HttpResponse(user)

@api_view(['GET'])
def get_repositories(request, username=None):
    # vracamo sve repozitorijume za prosledjenog korisnika
    url_repo = "https://github.com/{0}".format(username)
    user = User.objects.get(name=username)
    projects = Project.objects.filter(users__in = [user])
    data = serializers.serialize("json", projects)
    return HttpResponse(data)


@api_view(['GET'])
def get_all_users(request):
    print("Get all users")
    users = User.objects.all()
    data = serializers.serialize("json", users)
    return HttpResponse(data, content_type="json")

@csrf_exempt
@api_view(["POST"])
def login(request):
    # samo cemo da proverimo da user sa unetim usernemom postoji kod nas u app
    data = request.data
    print("LOGIN ", data["username"])
    find_user = User.objects.get(name=data["username"])
    if find_user:
        try:
            data_repo: Response = requests.request("GET", API+'users/{0}/repos?type=all'.format(data["username"])) #preuzmemo sve repozitorijume od korisnika i ubacimo ih u bazu
         #   attr = vars(data_repo)
            #print(', '.join("%s: %s" % item for item in attr.items()))
            data = data_repo.json()
            for repo in data:
             #   print(repo)
                print(repo["name"])
                find_project_list = Project.objects.filter(git_repo=repo["html_url"])
                #print

                if find_project_list:
                    find_project = find_project_list[0]
                    print("postoji u bazi")
                    find_project.users.add(find_user)
                    find_project.save()
                else:
                    print("novi projekat")
                    project = Project.objects.create(title=repo["name"], git_repo=repo["html_url"])
                    project.users.add(find_user)
                    project.save()

        except Exception as e:
            print("GRESKA KOD DOBAVLJANJA REPO-A")
            print(e)

        return HttpResponse("ok", status=HTTP_200_OK)
    else:
        return HttpResponse("Please register!", status=HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(["POST"])
def register(request):
    print(request.method)
    print("ADD USER: ")
    data = request.data
    print(data["username"])
    print(data["email"])

    find_user = User.objects.filter(name=data["username"])
    print(find_user)

    if find_user:
        return HttpResponse("Already exist user with same username!", status=HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.create()
        user.name = data["username"]
        user.email = data["email"]
        user.save()

        return HttpResponse("Successfully registered user!", status=HTTP_201_CREATED)
    except:
        return HttpResponse("Unsuccessfully registered user!", status=HTTP_400_BAD_REQUEST)




