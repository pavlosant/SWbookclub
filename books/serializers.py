from rest_framework import serializers
from .models import Book, BookClub, Meeting


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = "__all__"


class BookClubSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookClub
        fields = "__all__"


class MeetingSerializer(serializers.ModelSerializer):
    host_name = serializers.ReadOnlyField()

    class Meta:
        model = Meeting
        fields = "__all__"
