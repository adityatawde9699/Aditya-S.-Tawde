"""
URL configuration for portfolio_backend project.
"""

from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.http import JsonResponse
from django.urls import include, path

def health_check(request):
    return JsonResponse({"status": "ok"})

urlpatterns = [
    path('api/health/', health_check),
    path('admin/', admin.site.urls),
    path('api/', include('portfolio.urls')),
]

# Serve media and static files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

