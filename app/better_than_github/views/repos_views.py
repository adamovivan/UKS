# -*- coding: utf-8 -*-
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
import requests

API = 'https://api.github.com/'


@api_view(['GET'])
def get_contributors(request, owner=None, repo=None):
    contributors = requests.get(
        API + 'repos/{0}/{1}/contributors'.format(owner, repo))
    return HttpResponse(contributors)

@api_view(['GET'])
def get_issues(request, owner=None, repo=None):
    issues = requests.get(
        API + 'repos/{0}/{1}/issues'.format(owner, repo))
    return HttpResponse(issues)

@api_view(['GET'])
def get_milestones(request, owner=None, repo=None):
    milestones = requests.get(
        API + 'repos/{0}/{1}/milestones'.format(owner, repo))
    return HttpResponse(milestones)

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
