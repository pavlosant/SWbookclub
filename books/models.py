from django.db import models
from django.contrib.auth.models import User
from django.urls import reverse

# Create your models here.


class BookClub(models.Model):
    name = models.CharField(max_length=100, default="BookClub")
    readers = models.ManyToManyField(User)

    def __str__(self) -> str:
        return f"{self.name.capitalize()}"


class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=100)
    genre = models.CharField(max_length=100, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    publication_date = models.DateField(blank=True, null=True)
    ISBN = models.CharField(max_length=100, blank=True, null=True)
    cover = models.CharField(max_length=200, blank=True, null=True)

    def __str__(self) -> str:
        return f"{self.title} by {self.author}"

    def get_absolute_url(self):
        return reverse("book_detail", kwargs={"pk": self.pk})


class Meeting(models.Model):
    meeting_date = models.DateField()
    occured = models.BooleanField()
    location = models.TextField()
    host = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self) -> str:
        meeting_text = f"{self.meeting_date} @ {self.host}"
        return meeting_text

    def get_absolute_url(self):
        return reverse("meeting_detail", kwargs={"pk": self.pk})

    @property
    def host_name(self):
        return self.host.username

    @property
    def book_name(self):
        return f"{self.book.title}:{self.book.author}"


class Book_List(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    bookclub = models.ForeignKey(
        BookClub, on_delete=models.CASCADE, blank=True, null=True
    )
    books = models.ManyToManyField(Book, blank=True)

    def __str__(self) -> str:
        if self.owner:
            return f"{self.owner.name}'s list"
        if self.bookclub:
            return f"{self.bookclub.name}'s list"

    def get_queryset(self):
        list_owner = self.request.query_params.get("owner")
        list_book_club = self.request.query_params.get("bookclub")
        if list_owner:
            queryset = Book_List.objects.filter(self.owner == list_owner)
        if list_book_club:
            queryset = Book_List.objects.filter(self.bookclub == list_book_club)

        return queryset

    @property
    def book_names(self):
        book_names = []
        for book in self.books.all():
            book_names.append(f"{book.title}:{book.author}")
            return book_names

    @property
    def owner_name(self):
        if self.owner:
            return f"{self.owner.name}"

    @property
    def bookclub_name(self):
        if self.bookclub:
            return f"{self.bookclub.name}"
