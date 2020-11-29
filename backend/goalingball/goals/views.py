from django.forms.models import model_to_dict
from django.http import HttpResponse, HttpResponseNotAllowed, HttpResponseBadRequest, JsonResponse
from django.contrib.auth.models import User
from django.views.decorators.csrf import ensure_csrf_cookie
import json
from json import JSONDecodeError
from datetime import datetime
from django.contrib.auth import authenticate, login, logout
from datetime import datetime
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from .models import Goal


@csrf_exempt
def goalList(request):
    # print("request.body: ", request.POST)
    if request.method == 'GET':
        if request.user.is_authenticated is False:
            return HttpResponse(status=401)
        # else
        goal_list = []
        for g in Goal.objects.select_related('user').all():
            created_at = int(g.created_at.timestamp()) 
            updated_at = int(g.updated_at.timestamp())
            start_at = int(g.start_at.timestamp())
            deadline = int(g.deadline.timestamp())
            
            tasks = []
            for t in g.tasks.filter(goal_id=g.id).values():
                tasks.append({'id': t["id"], 'title': t["title"], 'goal_id': t["goal_id"], 'user_id':t["user_id"], 'importance': t["importance"], 
                            'day_of_week':t["day_of_week"], "start_at":int(t["start_at"].timestamp()), "deadline":int(t["deadline"].timestamp())
                })
            print(tasks)
            # tasks = [model_to_dict(task) for task in g.tasks.filter(goal_id=g.id)]
            tags = [tag for tag in g.tags.names()]
            # print("goalList tags: ", tags)
            user = g.user.id

            goal_list.append({
                'id': g.id, 'user': g.user.id ,'title': g.title, 'photo': g.photo, 
                'created_at': created_at, 'updated_at': updated_at, 
                'start_at': start_at, 'deadline': deadline, 
                'tasks': tasks, 'user': user,
                'tags': tags,
            })
        return JsonResponse(goal_list, safe=False, status=200)

    elif request.method == 'POST':
        if request.user.is_authenticated is False:
            return HttpResponse(status=401)

        goal_title = request.POST.get('title', None)
        if goal_title is None:
            return HttpResponseBadRequest()

        goal_deadline = request.POST.get('deadline', None)
        goal_start_at = request.POST.get('start_at', None)

        if goal_deadline is not None and goal_start_at is not None:
            goal_start_at = timezone.make_aware(datetime.fromtimestamp(int(goal_start_at)))
            goal_deadline = timezone.make_aware(datetime.fromtimestamp(int(goal_deadline)))

        if 'photo' in request.POST:
            goal_photo = request.POST['photo']
        else:
            goal_photo = None

        new_goal = Goal(title=goal_title, photo=goal_photo, start_at=goal_start_at, deadline=goal_deadline, user=request.user)
        new_goal.save() # goal_created_at and goal_updated_at is made when new goal is saved
        
        if 'tags' in request.POST: # tags should be added after an intance is created
            tags = request.POST.getlist('tags') 
            new_goal.tags.add(*tags)
            new_goal.save()
            print("new_goal.tags.names(): ", new_goal.tags.names())

        response_dict = {'id': new_goal.id, 'user': new_goal.user.id, 
                        'title': new_goal.title, 'photo': new_goal.photo, 
                        'created_at': int(new_goal.created_at.timestamp()),
                        'updated_at' : int(new_goal.updated_at.timestamp()), 
                        'start_at': int(new_goal.start_at.timestamp()),
                        'deadline': int(new_goal.deadline.timestamp()), 
                        'tags': [tag for tag in new_goal.tags.names()], 'tasks': []}

        return JsonResponse(response_dict, status=201, safe=False)
    else:
        return HttpResponseNotAllowed(['GET', 'POST'])

@csrf_exempt
def goalDetail(request, goal_id=""):
    if request.method == 'GET':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        
        # GET goal Detail
        try:
            g = Goal.objects.select_related('user').get(id=goal_id)
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
                        'start_at': g.start_at, 'deadline': g.deadline, 
                        'tags': tags,
                        'tasks': tasks
                        }
        return JsonResponse(response_dict, safe=False, status=200)
            
    elif request.method == 'PUT' or request.method == 'PATCH':
        if request.user.is_authenticated is False:
            return HttpResponse(status=401)

        try:
            goal = Goal.objects.select_related('user').get(id=goal_id)
        except Goal.DoesNotExist:
            return HttpResponse(status=404)

        if goal.user.id is not request.user.id: # check if the user is the goal owner
            return HttpResponse(status=403)

        print("[DEBUG] PUT request.body.decode(): ", request.body.decode())
        req_data = json.loads(request.body.decode())

        goal_title = req_data.get('title', None)
        if goal_title is None:
            return HttpResponseBadRequest()
            
        goal_photo = req_data.get('photo', '')
        goal_deadline = req_data.get('deadline', None)
        goal_start_at = req_data.get('start_at', None)

        if goal_deadline is not None:
            goal_deadline = timezone.make_aware(datetime.fromtimestamp(int(goal_deadline))) 

        if goal_start_at is not None:
            goal_start_at = timezone.make_aware(datetime.fromtimestamp(int(goal_start_at))) 

        if 'tags' in req_data: # tags should be added after an intance is created
            goal_tags = req_data['tags']
            # print("req_data['tags']: ", req_data['tags'])
            # breakpoint()
            goal.tags.set(*goal_tags, clear=True)

        goal.title = goal_title
        goal.photo = goal_photo
        goal.start_at = goal_start_at
        goal.deadline = goal_deadline
        goal.save()

        response_dict = {'id': goal.id, 'title': goal.title, 
                        'photo': goal.photo, 'user': goal.user.id, 
                        'created_at': (goal.created_at).strftime('%Y-%m-%d %H:%M:%S'), 
                        'updated_at' : (goal.updated_at).strftime('%Y-%m-%d %H:%M:%S'),
                        'start_at': (goal.start_at).strftime('%Y-%m-%d %H:%M:%S'), 
                        'deadline': (goal.deadline).strftime('%Y-%m-%d %H:%M:%S'), 
                        'tags': [tag for tag in goal.tags.names()]}
        return JsonResponse(response_dict, safe=False, status=200)
        
    elif request.method == 'DELETE':
        if request.user.is_authenticated is False:
            return HttpResponse(status=401)

        try:
            goal = Goal.objects.get(id=goal_id)
        except Goal.DoesNotExist:
            return HttpResponse(status=404)
            
        if goal.user.id is not request.user.id:
            return HttpResponse(status=403)
        goal.delete()
        return HttpResponse(status=200)

    else:
        return HttpResponseNotAllowed(['GET', 'PUT', 'PATCH', 'DELETE'])

