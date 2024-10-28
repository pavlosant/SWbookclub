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
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.decorators import login_required
from django.contrib.auth.hashers import make_password
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status

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


@api_view(["POST"])
@permission_classes([AllowAny])  # Allow access without authentication
def register_user(request):
    # Retrieve user data from the request
    username = request.data.get("username")
    password = request.data.get("password")
    email = request.data.get("email")

    if not username or not password or not email:
        return Response(
            {"error": "All fields are required."}, status=status.HTTP_400_BAD_REQUEST
        )

    # Check if the username already exists
    if User.objects.filter(username=username).exists():
        return Response(
            {"error": "Username already exists."}, status=status.HTTP_400_BAD_REQUEST
        )

    # Create and save the user
    user = User.objects.create(
        username=username,
        password=make_password(password),  # hash the password
        email=email,
    )
    user.save()

    return Response(
        {"message": "User created successfully."}, status=status.HTTP_201_CREATED
    )


@login_required
def bookclub_list(request):
    bookclubs = BookClub.objects.all()
    data = {"results": list(bookclubs.values("name"))}

    return JsonResponse(data)


@login_required
def bookclub_detail(request, pk):

    bookclub = get_object_or_404(BookClub, pk=pk)

    data = {
        "results": {
            "name": bookclub.name,
        }
    }
    return JsonResponse(data)


@login_required
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


@login_required
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


@login_required
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


@login_required
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
