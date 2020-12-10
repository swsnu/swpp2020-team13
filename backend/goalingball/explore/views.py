from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotAllowed, HttpResponseBadRequest, JsonResponse
from users.models import User 
from goals.models import Goal
from django.views.decorators.csrf import ensure_csrf_cookie
import json
from json import JSONDecodeError
from datetime import datetime
from django.contrib.auth import authenticate, login, logout
from datetime import datetime
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from .recommendations import find_similar_goals, default_recent
from numpy.linalg import norm
import pickle
import base64

# Create your views here.
@csrf_exempt
def recommend(request):
    # only allow GET - other: 405
    if request.method == 'GET':
        if request.user.is_authenticated is False:
            return HttpResponse(status=401)
        # else
        user = User.objects.get(id=request.user.id)

        if user.vector is None:
            return HttpResponse(status=404)

        if user.vector is not None:
            np_bytes = base64.b64decode(user.vector)
            user_vector = pickle.loads(np_bytes)

        if (norm(user_vector) == 0) or user.vector is None:
            # get default goal list
            goal_list = default_recent(user.id)
            goal_response = [{'status': 'default'}]

        else:
            # get recommended goal list
            goal_list = find_similar_goals(user_vector, user.id)
            goal_response = [{'status': 'recommend'}]

        for goal_dict in goal_list:
            g = goal_dict['goal']
            created_at = int(g.created_at.timestamp()) 
            updated_at = int(g.updated_at.timestamp())
            start_at = int(g.start_at.timestamp())
            deadline = int(g.deadline.timestamp())
            tags = [tag for tag in g.tags.names()]
            username = goal_dict['username']

            goal_response.append({
                'id': g.id, 'user': g.user_id ,'title': g.title, 'photo': g.photo, 
                'created_at': created_at, 'updated_at': updated_at, 
                'start_at': start_at, 'deadline': deadline, 
                'username': username, 'tags': tags,
            })

        return JsonResponse(goal_response, safe=False, status=200)
    else:
        return HttpResponseNotAllowed(['GET'])

def search(request):
    return

def recommendDetail(request, goal_id=""):
    if request.method == 'GET':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        # GET goal Detail
        try:
            g = Goal.objects.get(id=goal_id)
        except Goal.DoesNotExist:
            return HttpResponse(status=404)

        tasks = []
        for t in g.tasks.filter(goal_id=g.id).values():
            tasks.append({'id': t["id"], 'title': t["title"], 'goal_id': t["goal_id"], 'user_id':t["user_id"], 'importance': t["importance"], 
                            'day_of_week':t["day_of_week"], "start_at":int(t["start_at"].timestamp()), "deadline":int(t["deadline"].timestamp())
        })
        
        tags = [tag for tag in g.tags.names()]
        response_dict = {'id': g.id, 'title': g.title, 'photo': g.photo, 
                        'user': g.user_id, 'created_at': g.created_at, 
                        'updated_at': g.updated_at, 
                        'start_at': int(g.start_at.timestamp()), 'deadline': int(g.deadline.timestamp()), 
                        'tags': tags,
                        'tasks': tasks
                        }
        return JsonResponse(response_dict, safe=False, status=200)
    else:
        return HttpResponseNotAllowed(['GET'])

def recommendAchList(request, goal_id):
    # TODO return achievements of a selected goal
    if request.method == 'GET':
        if request.user.is_authenticated is False:
            return HttpResponse(status=401)
        try:
            goal = Goal.objects.get(id=goal_id)
        except Goal.DoesNotExist:
            return HttpResponse(status=404)

        achievements = []
        for task in goal.tasks.all():
            # achievements.append({ task.id: [model_to_dict(achievement) for achievement in task.achievements.all()]})
            for achievement in task.achievements.all().values():
                achievements.append({
                    'id': achievement["id"], 'description': achievement["description"], 'percentage_complete': achievement["percentage_complete"],
                    'written_at': int(achievement["written_at"].timestamp()), 'photo': achievement['photo'],
                    'user_id': achievement["user_id"], 'task': achievement["task_id"]
                })
        return JsonResponse(achievements, safe=False)
    
    else:
        return HttpResponseNotAllowed(['GET'])
    return
