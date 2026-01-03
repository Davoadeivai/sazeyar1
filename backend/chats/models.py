"""
Chats App - Models
"""

from django.db import models
from django.conf import settings


class ChatSession(models.Model):
    """AI Chat Session"""
    
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name='chat_sessions'
    )
    title = models.CharField(max_length=200, verbose_name='عنوان گفتگو')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = 'گفتگو'
        verbose_name_plural = 'گفتگوها'
        ordering = ['-updated_at']
    
    def __str__(self):
        return f"{self.user.full_name} - {self.title}"


class ChatMessage(models.Model):
    """Individual Chat Message"""
    
    session = models.ForeignKey(
        ChatSession, 
        on_delete=models.CASCADE, 
        related_name='messages'
    )
    role = models.CharField(max_length=20, choices=[('user', 'User'), ('model', 'Model')])
    text = models.TextField()
    image_url = models.URLField(blank=True, null=True, verbose_name='لینک تصویر')
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = 'پیام'
        verbose_name_plural = 'پیام‌ها'
        ordering = ['created_at']
    
    def __str__(self):
        return f"{self.role}: {self.text[:50]}..."
