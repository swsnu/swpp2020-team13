from django.conf.urls import include 
from django.urls import path

from tasks.views import * # TODO

urlpatterns = [
    path('task/', taskList, name='taskList'),
    path('task/<int:goal_id>', taskDetail, name='taskDetail'),
]

