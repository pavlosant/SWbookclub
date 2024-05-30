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
    books = BookSerializer(read_only=True, many=True)

    # def create(self, validated_data):
    #     """
    #     Create and return a new Bool_List instance, given the validated data.
    #     """
    #     return Book_List.objects.create(**validated_data)

    class Meta:
        model = Book_List
        fields = "__all__"
