import requests
import json
import os

from django.shortcuts import render
from django.views.generic.base import TemplateView, RedirectView
from django.views.generic.edit import CreateView
from django.shortcuts import get_object_or_404
from django.http import JsonResponse, HttpResponse
# from django.core.urlresolvers import reverse_lazy

from maps.models import ONG

# Create your views here.

def index(request):
    return render(request, 'main-page-dev.html')