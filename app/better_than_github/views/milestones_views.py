# -*- coding: utf-8 -*-
from django.http import HttpResponse
from ..models import *
from rest_framework.decorators import api_view
from django.core import serializers




@api_view(['GET'])
def get_milestone(request, id=None):
    try:
        milestone = Milestone.objects.filter(pk=id)
        data = serializers.serialize("json", milestone)
        return HttpResponse(data)
    except :
        return HttpResponse("Milestone does not exist")

@api_view(['POST'])
def create_milestone(request, owner=None, repo=None):
    repo1 = "https://github.com/" + owner + "/" + repo
    try:
        project = Project.objects.get(git_repo=repo1)
    except Project.DoesNotExist:
        return HttpResponse("Milestone is not created, no repo")

    try:
        new_milestone = Milestone.objects.create(title=request.data['title'], description=request.data['description'],
                                                 due_date=request.data['dueData'], project=project, state=STATES[0][0], open_issues=0, closed_issues=0)
        new_milestone.save()
        return HttpResponse("Milestone is created")
    except :
        return HttpResponse("Milestone is not created")

@api_view(['PUT'])
def update_milestone(request, id=None):
    try:
        Milestone.objects.filter(pk=id).update(title=request.data['title'], description=request.data['description'],
                                                 due_date=request.data['dueData'])
        return HttpResponse("Milestone is updated")
    except:
        return HttpResponse("Milestone is not updated")


@api_view(['PATCH'])
def close_milestone(request, id=None):
    try:
        Milestone.objects.filter(pk=id).update(state=STATES[1][0])
        return HttpResponse("Milestone is closed")
    except :
        return HttpResponse("Milestone is not closed")

@api_view(['DELETE'])
def delete_milestone(request, id=None):
    try:
        Milestone.objects.filter(pk=id).delete()
        return HttpResponse("Milestone is deleted")
    except:
        return HttpResponse("Milestone is not deleted")
