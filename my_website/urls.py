from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

# Your existing Django views
from users import views as user_views

# Your REST API view
from users.views import RegisterAPIView

# JWT authentication views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    # ==========================
    # Django Admin
    # ==========================
    path('admin/', admin.site.urls),

    # ==========================
    # Template Authentication
    # (used by your old Django templates)
    # ==========================
    path(
        'login/',
        auth_views.LoginView.as_view(template_name='users/login.html'),
        name='login'
    ),

    path(
        'logout/',
        auth_views.LogoutView.as_view(template_name='users/logout.html'),
        name='logout'
    ),

    path(
        'register/',
        user_views.register,
        name='register'
    ),

    path(
        'profile/',
        user_views.profile,
        name='profile'
    ),

    # ==========================
    # REST API Endpoints
    # (used by your React app)
    # ==========================
    path(
        'api/register/',
        RegisterAPIView.as_view(),
        name='api-register'
    ),

    path(
        'api/login/',
        TokenObtainPairView.as_view(),
        name='token_obtain_pair'
    ),

    path(
        'api/token/refresh/',
        TokenRefreshView.as_view(),
        name='token_refresh'
    ),

    # ==========================
    # Blog Routes
    # ==========================
    path('', include('blog.urls')),
]

# ==========================
# Media Files
# ==========================
if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT
    )