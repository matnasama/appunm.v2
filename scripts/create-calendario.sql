-- Crear tablas para calendario

BEGIN;

-- Tabla de actividades fijas (feriados, fechas importantes)
CREATE TABLE IF NOT EXISTS public.actividades_fijas (
  id SERIAL PRIMARY KEY,
  titulo TEXT NOT NULL,
  fecha_inicio DATE NOT NULL,
  fecha_fin DATE NOT NULL,
  descripcion TEXT,
  UNIQUE (titulo, fecha_inicio, fecha_fin)
);

-- Tabla de actividades de usuarios
CREATE TABLE IF NOT EXISTS public.actividades_usuarios (
  id BIGSERIAL PRIMARY KEY,
  titulo TEXT NOT NULL,
  fecha DATE NOT NULL,
  descripcion TEXT,
  usuario TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Crear índices para búsquedas rápidas
CREATE INDEX IF NOT EXISTS idx_actividades_usuarios_fecha ON public.actividades_usuarios(fecha);
CREATE INDEX IF NOT EXISTS idx_actividades_usuarios_usuario ON public.actividades_usuarios(usuario);
CREATE INDEX IF NOT EXISTS idx_actividades_fijas_rango ON public.actividades_fijas(fecha_inicio, fecha_fin);

COMMIT;
