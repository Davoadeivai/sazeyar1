"""
Portfolio App - Serializers
"""

from rest_framework import serializers
from .models import PortfolioItem, PortfolioImage, PortfolioTag


class PortfolioImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PortfolioImage
        fields = ['id', 'image', 'caption', 'order']


class PortfolioTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = PortfolioTag
        fields = ['id', 'name', 'slug']


class PortfolioItemSerializer(serializers.ModelSerializer):
    gallery_images = PortfolioImageSerializer(many=True, read_only=True)
    
    class Meta:
        model = PortfolioItem
        fields = [
            'id', 'title', 'description', 'cover_image', 'location',
            'completion_date', 'before_video_url', 'after_video_url',
            'gallery_images', 'is_featured', 'view_count',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'view_count', 'created_at', 'updated_at']


class PortfolioItemCreateSerializer(serializers.ModelSerializer):
    gallery_images = serializers.ListField(
        child=serializers.ImageField(),
        write_only=True,
        required=False
    )
    
    class Meta:
        model = PortfolioItem
        fields = [
            'title', 'description', 'cover_image', 'location',
            'completion_date', 'before_video_url', 'after_video_url',
            'gallery_images', 'is_featured'
        ]
    
    def create(self, validated_data):
        gallery_images = validated_data.pop('gallery_images', [])
        portfolio = PortfolioItem.objects.create(**validated_data)
        
        for index, image in enumerate(gallery_images):
            PortfolioImage.objects.create(
                portfolio=portfolio,
                image=image,
                order=index
            )
        
        return portfolio
