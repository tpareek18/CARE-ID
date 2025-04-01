from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser

# Create your models here.
from django.db import models


# Create your models here.
class User(AbstractBaseUser):
    """
    Model to represent a user in the careID system.
    """

    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    allergies = models.TextField(blank=True, null=True)
    comorbidities = models.TextField(blank=True, null=True)
    surgeries = models.TextField(blank=True, null=True)
    medications = models.TextField(blank=True, null=True)
    emergency_contact_name = models.CharField(max_length=100, blank=True, null=True)
    emergency_contact_phone = models.CharField(max_length=15, blank=True, null=True)
    DNR_status = models.BooleanField(default=False)
    secure_hash = models.CharField(
        max_length=255, blank=False, null=False, unique=True
    )  # Generated in the backend for secure identification

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.email})"
