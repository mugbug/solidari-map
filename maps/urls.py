from django.conf.urls import url

from .views import *

urlpatterns = [
    # url(r'^$', MapView.as_view())
    # url(r'^map$', show_map),
    url(r'data$', data),
    url(r'^$', index),
]
