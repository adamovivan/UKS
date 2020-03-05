# -*- coding: utf-8 -*-
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from rest_framework.decorators import api_view
import requests
from django.views.decorators.csrf import csrf_exempt
from ..models import *

API = 'https://api.github.com/'

@api_view(['GET'])
def get_comments_in_issue(request, owner=None, repo=None, number=None):
    comments = requests.get(
        API + 'repos/{0}/{1}/issues/{2}/comments'.format(owner, repo, number))
    return HttpResponse(comments)

@api_view(['GET'])
def get_labels_on_issue(request, owner=None, repo=None, number=None):
    labels = requests.get(
        API + 'repos/{0}/{1}/issues/{2}/labels'.format(owner, repo, number))
    return HttpResponse(labels)

@api_view(['GET'])
def get_issue(request, owner=None, repo=None, number=None):
    issue = requests.get(
        API + 'repos/{0}/{1}/issues/{2}'.format(owner, repo, number))
    return HttpResponse(issue)

@api_view(['GET'])
def get_issues(request, owner=None, repo=None):
    issues = requests.get(API + 'user/issues')
    return HttpResponse(issues)



@api_view(['GET'])
def get_comment(request, owner=None, repo=None, number=None, comment_id=None):
    comments = requests.get(
        API + 'repos/{0}/{1}/issues/{2}/comments/{3}'.format(owner, repo, number, comment_id))
    return HttpResponse(comments)

@api_view(['GET'])
def get_comments_in_repo(request, owner=None, repo=None):
    comments = requests.get(
        API + 'repos/{0}/{1}/issues/comments'.format(owner, repo))
    return HttpResponse(comments)

@api_view(['POST'])
def create_issue(request, owner=None, repo=None):
    r = requests.post(API + 'repos/{0}/{1}/issues'.format(owner, repo), params = request.POST)
    if r.status_code == 200:
        return HttpResponse('Data is saved')
    return HttpResponse('Could not save data')
