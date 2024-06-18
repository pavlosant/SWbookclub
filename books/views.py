from typing import Any
from django.http import HttpResponseRedirect
from django.http import HttpResponse, Http404
from django.db.models.query import QuerySet
from django.shortcuts import render
from books.models import Meeting, Book, BookClub
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404
from django.views.generic import (
    TemplateView,
    ListView,
    DetailView,
    CreateView,
    UpdateView,
)
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from django_filters.rest_framework import DjangoFilterBackend

from .serializers import (
    BookSerializer,
    BookClubSerializer,
    MeetingSerializer,
    UserSerializer,
)
import requests
from datetime import datetime
from .forms import MeetingForm, BookForm, BookSearchForm
import json

# Create your views here.


def bookclub_list(request):
    bookclubs = BookClub.objects.all()
    data = {"results": list(bookclubs.values("name"))}

    return JsonResponse(data)


def bookclub_detail(request, pk):
    bookclub = get_object_or_404(BookClub, pk=pk)

    data = {
        "results": {
            "name": bookclub.name,
        }
    }
    return JsonResponse(data)


def meetings_list(request):
    meetings = Meeting.objects.all()
    data = {
        "results": list(
            meetings.values(
                "meeting_date", "location", "host__username", "chooser__username"
            )
        )
    }
    return JsonResponse(data)


def meetings_detail(request, pk):
    meeting = get_object_or_404(Meeting, pk=pk)
    chooser_username = ""
    if meeting.chooser is not None:
        chooser_username = meeting.chooser.username
    data = {
        "results": {
            "meeting_date": meeting.meeting_date,
            "location": meeting.location,
            "host": meeting.host.username,
            "chooser": chooser_username,
        }
    }
    return JsonResponse(data)


def books_list(request):
    books = Book.objects.all()
    data = {
        "results": list(
            books.values(
                "title",
                "author",
                "genre",
                "description",
                "publication_date",
                "ISBN",
                "cover",
                "submitter__username",
                "created_at",
                "updated_at",
                "bookclub__name",
                "meeting",
            )
        )
    }
    return JsonResponse(data)


def books_detail(request, pk):
    book = get_object_or_404(Book, pk=pk)
    print(book)
    submitter_username = ""
    if book.submitter:
        submitter_username = book.submitter.username

    data = {
        "results": {
            "title": book.title,
            "author": book.author,
            "genre": book.genre,
            "description": book.description,
            "publication_date": book.publication_date,
            "ISBN": book.ISBN,
            "cover": book.cover,
            "submitter": submitter_username,
            "created_at": book.created_at,
            "updated_at": book.updated_at,
            "bookclub": book.bookclub.name,
            "meeting": book.meeting,
        }
    }
    return JsonResponse(data)


class HomePageView(TemplateView):
    template_name = "home.html"

    def get_context_data(self, *args, **kwargs):
        today = datetime.today()
        context = super(HomePageView, self).get_context_data(*args, **kwargs)
        context["meetings"] = Meeting.objects.filter(meeting_date__gte=today).order_by(
            "meeting_date"
        )[0:1]
        return context


class AboutPageView(TemplateView):
    template_name = "about.html"


class MeetingListView(ListView):
    model = Meeting

    context_object_name = "meeting_list"
    template_name = "meetings.html"

    def get_queryset(self) -> QuerySet[Any]:
        today = datetime.today()
        queryset = {
            "future_meetings": Meeting.objects.filter(meeting_date__gte=today).order_by(
                "meeting_date"
            ),
            "past_meetings": Meeting.objects.filter(meeting_date__lte=today).order_by(
                "meeting_date"
            ),
        }
        return queryset


class MeetingDetailView(DetailView):
    model = Meeting
    template_name = "meeting_detail.html"


class MeetingCreateView(CreateView):
    model = Meeting
    form_class = MeetingForm
    template_name = "meeting_new.html"
    # fields = ["meeting_date", "host", "location", "occured"]
    success_url = "/meetings/"

    def get_initial(self, *args, **kwargs):
        today = datetime.today()
        initial = super().get_initial(**kwargs)
        initial["location"] = "Saffron Walden"
        initial["meeting_date"] = today
        return initial


class MeetingUpdateView(UpdateView):
    model = Meeting
    form_class = MeetingForm
    template_name = "meeting_edit.html"


class BookCreateView(CreateView):
    model = Book
    form_class = BookForm
    template_name = "book_new.html"

    def get_initial(self, *args, **kwargs):
        initial = super().get_initial(**kwargs)

        initial["title"] = args.title
        # initial["title"] = self.request.volumeInfo.title
        # initial["publication_date"] = ""

        return initial


class BookDetailView(DetailView):
    model = Book
    template_name = "book_detail.html"


def book_search(request):
    if request.method == "POST":
        form = BookSearchForm(request.POST)
        if form.is_valid():
            author = form.cleaned_data["author"]
            title = form.cleaned_data["title"]
            data = requests.get(
                f"https://www.googleapis.com/books/v1/volumes?q={title}+inauthor:{author}"
            )
            if data:
                book = data.json()
                first_book = book["items"][0]
                print(first_book)
                return render(
                    request,
                    "book_new.html",
                    {
                        # "books": first_book,
                        "title": first_book["volumeInfo"]["title"],
                        "author": first_book["volumeInfo"]["authors"][0],
                        "description": first_book["volumeInfo"]["description"],
                        "thumbnail": first_book["volumeInfo"]["imageLinks"][
                            "thumbnail"
                        ],
                    },
                )

    # if a GET (or any other method) we'll create a blank form
    else:
        form = BookSearchForm()

    return render(request, "book_search.html", {"form": form})


def book_save(request):
    if request.method == "POST":

        data = request.POST.get("book")
        print(data)
        return render(
            request,
            "book_new.html",
            {
                "book": data,
                # "title": first_book["volumeInfo"]["title"],
                # "author": first_book["volumeInfo"]["authors"][0],
                # "description": first_book["volumeInfo"]["description"],
                # "thumbnail": first_book["volumeInfo"]["imageLinks"]["thumbnail"],
            },
        )


class BookView(viewsets.ModelViewSet):

    serializer_class = BookSerializer

    def get_queryset(self):
        queryset = Book.objects.all()
        book_club = self.request.query_params.get("club")
        if book_club is not None:
            queryset = queryset.filter(bookclub__name__icontains=book_club)
        return queryset


class BookClubView(viewsets.ModelViewSet):
    serializer_class = BookClubSerializer
    queryset = BookClub.objects.all()


class MeetingView(viewsets.ModelViewSet):
    serializer_class = MeetingSerializer
    queryset = Meeting.objects.all()


class UsersView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
