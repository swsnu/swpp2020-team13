from django.db import models
from multiselectfield import MultiSelectField
from django.utils import timezone

from goals.models import Goal
from django.contrib.auth.models import User


DAYS_OF_WEEK = (
    ('NONE', 'None'),
    ('MONDAY', 'Monday'),
    ('TUESDAY', 'Tuesday'),
    ('WEDNESDAY', 'Wednesday'),
    ('THURSDAY', 'Thursday'),
    ('FRIDAY', 'Friday'),
    ('SATURDAY', 'Saturday'),
    ('SUNDAY', 'Sunday'),
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
    # recurrent = models.BooleanField(default=False)
    day_of_week = MultiSelectField(choices=DAYS_OF_WEEK, default='NONE')

    created_at = models.DateTimeField(editable=False)
    updated_at = models.DateTimeField()


    def save(self, *args, **kwargs):
        # For the first time
        if not self.id: 
            self.created_at = timezone.now()

        # Upon save, update timestamps
        self.updated_at = timezone.now()
        
        return super().save(*args, **kwargs)

    def __str__(self):
        return "{} {}".format(self.id, self.title)