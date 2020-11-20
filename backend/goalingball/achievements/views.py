from django.http import JsonResponse, HttpResponse, HttpResponseNotAllowed, HttpResponseBadRequest
from django.forms.models import model_to_dict
from django.views.decorators.csrf import csrf_exempt

from goals.models import Goal
from tasks.models import Task
from achievements.models import Achievement

@csrf_exempt
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
        
        if request.user.id is not task.user.id:
            return HttpResponse(status=403) # Permission Denied
        
        title = request.POST.get('title', '')
        description = request.POST.get('description', None)
        pecentage_complete = request.POST.get('pecentage_complete', -1)
        photo = request.POST.get('photo', '')

        if not title or percentage_complete < 0:
            print("[DEBUG] title and percentage_complete should be included in a request form.")
            return HttpResponseBadRequest() # 400
        
        Achievement.objects.create(
            title=title, description=description, percentage_complete=percentage_complete, 
            user=User.objects.get(id=task.user.id), task=Task.objects.get(id=task_id)
        )
        
        
    
    else:
        return HttpResponseNotAllowed(['POST'])


@csrf_exempt
def achievementListOfGoal(request, goal_id):
    if request.method == 'GET':
        if request.user.is_authenticated is False:
            return HttpResponse(status=401)
        
        try:
            goal = Goal.objects.select_related('tasks').get(id=goal_id)
        except Goal.DoesNotExist:
            return HttpResponse(status=404)

        achievements = []
        for task in goal.tasks:
            achievements.append({ task_id: [model_to_dict(achievement) for achievement in task.achievements]})

        return JsonResponse(achievements)
    
    else:
        return HttpResponseNotAllowed(['GET'])


@csrf_exempt
def achievementListOfTask(request):
    if request.method == 'GET':
        if request.user.is_authenticated is False:
            return HttpResponse(status=401)
        
        try:
            task = Task.objects.select_related('achievements').get(id=task_id)
        except Task.DoesNotExist:
            return HttpResponse(status=404) 
        
        achievements = [model_to_dict(achievement) for achievement in task.achievements]
        return JsonResponse(achievements)

    
    else:
        return HttpResponseNotAllowed(['GET'])


@csrf_exempt
def achievementDetail(request):
    # TODO
    return HttpResponse(status=400)