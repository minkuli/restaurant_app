# Generated by Django 3.2.9 on 2021-11-28 13:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('customer', '0010_auto_20211127_0926'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='status',
            field=models.JSONField(blank=True, null=True),
        ),
    ]
