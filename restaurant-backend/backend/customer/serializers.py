from django.db.models import fields
from rest_framework import serializers
from .models import Order, MenuItem, OrderItem, StaffPerson

class MenuItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItem
        fields = ('id', 'name', 'price', 'description', 'category','amount')

class OrderedMenuItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItem
        fields = ('id', 'name','amount')
        
class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ('id','name','quantity','category')

class OrderSerializer(serializers.ModelSerializer):
    order_items = OrderItemSerializer(many=True)
    class Meta:
        model = Order
        fields = ('id','price','order_items', 'status')

class StaffPersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = StaffPerson
        fields= ('id','name', 'role', 'notification')