from django.http import JsonResponse, HttpResponse, HttpResponseNotAllowed, HttpResponseBadRequest
from django.forms.models import model_to_dict
from django.utils import timezone
# from django.contrib.auth.models import User
from users.models import User 
from datetime import datetime
from django.utils import timezone
from goals.models import Goal
from tasks.models import Task
from achievements.models import Achievement
import json
import time


from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie


def achievementList(request):
    # 'GET' a list of all achievements is currently not supported
    # Creating a new achievement is only allowed 

    if request.method == 'POST':
        # Logged-in users can only create a new achievement
        if request.user.is_authenticated is False:
            return HttpResponse(status=401)
        
        task_id = request.POST.get('task_id', None)
        if task_id is None:
            return HttpResponseBadRequest() # 400

        try:
            task = Task.objects.select_related('user').get(id=task_id)
        except Task.DoesNotExist:
            return HttpResponse(status=404) # Not Found
        
        # if request.user.id is not task.user.id:
        #     return HttpResponse(status=403) # Permission Denied
        
        description = request.POST.get('description', '')
        percentage_complete = request.POST.get('percentage_complete', -1)
        written_at = request.POST.get('written_at', None)
        photo = request.POST.get('photo')

        if written_at is not None:
            written_at = timezone.make_aware(datetime.fromtimestamp(int(written_at)))
        try:
            # print("type(percentage_complete): ", type(percentage_complete))
            percentage_complete = int(float(percentage_complete))
        except ValueError as e:
            # print("[DEBUG] percentage_complete is not a valid float: ", e)
            return HttpResponse(status=400) 

        # print("percentage_complete type: ", type(percentage_complete))
        photo = request.POST.get('photo', '')

        if percentage_complete < 0:
            # print("[DEBUG] percentage_complete should be included in a request form.")
            return HttpResponseBadRequest() # 400
        
        achievement = Achievement.objects.create(
            description=description, percentage_complete=percentage_complete, written_at=written_at, photo=photo,
            user=User.objects.get(id=task.user_id), task=Task.objects.get(id=task_id)
        )

        if written_at is not None:
            written_at = int(written_at.timestamp())

        achievement.save()
        response_dict = {
            'id': achievement.id,
            'user': achievement.user_id, 
            'task': achievement.task_id, 
            'description': description, 
            'percentage_complete': percentage_complete,
            'written_at': written_at, 
            'photo': achievement.photo
        }

        return JsonResponse(response_dict, status=201)
        
    else:
        return HttpResponseNotAllowed(['POST'])


def achievementDetail(request, achievement_id):
    if request.method == 'GET':
        if request.user.is_authenticated is False:
            return HttpResponse(status=401)
        
        try:
            achv = Achievement.objects.select_related('user').get(id=achievement_id)
        except Achievement.DoesNotExist:
            return HttpResponse(status=404)
        
        serialized_achv = model_to_dict(achv)
        # print("[DEBUG] serialized_achv before: ", serialized_achv)
        serialized_achv['written_at'] = int(achv.written_at.timestamp())
        serialized_achv['created_at'] = int(achv.created_at.timestamp())
        serialized_achv['updated_at'] = int(achv.updated_at.timestamp())
        # print("[DEBUG] serialized_achv after: ", serialized_achv)
        return JsonResponse(serialized_achv, safe=False)
    
    elif request.method == 'PUT' or request.method == 'PATCH':
        if request.user.is_authenticated is False:
            return HttpResponse(status=401)
        
        try:
            achv = Achievement.objects.select_related('user').get(id=achievement_id)
        except Achievement.DoesNotExist:
            return HttpResponse(status=404)
        
        if achv.user.id is not request.user.id: 
            return HttpResponse(status=403)
        
        req_data = json.loads(request.body.decode())
        # print("edit achv req_data: ", req_data)

        achv_title = req_data.get('title', '')
        achv_description = req_data.get('description', '')
        achv_photo = req_data.get('photo', '')
        achv_written_at = req_data.get('written_at', int(time.time()))
        # Why None instead of 0? 
        achv_percentage_complete = req_data.get('percentage_complete', 0) # None
        
        achv.title = achv_title
        achv.description = achv_description
        achv.photo = achv_photo
        achv.write_at = timezone.make_aware(datetime.fromtimestamp(achv_written_at))
        achv.percentage_complete = achv_percentage_complete
        achv.save()

        serialized_achv = model_to_dict(achv)
        # print("[DEBUG] serialized_achv before: ", serialized_achv)
        serialized_achv['written_at'] = int(achv.written_at.timestamp())
        serialized_achv['created_at'] = int(achv.created_at.timestamp())
        serialized_achv['updated_at'] = int(achv.updated_at.timestamp())
        # print("[DEBUG] serialized_achv after: ", serialized_achv)
        return JsonResponse(serialized_achv, safe=False)

    elif request.method == 'DELETE':
        if request.user.is_authenticated is False:
            return HttpResponse(status=401)

        try:
            achv = Achievement.objects.get(id=achievement_id)
        except Achievement.DoesNotExist:
            return HttpResponse(status=404)
            
        if achv.user.id is not request.user.id:
            return HttpResponse(status=403)

        achv.delete()
        return HttpResponse(status=200)

    else:
        return HttpResponseNotAllowed(['GET', 'PUT', 'PATCH', 'DELETE'])


def achievementListOfGoal(request, goal_id):
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
                    'id': achievement["id"],
                    'user': achievement["user_id"], 
                    'task': achievement["task_id"], 
                    'description': achievement["description"], 
                    'percentage_complete': achievement["percentage_complete"],
                    'written_at': int(achievement["written_at"].timestamp()), 
                    'photo': achievement['photo']
                })

        return JsonResponse(achievements, safe=False)
    
    else:
        return HttpResponseNotAllowed(['GET'])


def achievementListOfTask(request, task_id):
    if request.method == 'GET':
        if request.user.is_authenticated is False:
            return HttpResponse(status=401)
        
        try:
            task = Task.objects.get(id=task_id)
        except Task.DoesNotExist:
            return HttpResponse(status=404) 
        
        achievements = []
        for achievement in task.achievements.all().values():
            achievements.append({
                'id': achievement["id"],
                'user': achievement["user_id"], 
                'task': achievement["task_id"], 
                'description': achievement["description"], 
                'percentage_complete': achievement["percentage_complete"],
                'written_at': int(achievement["written_at"].timestamp()), 
                'photo': achievement['photo']
            })
        return JsonResponse(achievements, safe=False)

    else:
        return HttpResponseNotAllowed(['GET'])

