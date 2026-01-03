from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ServiceOrderViewSet

router = DefaultRouter()
router.register('', ServiceOrderViewSet, basename='orders')

urlpatterns = [
    path('', include(router.urls)),
]
