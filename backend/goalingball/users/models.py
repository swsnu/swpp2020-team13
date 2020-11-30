from django.db import models
from django.contrib.auth.models import AbstractUser
from users.managers import UserManager

class User(AbstractUser):
    REQUIRED_FIELDS = [] 
    objects = UserManager()