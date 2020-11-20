
from django.http import HttpResponse
from django.forms.models import model_to_dict
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def achievementList(request):
    # TODO
    return HttpResponse(status=400)


@csrf_exempt
def achievementDetail(request):
    # TODO
    return HttpResponse(status=400)