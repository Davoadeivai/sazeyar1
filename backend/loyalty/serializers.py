"""
Loyalty App - Serializers
"""

from rest_framework import serializers
from .models import LoyaltyPoints


class LoyaltyPointsSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoyaltyPoints
        fields = '__all__'
        read_only_fields = ['user', 'total_points', 'current_tier', 'referral_code']
