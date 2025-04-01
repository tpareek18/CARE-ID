from rest_framework import serializers
from .models import User
from hashlib import sha256


class UserViewSerializer(serializers.ModelSerializer):
    """
    Serializer for the User model to convert model instances to JSON format and vice versa.
    """

    class Meta:
        model = User
        fields = [
            "id",  # Include the primary key for reference
            "first_name",
            "last_name",
            "email",
            "created_at",
            "updated_at",
            "allergies",
            "comorbidities",
            "surgeries",
            "medications",
            "emergency_contact_name",
            "emergency_contact_phone",
            "DNR_status",
            "secure_hash",
        ]


class UserCreateSerializer(serializers.ModelSerializer):
    """
    Serializer for creating a new User instance. Excludes fields that should not be set during creation.
    """

    class Meta:
        model = User
        fields = [
            "first_name",
            "last_name",
            "email",
            "allergies",
            "comorbidities",
            "surgeries",
            "medications",
            "emergency_contact_name",
            "emergency_contact_phone",
            "DNR_status",
        ]

    def create(self, validated_data):
        """
        Override the create method to add a secure hash.
        """
        # You can add custom logic here before creating the instance
        user = super().create(validated_data)
        # Generate the secure_hash here
        string_to_hash = f"{user.first_name}{user.last_name}{user.created_at}"
        user.secure_hash = sha256(string_to_hash.encode()).hexdigest()
        user.save()
        return user


class UserGetByHashSerializer(serializers.Serializer):
    """
    Serializer for getting a user by secure hash.
    """

    hash = serializers.CharField(required=True)

    def validate_hash(self, value):
        if not value:
            raise serializers.ValidationError("Hash value is required.")
        return value
