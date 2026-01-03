"""
Orders App - Views
"""

from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import ServiceOrder
from .serializers import ServiceOrderSerializer, ServiceOrderAdminSerializer


class IsAdminOrOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user.is_staff:
            return True
        return obj.user == request.user


class ServiceOrderViewSet(viewsets.ModelViewSet):
    """Service Order CRUD operations"""
    
    queryset = ServiceOrder.objects.all()
    permission_classes = [permissions.AllowAny]  # Allow guest orders
    filterset_fields = ['status']
    search_fields = ['full_name', 'phone', 'service_title']
    ordering_fields = ['created_at', 'status']
    
    def get_serializer_class(self):
        if self.request.user.is_staff:
            return ServiceOrderAdminSerializer
        return ServiceOrderSerializer
    
    def get_queryset(self):
        if self.request.user.is_staff:
            return ServiceOrder.objects.all()
        elif self.request.user.is_authenticated:
            return ServiceOrder.objects.filter(user=self.request.user)
        return ServiceOrder.objects.none()
    
    def perform_create(self, serializer):
        if self.request.user.is_authenticated:
            serializer.save(user=self.request.user)
        else:
            serializer.save()
    
    @action(detail=True, methods=['patch'], permission_classes=[permissions.IsAdminUser])
    def update_status(self, request, pk=None):
        """Admin endpoint to update order status"""
        order = self.get_object()
        new_status = request.data.get('status')
        
        if new_status not in dict(ServiceOrder.Status.choices):
            return Response(
                {'error': 'وضعیت نامعتبر است'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        order.status = new_status
        order.save()
        
        return Response(ServiceOrderAdminSerializer(order).data)
