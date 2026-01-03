"""
Orders App - Serializers
"""

from rest_framework import serializers
from .models import ServiceOrder


class ServiceOrderSerializer(serializers.ModelSerializer):
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    
    class Meta:
        model = ServiceOrder
        fields = [
            'id', 'service_title', 'full_name', 'phone', 'description',
            'status', 'status_display', 'estimated_cost', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'status', 'estimated_cost', 'created_at', 'updated_at']


class ServiceOrderAdminSerializer(serializers.ModelSerializer):
    """Admin serializer with all fields"""
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    
    class Meta:
        model = ServiceOrder
        fields = '__all__'
