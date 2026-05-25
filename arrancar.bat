@echo off
setlocal

cd /d "%~dp0"

for /f %%P in ('powershell -NoProfile -Command "$selected = $null; for ($p = 8010; $p -le 8020; $p++) { try { $listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Loopback, $p); $listener.Start(); $listener.Stop(); $selected = $p; break } catch {} }; if ($null -eq $selected) { exit 1 } else { Write-Output $selected }"') do set "PORT=%%P"

if not defined PORT (
  echo No se pudo encontrar un puerto libre entre 8010 y 8020.
  pause
  exit /b 1
)

title Santa Luzmila - Lanzador
echo ==========================================
echo   Santa Luzmila - Lanzador del sistema
echo ==========================================
echo.
echo Carpeta: %CD%
echo URL: http://127.0.0.1:%PORT%/
echo.
echo Se abrira el navegador automaticamente.
echo Para detener el servidor, presiona Ctrl+C en esta ventana.
if not "%PORT%"=="8010" echo Nota: el puerto 8010 estaba ocupado. Se usara el puerto %PORT%.
echo.

start "" powershell -NoProfile -WindowStyle Hidden -Command "Start-Sleep -Seconds 2; Start-Process 'http://127.0.0.1:%PORT%/'"
set "PORT=%PORT%"
node server.js

echo.
echo Servidor detenido.
pause
