"""
Loyalty App - Models
"""

from django.db import models
from django.conf import settings


class LoyaltyPoints(models.Model):
    """User Loyalty Points"""
    
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='loyalty')
    total_points = models.PositiveIntegerField(default=0, verbose_name='کل امتیازات')
    current_tier = models.CharField(max_length=20, default='BRONZE', verbose_name='سطح کاربری')
    
    referral_code = models.CharField(max_length=20, unique=True, verbose_name='کد معرف')
    referred_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True, 
        related_name='referrals'
    )
    
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = 'امتیاز وفاداری'
        verbose_name_plural = 'امتیازات وفاداری'
        
    def __str__(self):
        return f"{self.user.full_name} - {self.total_points} pts"
