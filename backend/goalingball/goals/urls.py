from django.conf.urls import include 
from django.urls import path

from goals.views import * # TODO


urlpatterns = [
    path('goal/', goalList, name='goalList'),
    path('goal/<int:goal_id>', goalDetail, name='goalDetail'),
]

# TODO : implement goal-detail-slug urlpattern and views