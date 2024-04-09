from django.contrib import admin
from django.urls import include, path
from .views import HomePageView, AboutPageView, MeetingListView, MeetingDetailView

urlpatterns = [
    path("", HomePageView.as_view(), name="home"),
    path("about/", AboutPageView.as_view(), name="about"),
    path("meetings/", MeetingListView.as_view(), name="meetings"),
    path("meetings/<int:pk>/", MeetingDetailView.as_view(), name="meeting_detail"),
]
