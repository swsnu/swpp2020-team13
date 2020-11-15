import pytest
from faker import Faker
from django.urls import reverse
from django.contrib.auth.models import User

# gloabl variables
pytestmark = pytest.mark.django_db
fake = Faker()

username = fake.name()
password = fake.uuid4()

headers = {
    'Content-Type': 'multipart/form-data'
}
data = {
    'username': username,
    'password': password
}

# def test_user_create():
#     User.objects.create_user('john', 'lennon@thebeatles.com', 'johnpassword')
#     assert User.objects.count() == 1


def test_signup(client):
    url = reverse('signup')
 
    # request methods not allowed
    response = client.get(url)
    assert response.status_code == 405
    response = client.put(url)
    assert response.status_code == 405
    response = client.delete(url)
    assert response.status_code == 405

    
    # request method allowed

    # request with missing data
    missing_data = { 'email': fake.email(), 'password': password }
    response = client.post(url, missing_data, headers=headers)
    assert response.status_code == 400 # Bad request 

    # request with proper data
    response = client.post(url, data, headers=headers)
    #    response = client.post(url, headers=headers, data=data)
    assert response.status_code == 201


def test_login_and_logout(client, django_user_model):
    # Create a new user
    django_user_model.objects.create_user(username=username, password=password)

    # logint
    url = reverse('login')

    # methods not allowed for a login request 
    response = client.get(url)
    assert response.status_code == 405
    response = client.put(url)
    assert response.status_code == 405
    response = client.delete(url)
    assert response.status_code == 405

    # method allowed for a login request 

    # invalid user info
    invalid_data = { 'username': fake.name(), 'password': password }
    response = client.post(url, invalid_data, headers=headers)
    assert response.status_code == 401 # Unauthorized 

    # request with missing data
    missing_data = { 'email': fake.email(), 'password': password }
    response = client.post(url, missing_data, headers=headers)
    assert response.status_code == 400 # Bad request 

    # request with proper data
    response = client.post(url, data, headers=headers)
    assert response.status_code == 200
    assert username in response.content.decode()

    # logout
    url = reverse('logout')

    # methods not allowed for a logout request 
    response = client.get(url)
    assert response.status_code == 405
    response = client.put(url)
    assert response.status_code == 405
    response = client.delete(url)
    assert response.status_code == 405

    # method allowed for a logout request 
    response = client.post(url, data, headers=headers)
    assert response.status_code == 204

    # repeated logout is not allowed
    response = client.post(url, data, headers=headers)
    assert response.status_code == 401


def test_user_detail(client, django_user_model):
    # creat a new user
    user = django_user_model.objects.create(
        username='test7', password='test7password'
    )
    url = reverse('detail', kwargs={'pk': user.pk})

    # methods not allowed 
    response = client.post(url)
    assert response.status_code == 405
    response = client.put(url)
    assert response.status_code == 405
    response = client.delete(url)
    assert response.status_code == 405

    # a method allowed 
    response = client.get(url)
    assert response.status_code == 200
    assert 'test7'.encode() in response.content  # bytes 
    assert b'test7' in response.content # bytes 
    assert 'test7' in response.content.decode()  # string

    # User does not exist
    url = reverse('detail', kwargs={'pk': fake.pyint()})
    response = client.get(url)
    assert response.status_code == 404