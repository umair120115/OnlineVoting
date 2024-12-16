
from django.contrib import admin
from unfold.admin import ModelAdmin
from .models import Discussion,Reply

@admin.register(Discussion)
class DiscussionAdmin(ModelAdmin):
    pass


# Register your models here.
