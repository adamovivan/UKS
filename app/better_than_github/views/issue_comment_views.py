from django.http import HttpResponse
from django.core import serializers
from rest_framework.decorators import api_view
from rest_framework.status import HTTP_201_CREATED, HTTP_200_OK

from ..models import *


@api_view(['POST'])
def add_comment(request):
    data = request.data
    comment = Comment()
    comment.description = data['text']

    issue = Issue.objects.get(pk=data['issueId'])
    comment.issue = issue

    user = User.objects.get(name=data['user'])
    comment.user = user

    comment.save()

    return HttpResponse(serializers.serialize("json", [comment], use_natural_foreign_keys=True)[1:-1], status=HTTP_201_CREATED)

@api_view(['POST'])
def edit_comment(request):
    data = request.data
    comment = Comment.objects.get(pk=data['commentId'])

    comment_change = CommentChange()
    comment_change.comment = comment
    comment_change.description = data['text']

    issue = Issue.objects.get(pk=data['issueId'])
    comment_change.issue = issue

    user = User.objects.get(name=data['userId'])
    comment_change.user = user

    comment_change.save()

    return HttpResponse('{"status": "ok"}', status=HTTP_201_CREATED)

@api_view(['GET'])
def get_comments(request, id):
    comments = Comment.objects.filter(issue=id)

    data = serializers.serialize("json", comments, use_natural_foreign_keys=True)

    return HttpResponse(data, status=HTTP_200_OK)

@api_view(['GET'])
def get_comment_changes(request, id):
    comment_changes = CommentChange.objects.filter(comment=id)

    data = serializers.serialize("json", comment_changes, use_natural_foreign_keys=True)

    return HttpResponse(data, status=HTTP_200_OK)