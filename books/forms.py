from django import forms
import datetime
from .models import Meeting, Book
from django.forms import widgets


class DateInput(forms.DateInput):
    input_type = "date"


class MeetingForm(forms.ModelForm):
    class Meta:
        model = Meeting
        fields = ["meeting_date", "host", "location", "occured"]
        widgets = {"meeting_date": widgets.DateInput(attrs={"type": "date"})}


class BookForm(forms.ModelForm):
    class Meta:
        model = Book
        fields = "__all__"
        widgets = {"publication_date": widgets.DateInput(attrs={"type": "date"})}


class BookSearchForm(forms.Form):
    author = forms.CharField(label="Author", max_length=100)
    title = forms.CharField(label="Title", max_length=100)
