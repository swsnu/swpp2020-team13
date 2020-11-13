import pytest
from faker import Faker
from django.urls import reverse
from django.contrib.auth.models import User

pytestmark = pytest.mark.django_db
faker = Faker()

username = faker.name()
password = faker.uuid4()

headers = {
    'Content-Type': 'multipart/form-data'
}
data = {
    'username': username,
    'password': password
}