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
from .recommendations import find_similar_goals

# Create your views here.
def recommend(request):
    # only allow GET - other: 405
    if request.method == 'GET':
        if request.user.is_authenticated is False:
            return HttpResponse(status=401)
        # else
        user = User.objects.get(request.user.id)

        if user.vector is None:
            return HttpResponse(status=404)
        
        # get recommended goal list
        goal_list = find_similar_goals(user.vector)
        goal_response = []

        for g in goal_list:
            created_at = int(g.created_at.timestamp()) 
            updated_at = int(g.updated_at.timestamp())
            start_at = int(g.start_at.timestamp())
            deadline = int(g.deadline.timestamp())
            tags = [tag for tag in g.tags.names()]
            user = g.user.id

            tasks = []
            for t in g.tasks.values():
                tasks.append({'id': t["id"], 'title': t["title"], 'goal_id': t["goal_id"], 'user_id':t["user_id"], 'importance': t["importance"], 
                            'day_of_week':t["day_of_week"], "start_at":int(t["start_at"].timestamp()), "deadline":int(t["deadline"].timestamp())
                })

            goal_response.append({
                'id': g.id, 'user': g.user.id ,'title': g.title, 'photo': g.photo, 
                'created_at': created_at, 'updated_at': updated_at, 
                'start_at': start_at, 'deadline': deadline, 
                'tasks': tasks, 'user': user,
                'tags': tags,
            })

        return JsonResponse(goal_response, safe=False, status=200)
    else:
        return HttpResponseNotAllowed(['GET'])

def search(request):
    return

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
                    'user_id': achievement["user_id"], 'task_id': achievement["task_id"]
                })
        return JsonResponse(achievements, safe=False)
    
    else:
        return HttpResponseNotAllowed(['GET'])
    return
