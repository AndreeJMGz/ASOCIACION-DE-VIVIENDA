# Asociacion Santa Luzmila

Este workspace ya tiene una base editable del sistema:

- `index.html`: interfaz del panel administrativo
- `styles.css`: estilos del prototipo
- `app.js`: logica de login, gestion de cuentas y formulario de socios
- `remote-store.js`: capa de persistencia del frontend hacia el backend local
- `server.js`: servidor HTTP con API local y base de datos SQLite
- `data/santa-luzmila.db`: archivo de base de datos que se crea automaticamente
- `package.json`: arranque para hosting `Node`
- `schema.sql`: modelo inicial de base de datos en PostgreSQL
- `database-schema-draft.md`: borrador funcional y notas previas
- `arrancar.bat`: lanzador rapido del prototipo

## Que hace este prototipo

- Tiene `login` para junta administrativa y super admin
- Tiene un `portal de consulta` en solo lectura para transparencia general y estado de cuenta por lote
- El `super admin` puede crear, editar y eliminar cuentas directivas
- Permite registrar socios con `manzana`, `lote`, `cotitulares`, `contacto` y `observaciones`
- Incluye modulo mixto de `actividades comunales` y `cuotas formales`
- Las `cuotas formales` si generan `deuda acumulable`
- Las `actividades comunales` no generan deuda automatica; dejan `seguimiento`, `por coordinar` y `reincidencia`
- Cada `actividad comunal` usa un `monto sugerido manual por lote`
- Si una actividad recauda mas de lo necesario, el `excedente` pasa automaticamente al `fondo comun`
- Incluye un `fondo comun` central para aportes generales, emergencias y apoyo a actividades
- Incluye modulo de `tesoreria`, `egresos` y `proveedores`
- Incluye modulo de `incidencias` y `ordenes de trabajo`
- Incluye modulo de `asambleas`, `acuerdos`, `documentos` y `reportes`
- Muestra un resumen en vivo
- Guarda la informacion en un archivo SQLite dentro del mismo sistema

## Como verlo

1. Ejecuta `arrancar.bat`
2. El sistema levantara `server.js`
3. Se creara automaticamente `data/santa-luzmila.db` si aun no existe
4. Entra desde el navegador al sistema
5. Si eres directivo, inicia sesion con una cuenta administrativa
6. Si eres socio, entra al `portal de consulta` para revisar transparencia general y tu lote
7. Si eres super admin, gestiona cuentas directivas desde el panel inferior

## Arquitectura actual

Esta version ya no depende de un servicio externo para guardar datos. Ahora trabaja asi:

- `index.html`, `styles.css` y `app.js`: interfaz
- `server.js`: backend local
- `data/santa-luzmila.db`: base de datos SQLite
- `remote-store.js`: comunicacion entre frontend y backend

El login ya no depende de `localStorage` como unica fuente. El servidor guarda:

- usuarios administrativos
- contrasenas cifradas
- sesiones
- estado general del sistema
- informacion del portal

La cuenta inicial sigue siendo:

- usuario: `AndreeJMGz`
- contrasena: `5777374221710`

## Si luego quieres ponerlo en linea

Como ahora la base esta dentro del mismo sistema, para usarlo desde cualquier lugar ya no bastaria un hosting estatico. Necesitarias publicar **todo el proyecto** en una maquina o servicio que ejecute `node server.js`.

## Preparado para GitHub

Ya puedes subir este proyecto a `GitHub` sin exponer la base real:

- `.gitignore` excluye `data/*.db`, `data/*.db-wal` y `data/*.db-shm`
- `data/.gitkeep` mantiene la carpeta en el repo
- `package.json` deja listo el comando `npm start` para hosting compatibles con `Node`

### Que si se sube

- `index.html`
- `styles.css`
- `app.js`
- `remote-store.js`
- `server.js`
- `package.json`
- documentacion y archivos de apoyo

### Que no se sube

- la base real `data/santa-luzmila.db`
- sus archivos auxiliares `-wal` y `-shm`

## Flujo recomendado con GitHub

1. subir el codigo a `GitHub`
2. desplegarlo en un hosting que soporte `Node`
3. hacer que en el servidor exista la carpeta `data/`
4. dejar que el sistema cree ahi `santa-luzmila.db`

## Hosting recomendado para esta version

Si quieres mantener **SQLite como base real dentro del mismo sistema**, te recomiendo este orden:

1. `Oracle Cloud Free VM`: mejor para conservar el archivo `.db` y tener control total
2. `Railway` o `Render`: mas faciles, pero debes revisar si tu plan te da almacenamiento persistente

`GitHub Pages` y `Streamlit Cloud` no son adecuados para esta arquitectura porque no ejecutan bien este backend `Node + SQLite`.

## Sobre la base de datos

El archivo `schema.sql` deja lista la estructura inicial de:

- `manzanas`
- `lotes`
- `socios`
- `socio_contactos`
- `lote_socios`
- `conceptos_cobro`
- `cargos`
- `pagos`
- `actividades_comunales`
- `actividad_lotes`
- `actividad_movimientos`
- `usuarios_sistema`
- `socio_observaciones`
- `documentos`
- `auditoria`

La tabla mas importante del modelo sigue siendo `lote_socios`, porque ahi se controla:

- titular principal
- cotitulares
- historial de vinculacion

Ademas, el modelo ahora deja previstas tablas para:

- `usuarios_portal`
- `proveedores`
- `gastos`
- `incidencias`
- `ordenes_trabajo`
- `asambleas`
- `acuerdos`
- `notificaciones`

## Nota importante

La persistencia principal ahora vive en `data/santa-luzmila.db`, dentro del mismo proyecto. El servidor la crea y la administra automaticamente.

El flujo monetario principal ya no gira alrededor de `cobros manuales` aislados. Ahora la operacion pensada para la asociacion es:

1. crear una `actividad comunal` o una `cuota formal`;
2. generar su control `por lote`;
3. definir un `monto sugerido manual por lote` para cada actividad;
4. registrar si cada lote `aporto dinero`, `ayudo fisicamente`, quedo `sin respuesta` o si la junta aprobo `compensacion` o `exoneracion`;
5. si una actividad recauda mas de lo necesario, el `excedente` pasa automaticamente al `fondo comun`;
6. registrar `aportes voluntarios generales` ligados a socio/lote dentro de una caja separada;
7. usar el `fondo comun` para gastos imprevistos o para apoyar actividades sin cambiar la deuda individual por lote;
8. en `cuotas formales`, el saldo pendiente si cuenta como `deuda`;
9. en `actividades comunales`, el saldo solo queda como `por coordinar` y puede generar `reincidencia`, pero no deuda infinita automatica;
10. si hubo error o devolucion real, la tesorera puede `editar`, `anular` o registrar una `devolucion` sin borrar el historial.

El prototipo tambien incluye un `portal de consulta`:

- `Transparencia general`: muestra actividades, cuotas, deuda formal, egresos, fondo comun y actividad reciente en modo solo lectura.
- `Mi estado de cuenta`: consulta privada por `documento`, con filtros opcionales de `manzana` y `lote`, para revisar todos los lotes asociados, aportes, devoluciones, deuda formal, actividades por coordinar y aportes al fondo comun.

## Siguiente paso sugerido

Si quieres, el siguiente paso lo hago sobre esta base:

1. reforzar respaldos y exportacion de seguridad del archivo `.db`;
2. cargar las manzanas y lotes reales desde tu plano PDF;
3. preparar despliegue online del mismo proyecto con `Node + SQLite`.
