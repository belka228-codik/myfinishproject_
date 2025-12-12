import requests
import json

BASE_URL = "http://localhost:8000"

print("1. олучаем список постов:")
response = requests.get(f"{BASE_URL}/api/blog/posts/")
print(f"Статус: {response.status_code}")
if response.status_code == 200:
    posts = response.json()
    print(f"айдено постов: {len(posts)}")
    for post in posts:
        print(f"  - {post['title']} (автор: {post['author']['username']})")

print("\n2. олучаем JWT токен:")
token_response = requests.post(
    f"{BASE_URL}/api/token/",
    json={"username": "admin", "password": "admin123"}
)
if token_response.status_code == 200:
    token = token_response.json()
    print(f"Токен получен: {token['access'][:50]}...")
    
    # спользуем токен для защищенного запроса
    headers = {"Authorization": f"Bearer {token['access']}"}
    print("\n3. Создаем новый пост с токеном:")
    new_post = {
        "title": "Тестовый пост через API",
        "content": "тот пост создан через API с JWT токеном."
    }
    post_response = requests.post(
        f"{BASE_URL}/api/blog/posts/",
        json=new_post,
        headers=headers
    )
    print(f"Статус создания: {post_response.status_code}")
else:
    print("шибка получения токена")
