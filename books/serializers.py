from rest_framework import serializers
from .models import Book, BookClub, Meeting


class BookClubSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookClub
        fields = "__all__"


class MeetingSerializer(serializers.ModelSerializer):
    host_name = serializers.ReadOnlyField()

    class Meta:
        model = Meeting
        fields = [field.name for field in model._meta.fields]
        fields.append("all_books")
        fields.append("host_name")


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = [field.name for field in model._meta.fields]
        fields.append("meeting_detail")
