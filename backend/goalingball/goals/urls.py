from django.conf.urls import include 
from django.urls import path
from goals import views


urlpatterns = [
    path('goal/', views.goalList, name='goalList'),
    path('goal/<int:goal_id>/', views.goalDetail, name='goalDetail'),
]

# TODO : implement goal-detail-slug urlpattern and views