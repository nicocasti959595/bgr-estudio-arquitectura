"use server";

import { guardarConsulta } from "./datos";

export async function enviarConsultaAction(payload: Record<string, unknown>) {
  return await guardarConsulta(payload);
}
