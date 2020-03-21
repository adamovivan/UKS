from django.test import TestCase
from django.urls import reverse, resolve
from better_than_github.views import milestones_views
from ..models import *


class MilestonesUrlsTest(TestCase):

    def test_milestone_url_for_create(self):
        url = reverse('milestones:create_milestone', args=['test_owner', 'test_repo'])
        self.assertEquals(resolve(url).func, milestones_views.create_milestone)