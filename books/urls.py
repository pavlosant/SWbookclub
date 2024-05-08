from django.contrib import admin
from django.urls import include, path

from .views import (
    HomePageView,
    AboutPageView,
    MeetingListView,
    MeetingDetailView,
    MeetingCreateView,
    MeetingUpdateView,
    BookCreateView,
    book_search,
    BookDetailView,
)

urlpatterns = [
    path("", HomePageView.as_view(), name="home"),
    path("about/", AboutPageView.as_view(), name="about"),
    path("meetings/", MeetingListView.as_view(), name="meetings"),
    path("meetings/<int:pk>/", MeetingDetailView.as_view(), name="meeting_detail"),
    path("meetings/<int:pk>/edit/", MeetingUpdateView.as_view(), name="meeting_edit"),
    path("meetings/new/", MeetingCreateView.as_view(), name="meeting_new"),
    path("book/new/", BookCreateView.as_view(), name="book_new"),
    path("book/search", book_search, name="book_search"),
    path("book/<int:pk>/", BookDetailView.as_view(), name="book_detail"),
]
