import pytest

from django.urls import reverse
from django.contrib.auth.models import User


@pytest.mark.django_db
def test_user_create():
    User.objects.create_user('john', 'lennon@thebeatles.com', 'johnpassword')
    assert User.objects.count() == 1


@pytest.mark.django_db
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
   data = {
        'username': 'test7',
        # email: 'test7@test7.com',
        'password': 'testpassword'
   }
   headers = {
       'Content-Type': 'multipart/form-data'
   }
   response = client.post(url, headers=headers, data=data)
   assert response.status_code == 201


@pytest.mark.django_db
def test_user_detail(client, django_user_model):
   user = django_user_model.objects.create(
       username='test7', password='test7password'
   )
   url = reverse('detail', kwargs={'pk': user.pk})
   response = client.get(url)
   assert response.status_code == 200
   assert 'test7'.encode() in response.content  # bytes 
   assert b'test7' in response.content # bytes 
   assert 'test7' in response.content.decode()  # string