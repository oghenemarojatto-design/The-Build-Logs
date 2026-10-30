from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from users import views as user_views
from users.views import RegisterAPIView, UserProfileAPIView

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),

    # Template authentication
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
    path('register/', user_views.register, name='register'),
    path('profile/', user_views.profile, name='profile'),

    # React API
    path('api/register/', RegisterAPIView.as_view(), name='api-register'),
    path('api/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/profile/', UserProfileAPIView.as_view(), name='api-profile'),

    # Blog routes
    path('', include('blog.urls')),
]

if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT
    )

