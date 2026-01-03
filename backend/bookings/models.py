"""
Bookings App - Models
"""

from django.db import models
from django.conf import settings


class Booking(models.Model):
    """Appointment Booking"""
    
    STATUS_CHOICES = [
        ('PENDING', 'در انتظار تایید'),
        ('CONFIRMED', 'تایید شده'),
        ('COMPLETED', 'انجام شده'),
        ('CANCELLED', 'لغو شده'),
    ]
    
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='bookings')
    date = models.DateField(verbose_name='تاریخ')
    time_slot = models.CharField(max_length=20, verbose_name='بازه زمانی') # e.g., "10:00 - 12:00"
    address = models.TextField(verbose_name='آدرس بازدید')
    description = models.TextField(blank=True, null=True, verbose_name='توضیحات')
    
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING', verbose_name='وضعیت')
    admin_notes = models.TextField(blank=True, null=True, verbose_name='یادداشت ادمین')
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = 'رزرو بازدید'
        verbose_name_plural = 'رزروهای بازدید'
        ordering = ['-date', '-time_slot']
        unique_together = ['date', 'time_slot'] # Prevent double booking
        
    def __str__(self):
        return f"{self.date} {self.time_slot} - {self.user.full_name}"
