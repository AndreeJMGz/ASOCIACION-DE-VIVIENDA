CREATE TABLE manzanas (
    id BIGSERIAL PRIMARY KEY,
    codigo VARCHAR(20) NOT NULL UNIQUE,
    nombre VARCHAR(100),
    sector VARCHAR(100),
    estado VARCHAR(20) NOT NULL DEFAULT 'activo',
    observaciones TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE lotes (
    id BIGSERIAL PRIMARY KEY,
    manzana_id BIGINT NOT NULL REFERENCES manzanas(id),
    numero_lote VARCHAR(20) NOT NULL,
    codigo_lote VARCHAR(30),
    area_m2 NUMERIC(10,2),
    perimetro_ml NUMERIC(10,2),
    referencia_catastral VARCHAR(100),
    estado_lote VARCHAR(20) NOT NULL DEFAULT 'disponible',
    observaciones TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_lotes_manzana_numero UNIQUE (manzana_id, numero_lote)
);

CREATE TABLE socios (
    id BIGSERIAL PRIMARY KEY,
    nombres VARCHAR(120) NOT NULL,
    apellidos VARCHAR(120) NOT NULL,
    tipo_documento VARCHAR(20) NOT NULL,
    numero_documento VARCHAR(30) NOT NULL,
    fecha_nacimiento DATE,
    sexo VARCHAR(20),
    estado_civil VARCHAR(30),
    nacionalidad VARCHAR(60),
    fecha_alta DATE NOT NULL DEFAULT CURRENT_DATE,
    estado_socio VARCHAR(20) NOT NULL DEFAULT 'activo',
    observacion_resumen TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_socios_documento UNIQUE (tipo_documento, numero_documento)
);

CREATE TABLE socio_contactos (
    id BIGSERIAL PRIMARY KEY,
    socio_id BIGINT NOT NULL REFERENCES socios(id),
    tipo_contacto VARCHAR(30) NOT NULL,
    valor VARCHAR(255) NOT NULL,
    es_principal BOOLEAN NOT NULL DEFAULT FALSE,
    observaciones TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE usuarios_sistema (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(80) NOT NULL UNIQUE,
    nombre_completo VARCHAR(150) NOT NULL,
    correo VARCHAR(150) UNIQUE,
    celular VARCHAR(30),
    cargo_junta VARCHAR(40) NOT NULL,
    rol_acceso VARCHAR(30) NOT NULL DEFAULT 'directivo',
    password_hash TEXT NOT NULL,
    activo BOOLEAN NOT NULL DEFAULT TRUE,
    protegido BOOLEAN NOT NULL DEFAULT FALSE,
    ultimo_acceso_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE conceptos_cobro (
    id BIGSERIAL PRIMARY KEY,
    codigo VARCHAR(40) NOT NULL UNIQUE,
    nombre VARCHAR(120) NOT NULL,
    tipo_concepto VARCHAR(30) NOT NULL,
    aplica_mora BOOLEAN NOT NULL DEFAULT FALSE,
    activo BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE lote_socios (
    id BIGSERIAL PRIMARY KEY,
    lote_id BIGINT NOT NULL REFERENCES lotes(id),
    socio_id BIGINT NOT NULL REFERENCES socios(id),
    rol_en_lote VARCHAR(30) NOT NULL,
    parentesco_o_relacion VARCHAR(60),
    porcentaje_participacion NUMERIC(5,2),
    fecha_inicio DATE NOT NULL DEFAULT CURRENT_DATE,
    fecha_fin DATE,
    estado_vinculo VARCHAR(20) NOT NULL DEFAULT 'activo',
    motivo_cambio TEXT,
    observaciones TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE usuarios_portal (
    id BIGSERIAL PRIMARY KEY,
    socio_id BIGINT NOT NULL REFERENCES socios(id),
    usuario_login VARCHAR(80) NOT NULL UNIQUE,
    correo_login VARCHAR(150),
    celular_login VARCHAR(30),
    password_hash TEXT NOT NULL,
    estado_acceso VARCHAR(30) NOT NULL DEFAULT 'pendiente_activacion',
    requiere_cambio_clave BOOLEAN NOT NULL DEFAULT TRUE,
    ultimo_acceso_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE cargos (
    id BIGSERIAL PRIMARY KEY,
    socio_id BIGINT NOT NULL REFERENCES socios(id),
    lote_id BIGINT REFERENCES lotes(id),
    concepto_cobro_id BIGINT REFERENCES conceptos_cobro(id),
    periodo VARCHAR(20),
    detalle VARCHAR(255),
    monto_total NUMERIC(12,2) NOT NULL,
    monto_pagado NUMERIC(12,2) NOT NULL DEFAULT 0,
    saldo_pendiente NUMERIC(12,2) NOT NULL,
    fecha_emision DATE NOT NULL DEFAULT CURRENT_DATE,
    estado_cargo VARCHAR(30) NOT NULL DEFAULT 'pendiente',
    creado_por_usuario_id BIGINT REFERENCES usuarios_sistema(id),
    updated_by_usuario_id BIGINT REFERENCES usuarios_sistema(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE pagos (
    id BIGSERIAL PRIMARY KEY,
    cargo_id BIGINT NOT NULL REFERENCES cargos(id),
    socio_id BIGINT NOT NULL REFERENCES socios(id),
    fecha_pago DATE NOT NULL,
    monto NUMERIC(12,2) NOT NULL,
    metodo_pago VARCHAR(30) NOT NULL,
    referencia VARCHAR(255),
    observaciones TEXT,
    registrado_por_usuario_id BIGINT REFERENCES usuarios_sistema(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE actividades_comunales (
    id BIGSERIAL PRIMARY KEY,
    titulo VARCHAR(180) NOT NULL,
    descripcion TEXT,
    fecha_actividad DATE NOT NULL,
    meta_total NUMERIC(12,2) NOT NULL DEFAULT 0,
    aporte_sugerido_por_lote NUMERIC(12,2) NOT NULL DEFAULT 0,
    estado VARCHAR(30) NOT NULL DEFAULT 'abierta',
    creado_por_usuario_id BIGINT REFERENCES usuarios_sistema(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE actividad_lotes (
    id BIGSERIAL PRIMARY KEY,
    actividad_id BIGINT NOT NULL REFERENCES actividades_comunales(id) ON DELETE CASCADE,
    lote_id BIGINT REFERENCES lotes(id),
    socio_principal_id BIGINT REFERENCES socios(id),
    estado_cumplimiento VARCHAR(30) NOT NULL DEFAULT 'pendiente',
    monto_sugerido NUMERIC(12,2) NOT NULL DEFAULT 0,
    monto_compensado_aprobado NUMERIC(12,2) NOT NULL DEFAULT 0,
    observacion_junta TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE actividad_movimientos (
    id BIGSERIAL PRIMARY KEY,
    actividad_lote_id BIGINT NOT NULL REFERENCES actividad_lotes(id) ON DELETE CASCADE,
    tipo_movimiento VARCHAR(40) NOT NULL,
    estado_movimiento VARCHAR(20) NOT NULL DEFAULT 'activo',
    fecha_movimiento DATE NOT NULL DEFAULT CURRENT_DATE,
    monto NUMERIC(12,2) NOT NULL DEFAULT 0,
    metodo_registro VARCHAR(40),
    detalle TEXT,
    registrado_por_usuario_id BIGINT REFERENCES usuarios_sistema(id),
    anulado_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE proveedores (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    rubro VARCHAR(100),
    contacto_principal VARCHAR(120),
    telefono VARCHAR(30),
    correo VARCHAR(150),
    estado VARCHAR(20) NOT NULL DEFAULT 'activo',
    observaciones TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE gastos (
    id BIGSERIAL PRIMARY KEY,
    proveedor_id BIGINT REFERENCES proveedores(id),
    socio_id BIGINT REFERENCES socios(id),
    categoria_gasto VARCHAR(40) NOT NULL,
    centro_costo VARCHAR(80),
    detalle VARCHAR(255) NOT NULL,
    fondo_origen VARCHAR(20) NOT NULL DEFAULT 'caja',
    fecha_gasto DATE NOT NULL,
    monto NUMERIC(12,2) NOT NULL,
    metodo_pago VARCHAR(30),
    referencia VARCHAR(255),
    registrado_por_usuario_id BIGINT REFERENCES usuarios_sistema(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE incidencias (
    id BIGSERIAL PRIMARY KEY,
    socio_id BIGINT REFERENCES socios(id),
    lote_id BIGINT REFERENCES lotes(id),
    area_afectada VARCHAR(120),
    titulo VARCHAR(180) NOT NULL,
    detalle TEXT NOT NULL,
    prioridad VARCHAR(20) NOT NULL DEFAULT 'media',
    estado VARCHAR(30) NOT NULL DEFAULT 'abierta',
    responsable_actual VARCHAR(120),
    fecha_compromiso DATE,
    fecha_cierre DATE,
    registrado_por_usuario_id BIGINT REFERENCES usuarios_sistema(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE ordenes_trabajo (
    id BIGSERIAL PRIMARY KEY,
    incidencia_id BIGINT NOT NULL REFERENCES incidencias(id),
    proveedor_id BIGINT REFERENCES proveedores(id),
    responsable VARCHAR(120),
    costo_estimado NUMERIC(12,2),
    fecha_compromiso DATE,
    estado VARCHAR(30) NOT NULL DEFAULT 'pendiente',
    notas TEXT,
    creado_por_usuario_id BIGINT REFERENCES usuarios_sistema(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE asambleas (
    id BIGSERIAL PRIMARY KEY,
    titulo VARCHAR(180) NOT NULL,
    fecha_asamblea DATE NOT NULL,
    agenda TEXT,
    estado VARCHAR(30) NOT NULL DEFAULT 'programada',
    total_asistentes INTEGER NOT NULL DEFAULT 0,
    creado_por_usuario_id BIGINT REFERENCES usuarios_sistema(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE acuerdos (
    id BIGSERIAL PRIMARY KEY,
    asamblea_id BIGINT NOT NULL REFERENCES asambleas(id),
    titulo VARCHAR(180) NOT NULL,
    detalle TEXT,
    responsable VARCHAR(120),
    fecha_limite DATE,
    estado VARCHAR(30) NOT NULL DEFAULT 'pendiente',
    creado_por_usuario_id BIGINT REFERENCES usuarios_sistema(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE socio_observaciones (
    id BIGSERIAL PRIMARY KEY,
    socio_id BIGINT NOT NULL REFERENCES socios(id),
    lote_id BIGINT REFERENCES lotes(id),
    tipo_observacion VARCHAR(30) NOT NULL DEFAULT 'general',
    detalle TEXT NOT NULL,
    es_privada BOOLEAN NOT NULL DEFAULT TRUE,
    creado_por_usuario_id BIGINT REFERENCES usuarios_sistema(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE documentos (
    id BIGSERIAL PRIMARY KEY,
    socio_id BIGINT REFERENCES socios(id),
    lote_id BIGINT REFERENCES lotes(id),
    tipo_documento VARCHAR(30) NOT NULL,
    nombre_archivo VARCHAR(255) NOT NULL,
    ruta_archivo TEXT NOT NULL,
    observaciones TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE auditoria (
    id BIGSERIAL PRIMARY KEY,
    usuario_sistema_id BIGINT REFERENCES usuarios_sistema(id),
    usuario_portal_id BIGINT REFERENCES usuarios_portal(id),
    entidad VARCHAR(50) NOT NULL,
    entidad_id BIGINT NOT NULL,
    accion VARCHAR(50) NOT NULL,
    detalle TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE notificaciones (
    id BIGSERIAL PRIMARY KEY,
    socio_id BIGINT REFERENCES socios(id),
    usuario_portal_id BIGINT REFERENCES usuarios_portal(id),
    tipo_notificacion VARCHAR(30) NOT NULL,
    titulo VARCHAR(180) NOT NULL,
    mensaje TEXT NOT NULL,
    canal VARCHAR(20) NOT NULL DEFAULT 'interno',
    estado_envio VARCHAR(20) NOT NULL DEFAULT 'pendiente',
    enviado_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_lotes_manzana ON lotes(manzana_id);
CREATE INDEX idx_socio_contactos_socio ON socio_contactos(socio_id);
CREATE INDEX idx_lote_socios_lote ON lote_socios(lote_id);
CREATE INDEX idx_lote_socios_socio ON lote_socios(socio_id);
CREATE INDEX idx_lote_socios_estado ON lote_socios(estado_vinculo);
CREATE INDEX idx_cargos_socio ON cargos(socio_id);
CREATE INDEX idx_cargos_lote ON cargos(lote_id);
CREATE INDEX idx_cargos_estado ON cargos(estado_cargo);
CREATE INDEX idx_pagos_cargo ON pagos(cargo_id);
CREATE INDEX idx_pagos_socio ON pagos(socio_id);
CREATE INDEX idx_actividades_comunales_fecha ON actividades_comunales(fecha_actividad);
CREATE INDEX idx_actividades_comunales_estado ON actividades_comunales(estado);
CREATE INDEX idx_actividad_lotes_actividad ON actividad_lotes(actividad_id);
CREATE INDEX idx_actividad_lotes_lote ON actividad_lotes(lote_id);
CREATE INDEX idx_actividad_lotes_estado ON actividad_lotes(estado_cumplimiento);
CREATE INDEX idx_actividad_movimientos_lote ON actividad_movimientos(actividad_lote_id);
CREATE INDEX idx_actividad_movimientos_tipo ON actividad_movimientos(tipo_movimiento);
CREATE INDEX idx_gastos_fecha ON gastos(fecha_gasto);
CREATE INDEX idx_gastos_proveedor ON gastos(proveedor_id);
CREATE INDEX idx_incidencias_estado ON incidencias(estado);
CREATE INDEX idx_incidencias_prioridad ON incidencias(prioridad);
CREATE INDEX idx_ordenes_trabajo_incidencia ON ordenes_trabajo(incidencia_id);
CREATE INDEX idx_acuerdos_asamblea ON acuerdos(asamblea_id);
CREATE INDEX idx_acuerdos_estado ON acuerdos(estado);
CREATE INDEX idx_notificaciones_socio ON notificaciones(socio_id);
CREATE INDEX idx_observaciones_socio ON socio_observaciones(socio_id);
CREATE INDEX idx_documentos_socio ON documentos(socio_id);
CREATE INDEX idx_documentos_lote ON documentos(lote_id);
CREATE INDEX idx_auditoria_entidad ON auditoria(entidad, entidad_id);

CREATE UNIQUE INDEX uq_lote_titular_principal_activo
ON lote_socios(lote_id)
WHERE rol_en_lote = 'titular_principal' AND estado_vinculo = 'activo';

CREATE UNIQUE INDEX uq_actividad_lote_unico
ON actividad_lotes(actividad_id, lote_id)
WHERE lote_id IS NOT NULL;
