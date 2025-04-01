from django.urls import path, include
from rest_framework import routers
from .views import UserViewSet, CreateUserViewSet

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r"users", UserViewSet)
router.register(r"create-user", CreateUserViewSet, basename="create-user")
