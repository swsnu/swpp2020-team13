from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotAllowed, HttpResponseBadRequest, JsonResponse
from django.contrib.auth.models import User
from django.views.decorators.csrf import ensure_csrf_cookie
import json
from json import JSONDecodeError
from django.contrib.auth import authenticate, login, logout
from .models import Goal, 
from django.core.serializers.json import DjangoJSONEncoder

# Create your views here.

@csrf_exempt
def goalList(request):
    if request.method == 'GET':
        if request.user.is_authenticated is False:
            return HttpResponse(status=401)
        else:
            goal_list = []
            for g in Goal.objects.all():
                goal_list.append()
    else if request.method == 'POST':
        if request.user.is_authenticated is False:
            return HttpResponse(status=401)
        try:
            body = request.body.decode()
            goal_title = json.loads(body)['title']
            # goal_created_at and goal_updated_at is made when new goal is saved
            goal_photo = json.loads(body)['photo']
        except(KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()
        # how to sample datatimefield from json format? - for implementing deadlines
        new_goal = Goal(title=goal_title, user=request.user, photo=goal_photo)
        new_goal.save()
        # Json Response
        response_dict = {'title': new_goal.title, 'photo': new_goal.photo, 'user': new_goal.user.id}
        return JsonResponse(response_dict, status=201, safe=False)

    else:
        return HttpResponseNotAllowed['GET', 'POST']