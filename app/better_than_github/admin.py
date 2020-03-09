from django.contrib import admin

# Register your models here.

from .models import *

admin.site.register(Project)
admin.site.register(Issue)
admin.site.register(Milestone)
admin.site.register(Label)
admin.site.register(User)
admin.site.register(Comment)





