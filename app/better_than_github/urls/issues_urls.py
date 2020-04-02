from better_than_github.views import issues_views
from better_than_github.views import issue_comment_views
from django.urls import path

urlpatterns = [
    path('issue/project/<id>/milestones', issues_views.get_project_milestones),
    path('issue-assignees/delete', issues_views.delete_assignee),
    path('issue-assignees/add', issues_views.add_assignees),
    path('issue-assignees', issues_views.get_assignees),
    path('issue-labels/delete', issues_views.delete_label),
    path('issue-labels/add', issues_views.add_labels),
    path('issue-labels', issues_views.get_labels),
    path('issue-milestone/delete', issues_views.delete_milestone),
    path('issue-milestone/add', issues_views.add_milestone),
    path('issue-milestone', issues_views.get_milestone),
    path('issue-id/<id>', issues_views.get_issue),
    path('issue-events/<id>', issues_views.get_issue_events),
    path('<owner>/<repo>/issues/create', issues_views.create_issue, name="create_issue"),
    path('issues/labels', issues_views.getLabeles),
    path('<owner>/issues/mycreate', issues_views.get_mycreate_issues),
    path('<owner>/<repo>/issues/<number>/comments', issues_views.get_comments_in_issue),
    path('<owner>/<repo>/issues/<number>/labels', issues_views.get_labels_on_issue),
    path('issue/<id>/comments', issue_comment_views.get_comments),
    path('<owner>/<repo>/issues/<number>/comments/<comment_id>', issues_views.get_comment),
    path('<owner>/<repo>/issues/comments', issues_views.get_comments_in_repo),
    path('comment', issue_comment_views.add_comment),
    path('comment/changes/<id>', issue_comment_views.get_comment_changes),
    path('comment/edit', issue_comment_views.edit_comment),
    path('issue/change/state/<id>/<user_alias>', issues_views.change_state),
    path('issue/state/changes/<id>', issues_views.get_state_changes),
]
