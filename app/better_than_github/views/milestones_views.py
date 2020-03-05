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
def get_labels_in_milestone(request, owner=None, repo=None, number=None):
    labels = requests.get(
        API + 'repos/{0}/{1}/milestones/{2}/labels'.format(owner, repo, number))
    return HttpResponse(labels)

@api_view(['GET'])
def get_milestone(request, owner=None, repo=None, number=None):
    milestone = requests.get(
        API + 'repos/{0}/{1}/milestones/{2}'.format(owner, repo, number))
    return HttpResponse(milestone)