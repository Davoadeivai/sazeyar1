"""
Reviews App - Models
"""

from django.db import models
from django.conf import settings
from portfolio.models import PortfolioItem


class Review(models.Model):
    """User Reviews and Ratings for Projects"""
    
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    project = models.ForeignKey(PortfolioItem, on_delete=models.CASCADE, related_name='reviews', null=True, blank=True)
    
    rating = models.PositiveSmallIntegerField(choices=[(i, str(i)) for i in range(1, 6)], verbose_name='امتیاز')
    comment = models.TextField(verbose_name='نظر')
    
    is_verified = models.BooleanField(default=False, verbose_name='تایید شده')
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = 'نظر'
        verbose_name_plural = 'نظرات'
        ordering = ['-created_at']
        
    def __str__(self):
        return f"{self.rating}* - {self.user.full_name}"
