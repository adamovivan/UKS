# -*- coding: utf-8 -*-
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from ..models import *
from django.core import serializers
import requests

API = 'https://api.github.com/'


@api_view(['GET'])
def get_contributors(request, owner=None, repo=None):
    contributors = requests.get(
        API + 'repos/{0}/{1}/contributors'.format(owner, repo))
    return HttpResponse(contributors)

@api_view(['GET'])
def get_issues(request, owner=None, repo=None):
    repo1 = "https://github.com/" + owner + "/" + repo
    try:
        projectG = Project.objects.get(git_repo=repo1)
    except Project.DoesNotExist:
        projectG = None
    issues = Issue.objects.filter(project=projectG)
    data = serializers.serialize("json", issues)
    return HttpResponse(data)

@api_view(['GET'])
def get_milestones(request, owner=None, repo=None):
    repo1 = "https://github.com/" + owner + "/" + repo
    try:
        projectG = Project.objects.get(git_repo=repo1)
    except Project.DoesNotExist:
        projectG = None
    milestone = Milestone.objects.filter(project=projectG)
    data = serializers.serialize("json", milestone)
    return HttpResponse(data)

@api_view(['GET'])
def get_assignees(request, owner=None, repo=None):
    assignees = requests.get(
        API + 'repos/{0}/{1}/assignees'.format(owner, repo))
    return HttpResponse(assignees)

@api_view(['GET'])
def get_labels(request, owner=None, repo=None):
    labels = requests.get(
        API + 'repos/{0}/{1}/labels'.format(owner, repo))
    return HttpResponse(labels)

@api_view(['GET'])
def get_label(request, owner=None, repo=None, name=None):
    label = requests.get(
        API + 'repos/{0}/{1}/labels/{2}'.format(owner, repo, name))
    return HttpResponse(label)

@api_view(['GET'])
def get_all_repo(request, owner=None):
    print("get all repo")
    repos =requests.get(API + 'users/{0}/repos'.format(owner))
    return HttpResponse(repos)

@api_view(['GET'])
def get_all_commits(request, owner=None, repo=None):
    commit = requests.get(
        API + 'repos/{0}/{1}/commits'.format(owner, repo))
    return HttpResponse(commit)

#@api_view(['GET'])
#def get_all_commits(request, owner=None, repo=None, branch=None):
#    commits = requests.get(
#       API + 'repos/{0}/{1}/commits/{2}'.format(owner, repo, branch))
#    return HttpResponse(commits)

@api_view(['GET'])
def get_repo(request, owner=None, repo=None):
    repo = requests.get(
        API + 'repos/{0}/{1}'.format(owner, repo))
    return HttpResponse(repo)

@api_view(['GET'])
def get_readme(request, owner=None, repo=None):
    readme = requests.get(
        API + 'repos/{0}/{1}/readme'.format(owner, repo))
    return HttpResponse(readme)

@api_view(['GET'])
def get_contents(request, owner=None, repo=None):
    get_contents = requests.get(
        API + 'repos/{0}/{1}/contents'.format(owner, repo))
    return HttpResponse(get_contents)

@api_view(['GET'])
def get_branch(request, owner=None, repo=None):
    get_branch = requests.get(
        API + 'repos/{0}/{1}/branches'.format(owner, repo))
    return HttpResponse(get_branch)

@api_view(['POST'])
def get_content(request, owner=None, repo=None):
    get_content = requests.get(
        API + 'repos/{0}/{1}/contents/{2}'.format(owner, repo, request.data['path']))
    return HttpResponse(get_content)