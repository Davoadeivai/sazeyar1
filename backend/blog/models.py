"""
Blog App - Models
"""

from django.db import models
from django.conf import settings


class BlogPost(models.Model):
    """Educational Blog Posts"""
    
    title = models.CharField(max_length=200, verbose_name='عنوان')
    slug = models.SlugField(unique=True, allow_unicode=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, verbose_name='نویسنده')
    content = models.TextField(verbose_name='محتوا')
    cover_image = models.ImageField(upload_to='blog/covers/', verbose_name='تصویر کاور')
    
    tags = models.CharField(max_length=200, help_text='Comma separated tags', blank=True)
    is_published = models.BooleanField(default=True, verbose_name='منتشر شده')
    view_count = models.PositiveIntegerField(default=0, verbose_name='تعداد بازدید')
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = 'مقاله'
        verbose_name_plural = 'مقالات'
        ordering = ['-created_at']
        
    def __str__(self):
        return self.title
