from django.conf.urls import include 
from django.urls import path

from goals.views import * # TODO


urlpatterns = [
    path('', goalList, name='goalList'),
    path('<int:goal_id>', goalDetail, name='goalDetail'),
]

# TODO : implement goal-detail-slug urlpattern and views