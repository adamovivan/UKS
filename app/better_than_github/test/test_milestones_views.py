from django.test import TestCase, Client
from ..models import *
from django.urls import reverse, resolve
from django.utils import timezone
import json

class MilestonesViewsTest(TestCase):

    def setUp(self):
        self.client = Client()

        owner = "test_owner"
        repo1 = "test_repo"

        self.milestone_create_url = reverse('milestones:create_milestone', args=[owner, repo1])

        repo = "https://github.com/" + owner + "/" + repo1
        project = Project.objects.create(title="test_title", git_repo=repo)
        project.save()



    def test_add_milestone(self):

        title = "test"
        description = "description test"
        date = "2020-04-20"

        response1 = self.client.post(self.milestone_create_url,
                                     json.dumps({"title": title, "description": description, "dueData": date}),
                                     content_type="application/json")

        self.assertTrue(response1.status_code == 200)
        project = Project.objects.get(title="test_title")
        milestone = Milestone.objects.get(project=project)
        self.assertTrue(milestone.title == title)
        self.assertTrue(milestone.description == description)
        self.assertEquals(milestone.due_date, datetime.date(2020, 4, 20))