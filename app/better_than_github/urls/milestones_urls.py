from better_than_github.views import milestones_views
from django.urls import path

urlpatterns = [
    path('<owner>/<repo>/milestones/create', milestones_views.create_milestone),
    path('<owner>/<repo>/milestones/<number>', milestones_views.get_milestone),
    path('<owner>/<repo>/milestones/<number>/labels', milestones_views.get_labels_in_milestone),
    path('<owner>/<repo>/milestones/<number>/update', milestones_views.update_milestone),
    path('<owner>/<repo>/milestones/<number>/delete', milestones_views.delete_milestone)
]
