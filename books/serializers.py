from rest_framework import serializers
from .models import Book, BookClub, Meeting, Book_List


class BookClubSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookClub
        fields = "__all__"


class MeetingSerializer(serializers.ModelSerializer):
    host_name = serializers.ReadOnlyField()
    book_name = serializers.ReadOnlyField()

    class Meta:
        model = Meeting
        fields = "__all__"


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = "__all__"


class BookListSerializer(serializers.ModelSerializer):

    owner_name = serializers.ReadOnlyField()
    bookclub_name = serializers.ReadOnlyField()
    book_names = serializers.ReadOnlyField()

    def create(self, validated_data):
        books = [Book(**item) for item in validated_data]
        return Book.objects.bulk_create(books)

    class Meta:
        model = Book_List
        fields = "__all__"
