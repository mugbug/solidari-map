from django.conf.urls import url

from .views import *

urlpatterns = [
    url(r'^$', MapCreate.as_view(), name="map_create")
]
