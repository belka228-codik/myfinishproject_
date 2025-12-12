$baseUrl = "http://localhost:8000"

Write-Host "1. проверяем API постов..." -ForegroundColor Green
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/blog/posts/" -Method Get
    Write-Host "успешно! олучено постов: $($response.count)" -ForegroundColor Green
    $response | ConvertTo-Json -Depth 3 | Write-Host
} catch {
    Write-Host "ошибка: $_" -ForegroundColor Red
}

Write-Host "`n2. проверяем детали поста..." -ForegroundColor Green
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/blog/posts/1/" -Method Get
    Write-Host "успешно! ост: $($response.title)" -ForegroundColor Green
} catch {
    Write-Host "оошибка или пост не найден: $_" -ForegroundColor Yellow
}

Write-Host "`n3. проверяем доступ к админке..." -ForegroundColor Green
try {
    $response = Invoke-WebRequest -Uri "$baseUrl/admin/" -Method Get
    Write-Host "админка доступна (статус: $($response.StatusCode))" -ForegroundColor Green
} catch {
    Write-Host "ошибка админки: $_" -ForegroundColor Red
}
