# Generated by Django 3.1.2 on 2020-11-05 12:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('goals', '0004_auto_20201105_1641'),
    ]

    operations = [
        migrations.AlterField(
            model_name='goal',
            name='photo',
            field=models.URLField(default='', max_length=2047),
            preserve_default=False,
        ),
    ]
