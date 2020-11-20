from django.conf.urls import include 
from django.urls import path
from achievements.views import *


urlpatterns = [
    path('', achievementList, name='achievementList'),
    path('<int:achievement_id>/', achievementDetail, name='achievementDetail'),
]