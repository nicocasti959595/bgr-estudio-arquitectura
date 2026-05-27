import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Mensaje = {
  nombre: string;
  email: string;
  telefono: string | null;
  asunto: string | null;
  mensaje: string;
  tipo_form: string | null;
  payload: Record<string, unknown> | null;
};
