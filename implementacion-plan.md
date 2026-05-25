# Implementacion del plan

## 1. Procesos, documentos y archivos actuales

Estado levantado sobre el workspace actual:

- `index.html`: prototipo principal de la interfaz administrativa.
- `styles.css`: estilos del panel y de las vistas por modulo.
- `app.js`: logica de login, registros, finanzas y nuevos modulos operativos.
- `schema.sql`: modelo relacional base en PostgreSQL para la version real.
- `README.md`: guia rapida del prototipo y alcance actual.
- `arrancar.bat`: lanzador local del prototipo.

Procesos ya cubiertos en la demo:

- Registro de socios y lotes.
- Cobros, ingresos y saldos.
- Gestion de cuentas directivas y super admin.
- Tesoreria y egresos.
- Incidencias y ordenes de trabajo.
- Asambleas, acuerdos y documentos.
- Reportes y exportacion CSV.

## 2. Reglas de negocio implementadas

- Un lote mantiene control de ocupacion y solo permite un titular principal activo en el modelo SQL.
- Los cobros registran monto total, ingresos asociados y saldo pendiente.
- Los ingresos no pueden superar el saldo pendiente de la anotacion.
- Los egresos registran categoria, fondo, proveedor y centro de costo.
- Las incidencias trabajan con prioridad, responsable, fecha compromiso y estado.
- Las ordenes de trabajo se vinculan a una incidencia.
- Los acuerdos se vinculan a una asamblea.
- No se elimina un proveedor si ya esta siendo usado en egresos u ordenes de trabajo.
- Al eliminar una incidencia se eliminan sus ordenes relacionadas.
- Al eliminar una asamblea se eliminan sus acuerdos relacionados.

## 3. Modelo de datos y roles/permisos

Roles activos en la demo:

- `directivo`: usa registro, finanzas, tesoreria, incidencias, asambleas y reportes.
- `superadmin`: tiene acceso adicional a usuarios y centro de control.

Entidades implementadas o preparadas en `schema.sql`:

- `manzanas`
- `lotes`
- `socios`
- `socio_contactos`
- `lote_socios`
- `usuarios_sistema`
- `usuarios_portal`
- `conceptos_cobro`
- `cargos`
- `pagos`
- `proveedores`
- `gastos`
- `incidencias`
- `ordenes_trabajo`
- `asambleas`
- `acuerdos`
- `socio_observaciones`
- `documentos`
- `notificaciones`
- `auditoria`

## 4. MVP y fases

MVP administrativo ya aterrizado en la demo:

- Registro de socios y lotes.
- Cobros, ingresos y saldos.
- Tesoreria, proveedores y egresos.
- Incidencias y ordenes de trabajo.
- Asambleas, acuerdos y documentos.
- Reportes ejecutivos simples.
- Usuarios internos y super admin.

Fase siguiente preparada desde modelo y estructura:

- Portal de asociados.
- Notificaciones.
- Persistencia real en backend/API.
- Carga final desde PDF y migracion desde archivos existentes.

## 5. Prototipo y plan tecnico ejecutado

Implementacion realizada sobre la base existente:

- Se mantuvo la app simple en `HTML`, `CSS` y `JavaScript` para seguir iterando rapido.
- Se reutilizo `localStorage` como persistencia de demo por modulo.
- Se ampliaron pestañas y dashboards sin rehacer el prototipo desde cero.
- Se prepararon exportaciones CSV para socios, finanzas y egresos.
- Se amplio el esquema SQL para que la version real tenga una base mas completa.
