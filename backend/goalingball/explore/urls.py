from django.conf.urls import include 
from django.urls import path
from explore import views

urlpatterns = [
    path('recommend/', views.recommend, name='recommend'),
    path('recommend/<int:goal_id>/', views.recommendDetail, name='recommendDetail'),
    path('recommend/ach/<int:goal_id>/', views.recommendAchList, name='recommendAchList'),
    path('search/', views.search, name='search'),
]