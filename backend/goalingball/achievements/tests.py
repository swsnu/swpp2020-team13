import json
import pytest
from faker import Faker
from django.urls import reverse
# from django.contrib.auth.models import User
from users.models import User 

pytestmark = pytest.mark.django_db
fake = Faker()

username = fake.name()
password = fake.uuid4()

user_data = {
    'username': username,
    'password': password
}

headers = {
    'Content-Type': 'multipart/form-data'
}

title = fake.text()
photo = fake.url()
deadline = fake.unix_time()
tags = json.dumps(['tag1', 'tag2'])

goal_data = {
    'title': title,
    'photo': photo,
    'deadline': deadline,
    'tags': tags
}

goal_id = 1
importance = [4]
day_of_week = ['MONDAY', 'WEDNESDAY']

task_data = {
    'title': 'task_title',
    'goal_id': goal_id,
    'importance': importance,
    'day-of-week': day_of_week,
    deadline: deadline
}

achievement_data = {
    'task_id': 1,
    'title': 'achievement_title',
    'description': 'description',
    'percentage_complete': 100.0
}

bad_achievement_data = {
    'task_id': 99, # No task exists with the id
    'title': 'achievement_title',
    'description': 'description',
    'percentage_complete': 100.0
}

def test_achievementList(client, django_user_model):
    url = reverse('achievementList')

    # methods not allowed
    response = client.put(url)
    assert response.status_code == 405
    response = client.delete(url)
    assert response.status_code == 405

    # create a new user
    user = django_user_model.objects.create_user(username=username, password=password)
    url = reverse('login')
    response = client.post(url, user_data, headers=headers)
    assert response.status_code == 200

    # create another user
    other = django_user_model.objects.create_user(username='other', password='otherpassword')

    # creat a goal and a task
    url = reverse('goalList')
    response = client.post(url, goal_data, headers=headers)
    assert response.status_code == 201
    goal_id = json.loads(response.content.decode())['id']
    assert goal_id == 1

    url = reverse('taskList')
    response = client.post(url, task_data, headers=headers)
    assert response.status_code == 201
    task_id = json.loads(response.content.decode())['id']
    assert task_id == 1

    

    # user should be logged in to creat a new achievement
    url = reverse('logout')
    response = client.post(url)
    url = reverse('achievementList')
    response = client.post(url, achievement_data, headers=headers)
    assert response.status_code == 401

    # login a user
    url = reverse('login')
    response = client.post(url, user_data, headers=headers)
    assert response.status_code == 200

    # task_id must be included
    url = reverse('achievementList')
    response = client.post(url, bad_achievement_data, headers=headers)
    assert response.status_code == 404

    # create a new achievement
    url = reverse('achievementList')
    response = client.post(url, achievement_data, headers=headers)
    assert response.status_code == 201
    achv_id = json.loads(response.content.decode())['id']
    assert achv_id == 1