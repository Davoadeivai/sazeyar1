"""
Invoices App - Models
"""

from django.db import models
from django.conf import settings
from orders.models import ServiceOrder


class Invoice(models.Model):
    """Invoice Model"""
    
    STATUS_CHOICES = [
        ('PENDING', 'در انتظار پرداخت'),
        ('PAID', 'پرداخت شده'),
        ('OVERDUE', 'سررسید گذشته'),
        ('CANCELLED', 'لغو شده'),
    ]
    
    order = models.OneToOneField(ServiceOrder, on_delete=models.CASCADE, related_name='invoice')
    invoice_number = models.CharField(max_length=50, unique=True, verbose_name='شماره فاکتور')
    
    amount = models.DecimalField(max_digits=15, decimal_places=0, verbose_name='مبلغ کل')
    tax_amount = models.DecimalField(max_digits=12, decimal_places=0, default=0, verbose_name='مالیات')
    discount_amount = models.DecimalField(max_digits=12, decimal_places=0, default=0, verbose_name='تخفیف')
    final_amount = models.DecimalField(max_digits=15, decimal_places=0, verbose_name='مبلغ قابل پرداخت')
    
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING', verbose_name='وضعیت')
    due_date = models.DateField(verbose_name='تاریخ سررسید')
    paid_date = models.DateTimeField(blank=True, null=True, verbose_name='تاریخ پرداخت')
    
    pdf_file = models.FileField(upload_to='invoices/', blank=True, null=True, verbose_name='فایل PDF')
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = 'فاکتور'
        verbose_name_plural = 'فاکتورها'
        ordering = ['-created_at']
        
    def __str__(self):
        return f"فاکتور {self.invoice_number} - {self.order.full_name}"
