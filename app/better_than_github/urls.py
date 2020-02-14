from django.conf.urls import url
from better_than_github import views

urlpatterns = [
    url(r'^$', views.home_view),
    url(r'^about/$', views.about),
]