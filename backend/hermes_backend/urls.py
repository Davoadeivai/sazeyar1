"""
Hermes Saze Sabz - URL Configuration
"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions

# Swagger Schema View
schema_view = get_schema_view(
   openapi.Info(
      title="Hermes Saze Sabz API",
      default_version='v1',
      description="API for Hermes Saze Sabz Renovation Platform",
      terms_of_service="https://hermes-saze-sabz.ir/terms/",
      contact=openapi.Contact(email="info@hermes-saze-sabz.ir"),
      license=openapi.License(name="MIT License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    # Admin
    path('admin/', admin.site.urls),
    
    # JWT Authentication
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # API Endpoints
    path('api/users/', include('accounts.urls')),
    path('api/portfolio/', include('portfolio.urls')),
    path('api/orders/', include('orders.urls')),
    path('api/chats/', include('chats.urls')),
    path('api/settings/', include('settings_app.urls')),
    path('api/bookings/', include('bookings.urls')),
    path('api/blog/', include('blog.urls')),
    path('api/reviews/', include('reviews.urls')),
    path('api/invoices/', include('invoices.urls')),
    path('api/loyalty/', include('loyalty.urls')),
    
    # Swagger Documentation
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
