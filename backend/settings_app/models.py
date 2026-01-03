"""
Settings App - Models
"""

from django.db import models


class SiteSettings(models.Model):
    """Global Site Settings"""
    
    # Social Links
    instagram_url = models.URLField(blank=True, null=True, verbose_name='لینک اینستاگرام')
    telegram_url = models.URLField(blank=True, null=True, verbose_name='لینک تلگرام')
    whatsapp_url = models.URLField(blank=True, null=True, verbose_name='لینک واتساپ')
    
    # Contact Info
    phone_number = models.CharField(max_length=20, default='021-12345678', verbose_name='شماره تماس')
    address = models.TextField(blank=True, null=True, verbose_name='آدرس')
    email = models.EmailField(blank=True, null=True, verbose_name='ایمیل پشتیبانی')
    
    # Features
    ai_enabled = models.BooleanField(default=True, verbose_name='فعال‌سازی هوش مصنوعی')
    bookings_enabled = models.BooleanField(default=True, verbose_name='فعال‌سازی سیستم رزرو')
    
    # Content
    hero_title = models.CharField(max_length=200, default='بازسازی هوشمند خانه شما', verbose_name='عنوان هیرو')
    hero_subtitle = models.CharField(max_length=300, blank=True, null=True, verbose_name='زیرعنوان هیرو')
    
    # Trust
    enamad_url = models.URLField(blank=True, null=True, verbose_name='لینک اینماد')
    
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = 'تنظیمات سایت'
        verbose_name_plural = 'تنظیمات سایت'
    
    def __str__(self):
        return f"تنظیمات سایت (بروزرسانی: {self.updated_at.date()})"
    
    def save(self, *args, **kwargs):
        # Ensure only one instance exists
        if not self.pk and SiteSettings.objects.exists():
            return SiteSettings.objects.first()
        return super().save(*args, **kwargs)
