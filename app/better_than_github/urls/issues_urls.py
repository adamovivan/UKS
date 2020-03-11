from better_than_github.views import issues_views
from better_than_github.views import issue_comment_views
from django.urls import path

urlpatterns = [
    path('<owner>/<repo>/issues/create', issues_views.create_issue),
    path('issues/labels', issues_views.getLabeles),
    path('<owner>/issues/mycreate', issues_views.get_mycreate_issues),
    path('<owner>/<repo>/issues/<number>/comments', issues_views.get_comments_in_issue),
    path('<owner>/<repo>/issues/<number>/labels', issues_views.get_labels_on_issue),
    path('issue/<id>/comments', issue_comment_views.get_comments),
    path('issue/<id>', issues_views.get_issue),
    path('<owner>/<repo>/issues/<number>/comments/<comment_id>', issues_views.get_comment),
    path('<owner>/<repo>/issues/comments', issues_views.get_comments_in_repo),
    path('comment', issue_comment_views.add_comment)
]
