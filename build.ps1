# Script de compilación para PadelHub
Write-Host "Iniciando compilación de PadelHub..." -ForegroundColor Green

# Verificar si Node.js está instalado
if (!(Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "Error: Node.js no está instalado o no está en el PATH" -ForegroundColor Red
    exit 1
}

# Verificar si npm está disponible
if (!(Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Host "Error: npm no está disponible" -ForegroundColor Red
    exit 1
}

# Ejecutar compilación
Write-Host "Ejecutando npm run build..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "¡Compilación exitosa!" -ForegroundColor Green
} else {
    Write-Host "Error en la compilación. Código de salida: $LASTEXITCODE" -ForegroundColor Red
}
