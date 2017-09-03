from django.db import models

# Google Maps API key: AIzaSyAokIWXfyu8eTgvJTEtrS_5e32FiMznq2s
# Create your models here.
class ONG(models.Model):

    name = models.CharField(max_length=128)
    # useful: https://stackoverflow.com/questions/27081815/what-is-the-best-way-to-write-a-combo-box-in-django

    # dummy data
    # import from http://www.ongsbrasil.com.br/
    CITY_OPTIONS = (
        ('B', 'Baependi'),
        ('S', 'Santa Rita do Sapucai'),
    )
    SORT_OPTIONS = (
        ('MA', 'do Meio Ambiente'),
        ('A', 'dos Animais'),
    )
    city = models.CharField(max_length=2, choices=CITY_OPTIONS, default="B")
    sort = models.CharField(max_length=2, choices=SORT_OPTIONS, default="B")
    lat = models.FloatField(verbose_name = 'Latitude', max_length=3)
    lng = models.FloatField(verbose_name = 'Longitude', max_length=3)
    location = [lat, lng]
