# from unittest import TestCase
import json
from django.test import TestCase, Client
from ..models import *


class MilestoneViewsTest(TestCase):
    client = Client()

    @classmethod
    def setUpTestData(cls):
        owner = "test_owner"
        repo = "test_repo"
        repo = "https://github.com/" + owner + "/" + repo
        project = Project.objects.create(git_repo=repo)
        project.save()


    def test_add_milestone(self):

        owner = "test_owner"
        repo = "test_repo"
        title = "test"
        description = "description test"
        date = "2020-04-20"

        response1 = self.client.post('/repos/' + owner + '/' + repo + '/milestones/create',
                                     json.dumps({"title":title, "description":description, "due_date":date}),
                                     content_type="application/json")

        self.assertTrue(response1.status_code == 201)
        repo = "https://github.com/" + owner + "/" + repo
        project = Project.objects.get(git_repo=repo)
        milestone = Milestone.objects.filter(project=project)
        self.assertTrue(len(milestone) >= 1)
        self.assertTrue(milestone[0].description == description)
        self.assertTrue(milestone[0].due_date == date)
