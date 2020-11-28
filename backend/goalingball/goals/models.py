from django.db import models
from django.utils import timezone
from taggit.managers import TaggableManager

from django.contrib.auth.models import User

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
    # TODO : categories
    # categories = models.ManytoManyField()
    # def updateCategories():

    def save(self, *args, **kwargs):
        # For the first time
        if not self.id: 
            self.created_at = timezone.localtime()

        # Upon save, update timestamps
        self.updated_at = timezone.localtime()

        return super().save(*args, **kwargs)

    def __str__(self):
        return "{} {}".format(self.id, self.title)
