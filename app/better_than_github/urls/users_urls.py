from better_than_github.views import users_views
from django.urls import path

urlpatterns = [
    path('', users_views.get_all_users),
    path('addUser', users_views.register),
    path('login', users_views.login),
    path('<username>', users_views.get_user),
    path('<username>/repos', users_views.get_repositories),

]
