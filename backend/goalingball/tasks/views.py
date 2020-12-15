from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotAllowed, HttpResponseBadRequest, JsonResponse
# from django.contrib.auth.models import User
from users.models import User  
import json
from json import JSONDecodeError
from django.contrib.auth import authenticate, login, logout
from .models import Task, Goal
from django.core.serializers.json import DjangoJSONEncoder
from datetime import datetime
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from django.forms.models import model_to_dict

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


def taskList(request):
    if request.method == 'GET':
        if request.user.is_authenticated is False:
            return HttpResponse(status=401)
        # else
        task_list = []
        for t in Task.objects.all().values():
            created_at = int(t["created_at"].timestamp()) 
            updated_at = int(t["updated_at"].timestamp())
            deadline = t["deadline"]
            if deadline is not None:
                deadline = int(deadline.timestamp())
            start_at = t["start_at"]
            if start_at is not None:
                start_at = int(start_at.timestamp())

            task_list.append({
                'id': t["id"], 
                'user': t["user_id"], 
                'goal': t["goal_id"], 
                'title': t["title"], 
                'created_at': created_at, 
                'updated_at': updated_at, 
                'start_at':start_at, 
                'deadline': deadline, 
                'importance': t["importance"], 
                'day_of_week': t["day_of_week"]
            })
        return JsonResponse(task_list, safe=False, status=200)

    elif request.method == 'POST':
        if request.user.is_authenticated is False:
            return HttpResponse(status=401)
        # try:
        goal_id = request.POST['goal_id'] # connected to which goal?
        goal = Goal.objects.get(id=goal_id)
        task_title = request.POST['title']
        task_importance = request.POST.get('importance', 3) # task importance
        task_day_of_week = request.POST.getlist('day_of_week') # task day_of_week
        task_start_at = request.POST.get('start_at', None)
        task_deadline = request.POST.get('deadline', None)
        # NOTE: when frontend sends empty deadline, it is read as ''. So this is first changed to None for the backend to recognize.
        # -> Do not include 'deadline' field if you want to make it None
        if task_deadline is not None:
            task_deadline = timezone.make_aware(datetime.fromtimestamp(int(task_deadline)))
        if task_start_at is not None:
            task_start_at = timezone.make_aware(datetime.fromtimestamp(int(task_start_at)))

        # except(KeyError, JSONDecodeError) as e:
        #     # print("task POST keyerror e: ", e)
        #     return HttpResponseBadRequest()

        new_task = Task(title=task_title, user=request.user, goal=goal, start_at=task_start_at, deadline=task_deadline, importance=task_importance, day_of_week=task_day_of_week)
        new_task.save() # goal_created_at and goal_updated_at is made when new goal is saved
        new_task_deadline = new_task.deadline

        new_task_deadline = new_task.deadline
        if new_task_deadline is not None:
            new_task_deadline = int(new_task_deadline.timestamp())
        
        new_task_start_at = new_task.start_at
        if new_task_start_at is not None:
            new_task_start_at = int(new_task_start_at.timestamp())
        
        response_dict = {
            'id': new_task.id, 
            'user': new_task.user_id, 
            'goal': new_task.goal_id,
            'title': new_task.title, 
            'importance': int(new_task.importance), 
            'day_of_week': new_task.day_of_week,
            'created_at': int(new_task.created_at.timestamp()),
            'updated_at' : int(new_task.updated_at.timestamp()),
            'start_at': new_task_start_at,
            'deadline': new_task_deadline 
        }
        # print(response_dict)

        return JsonResponse(response_dict, status=201, safe=False)
    else:
        return HttpResponseNotAllowed(['GET', 'POST'])

# TODO: implement PUT
def taskDetail(request, task_id=""):
    if request.method == 'GET':
        if request.user.is_authenticated is False:
            return HttpResponse(status=401)
            # GET goal Detail
        try:
            t = Task.objects.select_related('user').select_related('goal').get(id=task_id)
        except Task.DoesNotExist:
            return HttpResponse(status=404)

        start_at = t.start_at
        if start_at is not None:
            start_at = int(start_at.timestamp())
        deadline = t.deadline
        if deadline is not None:
            deadline = int(deadline.timestamp())
        

        response_dict = {
            'id': t.id, 
            'user': t.user_id, 
            'goal': t.goal_id, 
            'title': t.title, 
            'importance': t.importance, 
            'day_of_week': t.day_of_week,
            'created_at': t.created_at, 
            'updated_at': t.updated_at, 
            'start_at': start_at, 
            'deadline': deadline, 
        }
        return JsonResponse(response_dict, safe=False, status=200)

    elif request.method == 'PUT':
        if request.user.is_authenticated is False:
            return HttpResponse(status=401)
        try:
            task = Task.objects.select_related('user').select_related('goal').get(id=task_id)
        except Task.DoesNotExist:
            return HttpResponse(status=404)

        if task.user.id is not request.user.id:
            return HttpResponse(status=403)
        
        req_data = json.loads(request.body.decode())
        # title, importance, day_of_week, start_at, deadline are guaranteed to be included in req_data

        # print("edit task: ", task)
        # print("edit task req_data: ", req_data)
        task.title = req_data.get('title')
        task.importance = req_data.get('importance')
        task.day_of_week = req_data.get('day_of_week')
        task.start_at = timezone.make_aware(datetime.fromtimestamp(req_data.get('start_at')))
        task.deadline = timezone.make_aware(datetime.fromtimestamp(req_data.get('deadline')))
        task.save()

        serialized_task = model_to_dict(task)
        # print("serialized_task: ", serialized_task)

        data = {
            'id': task.id,
            'user': task.user_id,
            'goal': task.goal_id,
            'title': task.title,
            'importance': task.importance,
            'day_of_week': task.day_of_week,
            'start_at': int(task.start_at.timestamp()),
            'deadline': int(task.deadline.timestamp()),
            'created_at': int(task.created_at.timestamp()), 
            'updated_at': int(task.updated_at.timestamp())
        }
        return JsonResponse(data)
        # return HttpResponse(status=200)

    elif request.method == 'DELETE':
        if request.user.is_authenticated is False:
            return HttpResponse(status=401)
        try:
            task = Task.objects.select_related('user').get(id=task_id)
        except Task.DoesNotExist:
            return HttpResponse(status=404)

        if task.user.id is not request.user.id:
            return HttpResponse(status=403)
        task.delete()
        return HttpResponse(status=200)

    else:
        return HttpResponseNotAllowed(['GET', 'PUT', 'PATCH', 'DELETE'])






    
