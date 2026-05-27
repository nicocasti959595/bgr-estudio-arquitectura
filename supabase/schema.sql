-- =====================================================
-- BGR Arquitectura y Construcción - Esquema base
-- Tabla única de consultas con payload JSONB
-- Ejecutar en SQL Editor de Supabase
-- =====================================================

create table if not exists public.bgr_mensajes (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  email text not null,
  telefono text,
  asunto text,
  mensaje text not null,
  tipo_form text,
  payload jsonb,
  leido boolean default false,
  created_at timestamptz default now()
);

create index if not exists idx_bgr_mensajes_created_at
  on public.bgr_mensajes(created_at desc);
create index if not exists idx_bgr_mensajes_tipo_form
  on public.bgr_mensajes(tipo_form);

-- Si ya existía la tabla, agregar columnas nuevas (idempotente):
alter table public.bgr_mensajes
  add column if not exists tipo_form text;
alter table public.bgr_mensajes
  add column if not exists payload jsonb;

-- =====================================================
-- ROW LEVEL SECURITY
-- =====================================================
alter table public.bgr_mensajes enable row level security;

-- Cualquiera puede dejar una consulta (formulario público)
drop policy if exists "insertar consulta publica" on public.bgr_mensajes;
create policy "insertar consulta publica" on public.bgr_mensajes
  for insert with check (true);

-- =====================================================
-- LIMPIEZA OPCIONAL: tablas viejas de la versión multi-página
-- Si querés borrarlas, descomentá las siguientes líneas:
-- =====================================================
-- drop table if exists public.bgr_proyectos;
-- drop table if exists public.bgr_servicios;
-- drop table if exists public.bgr_miembros;
