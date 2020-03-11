from better_than_github.views import milestones_views
from django.urls import path

urlpatterns = [
    path('milestones/get/<id>', milestones_views.get_milestone),
    path('milestones/update/<id>', milestones_views.update_milestone),
    path('milestones/close/<id>', milestones_views.close_milestone),
    path('milestones/delete/<id>', milestones_views.delete_milestone),
    path('<owner>/<repo>/milestones/create', milestones_views.create_milestone)
]
