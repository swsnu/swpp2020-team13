from django.db import models
from django.contrib.auth.models import AbstractUser
from users.managers import UserManager
import pickle
import base64
import numpy as np

class User(AbstractUser):
    REQUIRED_FIELDS = [] 
    objects = UserManager()

    # save user vectors (numpy array in binary)
    vector = models.BinaryField(blank=True, null=True)

    def init_vector(self):
        # add default vector
        np_default = np.zeros(shape=(100,), dtype=np.float32)
        np_bytes = pickle.dumps(np_default)
        np_base64 = base64.b64encode(np_bytes)
        self.vector = np_base64

    # when goal is added, the user vector is updated
    # currently, the user vector is (total goal vector) / n
    # def update(self, np_vector):
