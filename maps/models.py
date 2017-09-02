from django.db import models

# Google Maps API key: AIzaSyAokIWXfyu8eTgvJTEtrS_5e32FiMznq2s
# Create your models here.
class ONG(models.Model):

    name = models.CharField(max_length=128)
    # useful: https://stackoverflow.com/questions/27081815/what-is-the-best-way-to-write-a-combo-box-in-django

    # dummy data
    # import from http://www.ongsbrasil.com.br/
    OPTIONS = (
        ('B', 'Baependi'),
        ('S', 'Santa Rita do Sapucai'),
    )
    cities = models.CharField(max_length=2, choices=OPTIONS, default="B")
    spec = models.CharField(max_length=2, choices=OPTIONS, default="B")
    # longitude = forms.CharField(max_length=128)
    # latitude = forms.CharField(max_length=128)
