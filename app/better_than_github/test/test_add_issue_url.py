from django.test import TestCase
from django.urls import reverse, resolve
from better_than_github.views import issues_views


class IssueUrlTest(TestCase):

    def test_create_issue_url(self):
        url = reverse('issues:create_issue', args=['test_owner', 'test_repo'])
        self.assertEquals(resolve(url).func, issues_views.create_issue)
