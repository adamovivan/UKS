from better_than_github.views import repos_views
from django.urls import path
from django.conf.urls import url, include

urlpatterns = [
    path('repos/<owner>/<repo>', repos_views.get_repo),
    path('repos/<owner>/<repo>/contributors', repos_views.get_contributors),
    path('repos/<owner>/<repo>/milestones', repos_views.get_milestones),
    path('repos/<owner>/<repo>/commits', repos_views.get_all_commits),
#    path('repos/<owner>/<repo>/commits/<branch>', repos_views.get_all_commits),
    path('repos/<owner>/<repo>/issues', repos_views.get_issues),
    path('repos/<owner>/<repo>/readme', repos_views.get_readme),
    path('repos/<owner>/<repo>/contents', repos_views.get_contents),
    path('repos/<owner>/<repo>/branches', repos_views.get_branch),
    path('repos/<owner>/<repo>/content', repos_views.get_content),
    path('repos/<owner>/<repo>/assignees', repos_views.get_assignees),
    path('repos/<owner>/<repo>/labels/<name>', repos_views.get_label),
    path('repos/<owner>/<repo>/labels', repos_views.get_labels),
    path('repos/<owner>/ISPRAVITI', repos_views.get_all_repo)
]