# Generated by Django 3.2.9 on 2021-11-25 17:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('customer', '0005_menuitem_amount'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='orderitem',
            name='items',
        ),
        migrations.AddField(
            model_name='orderitem',
            name='name',
            field=models.CharField(default='', max_length=100),
        ),
    ]