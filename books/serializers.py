from rest_framework import serializers
from .models import Book, BookClub, Meeting
from django.contrib.auth.models import User


class BookClubSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookClub
        fields = "__all__"


class MeetingSerializer(serializers.ModelSerializer):
    host_name = serializers.ReadOnlyField()
    host = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
    )
    book_chooser = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
    )
    all_books = serializers.PrimaryKeyRelatedField(
        queryset=Book.objects.all(), many=True
    )

    class Meta:
        model = Meeting
        fields = [field.name for field in model._meta.fields]
        fields.append("all_books")
        fields.append("host_name")
        fields.append("book_chooser")


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = [field.name for field in model._meta.fields]
        fields.append("meeting_detail")


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
