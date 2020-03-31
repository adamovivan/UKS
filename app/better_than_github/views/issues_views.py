# -*- coding: utf-8 -*-
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from rest_framework.decorators import api_view
import requests
from django.views.decorators.csrf import csrf_exempt
from ..models import *
from django.core import serializers
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_200_OK
import json

API = 'https://api.github.com/'

@api_view(['POST'])
def get_assignees(request):
    assignees = []
    for i in request.data:
        assignees.append(User.objects.get(pk=i))

    data = serializers.serialize("json", assignees)
    return HttpResponse(data, content_type="json")

@api_view(['DELETE'])
def delete_assignee(request):
    issue = Issue.objects.get(pk=request.data["issueId"])
    assignee = User.objects.get(name=request.data["assignee"])
    issue.assignees.remove(assignee)

    user = User.objects.get(name=request.data["user"])
    responsibility_change = ResponsibilityChange()
    responsibility_change.responsible_user = assignee
    responsibility_change.user = user
    responsibility_change.description = 'removed'
    responsibility_change.issue = issue
    responsibility_change.save()

    data = serializers.serialize("json", [assignee])[1:-1]
    return HttpResponse(data, content_type="json")

@api_view(['POST'])
def add_assignees(request):
    issue = Issue.objects.get(pk=request.data["issueId"])
    for i in request.data["assignees"]:
        assignee = User.objects.get(name=i)
        issue.assignees.add(assignee)
        user = User.objects.get(name=request.data["user"])
        responsibility_change = ResponsibilityChange()
        responsibility_change.responsible_user = assignee
        responsibility_change.user = user
        responsibility_change.description = 'added'
        responsibility_change.issue = issue
        responsibility_change.save()
    issue.save()
    
    data = serializers.serialize("json", [issue])[1:-1]
    return HttpResponse(data, content_type="json")

@api_view(['DELETE'])
def delete_label(request):
    issue = Issue.objects.get(pk=request.data["issueId"])
    label = Label.objects.get(name=request.data["label"])
    issue.labels.remove(label)

    user = User.objects.get(name=request.data["user"])
    label_change = LabelChange()
    label_change.label = label
    label_change.label_name = label.name
    label_change.user = user
    label_change.description = 'removed'
    label_change.issue = issue
    label_change.save()

    data = serializers.serialize("json", [label])[1:-1]
    return HttpResponse(data, content_type="json")

@api_view(['POST'])
def add_labels(request):
    issue = Issue.objects.get(pk=request.data["issueId"])
    for i in request.data["labels"]:
        label = Label.objects.get(name=i)
        issue.labels.add(label)
        user = User.objects.get(name=request.data["user"])
        label_change = LabelChange()
        label_change.label = label
        label_change.label_name = label.name
        label_change.user = user
        label_change.description = 'added'
        label_change.issue = issue
        label_change.save()
    issue.save()

    data = serializers.serialize("json", [issue])[1:-1]
    return HttpResponse(data, content_type="json")

@api_view(['POST'])
def get_labels(request):
    labels = []
    for i in request.data:
        labels.append(Label.objects.get(pk=i))

    data = serializers.serialize("json", labels)
    return HttpResponse(data, content_type="json")

@api_view(['POST'])
def get_milestone(request):
    milestone = Milestone.objects.get(pk=request.data)

    data = serializers.serialize("json", [milestone])[1:-1]
    return HttpResponse(data, content_type="json")

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
def get_issueGITHUB(request, owner=None, repo=None, number=None):
    issue = requests.get(
        API + 'repos/{0}/{1}/issues/{2}'.format(owner, repo, number))
    return HttpResponse(issue)

@api_view(['GET'])
def get_issue(request, id):
    issue = Issue.objects.get(pk=id)
    data = serializers.serialize("json", [issue])[1:-1]

    return HttpResponse(data)


