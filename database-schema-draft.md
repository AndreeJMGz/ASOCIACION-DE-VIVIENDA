# Borrador de Esquema de Base de Datos

Elegí `PostgreSQL SQL` como primera versión porque:
- es fácil de revisar visualmente;
- define tablas, llaves y restricciones de forma concreta;
- luego se puede convertir sin problema a `Prisma`, `NestJS`, `Django` o cualquier backend.

Este borrador cubre el núcleo del sistema:
- manzanas y lotes;
- socios y cotitulares;
- contactos;
- acceso al portal;
- observaciones;
- documentos;
- auditoría.

## Supuestos principales

- Un lote pertenece a una sola manzana.
- Un lote puede tener varios socios vinculados.
- Solo puede haber un `titular_principal` activo por lote.
- Puede haber varios `cotitulares` activos.
- Los historiales no se borran; se cierran con fechas y estados.

## SQL propuesto

```sql
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

CREATE TABLE lote_socios (
    id BIGSERIAL PRIMARY KEY,
    lote_id BIGINT NOT NULL REFERENCES lotes(id),
    socio_id BIGINT NOT NULL REFERENCES socios(id),
    rol_en_lote VARCHAR(30) NOT NULL,
    parentesco_o_relacion VARCHAR(60),
    porcentaje_participacion NUMERIC(5,2),
    es_usuario_principal_portal BOOLEAN NOT NULL DEFAULT FALSE,
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
    usuario_login VARCHAR(80) NOT NULL,
    correo_login VARCHAR(150),
    celular_login VARCHAR(30),
    password_hash TEXT NOT NULL,
    estado_acceso VARCHAR(30) NOT NULL DEFAULT 'pendiente_activacion',
    requiere_cambio_clave BOOLEAN NOT NULL DEFAULT TRUE,
    ultimo_acceso_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_usuarios_portal_socio UNIQUE (socio_id),
    CONSTRAINT uq_usuarios_portal_usuario UNIQUE (usuario_login),
    CONSTRAINT uq_usuarios_portal_correo UNIQUE (correo_login),
    CONSTRAINT uq_usuarios_portal_celular UNIQUE (celular_login)
);

CREATE TABLE usuarios_sistema (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(120) NOT NULL,
    correo VARCHAR(150) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    rol VARCHAR(40) NOT NULL,
    estado VARCHAR(20) NOT NULL DEFAULT 'activo',
    ultimo_acceso_at TIMESTAMPTZ,
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

CREATE INDEX idx_lotes_manzana ON lotes(manzana_id);
CREATE INDEX idx_socio_contactos_socio ON socio_contactos(socio_id);
CREATE INDEX idx_lote_socios_lote ON lote_socios(lote_id);
CREATE INDEX idx_lote_socios_socio ON lote_socios(socio_id);
CREATE INDEX idx_lote_socios_estado ON lote_socios(estado_vinculo);
CREATE INDEX idx_observaciones_socio ON socio_observaciones(socio_id);
CREATE INDEX idx_documentos_socio ON documentos(socio_id);
CREATE INDEX idx_documentos_lote ON documentos(lote_id);
CREATE INDEX idx_auditoria_entidad ON auditoria(entidad, entidad_id);
```

## Restricciones de negocio recomendadas

Estas dos reglas probablemente conviene implementarlas con lógica adicional o índices parciales:

```sql
-- Solo un titular_principal activo por lote
CREATE UNIQUE INDEX uq_lote_titular_principal_activo
ON lote_socios(lote_id)
WHERE rol_en_lote = 'titular_principal' AND estado_vinculo = 'activo';

-- Solo un usuario principal del portal activo por lote
CREATE UNIQUE INDEX uq_lote_usuario_principal_portal
ON lote_socios(lote_id)
WHERE es_usuario_principal_portal = TRUE AND estado_vinculo = 'activo';
```

## Cómo se usaría en el formulario

- El usuario elige una `manzana`.
- El sistema filtra los `lotes` de esa manzana.
- Se crea o selecciona el `socio`.
- Se guardan sus teléfonos, correo y dirección en `socio_contactos`.
- Se crea la relación con el lote en `lote_socios`.
- Si tendrá portal, se crea su registro en `usuarios_portal`.
- Las notas administrativas van a `socio_observaciones`.

## Cambios que probablemente hagamos luego

- Separar `residentes` de `socios` si luego quieres registrar familiares no propietarios.
- Crear catálogos para estados, tipos de documento y tipos de contacto.
- Agregar módulos de `cobranzas`, `pagos`, `gastos`, `incidencias` y `asambleas`.
- Mover archivos a almacenamiento externo si luego suben muchos documentos.

## Siguiente paso recomendado

Revisar este borrador y decidir una de estas dos:
- ajustar primero nombres y campos;
- o convertirlo ya al formato final que prefieras cuando habilites ejecución completa: `schema.prisma` o archivo `.sql`.
