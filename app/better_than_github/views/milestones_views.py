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

@api_view(['POST'])
def create_milestone(request, owner=None, repo=None):
    r = request.post(API + 'repos/{0}/{1}/milestones'.format(owner, repo), params = request.POST)
    if r.status_code == 200:
        return HttpResponse('Data is saved')
    return HttpResponse('Could not save data')

@api_view(['PATCH'])
def update_milestone(request, owner=None, repo=None, number=None):
    r = request.patch(API + 'repos/{0}/{1}/milestones/{2}'.format(owner, repo, number), params = request.POST)
    if r.status_code == 200:
        return HttpResponse('Data is updated')
    return HttpResponse('Could not update data')

@api_view(['DELETE'])
def delete_milestone(request, owner=None, repo=None, number=None):
    r = request.delete(API + 'repos/{0}/{1}/milestones/{2}'.format(owner, repo, number), params = request.POST)
    if r.status_code == 200:
        return HttpResponse('Milestone is deleted')
    return HttpResponse('Could not delete milestone')