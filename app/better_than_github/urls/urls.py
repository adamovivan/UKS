from django.conf.urls import url, include
from better_than_github.views import views
from django.urls import path

urlpatterns = [
    url(r'^$', views.home),
    url(r'^home/$', views.home),
    url(r'^users/', include('better_than_github.urls.users_urls')),
    url(r'^repos/', include(('better_than_github.urls.repos_urls', 'repos'), namespace="repos")),
    url(r'^repos/', include(('better_than_github.urls.milestones_urls', 'milestones'), namespace="milestones")),
    url(r'^repos/', include(('better_than_github.urls.issues_urls', 'issues'), namespace="issues")),


    # url(r'^auth-social/$', views.auth_social),
    # url(r'^accounts/profile/$', views.home),
    # url(r'^oauth/', include('social_django.urls', namespace='social')),
]
