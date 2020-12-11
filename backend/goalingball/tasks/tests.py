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

headers = {
    'Content-Type': 'multipart/form-data'
}

user_data = {
    'username': username,
    'password': password
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


invalid_task_data = {
    'name': title,
    'image': photo,
    'duedate': deadline
}

def test_taskList(client, django_user_model):
    url = reverse('taskList')

    # methods not allowed
    response = client.put(url)
    assert response.status_code == 405
    response = client.delete(url)
    assert response.status_code == 405

    # create a new user
    user = django_user_model.objects.create_user(username=username, password=password)

    # user is not logged in
    response = client.get(url)
    assert response.status_code == 401

    # user is logeed in
    url = reverse('login')
    response = client.post(url, user_data, headers=headers)
    assert response.status_code == 200

    # user can creat a goal
    url = reverse('goalList')
    response = client.post(url, goal_data, headers=headers)
    assert response.status_code == 201
    assert title.replace('\n', '\\n') in response.content.decode()
    assert photo in response.content.decode()
    goal_id = json.loads(response.content.decode())['id']
    task_data['goal_id'] = goal_id
    # assert goal_id == 1

    ##### Test tasks ######

    # create a new task
    url = reverse('taskList')

    response = client.post(url, task_data, headers=headers)
    assert response.status_code == 201

    # TODO: include a list in a proper format
    # assert day_of_week[0] in response.content.decode()
    # assert importance[0] in response.content.decode()