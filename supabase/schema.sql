-- =====================================================
-- BGR Arquitectura y Construcción
-- Esquema completo: mensajes, proyectos, storage bucket
-- Ejecutar en SQL Editor de Supabase
-- =====================================================

-- 1) TABLA DE CONSULTAS / MENSAJES --------------------
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

alter table public.bgr_mensajes
  add column if not exists tipo_form text;
alter table public.bgr_mensajes
  add column if not exists payload jsonb;

alter table public.bgr_mensajes enable row level security;

drop policy if exists "insertar consulta publica" on public.bgr_mensajes;
create policy "insertar consulta publica" on public.bgr_mensajes
  for insert with check (true);

drop policy if exists "admin lee mensajes" on public.bgr_mensajes;
create policy "admin lee mensajes" on public.bgr_mensajes
  for select using ((auth.jwt() ->> 'email') = 'admin@bgr.com.ar');

-- 2) TABLA DE PROYECTOS -------------------------------
create table if not exists public.bgr_proyectos (
  id uuid primary key default gen_random_uuid(),
  slug text unique,
  titulo text not null,
  barrio text,
  tipo text,
  descripcion text,
  imagen_portada text,
  imagenes text[],
  destacado boolean default false,
  orden int default 100,
  instagram_url text,
  ano int,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_bgr_proyectos_orden
  on public.bgr_proyectos(orden);
create index if not exists idx_bgr_proyectos_destacado
  on public.bgr_proyectos(destacado);

alter table public.bgr_proyectos enable row level security;

-- Lectura pública (la galería de la home la consume sin login)
drop policy if exists "lectura publica bgr_proyectos" on public.bgr_proyectos;
create policy "lectura publica bgr_proyectos" on public.bgr_proyectos
  for select using (true);

-- Escritura solo para el admin específico (whitelist por email).
-- Si querés agregar otro admin, sumá su email en el OR.
drop policy if exists "admin escribe bgr_proyectos" on public.bgr_proyectos;
create policy "admin escribe bgr_proyectos" on public.bgr_proyectos
  for all
  using ((auth.jwt() ->> 'email') = 'admin@bgr.com.ar')
  with check ((auth.jwt() ->> 'email') = 'admin@bgr.com.ar');

-- 3) STORAGE BUCKET DE IMÁGENES -----------------------
insert into storage.buckets (id, name, public)
values ('bgr-proyectos', 'bgr-proyectos', true)
on conflict (id) do nothing;

-- Lectura pública del bucket
drop policy if exists "Lectura publica bgr-proyectos" on storage.objects;
create policy "Lectura publica bgr-proyectos" on storage.objects
  for select using (bucket_id = 'bgr-proyectos');

-- Subir, actualizar y borrar solo el admin específico (whitelist por email)
drop policy if exists "Admin sube bgr-proyectos" on storage.objects;
create policy "Admin sube bgr-proyectos" on storage.objects
  for insert with check (
    bucket_id = 'bgr-proyectos'
    and (auth.jwt() ->> 'email') = 'admin@bgr.com.ar'
  );

drop policy if exists "Admin actualiza bgr-proyectos" on storage.objects;
create policy "Admin actualiza bgr-proyectos" on storage.objects
  for update using (
    bucket_id = 'bgr-proyectos'
    and (auth.jwt() ->> 'email') = 'admin@bgr.com.ar'
  );

drop policy if exists "Admin borra bgr-proyectos" on storage.objects;
create policy "Admin borra bgr-proyectos" on storage.objects
  for delete using (
    bucket_id = 'bgr-proyectos'
    and (auth.jwt() ->> 'email') = 'admin@bgr.com.ar'
  );

-- =====================================================
-- USUARIO ADMIN
-- =====================================================
-- Usuario ya creado vía API:
--   email:    admin@bgr.com.ar
--   password: BGRconstruimos2026!
--   user_id:  8cd4fcbd-d44f-4070-9b24-d41b311a180d
--
-- Las policies de arriba aceptan SOLO este email.
-- Si querés sumar otro admin, modificá las policies y
-- creá el segundo user desde Authentication -> Users.
--
-- (Opcional para máxima seguridad)
-- Authentication -> Providers -> Email -> desactivar
-- "Enable signup" para que nadie más pueda crearse cuenta
-- aunque conozca la URL del endpoint.
-- =====================================================
