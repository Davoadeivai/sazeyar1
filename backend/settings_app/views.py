"""
Settings App - Views
"""

from rest_framework import views, permissions, response
from .models import SiteSettings
from .serializers import SiteSettingsSerializer


class SiteSettingsView(views.APIView):
    """Get or Update Site Settings"""
    
    permission_classes = [permissions.AllowAny]
    
    def get(self, request):
        settings, _ = SiteSettings.objects.get_or_create(id=1)
        serializer = SiteSettingsSerializer(settings)
        return response.Response(serializer.data)
    
    def patch(self, request):
        if not request.user.is_staff:
            return response.Response({'error': 'Unauthorized'}, status=403)
            
        settings, _ = SiteSettings.objects.get_or_create(id=1)
        serializer = SiteSettingsSerializer(settings, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return response.Response(serializer.data)
        return response.Response(serializer.errors, status=400)
