"""
Portfolio App - Models
"""

from django.db import models
from django.conf import settings


class PortfolioItem(models.Model):
    """Portfolio/Project Item"""
    
    title = models.CharField(max_length=200, verbose_name='عنوان پروژه')
    description = models.TextField(verbose_name='توضیحات')
    cover_image = models.ImageField(upload_to='portfolio/covers/', blank=True, null=True, verbose_name='تصویر کاور')
    location = models.CharField(max_length=200, blank=True, null=True, verbose_name='موقعیت')
    completion_date = models.DateField(blank=True, null=True, verbose_name='تاریخ اتمام')
    
    # Videos
    before_video_url = models.URLField(blank=True, null=True, verbose_name='لینک ویدیو قبل')
    after_video_url = models.URLField(blank=True, null=True, verbose_name='لینک ویدیو بعد')
    
    # Metadata
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.SET_NULL, 
        null=True, 
        related_name='portfolio_items'
    )
    is_featured = models.BooleanField(default=False, verbose_name='نمایش ویژه')
    view_count = models.PositiveIntegerField(default=0, verbose_name='تعداد بازدید')
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = 'نمونه کار'
        verbose_name_plural = 'نمونه کارها'
        ordering = ['-created_at']
    
    def __str__(self):
        return self.title


class PortfolioImage(models.Model):
    """Gallery images for portfolio items"""
    
    portfolio = models.ForeignKey(
        PortfolioItem, 
        on_delete=models.CASCADE, 
        related_name='gallery_images'
    )
    image = models.ImageField(upload_to='portfolio/gallery/', verbose_name='تصویر')
    caption = models.CharField(max_length=200, blank=True, null=True, verbose_name='توضیح تصویر')
    order = models.PositiveIntegerField(default=0, verbose_name='ترتیب')
    
    class Meta:
        verbose_name = 'تصویر گالری'
        verbose_name_plural = 'تصاویر گالری'
        ordering = ['order']
    
    def __str__(self):
        return f"{self.portfolio.title} - تصویر {self.order}"


class PortfolioTag(models.Model):
    """Tags for portfolio items"""
    
    name = models.CharField(max_length=50, unique=True, verbose_name='نام تگ')
    slug = models.SlugField(unique=True, allow_unicode=True)
    
    class Meta:
        verbose_name = 'تگ'
        verbose_name_plural = 'تگ‌ها'
    
    def __str__(self):
        return self.name
