from django.contrib import admin
from django.urls import path
from blog.views import post_list, create_post, test_api

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/posts/', post_list, name='post-list'),
    path('api/posts/create/', create_post, name='create-post'),
    path('api/test/', test_api, name='test-api'),
]