from django.db import models
from django.utils import timezone
from taggit.managers import TaggableManager
import numpy as np
# from django.contrib.auth.models import User
from users.models import User 
import pickle
import base64

class Goal(models.Model):
    title = models.TextField(max_length=255, blank=False) 
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='goals'
    )
    # image = models.ImageField(blank=True, upload_to="images", null=True)
    photo = models.URLField(max_length=2047, blank=True, null=True)
    tags = TaggableManager(blank=True)

    created_at = models.DateTimeField(editable=False)
    updated_at = models.DateTimeField()
    
    start_at = models.DateTimeField(blank=True, null=True)
    deadline = models.DateTimeField(blank=True, null=True)

    # save goal vectors (numpy array in binary)
    vector = models.BinaryField(blank=True, null=True)

    def save(self, *args, **kwargs):
        # For the first time
        if not self.id: 
            self.created_at = timezone.localtime()
        # Upon save, update timestamps
        self.updated_at = timezone.localtime()
        return super().save(*args, **kwargs)

    def init_vector(self):
        # add default vector
        np_default = np.zeros(shape=(100,), dtype=np.float32)
        np_bytes = pickle.dumps(np_default)
        np_base64 = base64.b64encode(np_bytes)
        self.vector = np_base64
        self.save()

    def update_vector(self, np_vector):
        # change np.array to binary 
        np_bytes = pickle.dumps(np_vector)
        np_base64 = base64.b64encode(np_bytes)
        self.vector = np_base64
        self.save()


    def __str__(self):
        return "{} {}".format(self.id, self.title)
