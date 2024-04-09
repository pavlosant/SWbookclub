from typing import Any
from django.db.models.query import QuerySet
from django.shortcuts import render
from books.models import Meeting
from django.views.generic import TemplateView, ListView, DetailView
from datetime import datetime

# Create your views here.


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
