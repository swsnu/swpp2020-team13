import json
import pytest
from faker import Faker
from django.urls import reverse
from django.contrib.auth.models import User

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

invalid_goal_data = {
    'name': title,
    'image': photo,
    'duedate': deadline
}

def test_goalList(client, django_user_model):

    url = reverse('goalList')

    # methods not allowed
    response = client.put(url)
    assert response.status_code == 405
    response = client.delete(url)
    assert response.status_code == 405

    # create a new user
    user = django_user_model.objects.create_user(username=username, password=password)

    # create a new goal

    # user is not logged in
    response = client.get(url)
    assert response.status_code == 401

    response = client.post(url)
    assert response.status_code == 401

    # user is logeed in
    url = reverse('login')
    response = client.post(url, user_data, headers=headers)
    assert response.status_code == 200

    # user can creat a goal
    url = reverse('goalList')
    photo = goal_data['photo']
    response = client.post(url, goal_data, headers=headers)
    assert response.status_code == 201
    assert title.replace('\n', '\\n') in response.content.decode()
    assert photo in response.content.decode()

    # in case there is no photo
    photo = goal_data['photo']
    del goal_data['photo']
    response = client.post(url, goal_data, headers=headers)
    assert response.status_code == 201
    # recover photo
    goal_data['photo'] = photo

    # cannot create a goal with invalid fields
    response = client.post(url, invalid_goal_data, headers=headers)
    assert response.status_code == 400

    # get a goal list
    response = client.get(url)
    assert response.status_code == 200
    goal_list = json.loads(response.content.decode()) # bytes -> json string -> python dict
    assert goal_data['title'] == goal_list[0]['title']
    assert goal_data['photo'] == goal_list[0]['photo']
    assert user.id == goal_list[0]['user']

    

def test_goalDetail(client, django_user_model):
    # TODO: create a beforeAll function for repeated job

    # create a new user
    user = django_user_model.objects.create_user(username=username, password=password)
    # user is logeed in
    url = reverse('login')
    response = client.post(url, user_data, headers=headers)
    assert response.status_code == 200

    # create a goal
    url = reverse('goalList')
    response = client.post(url, goal_data, headers=headers)
    assert response.status_code == 201
    goal_id = json.loads(response.content.decode())['id']
    assert goal_id == 1

    # goal does not exist
    url = reverse('goalDetail', kwargs={'goal_id': fake.pyint()})
    response = client.get(url)
    assert response.status_code == 404

    
    # user is not logged in
    url = reverse('logout')
    response = client.post(url)
    assert response.status_code == 204
    url = reverse('goalDetail', kwargs={'goal_id': goal_id})
    response = client.get(url)
    assert response.status_code == 401
    response = client.put(url, json.dumps(goal_data))
    assert response.status_code == 401
    response = client.delete(url)
    assert response.status_code == 401

    # user is logged in again
    url = reverse('login')
    response = client.post(url, user_data)
    assert response.status_code == 200
    
    # goal does not exist
    url = reverse('goalDetail', kwargs={'goal_id': fake.pyint()})
    response = client.get(url)
    assert response.status_code == 404
    response = client.put(url, json.dumps(goal_data), headers=headers)
    assert response.status_code == 404
    esponse = client.delete(url)
    assert response.status_code == 404

    # methods allowed
    url = reverse('goalDetail', kwargs={'goal_id': goal_id})
    response = client.get(url)
    assert response.status_code == 200

    response = client.put(url, json.dumps(goal_data), headers=headers)
    assert response.status_code == 200
    
    response = client.delete(url)
    assert response.status_code == 200

    # invalid goal data
    response = client.put(url, json.dumps(invalid_goal_data), headers=headers)
    assert response.status_code == 404
    

    # TODO: user does not own the goal (status=403)
