"""
Portfolio App - Views
"""

from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import F
from .models import PortfolioItem, PortfolioImage
from .serializers import PortfolioItemSerializer, PortfolioItemCreateSerializer


class PortfolioViewSet(viewsets.ModelViewSet):
    """Portfolio CRUD operations"""
    
    queryset = PortfolioItem.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_fields = ['is_featured', 'location']
    search_fields = ['title', 'description', 'location']
    ordering_fields = ['created_at', 'view_count']
    
    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return PortfolioItemCreateSerializer
        return PortfolioItemSerializer
    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
    
    def retrieve(self, request, *args, **kwargs):
        """Increment view count on retrieve"""
        instance = self.get_object()
        PortfolioItem.objects.filter(pk=instance.pk).update(view_count=F('view_count') + 1)
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get featured portfolio items"""
        featured = self.queryset.filter(is_featured=True)[:6]
        serializer = self.get_serializer(featured, many=True)
        return Response(serializer.data)
