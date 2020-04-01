# -*- coding: utf-8 -*-
from django.http import HttpResponse
from ..models import *
from rest_framework.decorators import api_view
from django.core import serializers
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_409_CONFLICT, HTTP_200_OK




@api_view(['GET'])
def get_milestone(request, id=None):
    try:
        milestone = Milestone.objects.filter(pk=id)
        data = serializers.serialize("json", milestone)
        return HttpResponse(data)
    except :
        return HttpResponse("Milestone does not exist", status=HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def create_milestone(request, owner=None, repo=None):
    repo1 = "https://github.com/" + owner + "/" + repo
    try:
        project = Project.objects.get(git_repo=repo1)
    except Project.DoesNotExist:
        return HttpResponse("Milestone is not created, no repo", status=HTTP_400_BAD_REQUEST)

    try:
        new_milestone = Milestone.objects.create(title=request.data['title'], description=request.data['description'],
                                                 due_date=request.data['dueData'], project=project, state=STATES[0][0],
                                                 open_issues=0, closed_issues=0)
        new_milestone.save()
        return HttpResponse("Milestone is created", status=HTTP_200_OK)
    except :
        return HttpResponse("Milestone is not created", status=HTTP_409_CONFLICT)

@api_view(['PUT'])
def update_milestone(request, id=None):
    try:
        Milestone.objects.filter(pk=id).update(title=request.data['title'], description=request.data['description'],
                                                 due_date=request.data['dueData'])
        return HttpResponse("Milestone is updated")
    except:
        return HttpResponse("Milestone is not updated", status=HTTP_400_BAD_REQUEST)


@api_view(['PATCH'])
def close_milestone(request, id=None):
    try:
        Milestone.objects.filter(pk=id).update(state=STATES[1][0])
        return HttpResponse("Milestone is closed")
    except :
        return HttpResponse("Milestone is not closed", status=HTTP_400_BAD_REQUEST)

@api_view(['PATCH'])
def open_milestone(request, id=None):
    try:
        Milestone.objects.filter(pk=id).update(state=STATES[0][0])
        return HttpResponse("Milestone is open")
    except :
        return HttpResponse("Milestone is not open", status=HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_milestone(request, id=None):
    try:
        Milestone.objects.filter(pk=id).delete()
        return HttpResponse("Milestone is deleted")
    except:
        return HttpResponse("Milestone is not deleted", status=HTTP_400_BAD_REQUEST)
