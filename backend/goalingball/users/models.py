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

    def save(self, *args, **kwargs):
        return super().save(*args, **kwargs)

    def init_vector(self):
        # add default vector
        np_default = np.zeros(shape=(100,), dtype=np.float32)
        np_bytes = pickle.dumps(np_default)
        np_base64 = base64.b64encode(np_bytes)
        self.vector = np_base64
        self.save()

    # when goal is added, the user vector is updated
    # currently, the user vector is (total goal vector) / n
    def update_vector(self, np_vector, count):
        # binary -> np of the self.vector
        if self.vector is None:
                self.init_vector()
        np_bytes = base64.b64decode(self.vector)
        np_array = pickle.loads(np_bytes)
        np_array_update = (np_array*(count-1) + np_vector)/count
        # encode to binary again to save
        print("USER_VECTOR_UPDATE")
        print(np_array_update)
        np_bytes_update = pickle.dumps(np_array_update)
        np_base64_update = base64.b64encode(np_bytes_update)
        self.vector = np_base64_update
        self.save()




