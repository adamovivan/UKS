# -*- coding: utf-8 -*-
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
import requests

API = 'https://api.github.com/'

@api_view(['GET'])
def get_user(request, username=None):
    user = requests.get(API + 'users/{0}'.format(username))
    return HttpResponse(user)

@api_view(['GET'])
def get_repositories(request, username=None):
    repositories = requests.get(API + 'users/{0}/repos'.format(username))
    return HttpResponse(repositories)
