$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$RootDir = Split-Path $ScriptDir -Parent

$nvmrcPath = Join-Path $RootDir "./.nvmrc"
if (-Not (Test-Path $nvmrcPath)) {
    Write-Error "Fichier .nvmrc introuvable dans $path"
    exit 1
}

$nodeVersion = Get-Content $nvmrcPath | Select-Object -First 1
$currentNodeVersion = node -v 2>$null

if (-Not $currentNodeVersion) {
    Write-Host "Node n'est pas installé ou pas dans le PATH."
    exit 1
}

$current = $currentNodeVersion.TrimStart("v").Trim()
$expected = $nodeVersion.TrimStart("v").Trim()

if ($current -ne $expected) {
    Write-Host "Version actuelle : $current. Version souhaitée : $expected"
    nvm use $expected
} else {
    Write-Host "Bonne version de Node déjà active ($current). Rien à faire."
}


$dashPath = Join-Path $RootDir "dashboard"
$backPath = Join-Path $RootDir "back-end"

$command1 = "cd `"$dashPath`"; npm start"
$command2 = "cd `"$backPath`"; nodemon"


Start-Process powershell -ArgumentList "-NoExit", "-Command", $command1
Start-Process powershell -ArgumentList "-NoExit", "-Command", $command2