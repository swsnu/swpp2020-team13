from django.conf.urls import include 
from django.urls import path
from goals import views


urlpatterns = [
    path('', views.goalList, name='goalList'),
    path('<int:goal_id>/', views.goalDetail, name='goalDetail'),
]

# TODO : implement goal-detail-slug urlpattern and views