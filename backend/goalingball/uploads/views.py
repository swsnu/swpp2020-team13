from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse
from django.contrib.auth.decorators import login_required
import uuid 
import boto3
from botocore.config import Config
import requests


# @login_required
def get_s3_url(request):
    if request.method == 'GET':
        s3 = boto3.client('s3', region_name='us-east-1', config=Config(signature_version='s3v4'))
        # The location (url) of a file will be aws_s3_prefix + key
        
        key = str(request.user.id) + '/' + str(uuid.uuid4()) + '.jpeg/'
        if request.user.id is None:
            return HttpResponse(status=401) # Only logged in users are allowed
            # key = "7/" + str(uuid.uuid4()) + '.jpeg/'

        # We will use this url to post file to S3
        url = s3.generate_presigned_url(
            ClientMethod='put_object',
            Params={
                'Bucket': 'goalingball-test',
                'ContentType':'image/jpeg',
                'Key': key
            }
        )
        
        # response = requests.put(url, data="", headers={'Content-Type':'image/jpeg'})
        # print("response: ",  vars(response))
        data = {'key': key, 'url': url}
        return JsonResponse(data, status=200)
    
    elif request.method == 'PUT':
        req_data = json.loads(request.body.decode())
        try:
            key = req_data['key']
        except(KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()

        url = s3.generate_presigned_url(
            ClientMethod='put_object',
            Params={
                'Bucket': 'goalingball-test',
                'ContentType':'image/jpeg',
                'Key': key
            }
        )
        data = {'key': key, 'url': url}
        print("get_s3_url PUT data: ", data)
        return JsonResponse(data, status=200)

    else:
        return HttpResponseNotAllowed(['GET', 'PUT'])

# 'ap-northeast-2\' is wrong; expecting \'us-east-1