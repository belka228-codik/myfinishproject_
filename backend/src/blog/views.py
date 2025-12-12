from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Post
from django.contrib.auth.models import User
import json


@api_view(['GET'])
def post_list(request):
    # Создаем тестовые данные если их нет
    if not Post.objects.exists():
        user, _ = User.objects.get_or_create(
            username='admin',
            defaults={'email': 'admin@example.com'}
        )
        if user.check_password('admin123') == False:
            user.set_password('admin123')
            user.save()

        Post.objects.create(title='First Post', content='Hello World!', author=user)
        Post.objects.create(title='React + Django', content='Full stack blog', author=user)
        Post.objects.create(title='Test Post', content='Testing API', author=user)

    posts = list(Post.objects.all().values(
        'id', 'title', 'content', 'author__username', 'created_at'
    ))
    return Response(posts)  # Возвращаем МАССИВ


@api_view(['POST'])
def create_post(request):
    data = json.loads(request.body)
    user = User.objects.first()
    post = Post.objects.create(
        title=data.get('title'),
        content=data.get('content'),
        author=user
    )
    return Response({'id': post.id, 'title': post.title})


@api_view(['GET'])
def test_api(request):
    return Response({
        'status': 'ok',
        'message': 'API is working',
        'endpoints': {
            'posts': '/api/posts/',
            'create_post': '/api/posts/create/',
            'admin': '/admin/'
        }
    })