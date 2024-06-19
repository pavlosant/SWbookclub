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
    bookclub_list,
    bookclub_detail,
)

from .apiviews import BookList, BookDetail, MeetingList, MeetingDetail, MeetingBookList

urlpatterns = [
    path("meetings/", MeetingList.as_view(), name="meetings_list"),
    path("meetings/<int:pk>/", MeetingDetail.as_view(), name="meetings_detail"),
    path("meetings/<int:pk>/book/", MeetingBookList.as_view(), name="meetings_book"),
    path("books/", BookList.as_view(), name="books_list"),
    path("books/<int:pk>/", BookDetail.as_view(), name="books_detail"),
    # path("books/", books_list, name="books_list"),
    # path("books/<int:pk>/", books_detail, name="books_detail"),
    path("bookclubs/", bookclub_list, name="bookclub_list"),
    path("bookclubs/<int:pk>/", bookclub_detail, name="bookclub_detail"),
    path("", HomePageView.as_view(), name="home"),
    path("about/", AboutPageView.as_view(), name="about"),
    path("meetings/<int:pk>/edit/", MeetingUpdateView.as_view(), name="meeting_edit"),
    path("meetings/new/", MeetingCreateView.as_view(), name="meeting_new"),
    path("book/new/", BookCreateView.as_view(), name="book_new"),
    path("book/search", book_search, name="book_search"),
    # path("book/<int:pk>/", BookDetailView.as_view(), name="book_detail"),
]
