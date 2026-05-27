import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Proyecto = {
  id: string;
  slug: string;
  titulo: string;
  ubicacion: string;
  anio: number;
  tipologia: string;
  superficie: string | null;
  descripcion: string;
  imagen_portada: string;
  imagenes: string[] | null;
  destacado: boolean;
  orden: number;
  created_at: string;
};

export type Servicio = {
  id: string;
  titulo: string;
  descripcion: string;
  orden: number;
};

export type Miembro = {
  id: string;
  nombre: string;
  rol: string;
  bio: string | null;
  foto: string | null;
  orden: number;
};

export type Mensaje = {
  nombre: string;
  email: string;
  telefono: string | null;
  asunto: string | null;
  mensaje: string;
};
