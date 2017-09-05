import requests

from django.shortcuts import render
from django.views.generic.base import TemplateView, RedirectView
from django.views.generic.edit import CreateView
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
# from django.core.urlresolvers import reverse_lazy

from maps.models import ONG

# Create your views here.

def index(request):

    # should get data from web and create url
    # dummy data
    api_url = 'https://maps.googleapis.com/maps/api/geocode/json?'
    parameters = 'address=Av+Marechal+Castelo+Branco+400,+Santa+Filomena,+Pouso+Alegre,+MG&'
    api_key = 'key=AIzaSyAokIWXfyu8eTgvJTEtrS_5e32FiMznq2s'
    url = api_url + parameters + api_key

    r = requests.get(url)
    jdata = r.json()
    lat = float(jdata['results'][0]['geometry']['location']['lat'])
    lng = float(jdata['results'][0]['geometry']['location']['lng'])
    # import ipdb; ipdb.set_trace()
    locations = [
        {'lat': lat, 'lng': lng},
    ]
    return render(request, 'main-page-dev.html', {'locations': locations})
