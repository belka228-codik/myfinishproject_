from django.contrib import admin
from django.urls import path
from blog.views import post_list

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/posts/', post_list, name='post-list'),
]
