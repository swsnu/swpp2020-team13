from django.db import models

from django.contrib.auth.models import User


class Goal(models.Model):
    title = models.TextField(max_length=255, blank=False) 
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='goals'
    )
    photo = models.URLField(max_length=2047, blank=True)

    created_at = models.DateTimeField(editable=False)
    updated_at = models.DateTimeField()

    deadline = models.DataTimeField()
    # TODO : categories
    # categories = models.ManytoManyField()
    # def updateCategories():

    def save(self, *args, **kwargs):
        # For the first time
        if not self.id: 
            self.created_at = timezone.now()

        # Upon save, update timestamps
        self.updated_at = timezone.now()
        
        return super().save(*args, **kwargs)

    def __str__(self):
        return "{} {}".format(self.id, self.title)
