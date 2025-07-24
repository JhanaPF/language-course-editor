Start-Process "C:\Program Files\Docker\Docker\Docker Desktop.exe"

Write-Host "En attente que Docker démarre..."

$maxAttempts = 30
$attempt = 0

while ($attempt -lt $maxAttempts) {
    try {
        docker info > $null 2>&1
        if ($LASTEXITCODE -eq 0) {
            Write-Host "Docker est prêt !"
            break
        }
    } catch {
        # Ignorer les erreurs
    }

    Start-Sleep -Seconds 2
    $attempt++
}

if ($attempt -eq $maxAttempts) {
    Write-Error "Docker ne s'est pas lancé après $($maxAttempts * 2) secondes."
    exit 1
}


docker stop language-course-db
docker rm language-course-db
docker run -d --name language-course-db -p 34567:27017 --memory=500m -v language-course-db-data:/data/db --network language-course-editor_be mongo:8