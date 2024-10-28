from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated

from .models import Book, Meeting, BookClub, User
from .serializers import (
    BookSerializer,
    BookClubSerializer,
    MeetingSerializer,
    UserSerializer,
)


class BookList(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Book.objects.all()
    serializer_class = BookSerializer


# class BookList(APIView):
#        books = Book.objects.all()
##    def get(self, request):
#        data = BookSerializer(books, many=True).data
#        return Response(data)
class BookDetail(generics.RetrieveDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Book.objects.all()
    serializer_class = BookSerializer


class MeetingList(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Meeting.objects.all()
    serializer_class = MeetingSerializer


class MeetingDetail(generics.RetrieveDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Meeting.objects.all()
    serializer_class = MeetingSerializer


class MeetingBookList(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Book.objects.filter(bookmeeting=self.kwargs["pk"])
        return queryset

    serializer_class = BookSerializer


class UserList(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer
