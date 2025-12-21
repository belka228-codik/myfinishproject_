from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def post_list(request):
    return Response([
        {"id": 1, "title": "Test Post 1", "content": "Hello World!", "author": "admin"},
        {"id": 2, "title": "Test Post 2", "content": "React + Django", "author": "admin"},
        {"id": 3, "title": "Test Post 3", "content": "API Works!", "author": "admin"}
    ])