from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from .models import Book, Meeting, BookClub
from .serializers import BookSerializer, BookClubSerializer, MeetingSerializer


class BookList(generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer


# class BookList(APIView):
#        books = Book.objects.all()
##    def get(self, request):
#        data = BookSerializer(books, many=True).data
#        return Response(data)


class BookDetail(generics.RetrieveDestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
