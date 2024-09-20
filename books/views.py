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
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Create your views here.
from django.http import JsonResponse


@api_view(["GET"])
def get_routes(request):
    """returns a view containing all the possible routes"""
    routes = ["/api/token", "/api/token/refresh"]

    return Response(routes)


from .serializers import MyTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


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
