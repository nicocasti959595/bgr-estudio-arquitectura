# BGR Estudio Arquitectura — Sitio web

Sitio del estudio de arquitectura **BGR Estudio Arquitectura**. Estética profesional argentina, tipografía editorial, paleta tierra/hueso.

## Stack

- **Next.js 16** (App Router, Server Components)
- **TypeScript**
- **Tailwind CSS v4**
- **Supabase** (Postgres + Row Level Security) para proyectos, servicios, equipo y mensajes de contacto
- **Vercel** para deploy

## Estructura

```
app/
├─ page.tsx                  # Home
├─ proyectos/
│   ├─ page.tsx              # Listado
│   └─ [slug]/page.tsx       # Detalle
├─ estudio/page.tsx          # Sobre el estudio
├─ servicios/page.tsx        # Servicios
└─ contacto/
    ├─ page.tsx
    └─ actions.ts            # Server Action del formulario
components/
├─ Header.tsx
├─ Footer.tsx
└─ FormularioContacto.tsx
lib/
├─ supabase.ts               # Cliente y tipos
├─ datos.ts                  # Capa de acceso a datos con fallback
└─ datosFallback.ts          # Datos para desarrollo sin Supabase
supabase/
└─ schema.sql                # Esquema completo + datos semilla
```

## Desarrollo local

```bash
npm install
cp .env.example .env.local   # completar con las claves de Supabase
npm run dev
```

Si Supabase no está configurado, el sitio carga los **datos fallback** definidos en `lib/datosFallback.ts`.

## Setup de Supabase

1. Crear o usar un proyecto en https://supabase.com
2. Abrir el SQL Editor del proyecto
3. Pegar y ejecutar el contenido de `supabase/schema.sql`
4. Las tablas creadas son: `bgr_proyectos`, `bgr_servicios`, `bgr_miembros`, `bgr_mensajes`
5. RLS habilitada: lectura pública, inserción pública sólo en `bgr_mensajes`

## Deploy en Vercel

```bash
vercel --prod
```

Variables de entorno a configurar en Vercel:

| Variable | Descripción |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL del proyecto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clave publishable de Supabase |
