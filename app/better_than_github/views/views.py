# -*- coding: utf-8 -*-
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
import requests

API = 'https://api.github.com/'

@login_required
def home(request):
    return render(request, 'home.html')

def auth_social(request):
    return render(request, 'login.html')


