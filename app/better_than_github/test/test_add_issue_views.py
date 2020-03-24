from django.test import TestCase, Client
from django.urls import reverse, resolve
from ..models import Project, Issue, User, Label
import json
class AddIssueTest(TestCase):
    def setUp(self):
        self.client = Client()

        owner = "test_owner"
        repo = "test_repo"

        self.issue_create_url = reverse('issues:create_issue', args=[owner, repo])

        create_repo = "https://github.com/" + owner +"/"+ repo
        project = Project.objects.create(title="test_title", git_repo = create_repo)
        project.save()

        creator = User()
        creator.name = "test_user"
        creator.email = "test_email"
        creator.save()

        label = Label()
        label.name = "bug"
        label.save()

    def test_add_issue(self):
        title = "issue test"
        creator = "test_user"
        label = ["bug"]
        milestone = ''

        issue = {'title': title, 'labels': label, 'creator' : creator, 'assignees': ['test_user'], 'milestone': milestone}
        data= json.dumps(issue)

        response = self.client.post(self.issue_create_url,data, content_type="application/json")
        print(response.status_code)
        self.assertTrue(response.status_code == 201)
        project = Project.objects.get(title="test_title")
        issue = Issue.objects.get(project=project)

        self.assertTrue(issue.creator==creator)
        self.assertTrue(issue.title==title)
