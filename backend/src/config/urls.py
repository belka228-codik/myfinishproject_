from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


# Простое приветствие для корневого URL
def home_view(request):
    return HttpResponse("""
    <html>
    <head><title>Blog Platform API</title></head>
    <body style="font-family: Arial, sans-serif; padding: 20px;">
        <h1>Blog Platform API</h1>
        <p>Добро пожаловать в API блог-платформы!</p>
        <h2>Доступные эндпоинты:</h2>
        <ul>
            <li><a href="/api/blog/posts/">API постов</a></li>
            <li><a href="/admin/">Админка Django</a></li>
            <li><a href="/api/token/">Получить JWT токен</a></li>
            <li><a href="/api/auth/login/">Форма входа</a></li>
        </ul>
        <h2>Frontend:</h2>
        <ul>
            <li><a href="http://localhost:3000">React фронтенд (если запущен)</a></li>
        </ul>
    </body>
    </html>
    """)


urlpatterns = [
    # Главная страница
    path('', home_view, name='home'),

    # Админка Django
    path('admin/', admin.site.urls),

    # API блога
    path('api/blog/', include('blog.urls')),

    # Сессионная аутентификация
    path('api/auth/', include('rest_framework.urls')),

    # JWT аутентификация
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]