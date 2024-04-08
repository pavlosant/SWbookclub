from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class BookClub(models.Model):
    pass


class Book(models.Model):
    title = models.TextField(max_length=200)
    author = models.CharField(max_length=100)
    genre = models.CharField(max_length=100, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    publication_date = models.DateField(blank=True, null=True)
    ISBN = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self) -> str:
        return f"{self.title} by {self.author}"


class Meeting(models.Model):
    meeting_date = models.DateField()
    occured = models.BooleanField()
    location = models.TextField()
    host = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self) -> str:
        meeting_text = f"{self.meeting_date}:@ {self.host} - {self.location}"
        return meeting_text


class Book_List(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    bookclub = models.ForeignKey(
        BookClub, on_delete=models.CASCADE, blank=True, null=True
    )
    books = models.ManyToManyField(Book)
