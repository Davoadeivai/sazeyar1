"""
Loyalty App - Views
"""

from rest_framework import viewsets, permissions, views, response
from .models import LoyaltyPoints
from .serializers import LoyaltyPointsSerializer
import uuid


class LoyaltyViewSet(viewsets.ReadOnlyModelViewSet):
    """View Loyalty Status"""
    
    serializer_class = LoyaltyPointsSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return LoyaltyPoints.objects.filter(user=self.request.user)
    
    def list(self, request, *args, **kwargs):
        # Ensure loyalty record exists
        loyalty, created = LoyaltyPoints.objects.get_or_create(
            user=request.user,
            defaults={'referral_code': str(uuid.uuid4())[:8].upper()}
        )
        serializer = self.get_serializer(loyalty)
        return response.Response(serializer.data)
