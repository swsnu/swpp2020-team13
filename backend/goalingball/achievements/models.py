from django.db import models
from django.utils import timezone

from tasks.models import Task
# from django.contrib.auth.models import User
from users.models import User 


class Achievement(models.Model):
    title = models.TextField(max_length=255, blank=True, null=True) 
    description = models.TextField(max_length=2047, blank=True) # 2200 characters limit in an Instagram post

    percentage_complete = models.IntegerField(blank=False, default=0)

    photo = models.URLField(max_length=2047, blank=True, null=True)

    task = models.ForeignKey(
        Task,
        on_delete=models.CASCADE,
        related_name='achievements'
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='achievements'
    )

    written_at = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(editable=False)
    updated_at = models.DateTimeField()


    def save(self, *args, **kwargs):
        # For the first time
        if not self.id: 
            self.created_at = timezone.localtime()
            # self.deadline = timezone.localtime()

        # Upon save, update timestamps
        self.updated_at = timezone.localtime()
        
        return super().save(*args, **kwargs)

    def __str__(self):
        return "{} {}".format(self.id, self.title)