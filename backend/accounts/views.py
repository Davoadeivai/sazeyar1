"""
Accounts App - Views
"""

from rest_framework import generics, status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from .models import UserProfile, UserActivity
from .serializers import (
    UserRegistrationSerializer, 
    UserSerializer, 
    UserProfileSerializer,
    UserActivitySerializer
)

User = get_user_model()


class UserRegistrationView(generics.CreateAPIView):
    """Register a new user"""
    
    serializer_class = UserRegistrationSerializer
    permission_classes = [permissions.AllowAny]
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        return Response({
            'message': 'ثبت‌نام با موفقیت انجام شد',
            'user': UserSerializer(user).data
        }, status=status.HTTP_201_CREATED)


class CurrentUserView(APIView):
    """Get current authenticated user"""
    
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
    
    def patch(self, request):
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class UserProfileView(generics.RetrieveUpdateAPIView):
    """User profile view"""
    
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self):
        profile, _ = UserProfile.objects.get_or_create(user=self.request.user)
        return profile


class UserListView(generics.ListAPIView):
    """List all users (Admin only)"""
    
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]
    queryset = User.objects.all()
    filterset_fields = ['role']
    search_fields = ['full_name', 'email', 'phone']
    ordering_fields = ['date_joined', 'full_name']


class UserActivityListView(generics.ListAPIView):
    """List user activities"""
    
    serializer_class = UserActivitySerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return UserActivity.objects.filter(user=self.request.user)
