from rest_framework import serializers 
from all4cats.models import Price, University, House



class PriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Price
        fields = ('date',
                  'value',
                  'zipcode',
                  'state',
                  'city')


class UniveristySerializer(serializers.ModelSerializer):
    class Meta:
        model = University
        fields = ('university_name',
                  'zipcode',
                  'state',
                  'city')


class HouseSerializer(serializers.ModelSerializer):
    class Meta:
        model = House
        fields = ('house_id',
                  'price',
                  'company',
                  'address',
                  'number_of_rooms',
                  'floor_plan')
