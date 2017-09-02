from django.shortcuts import render
from django.views.generic.base import TemplateView, RedirectView
from django.views.generic.edit import CreateView
from django.shortcuts import get_object_or_404
from django.core.urlresolvers import reverse_lazy

from maps.models import ONG

# Create your views here.

# def show_map(request):
#     return render(request, 'map.html')

class MapCreate(CreateView):
    model = ONG
    template_name = 'map.html'
    # fields define que atributos serão mostrados na pagina
    fields = ['name', 'cities', 'spec']
