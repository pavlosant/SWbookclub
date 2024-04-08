from django.shortcuts import render
from books.models import Meeting
from django.views.generic import TemplateView, ListView


# Create your views here.


class HomePageView(TemplateView):
    template_name = "home.html"


class AboutPageView(TemplateView):
    template_name = "about.html"


class MeetingListView(ListView):
    model = Meeting
    template_name = "meetings.html"
