from better_than_github.views import issues_views
from django.urls import path

urlpatterns = [
    path('<owner>/<repo>/issues/create', issues_views.create_issue),
    path('issues/labels', issues_views.getLabeles),
    path('<owner>/<repo>/issues/<number>/comments', issues_views.get_comments_in_issue),
    path('<owner>/<repo>/issues/<number>/labels', issues_views.get_labels_on_issue),
    path('<owner>/<repo>/issues/<number>', issues_views.get_issue),
    path('all_issues', issues_views.get_issues),
    path('<owner>/<repo>/issues/<number>/comments/<comment_id>', issues_views.get_comment),
    path('<owner>/<repo>/issues/comments', issues_views.get_comments_in_repo)

]
