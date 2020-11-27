from django.conf.urls import include 
from django.urls import path
from achievements.views import *


urlpatterns = [
    path('', achievementList, name='achievementList'),
    path('goal/<int:goal_id>/', achievementListOfGoal, name='achievementListOfGoal'),
    path('task/<int:task_id>/', achievementListOfTask, name='achievementListOfTask'),
    path('<int:achievement_id>/', achievementDetail, name='achievementDetail'),
]