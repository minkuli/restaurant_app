import json
from json.decoder import JSONDecodeError
from django.shortcuts import render
from django.views import View
from rest_framework import serializers
from rest_framework.fields import JSONField
from .models import MenuItem, Order, OrderItem, StaffPerson
from .serializers import MenuItemSerializer, OrderSerializer, StaffPersonSerializer
from django.http import JsonResponse, HttpResponse
from django.forms.models import model_to_dict
from rest_framework.decorators import api_view

# Create your views here.
class MenuItemView(View):
    def get(self, request, *args, **kwargs):
        qs = MenuItem.objects.all()

        serializer = MenuItemSerializer(qs, many=True)
        return JsonResponse(serializer.data, safe=False)

class OrderView(View):
    """ def get(self, request, *args, **kwargs):
        food = MenuItem.objects.filter(category__name__contains='Food')
        drink = MenuItem.objects.filter(category__name__contains='Drink')
    """
    def get(self, request, *args, **kwargs):
        qs = Order.objects.all()
        serializer = OrderSerializer(qs, many=True)
        return JsonResponse(serializer.data, safe=False)


    def post(self, request, *args, **kwargs):
        item_ids = []
        price = 0

        post_data = json.loads(request.body.decode())   
        items = post_data['orderedItems']

        for item in items:
            menu_item = MenuItem.objects.get(id__contains=item['id'])
            
            item_data = OrderItem(id= menu_item.id, name = menu_item.name,
                quantity = item['amount'], category=menu_item.category)
            item_data.save()
            order_items = OrderItem.objects.all()
  
            price += item['totalAmount']
            item_ids.append(item['id'])

        order = Order.objects.create(price=price)
        order.save()
        order.order_items.add(*item_ids)
        order_serializer = OrderSerializer(order, many=True)
        return HttpResponse("ok")

class OrderDetailView(View):

    def get(self, request, pk):
        order = Order.objects.get(id=pk)
        serializer = OrderSerializer(order)
        return JsonResponse(serializer.data)

    def put(self,request,pk):
        order = Order.objects.get(id=pk)
        status = json.loads(request.body.decode())
        order.status = status
        order.save()
        order_serializer = OrderSerializer(order)
        return JsonResponse(order_serializer.data, safe=False)



class StaffView(View):
    def get(self, request, *args, **kwargs):
        sp = StaffPerson.objects.all()
        serializer = StaffPersonSerializer(sp, many=True)
        return JsonResponse(serializer.data, safe=False)

    def post(self, request, *args, **kwargs):
        person_data = json.loads(request.body.decode())
        print(person_data)

        name = person_data['name']
        role = person_data['role']
        

        staff_person = StaffPerson.objects.get_or_create(name=name, role= role)
        serializer = StaffPersonSerializer(staff_person, many=True)
        return JsonResponse(serializer.data, safe=False)

class StaffDetailView(View):
    def get(self, request, pk):
        person = StaffPerson.objects.get(id=pk)
        serializer = StaffPersonSerializer(person)
        return JsonResponse(serializer.data)

    def put(self,request,pk):
        person = StaffPerson.objects.get(id=pk)
        received = json.loads(request.body.decode())
        person.notification = received['notification']
        person.save()
        serializer = StaffPersonSerializer(person)
        return JsonResponse(serializer.data, safe=False)


    

