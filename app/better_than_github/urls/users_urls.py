from better_than_github.views import users_views
from django.urls import path

urlpatterns = [
    path('', users_views.get_all_users),
    path('<username>/repos', users_views.get_repositories),
    path('<username>', users_views.get_user),
    path('addUser', users_views.register)
]
