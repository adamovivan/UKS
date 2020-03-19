# from unittest import TestCase
import json
from django.test import TestCase, Client
from ..models import *


class IssuesViewsTest(TestCase):
    client = Client()

    @classmethod
    def setUpTestData(cls):
        owner = "test_owner"
        repo = "test_repo"
        label = Label()
        label.name = "bug"
        label.save()
        repo = "https://github.com/" + owner + "/" + repo
        project = Project.objects.create(git_repo=repo)
        project.save()
        Issue.objects.create(project=project)
        issue = Issue.objects.create(project=project)
        creator = User()
        creator.name = "test_user"
        creator.email = "test_email"
        creator.save()
        issue.creator = owner
        issue.title = "issue 1 title"
        issue.state = STATES[0][0]
        issue.labels.add(label)

        issue.save()

    def test_add_comment(self):
        issue_id = "1"
        comment_1_description = "Test comment 1"
        comment_2_description = "Test comment 2"
        user = "test_user"

        response1 = self.client.post('/repos/comment',
                                    json.dumps({"issueId": issue_id, "text": comment_1_description, "user": user}),
                                    content_type="application/json")

        response2 = self.client.post('/repos/comment',
                                    json.dumps({"issueId": issue_id, "text": comment_2_description, "user": user}),
                                    content_type="application/json")

        self.assertTrue(response1.status_code == 201)
        self.assertTrue(response2.status_code == 201)

        comments = Comment.objects.filter(issue=issue_id)
        self.assertTrue(len(comments) == 2)
        self.assertTrue(comments[0].description == comment_1_description)
        self.assertTrue(comments[1].description == comment_2_description)
        self.assertTrue(comments[0].user.name == user)
        self.assertTrue(comments[1].user.name == user)
