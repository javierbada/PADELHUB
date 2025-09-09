@echo off
echo Compilando PadelHub...
npx next build
if %errorlevel% equ 0 (
    echo Compilacion exitosa!
) else (
    echo Error en la compilacion
)
pause
