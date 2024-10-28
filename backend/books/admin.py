from django.contrib import admin
from .models import Book, Meeting, BookClub

# Register your models here.
admin.site.register(Book)
admin.site.register(BookClub)
admin.site.register(Meeting)
