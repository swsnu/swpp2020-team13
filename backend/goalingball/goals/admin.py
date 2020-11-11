from django.contrib import admin

from goals.models import Goal

class GoalAdmin(admin.ModelAdmin):
    fields = ['id', 'title', 'user', 'photo', 'deadline', 'tags', 'created_at', 'updated_at']
    readonly_fields = ['id', 'created_at']

admin.site.register(Goal, GoalAdmin)
