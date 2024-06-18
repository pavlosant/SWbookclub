from django.db import models
from django.contrib.auth.models import User
from django.urls import reverse
from django.core import serializers

# Create your models here.


class BookClub(models.Model):
    name = models.CharField(max_length=100, default="BookClub")
    readers = models.ManyToManyField(User, related_name="bookclubreaders")

    def __str__(self) -> str:
        return f"{self.name.capitalize()}"


class Meeting(models.Model):
    meeting_date = models.DateTimeField()
    location = models.TextField()
    host = models.ForeignKey(User, related_name="host", on_delete=models.CASCADE)
    chooser = models.ForeignKey(
        User,
        related_name="chooser",
        on_delete=models.CASCADE,
        blank=True,
        null=True,
    )

    def __str__(self) -> str:
        meeting_text = f"{self.meeting_date} @ {self.host}"
        return meeting_text

    def get_absolute_url(self):
        return reverse("meeting_detail", kwargs={"pk": self.pk})

    @property
    def host_name(self):
        return self.host.username

    @property
    def all_books(self):

        return serializers.serialize("python", self.bookmeeting.all())


class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=100)
    genre = models.CharField(max_length=100, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    publication_date = models.DateField(blank=True, null=True)
    ISBN = models.CharField(max_length=100, blank=True, null=True)
    cover = models.CharField(max_length=200, blank=True, null=True)
    submitter = models.ForeignKey(
        User, related_name="submitter", on_delete=models.CASCADE, blank=True, null=True
    )
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True)
    bookclub = models.ManyToManyField(BookClub)
    meeting = models.ForeignKey(
        Meeting,
        on_delete=models.CASCADE,
        blank=True,
        null=True,
        related_name="meeting",
    )

    @property
    def meeting_detail(self):
        return f"{self.meeting}"

    class Meta:
        ordering = ["-updated_at", "-created_at"]

    def __str__(self) -> str:
        return f"{self.title} by {self.author}"

    def get_absolute_url(self):
        return reverse("book_detail", kwargs={"pk": self.pk})
