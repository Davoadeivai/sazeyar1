"""
Invoices App - Views
"""

from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Invoice
from .serializers import InvoiceSerializer
# In a real app, import ReportLab or similar for PDF generation


class InvoiceViewSet(viewsets.ModelViewSet):
    """Invoice CRUD"""
    
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        if self.request.user.is_staff:
            return Invoice.objects.all()
        return Invoice.objects.filter(order__user=self.request.user)
    
    @action(detail=True, methods=['get'])
    def generate_pdf(self, request, pk=None):
        """Generate Invoice PDF"""
        invoice = self.get_object()
        # Mock PDF generation
        return Response({'message': 'PDF generated successfully', 'url': '/media/invoices/mock.pdf'})
