"""
Accounts App - URLs
"""

from django.urls import path
from .views import (
    UserRegistrationView,
    CurrentUserView,
    UserProfileView,
    UserListView,
    UserActivityListView
)

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='user-register'),
    path('me/', CurrentUserView.as_view(), name='current-user'),
    path('profile/', UserProfileView.as_view(), name='user-profile'),
    path('', UserListView.as_view(), name='user-list'),
    path('activities/', UserActivityListView.as_view(), name='user-activities'),
]
