"""
Blog App - Serializers
"""

from rest_framework import serializers
from .models import BlogPost


class BlogPostSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.full_name', read_only=True)
    
    class Meta:
        model = BlogPost
        fields = '__all__'
        read_only_fields = ['id', 'author', 'view_count', 'created_at', 'updated_at']
