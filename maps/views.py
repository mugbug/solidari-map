from django.shortcuts import render
from django.views.generic.base import TemplateView, RedirectView
from django.views.generic.edit import CreateView
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
# from django.core.urlresolvers import reverse_lazy

from maps.models import ONG

# Create your views here.

def show_map(request):

    locations = [
        {'lat': -22.2526, 'lng': -45.7042},
        {'lat': -21.4123, 'lng': -44.4412},
        {'lat': -22.0000, 'lng': -44.5000},
    ]
    return render(request, 'map.html', {'locations': locations})

# class MapView(CreateView):
#     model = ONG
    # template_name = 'map.html'
    # fields define que atributos serão mostrados na pagina
    # fields = ['name', 'city', 'sort', 'lat', 'lng']
