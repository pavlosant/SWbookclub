from django.contrib import admin
from .models import Book, Book_List, Meeting, BookClub

# Register your models here.
admin.site.register(Book)
admin.site.register(BookClub)
admin.site.register(Meeting)
admin.site.register(Book_List)
