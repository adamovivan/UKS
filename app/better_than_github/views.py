# -*- coding: utf-8 -*-
from django.http import HttpResponse

def home_view(request):
    return HttpResponse("Test view")

def about(request):
    return HttpResponse("about page")
