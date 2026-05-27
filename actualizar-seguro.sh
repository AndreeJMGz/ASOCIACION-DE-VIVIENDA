#!/usr/bin/env bash
set -euo pipefail

# Uso:
#   APP_NAME=santa-luzmila BRANCH=main APP_PORT=8010 ./actualizar-seguro.sh
#
# Variables opcionales:
#   APP_NAME   Nombre del proceso en PM2 (default: santa-luzmila)
#   BRANCH     Rama a actualizar (default: main)
#   APP_PORT   Puerto de la app para healthcheck (default: 8010)

APP_NAME="${APP_NAME:-santa-luzmila}"
BRANCH="${BRANCH:-main}"
APP_PORT="${APP_PORT:-8010}"
HEALTH_URL="${HEALTH_URL:-http://127.0.0.1:${APP_PORT}/api/health}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "${SCRIPT_DIR}"

BACKUP_DIR="${SCRIPT_DIR}/backups"
DATA_DIR="${SCRIPT_DIR}/data"
DB_PATH="${DATA_DIR}/santa-luzmila.db"
TIMESTAMP="$(date +%F-%H%M%S)"
BACKUP_PATH="${BACKUP_DIR}/santa-luzmila-${TIMESTAMP}.db"

echo "==> Actualizacion segura: ${APP_NAME}"
echo "==> Proyecto: ${SCRIPT_DIR}"
echo "==> Rama: ${BRANCH}"

mkdir -p "${BACKUP_DIR}" "${DATA_DIR}"

if [[ -f "${DB_PATH}" ]]; then
  echo "==> Creando backup de base de datos..."
  cp "${DB_PATH}" "${BACKUP_PATH}"
  echo "    Backup: ${BACKUP_PATH}"
else
  echo "==> Aviso: no existe ${DB_PATH} aun. Se continuara sin backup."
fi

echo "==> Descargando cambios..."
git fetch --all --prune
git pull --ff-only origin "${BRANCH}"

if ! command -v pm2 >/dev/null 2>&1; then
  echo "ERROR: pm2 no esta instalado. Instala PM2 antes de continuar."
  exit 1
fi

echo "==> Reiniciando servicio PM2..."
if pm2 describe "${APP_NAME}" >/dev/null 2>&1; then
  pm2 restart "${APP_NAME}"
else
  echo "    Proceso no encontrado. Creando nuevo proceso PM2..."
  HOST=0.0.0.0 PORT="${APP_PORT}" pm2 start server.js --name "${APP_NAME}"
fi

pm2 save >/dev/null

echo "==> Verificando healthcheck: ${HEALTH_URL}"
ok=0
for i in {1..15}; do
  if curl -fsS "${HEALTH_URL}" >/dev/null 2>&1; then
    ok=1
    break
  fi
  sleep 1
done

if [[ "${ok}" -ne 1 ]]; then
  echo "ERROR: la aplicacion no responde en ${HEALTH_URL}"
  echo "Sugerencia: revisa logs con: pm2 logs ${APP_NAME} --lines 100"
  exit 1
fi

echo "==> OK. Actualizacion completada sin perder datos."
echo "==> Para revisar logs: pm2 logs ${APP_NAME} --lines 100"
