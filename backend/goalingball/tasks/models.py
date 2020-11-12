from django.db import models
from multiselectfield import MultiSelectField
from django.utils import timezone

from goals.models import Goal
from django.contrib.auth.models import User


DAYS_OF_WEEK = (
    ('MONDAY', 'Monday'),
    ('TUESDAY', 'Tuesday'),
    ('WEDNESDAY', 'Wednesday'),
    ('THURSDAY', 'Thursday'),
    ('FRIDAY', 'Friday'),
    ('SATURDAY', 'Saturday'),
    ('SUNDAY', 'Sunday'),
)

IMPORTANCE_CHOICES = (
    (1, 1),
    (2, 2),
    (3, 3),
    (4, 4),
    (5, 5),
)


class Task(models.Model):
    title = models.TextField(max_length=255, blank=False) 
    goal = models.ForeignKey(
        Goal,
        on_delete=models.CASCADE,
        related_name='tasks'
    )
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='tasks'
    )
    
    importance = models.FloatField(blank=True)
    day_of_week = MultiSelectField(choices=DAYS_OF_WEEK, blank=True)

    created_at = models.DateTimeField(editable=False)
    updated_at = models.DateTimeField()
    deadline = models.DateTimeField(blank=True, null=True) # only for recurrent tasks, default is same as created_at

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