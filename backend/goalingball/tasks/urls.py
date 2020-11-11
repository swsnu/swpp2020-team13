from django.conf.urls import include 
from django.urls import path

from tasks.views import * # TODO

urlpatterns = [
    path('', taskList, name='taskList'),
    # path('<int:task_id>', taskDetail, name='taskDetail'),
]

