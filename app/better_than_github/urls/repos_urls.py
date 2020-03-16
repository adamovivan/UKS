from better_than_github.views import repos_views
from django.urls import path
from django.conf.urls import url, include

urlpatterns = [
    path('<owner>/<repo>/contributors', repos_views.get_contributors),
    path('<owner>/<repo>/milestones', repos_views.get_milestones),
    path('<owner>/<repo>/issues', repos_views.get_issues),
    path('<owner>/<repo>/assignees', repos_views.get_assignees),
    path('<owner>/<repo>/labels/<name>', repos_views.get_label),
    path('<owner>/<repo>/labels', repos_views.get_labels),
    path('<owner>/ISPRAVITI', repos_views.get_all_repo)
]