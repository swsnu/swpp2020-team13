from django.conf.urls import include 
from django.urls import path
from explore import views

urlpatterns = [
    path('recommend/', views.recommend, name='recommend'),
    path('search/', views.search, name='search'),
]