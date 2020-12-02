from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from all4cats.models import Price, University, House
from all4cats.serializers import PriceSerializer
from all4cats.serializers import UniveristySerializer
from all4cats.serializers import HouseSerializer
from django.db import connection
from django.core import serializers

from rest_framework.decorators import api_view


@api_view(['GET', 'POST', 'DELETE'])
def get_price_all(request):
    if request.method == 'GET':
        price = Price.objects.raw('SELECT * FROM all4cats_price')
        price_serializer = PriceSerializer(price, many=True)
        return JsonResponse(price_serializer.data, safe=False)

    elif request.method == 'POST':
        price_serializer = PriceSerializer(data=request.data)
        if price_serializer.is_valid():
            price_obj = price_serializer.initial_data
            date = price_obj['date']
            value = price_obj['value']
            zipcode = price_obj['zipcode']
            state = price_obj['state']
            city = price_obj['city']
            with connection.cursor() as cursor:
                count = cursor.execute("INSERT INTO all4cats_price(date, value, zipcode, city, state) VALUES(%s,%s,%s,%s,%s)", [
                                       date, value, zipcode, city, state])
            return JsonResponse({'message': 'successfully inserted!'},
                                status=status.HTTP_201_CREATED)
        return JsonResponse(price_serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        with connection.cursor() as cursor:
            count = cursor.execute("DELETE FROM all4cats_price")
        return JsonResponse({'message': '{} deleted!'.format(count)},
                            status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'PUT', 'DELETE'])
def get_price_by_date_zipcode(request, d, z):
    try:
        prices = Price.objects.raw(
            'SELECT * FROM all4cats_price WHERE date = %s AND zipcode = %s', [d, z])

    except Price.DoesNotExist:
        return JsonResponse({'message': 'The prices does not exist'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        prices_serializer = PriceSerializer(prices, many=True)
        return JsonResponse(prices_serializer.data, safe=False)

    elif request.method == 'PUT':
        prices = Price.objects.raw(
            'SELECT * FROM all4cats_price WHERE date = %s AND zipcode = %s', [d, z])[0]

        prices_data = JSONParser().parse(request)
        prices_serializer = PriceSerializer(prices, data=prices_data)

        if prices_serializer.is_valid():
            prices_serializer.save()
            temp_value = prices_data['value']
            with connection.cursor() as cursor:
                cursor.execute("UPDATE all4cats_price SET value = %s WHERE date = %s AND zipcode = %s", [
                               temp_value, d, z])
            return JsonResponse(prices_serializer.data)

        return JsonResponse(prices_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        with connection.cursor() as cursor:
            count = cursor.execute(
                "DELETE FROM all4cats_price WHERE date = %s AND zipcode = %s", [d, z])
        return JsonResponse({'message': 'Prices were deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def get_price_by_date_state_city(request, d, s, c):
    try:
        prices = Price.objects.raw(
            'SELECT * FROM all4cats_price WHERE date = %s AND state = %s AND city = %s', [d, s, c])

    except Price.DoesNotExist:
        return JsonResponse({'message': 'The prices does not exist'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        prices_serializer = PriceSerializer(prices, many=True)
        return JsonResponse(prices_serializer.data, safe=False)


@api_view(['GET'])
def get_state_avg_price(request, s):
    if request.method == 'GET':
        # prices = Price.objects.raw(
        #     'SELECT avg(value) FROM all4cats_price GROUP BY state HAVING state = %s', [s])
        # prices_serializer = serializers.serialize('json', prices)
        # return JsonResponse(prices_serializer, safe=False)
        cursor = connection.cursor()
        cursor.execute(
            'SELECT avg(value) as value FROM all4cats_price GROUP BY state HAVING state = %s', [s])
        avg_price = cursor.fetchone()[0]
        print(avg_price)
        # prices_serializer = PriceSerializer(avg_price)
        return JsonResponse({'value': avg_price}, safe=False)


@api_view(['GET'])
def get_avg_price_by_university(request, d):  # d is university_name
    # try:  # at zipcode level
    # prices = Price.objects.raw(
    #     'SELECT avg(p.value) FROM all4cats_university u JOIN all4cats_price p ON u.zipcode = z.zipcode GROUP BY u.zipcode HAVING u.university_name = %s', [d])
    # print(prices)
    # prices = Price.objects.raw(
    #     'SELECT avg(p.value) FROM all4cats_university u JOIN all4cats_price p ON u.state = p.state GROUP BY u.state HAVING u.university_name = %s', [d])

    cursor = connection.cursor()
    count = cursor.execute(
        'SELECT avg(p.value) FROM all4cats_university u JOIN all4cats_price p ON u.zipcode = p.zipcode WHERE u.university_name = %s GROUP BY u.zipcode', [d])
    if count == 0:
        count = cursor.execute(
            'SELECT avg(p.value) FROM all4cats_university u JOIN all4cats_price p ON u.city = p.city AND u.state = p.state WHERE u.university_name = %s GROUP BY u.city', [d])
    if count == 0:
        count = cursor.execute(
            'SELECT avg(p.value) FROM all4cats_university u JOIN all4cats_price p ON u.state = p.state WHERE u.university_name = %sGROUP BY u.state ', [d])
    prices = cursor.fetchone()

    return JsonResponse({'value': prices}, safe=False)


@api_view(['GET'])
def get_state_avg_price(request, s):
    if request.method == 'GET':
        # prices = Price.objects.raw(
        #     'SELECT avg(value) FROM all4cats_price GROUP BY state HAVING state = %s', [s])
        # prices_serializer = serializers.serialize('json', prices)
        # return JsonResponse(prices_serializer, safe=False)
        cursor = connection.cursor()
        cursor.execute(
            'SELECT avg(value) as value FROM all4cats_price GROUP BY state HAVING state = %s', [s])
        k = cursor.fetchone()
        if (k):
            avg_price = k[0]
        else:
            avg_price = -1

        # prices_serializer = PriceSerializer(avg_price)
        return JsonResponse({'value': avg_price}, safe=False)

@api_view(['GET'])
def get_house_by_price(request, s):
    # if request.method == 'GET':
    #     cursor = connection.cursor()
    #     cursor.execute(
    #         'SELECT address, house_id FROM all4cats_house WHERE price >= %s', [s])
    #     address = cursor.fetchone()
    #     return JsonResponse({'address': address}, safe=False)

    try:
        houses = House.objects.raw(
            'SELECT * FROM all4cats_house WHERE price >= %s', [s])

    except House.DoesNotExist:
        return JsonResponse({'message': 'The house does not exist'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        houses_serializer = HouseSerializer(houses, many=True)
        return JsonResponse(houses_serializer.data, safe=False)

@api_view(['GET'])
def get_house_by_bedrooms(request, s):
    # if request.method == 'GET':
    #     cursor = connection.cursor()
    #     cursor.execute(
    #         'SELECT address FROM all4cats_house WHERE number_of_rooms = %s', [s])
    #     address = cursor.fetchone()
    #     return JsonResponse({'address': address}, safe=False)

    try:
        houses = House.objects.raw(
            'SELECT * FROM all4cats_house WHERE number_of_rooms = %s', [s])

    except House.DoesNotExist:
        return JsonResponse({'message': 'The house does not exist'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        houses_serializer = HouseSerializer(houses, many=True)
        return JsonResponse(houses_serializer.data, safe=False)
