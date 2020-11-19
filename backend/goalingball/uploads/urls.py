from django.conf.urls import include 
from django.urls import path

from uploads.views import get_s3_url

# /api/v1/uploads/
urlpatterns = [
    path('', get_s3_url, name='get_s3_url'),
]