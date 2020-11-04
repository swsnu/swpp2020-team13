from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotAllowed, HttpResponseBadRequest, JsonResponse
from django.contrib.auth.models import User
from django.views.decorators.csrf import ensure_csrf_cookie
import json
from json import JSONDecodeError
from django.contrib.auth import authenticate, login, logout
from .models import Goal, 
from django.core.serializers.json import DjangoJSONEncoder

    # title = models.TextField(max_length=255, blank=False) 
    # goal = models.ForeignKey(
    #     Goal,
    #     on_delete=models.CASCADE,
    #     related_name='tasks'
    # )
    # user = models.ForeignKey(
    #     User,
    #     on_delete=models.CASCADE,
    #     related_name='tasks'
    # )
    # importance = models.FloatField(blank=True)
    # recurrent = models.BooleanField(default=False)
    # day_of_week = MultiSelectField(choices=DAYS_OF_WEEK, default='NONE')

    # created_at = models.DateTimeField(editable=False)
    # updated_at = models.DateTimeField() 

@csrf_exempt
def taskList(request):
    # TODO: how to insert field day_of_week?
