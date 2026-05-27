@echo off
setlocal EnableExtensions

cd /d "%~dp0"

set "NODE_EXE="
where node >nul 2>&1 && for /f "delims=" %%N in ('where node 2^>nul ^| findstr /i "\\node.exe$"') do set "NODE_EXE=%%N" & goto :node_found
if exist "%ProgramFiles%\nodejs\node.exe" set "NODE_EXE=%ProgramFiles%\nodejs\node.exe" & goto :node_found
if exist "%LocalAppData%\Programs\nodejs\node.exe" set "NODE_EXE=%LocalAppData%\Programs\nodejs\node.exe" & goto :node_found

echo.
echo ERROR: Node.js no esta instalado o no esta en el PATH de Windows.
echo.
echo 1) Descarga e instala Node.js 22 LTS desde:
echo    https://nodejs.org/
echo 2) Marca la opcion "Add to PATH" durante la instalacion.
echo 3) Cierra esta ventana, abre una nueva y vuelve a ejecutar arrancar.bat
echo.
echo Para comprobar, abre PowerShell y escribe:  node -v
echo.
pause
exit /b 1

:node_found
echo Usando Node: %NODE_EXE%
"%NODE_EXE%" -v
echo.

for /f %%P in ('powershell -NoProfile -Command "$selected = $null; for ($p = 8010; $p -le 8020; $p++) { try { $listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Loopback, $p); $listener.Start(); $listener.Stop(); $selected = $p; break } catch {} }; if ($null -eq $selected) { exit 1 } else { Write-Output $selected }"') do set "PORT=%%P"

if not defined PORT (
  echo No se pudo encontrar un puerto libre entre 8010 y 8020.
  echo Ejecuta detener-servidor.bat y vuelve a intentar.
  pause
  exit /b 1
)

title Santa Luzmila - Lanzador local
echo ==========================================
echo   Santa Luzmila - Lanzador LOCAL (tu PC)
echo ==========================================
echo.
echo Carpeta: %CD%
echo.
echo   USA ESTA URL EN TU PC:
echo   http://127.0.0.1:%PORT%/
echo.
echo   NO uses la IP de Oracle (136.248...) aqui.
echo   Esa IP es solo para el servidor en la nube.
echo.
if not "%PORT%"=="8010" echo Nota: el puerto 8010 estaba ocupado. Se usara el puerto %PORT%.
echo.
echo El navegador se abrira cuando el servidor responda.
echo Para detener: Ctrl+C en esta ventana, o ejecuta detener-servidor.bat
echo.

start "" powershell -NoProfile -WindowStyle Hidden -Command ^
  "$port='%PORT%'; $url='http://127.0.0.1:' + $port + '/'; for ($i = 0; $i -lt 25; $i++) { try { Invoke-WebRequest -Uri ('http://127.0.0.1:' + $port + '/api/health') -UseBasicParsing -TimeoutSec 2 | Out-Null; Start-Process $url; break } catch { Start-Sleep -Seconds 1 } }"

set "HOST=127.0.0.1"
set "PORT=%PORT%"
"%NODE_EXE%" server.js

echo.
echo Servidor detenido.
pause
