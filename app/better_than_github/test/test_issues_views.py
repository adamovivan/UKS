# from unittest import TestCase
from django.test import TestCase, Client
from ..models import *
from datetime import datetime
import json


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
        issue.open_date_time = datetime.now()

        issue.save()

        assignee1 = User()
        assignee1.name = "assignee1"
        assignee1.email = "assignee1_email"
        assignee1.save()

        assignee2 = User()
        assignee2.name = "assignee2"
        assignee2.email = "assignee2_email"
        assignee2.save()

        label1 = Label()
        label1.name = "wontfix"
        label1.color = "purple"
        label1.save()

        label2 = Label()
        label2.name = "feature"
        label2.color = "blue"
        label2.save()

        milestone = Milestone()
        milestone.title = "test milestone"
        milestone.state = "OPEN"
        milestone.description = "desc milestone test"
        milestone.due_date = "2020-04-20"
        milestone.project = project
        milestone.open_issues = 0
        milestone.closed_issues = 0
        milestone.save()
        

    def test_add_comment(self):
        issue_id = "2"
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

    def test_add_assignees(self):
        issue_id = "2"
        assignees = ["assignee1", "assignee2"]
        user = "test_user"

        response = self.client.post('/repos/issue-assignees/add',
                                     json.dumps({"issueId": issue_id, "assignees": assignees, "user": user}),
                                     content_type="application/json")

        self.assertTrue(response.status_code == 200)

        responsibility_changes = ResponsibilityChange.objects.filter(issue=issue_id)
        self.assertTrue(len(responsibility_changes) == 2)

        self.assertTrue(responsibility_changes[0].responsible_user.name == "assignee1")
        self.assertTrue(responsibility_changes[0].description == "added")
        self.assertTrue(responsibility_changes[1].responsible_user.name == "assignee2")
        self.assertTrue(responsibility_changes[1].description == "added")

    def test_delete_assignee(self):
        issue_id = "2"
        assignee_name = "assignee1"
        user = "test_user"

        response = self.client.delete('/repos/issue-assignees/delete',
                                     json.dumps({"issueId": issue_id, "assignee": assignee_name, "user": user}),
                                     content_type="application/json")

        self.assertTrue(response.status_code == 200)

        responsibility_changes = ResponsibilityChange.objects.filter(issue=issue_id)
        self.assertTrue(len(responsibility_changes) == 1)

        self.assertTrue(responsibility_changes[0].responsible_user.name == "assignee1")
        self.assertTrue(responsibility_changes[0].description == "removed")

    def test_add_labels(self):
        issue_id = "2"
        labels = ["wontfix", "feature"]
        user = "test_user"

        response = self.client.post('/repos/issue-labels/add',
                                     json.dumps({"issueId": issue_id, "labels": labels, "user": user}),
                                     content_type="application/json")

        self.assertTrue(response.status_code == 200)

        label_changes = LabelChange.objects.filter(issue=issue_id)
        self.assertTrue(len(label_changes) == 2)

        self.assertTrue(label_changes[0].label_name == "wontfix")
        self.assertTrue(label_changes[0].description == "added")
        self.assertTrue(label_changes[1].label_name == "feature")
        self.assertTrue(label_changes[1].description == "added")

    def test_delete_label(self):
        issue_id = "2"
        label_name = "feature"
        user = "test_user"

        response = self.client.delete('/repos/issue-labels/delete',
                                     json.dumps({"issueId": issue_id, "label": label_name, "user": user}),
                                     content_type="application/json")

        self.assertTrue(response.status_code == 200)

        label_changes = LabelChange.objects.filter(issue=issue_id)
        self.assertTrue(len(label_changes) == 1)

        self.assertTrue(label_changes[0].label_name == "feature")
        self.assertTrue(label_changes[0].description == "removed")

    def test_add_milestone(self):
        issue_id = "2"
        milestone_title = "test milestone"
        user = "test_user"

        response = self.client.post('/repos/issue-milestone/add',
                                     json.dumps({"issueId": issue_id, "milestone": milestone_title, "user": user}),
                                     content_type="application/json")

        self.assertTrue(response.status_code == 200)

        milestone_change = MilestoneChange.objects.filter(issue=issue_id)
        self.assertTrue(len(milestone_change) == 1)

        self.assertTrue(milestone_change[0].milestone_title == "test milestone")
        self.assertTrue(milestone_change[0].description == "added")

    def test_delete_milestone(self):
        issue_id = "2"
        milestone_title = "test milestone"
        user = "test_user"

        response = self.client.delete('/repos/issue-milestone/delete',
                                     json.dumps({"issueId": issue_id, "milestone": milestone_title, "user": user}),
                                     content_type="application/json")

        self.assertTrue(response.status_code == 200)

        milestone_change = MilestoneChange.objects.filter(issue=issue_id)
        self.assertTrue(len(milestone_change) == 1)

        self.assertTrue(milestone_change[0].milestone_title == "test milestone")
        self.assertTrue(milestone_change[0].description == "removed")
