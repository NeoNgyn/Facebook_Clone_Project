from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.auth import views as auth_views

from core.routing import websocket_urlpatterns

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("core.urls")),
    path("user/", include("userauths.urls")),
    
    # Websocket url
]


urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

