# Generated by Django 3.1.2 on 2020-11-30 14:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('goals', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='goal',
            name='vector',
            field=models.BinaryField(blank=True, null=True),
        ),
    ]