@api_view(['GET'])
def get_mycreate_issues(request, owner=None):
    issues = Issue.objects.filter(creator=owner)

    data=serializers.serialize("json", issues, use_natural_foreign_keys=True)
    return HttpResponse(data)


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

@api_view(['GET'])
def get_state_changes(request, id):
    changes = StateChange.objects.filter(issue=id)
    return HttpResponse(serializers.serialize("json", changes), content_type="json")

@api_view(['GET'])
def get_issue_events(request, id):
    changes = StateChange.objects.filter(issue=id)
    comments = Comment.objects.filter(issue=id)
    assignees = ResponsibilityChange.objects.filter(issue=id)
    labels = LabelChange.objects.filter(issue=id)

    events = list()

    for change in changes:
        events.append(change)

    for comment in comments:
        inserted = False
        for i in range(len(events)):
            if comment.timestamp < events[i].timestamp:
                events.insert(i, comment)
                inserted = True
                break

        if not inserted:
            events.append(comment)

    for assignee in assignees:
        events.append(assignee)

    for label in labels:
        events.append(label)

    events_json = []
    for event in events:
        events_json.append(json.loads(serializers.serialize("json", [event], use_natural_foreign_keys=True)[1:-1]))

    return HttpResponse(json.dumps(events_json), status=HTTP_200_OK)

@api_view(['PUT'])
def change_state(request, id, user_alias):
    try:
        issue = Issue.objects.get(pk=id)

        user = User.objects.get(name=user_alias)
        state_change = StateChange()
        state_change.user = user
        if issue.state == STATES[0][0]:
            issue.state = STATES[1][0]
            if issue.milestone:
                milestone = Milestone.objects.get(pk=issue.milestone.pk)
                milestone.open_issues -= 1
                milestone.closed_issues += 1
                milestone.save()
            state_change.new_state = STATES[1][0]
        else:
            issue.state = STATES[0][0]
            if issue.milestone:
                milestone = Milestone.objects.get(pk=issue.milestone.pk)
                milestone.open_issues += 1
                milestone.closed_issues -= 1
                milestone.save()
            state_change.new_state = STATES[0][0]

        state_change.issue = issue
        state_change.save()
        issue.save()
        return HttpResponse(serializers.serialize("json", [issue])[1:-1], status=HTTP_200_OK)
    except Exception as e:
        print(e)
        return HttpResponse("failed state change!", status=HTTP_400_BAD_REQUEST)
@api_view(['POST'])
def create_issue(request, owner=None, repo=None):
    data = request.data
    print("title issue ", data)
    
    try:
        repo1 = "https://github.com/" + owner + "/" + repo
        project = Project.objects.get(git_repo=repo1)
        print(project)

        new_issue = Issue.objects.create(project=project)

        creator = User.objects.get(name=data["creator"])
        new_issue.creator = creator.name

        new_issue.title = data["title"]
        new_issue.state = STATES[0][0]
        #ovako; pronadjemo usera, projekat i labelu u bazi
        users = data["assignees"] #ovo je neki niz pa cemo proci kroz njega i izvuci sve usere
        user_list = []
        if users != None:
            for u in users:
                user = User.objects.get(name=u)
                print(user)
                new_issue.assignees.add(user)

        #izvucemo labele na osnovu naziva
        labels = data["labels"]
        labels_list = []
        if labels != None:
            for l in labels:
                label = Label.objects.get(name=l)
                print(label)
                new_issue.labels.add(label)

        milestone = data['milestone']
        if milestone != '':
            milestone = Milestone.objects.get(title=milestone)
            milestone.open_issues += 1
            milestone.save()
            new_issue.milestone = milestone

        new_issue.save()
        print(new_issue.pk)
        print(new_issue.title)

        return HttpResponse("Successfully created the issue!", status=HTTP_201_CREATED)
    except:
        return HttpResponse("Unsuccessfully created the issue!", status=HTTP_400_BAD_REQUEST)






