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
data = {
    'username': username,
    'password': password
}

def test_get_s3_url(client, django_user_model):
    url = reverse('get_s3_url')

    # methods not allowed
    response = client.post(url)
    assert response.status_code == 405
    # response = client.put(url)
    # assert response.status_code == 405
    response = client.delete(url)
    assert response.status_code == 405

    # a method allowed

    # A user is not logged in
    response = client.get(url)
    assert response.status_code == 401

    # creat a new user
    django_user_model.objects.create_user(username=username, password=password)

    # A user is logged in
    url = reverse('login')
    data = { 'username': username, 'password': password }
    response = client.post(url, data, headers=headers)
    assert response.status_code == 200

    url = reverse('get_s3_url')
    response = client.get(url)
    assert response.status_code == 200
    assert 'key' in response.content.decode()
    assert 'url' in response.content.decode()