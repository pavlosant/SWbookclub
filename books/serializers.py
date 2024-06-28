from rest_framework import serializers
from .models import Book, BookClub, Meeting
from django.contrib.auth.models import User


class BookClubSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookClub
        fields = "__all__"


class MeetingSerializer(serializers.ModelSerializer):
    meeting_date = serializers.DateField()

    class Meta:
        model = Meeting
        fields = "__all__"


class BookSerializer(serializers.ModelSerializer):
    book_discussed = serializers.ReadOnlyField()

    class Meta:
        model = Book
        fields = [field.name for field in model._meta.fields]
        fields.append("book_discussed")


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
