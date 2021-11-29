from django.contrib import admin
from .models import MenuItem,Order, StaffPerson

class MenuItemAdmin(admin.ModelAdmin):
    list_display = ('id','name', 'description', 'price', 'category')

class OrderAdmin(admin.ModelAdmin):
    list_display = ('id','price', 'get_order_items')

class StaffAdmin(admin.ModelAdmin):
    list_display = ('id','name','role','notification')

admin.site.register(MenuItem, MenuItemAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(StaffPerson, StaffAdmin)
