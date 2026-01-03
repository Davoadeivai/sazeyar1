"""
Orders App - Models
"""

from django.db import models
from django.conf import settings


class ServiceOrder(models.Model):
    """Service order/request model"""
    
    class Status(models.TextChoices):
        PENDING = 'PENDING', 'در انتظار'
        CONTACTED = 'CONTACTED', 'تماس گرفته شد'
        IN_PROGRESS = 'IN_PROGRESS', 'در حال انجام'
        COMPLETED = 'COMPLETED', 'تکمیل شده'
        CANCELLED = 'CANCELLED', 'لغو شده'
    
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True,
        related_name='orders'
    )
    service_title = models.CharField(max_length=200, verbose_name='عنوان سرویس')
    full_name = models.CharField(max_length=150, verbose_name='نام کامل')
    phone = models.CharField(max_length=15, verbose_name='شماره تماس')
    description = models.TextField(blank=True, null=True, verbose_name='توضیحات')
    status = models.CharField(
        max_length=20, 
        choices=Status.choices, 
        default=Status.PENDING,
        verbose_name='وضعیت'
    )
    
    # Admin notes
    admin_notes = models.TextField(blank=True, null=True, verbose_name='یادداشت ادمین')
    estimated_cost = models.DecimalField(
        max_digits=12, 
        decimal_places=0, 
        blank=True, 
        null=True,
        verbose_name='هزینه تخمینی (تومان)'
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = 'سفارش'
        verbose_name_plural = 'سفارشات'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.service_title} - {self.full_name}"
