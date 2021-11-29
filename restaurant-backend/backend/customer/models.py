from django.db import models
from django.db.models.fields import AutoField, CharField, TextField

# Create your models here.
class MenuItem(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=7, decimal_places=2, default=0.0)
    category = models.CharField(max_length=100)
    amount = models.IntegerField(default=0)

    def __str__(self):
        return self.name

class Order(models.Model):
    id = models.AutoField(primary_key=True)
    price = models.DecimalField(max_digits=7, decimal_places=2, default=0.0)
    order_items = models.ManyToManyField('OrderItem', related_name='order', blank=True)
    status = models.CharField(max_length=100, default='pending')

    def __str__(self):
        return "Order {} contains items {} and total price is {}".format(self.id, self.order_items, self.price)

    def get_order_items(self):
        return ",".join([str(i) for i in self.order_items.all()])

class OrderItem(models.Model):
    id = models.IntegerField(default=0, primary_key=True)
    name = models.CharField(max_length=100, default='')
    quantity = models.IntegerField(default=0)
    category = models.CharField(max_length=100, default='')

    def get_items(self):
        return (self.name, self.quantity)


class StaffPerson(models.Model):
    id = models.AutoField(primary_key=True)
    role = models.CharField(max_length=100, default='Waiter')
    name = models.CharField(max_length=100, default='')
    notification = models.TextField(default='No new orders')

    