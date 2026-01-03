"""
Accounts App - User Models
"""

from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
    """Custom User Model with additional fields"""
    
    class Role(models.TextChoices):
        HOMEOWNER = 'HOMEOWNER', 'کارفرما'
        PROFESSIONAL = 'PROFESSIONAL', 'متخصص'
        ADMIN = 'ADMIN', 'مدیر سیستم'
    
    full_name = models.CharField(max_length=150, verbose_name='نام کامل')
    phone = models.CharField(max_length=15, blank=True, null=True, verbose_name='شماره تماس')
    role = models.CharField(
        max_length=20, 
        choices=Role.choices, 
        default=Role.HOMEOWNER,
        verbose_name='نقش'
    )
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True, verbose_name='تصویر پروفایل')
    last_login_ip = models.GenericIPAddressField(blank=True, null=True)
    
    class Meta:
        verbose_name = 'کاربر'
        verbose_name_plural = 'کاربران'
    
    def __str__(self):
        return f"{self.full_name} ({self.email})"


class UserProfile(models.Model):
    """Extended User Profile"""
    
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='profile')
    bio = models.TextField(blank=True, null=True, verbose_name='درباره من')
    address = models.TextField(blank=True, null=True, verbose_name='آدرس')
    national_code = models.CharField(max_length=10, blank=True, null=True, verbose_name='کد ملی')
    
    # For Professionals
    company_name = models.CharField(max_length=200, blank=True, null=True, verbose_name='نام شرکت')
    license_number = models.CharField(max_length=50, blank=True, null=True, verbose_name='شماره پروانه')
    specialties = models.JSONField(default=list, blank=True, verbose_name='تخصص‌ها')
    
    # Notifications
    email_notifications = models.BooleanField(default=True, verbose_name='اعلان ایمیلی')
    sms_notifications = models.BooleanField(default=True, verbose_name='اعلان پیامکی')
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = 'پروفایل کاربر'
        verbose_name_plural = 'پروفایل‌های کاربران'
    
    def __str__(self):
        return f"پروفایل {self.user.full_name}"


class UserActivity(models.Model):
    """User Activity Log"""
    
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='activities')
    action = models.CharField(max_length=100, verbose_name='عملیات')
    details = models.TextField(blank=True, null=True, verbose_name='جزئیات')
    ip_address = models.GenericIPAddressField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = 'فعالیت کاربر'
        verbose_name_plural = 'فعالیت‌های کاربران'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.user.full_name} - {self.action}"
