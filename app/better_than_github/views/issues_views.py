# -*- coding: utf-8 -*-
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from rest_framework.decorators import api_view
import requests
from django.views.decorators.csrf import csrf_exempt
from ..models import *
from django.core import serializers

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



@api_view(['GET'])
def getLabeles(request):
    labels = Label.objects.all()
    data = serializers.serialize("json", labels)
    return HttpResponse(data, content_type="json")

@api_view(['POST'])
def create_issue(request, owner=None, repo=None):
    data = request.data
    print("title issue ", data)

    repo1 = "https://github.com/" + owner + "/"+ repo
    project = Project.objects.get(git_repo=repo1)
    print(project)

    new_issue = Issue.objects.create(project=project)
    new_issue.title = data["title"]
    new_issue.state = STATES[0][0]
    #ovako; pronadjemo usera, projekat i labelu u bazi
    users = data["assignee"] #ovo je neki niz pa cemo proci kroz njega i izvuci sve usere
    user_list = []
    for u in users:
        user = User.objects.get(name=u)
        print(user)
        new_issue.assignees.add(user)


    #izvucemo labele na osnovu naziva
    labels = data["labels"]
    labels_list = []
    for l in labels:
        label = Label.objects.get(name=l)
        print(label)
        new_issue.labels.add(label)




    new_issue.save()

    return HttpResponse("OK")

