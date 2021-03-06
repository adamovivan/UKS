from django.db import models
from django.utils.timezone import now
import json
import datetime

STATES = (
    ('OPEN', 'Open'),
    ('CLOSED', 'Closed')
)

class User(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField(max_length=254)

    def natural_key(self):
        return self.email, self.name

class Label(models.Model):
    name = models.CharField(max_length=200)
    color = models.CharField(max_length=200)

class Project(models.Model):
    title = models.CharField(max_length=200)
    git_repo = models.CharField(max_length=200)
    users = models.ManyToManyField(User)

    def natural_key(self):
        return self.title, self.git_repo

class Milestone(models.Model):
    title = models.CharField(max_length=200)
    description = models.CharField(max_length=500)
    due_date = models.DateField()
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    state = models.CharField(choices=STATES, max_length=200)
    open_issues = models.IntegerField()
    closed_issues = models.IntegerField()

class Issue(models.Model):
    title = models.CharField(max_length=200)
    labels = models.ManyToManyField(Label)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    milestone = models.ForeignKey(Milestone, on_delete=models.SET_NULL, null=True)
    assignees = models.ManyToManyField(User)
    state = models.CharField(choices=STATES, max_length=200)
    creator = models.CharField(max_length=200)
    open_date_time = models.DateTimeField(auto_now_add=True, blank=True)

class Event(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
    issue = models.ForeignKey(Issue, on_delete=models.SET_NULL, null=True)

    class Meta:
        abstract = True

class Comment(Event):
    description = models.CharField(max_length=200)

class StateChange(Event):
    new_state = models.CharField(choices=STATES, max_length=200)

class ResponsibilityChange(Event):
    responsible_user = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        related_name='responsible_user')
    description = models.CharField(max_length=50, default='')

class LabelChange(Event):
    label = models.ForeignKey(
        Label,
        on_delete=models.SET_NULL,
        null=True,
        related_name='label')
    description = models.CharField(max_length=50, default='')
    label_name = models.CharField(max_length=50, default='')

class MilestoneChange(Event):
    milestone = models.ForeignKey(Milestone, on_delete=models.CASCADE)
    description = models.CharField(max_length=50, default='')
    milestone_title = models.CharField(max_length=50, default='')

class CodeChange(Event):
    url = models.URLField(max_length=200)

class CommentChange(Event):
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE)
    description = models.CharField(max_length=200, default="")
