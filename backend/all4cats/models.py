from django.db import models

# Create your models here.


class Price(models.Model):
    class Meta:
        unique_together = (('zipcode', 'date'),)
    
    zipcode = models.CharField(
        max_length=60,
        blank=False,
        default='')
    date = models.CharField(
        max_length=200,
        blank=False,
        default='')
    value = models.FloatField(default=0.0)

    state = models.CharField(max_length=200, 
        blank=False, 
        default='')
    city = models.CharField(max_length=200, 
        blank=False, 
        default='')


class University(models.Model):
    university_name = models.CharField(
        max_length=200,
        blank=False,
        default='',
        primary_key=True)
    zipcode = models.CharField(
        max_length=60,
        blank=False,
        default='')
    state = models.CharField(max_length=100, 
        blank=False, 
        default='')
    city = models.CharField(max_length=100, 
        blank=False, 
        default='')


class House(models.Model):
    house_id = models.CharField(
        max_length=200,
        blank=False,
        default='',
        primary_key=True)
    price = models.FloatField(default=0.0)
    company = models.CharField(max_length=200, blank=False, default='')
    address = models.CharField(max_length=200, blank=False, default='')
    number_of_rooms = models.IntegerField(default=0)
    floor_plan = models.CharField(max_length=200, blank=False, default='')
