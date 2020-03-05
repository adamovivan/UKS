from better_than_github.views import milestones_views
from django.urls import path

urlpatterns = [
    path('<owner>/<repo>/milestones/<number>/labels', milestones_views.get_labels_in_milestone),
    path('<owner>/<repo>/milestones/<number>', milestones_views.get_milestone)
]
