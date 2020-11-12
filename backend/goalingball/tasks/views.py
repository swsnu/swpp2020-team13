from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotAllowed, HttpResponseBadRequest, JsonResponse
from django.contrib.auth.models import User
from django.views.decorators.csrf import ensure_csrf_cookie
import json
from json import JSONDecodeError
from django.contrib.auth import authenticate, login, logout
from .models import Task, Goal
from django.core.serializers.json import DjangoJSONEncoder
from datetime import datetime
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt

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
    # day_of_week = MultiSelectField(choices=DAYS_OF_WEEK, default='NONE')

    # created_at = models.DateTimeField(editable=False)
    # updated_at = models.DateTimeField() 

@csrf_exempt
def taskList(request):
    if request.method == 'GET':
        if request.user.is_authenticated is False:
            return HttpResponse(status=401)
        # else
        task_list = []
        for t in Task.objects.all():
            created_at = t.created_at.strftime('%Y-%m-%d %H:%M:%S')
            updated_at = t.updated_at.strftime('%Y-%m-%d %H:%M:%S')
            deadline = t.deadline.strftime('%Y-%m-%d %H:%M:%S')
            task_list.append({'id': t.id, 'user': t.user.id, 'goal_id': t.goal.id, 
                               'title': t.title, 'created_at': created_at, 'updated_at': updated_at, 
                               'deadline': deadline, 'importance': t.importance, 
                               'day_of_week': t.day_of_week})
        return JsonResponse(task_list, safe=False, status=200)

    elif request.method == 'POST':
        if request.user.is_authenticated is False:
            return HttpResponse(status=401)
        try:
            goal_id = request.POST['goal_id'] # connected to which goal?
            task_title = request.POST['title']
            task_importance = request.POST.getlist('importance')[0] # task importance
            task_day_of_week = request.POST.getlist('day_of_week') # task day_of_week
            
            if (request.POST['deadline']) is "undefined":
                task_deadline = request.POST['deadline']
                task_deadline = timezone.make_aware(datetime.fromtimestamp(int(task_deadline)))
            else:
                task_deadline = timezone.localtime()
        except(KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()

        new_task = Task(title=task_title, user=request.user, goal=Goal.objects.get(id=goal_id), deadline=task_deadline, importance=task_importance, day_of_week=task_day_of_week)
        new_task.save() # goal_created_at and goal_updated_at is made when new goal is saved
        
        response_dict = {'id': new_task.id, 'user': new_task.user.id, 'goal_id': new_task.goal.id,
                        'title': new_task.title, 'importance': new_task.importance, 
                        'day_of_week': new_task.day_of_week,
                        'created_at': (new_task.created_at).strftime('%Y-%m-%d %H:%M:%S'), 
                        'updated_at' : (new_task.updated_at).strftime('%Y-%m-%d %H:%M:%S'), 
                        'deadline': (new_task.deadline).strftime('%Y-%m-%d %H:%M:%S'), 
                        }

        return JsonResponse(response_dict, status=201, safe=False)
    else:
        return HttpResponseNotAllowed(['GET', 'POST'])

@csrf_exempt # TODO: implement PUT
def taskDetail(request, task_id=""):
    if request.method == 'GET':
        if request.user.is_authenticated is False:
            return HttpResponse(status=401)
            # GET goal Detail
        try:
            t = Task.objects.get(id=task_id)
        except Task.DoesNotExist:
            return HttpResponse(status=404)

        response_dict = {'id': t.id, 'user': t.user.id, 'goal_id': t.goal.id, 
                        'title': t.title, 'created_at': created_at, 'updated_at': updated_at, 
                        'deadline': deadline, 'importance': t.importance, 
                        'day_of_week': t.day_of_week}
        return JsonResponse(response_dict, safe=False, status=200)

    elif request.method == 'DELETE':
        if request.user.is_authenticated is False:
            return HttpResponse(status=401)
        task = Task.objects.get(id=task_id)
        if task.user.id is not request.user.id:
            return HttpResponse(status=403)
        task.delete()
        return HttpResponse(status=200)

    else:
        return HttpResponseNotAllowed(['GET', 'PUT', 'PATCH', 'DELETE'])






    
