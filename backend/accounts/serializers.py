"""
Accounts App - Serializers
"""

from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import UserProfile, UserActivity

User = get_user_model()


class UserRegistrationSerializer(serializers.ModelSerializer):
    """Serializer for user registration"""
    
    password = serializers.CharField(write_only=True, min_length=6)
    password_confirm = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ['email', 'full_name', 'phone', 'password', 'password_confirm', 'role']
        extra_kwargs = {
            'role': {'required': False}
        }
    
    def validate(self, data):
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError({'password_confirm': 'رمز عبور و تکرار آن مطابقت ندارند'})
        
        # Prevent users from registering as ADMIN
        if data.get('role') == 'ADMIN':
            data['role'] = 'HOMEOWNER'
        
        return data
    
    def create(self, validated_data):
        validated_data.pop('password_confirm')
        password = validated_data.pop('password')
        
        user = User.objects.create_user(
            username=validated_data['email'],
            email=validated_data['email'],
            password=password,
            **{k: v for k, v in validated_data.items() if k not in ['email']}
        )
        
        # Create profile
        UserProfile.objects.create(user=user)
        
        return user


class UserSerializer(serializers.ModelSerializer):
    """Basic user serializer"""
    
    class Meta:
        model = User
        fields = ['id', 'email', 'full_name', 'phone', 'role', 'avatar', 'date_joined', 'last_login']
        read_only_fields = ['id', 'email', 'date_joined', 'last_login']


class UserProfileSerializer(serializers.ModelSerializer):
    """User profile serializer"""
    
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = UserProfile
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']


class UserActivitySerializer(serializers.ModelSerializer):
    """User activity log serializer"""
    
    class Meta:
        model = UserActivity
        fields = ['id', 'action', 'details', 'created_at']
        read_only_fields = ['id', 'created_at']
