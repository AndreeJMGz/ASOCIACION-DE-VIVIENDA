@echo off
setlocal
echo Liberando puertos locales 8010-8020 (Santa Luzmila)...
powershell -NoProfile -Command ^
  "8010..8020 | ForEach-Object { Get-NetTCPConnection -LocalPort $_ -State Listen -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue } }"
echo Listo. Puedes volver a ejecutar arrancar.bat
pause
