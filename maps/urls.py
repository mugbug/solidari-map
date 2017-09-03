from django.conf.urls import url

from .views import *

urlpatterns = [
    # url(r'^$', MapView.as_view())
    url(r'^$', show_map),
]
