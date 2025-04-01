from django.shortcuts import render
from rest_framework import viewsets, routers
from .models import User
from .serializers import (
    UserViewSerializer,
    UserCreateSerializer,
    UserGetByHashSerializer,
)
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import logout
from rest_framework.decorators import action


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserViewSerializer


class CreateUserViewSet(viewsets.ModelViewSet):
    """
    Viewset for creating a new user. Inherits from ModelViewSet for consistency.
    """

    queryset = User.objects.all()
    serializer_class = UserCreateSerializer

    def get_queryset(self):
        return (
            User.objects.none()
        )  # Override to prevent listing all users in this viewset


class UserGetByHashView(APIView):
    """
    API View to retrieve a user by their secure hash.
    """

    def get(self, request):
        return Response(
            {"detail": "Please use POST method with a hash value."},
            status=status.HTTP_200_OK,
        )

    def post(self, request):
        hash_value = request.data.get("hash", None)
        if not hash_value:
            return Response(
                {"detail": "Hash value is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
            user = User.objects.get(secure_hash=hash_value)
        except User.DoesNotExist:
            return Response(
                {"detail": "User with the provided hash does not exist."},
                status=status.HTTP_404_NOT_FOUND,
            )
        serializer = self.get_serializer(user)
        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )


class Logout(APIView):
    def get(self, request, format=None):
        logout(request)
        return Response(
            {"detail": "Successfully logged out."},
            status=status.HTTP_200_OK,
        )
