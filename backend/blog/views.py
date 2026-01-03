"""
Blog App - Views
"""

from rest_framework import viewsets, permissions
from django.db.models import F
from .models import BlogPost
from .serializers import BlogPostSerializer


class BlogPostViewSet(viewsets.ModelViewSet):
    """Blog CRUD"""
    
    queryset = BlogPost.objects.filter(is_published=True)
    serializer_class = BlogPostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    search_fields = ['title', 'content', 'tags']
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
        
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        BlogPost.objects.filter(pk=instance.pk).update(view_count=F('view_count') + 1)
        return super().retrieve(request, *args, **kwargs)
