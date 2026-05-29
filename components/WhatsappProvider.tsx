"use client";

import { createContext, useContext } from "react";

const WHATSAPP_FALLBACK = "5491136910077";

const WhatsappContext = createContext<string>(WHATSAPP_FALLBACK);

/**
 * Provee el número de WhatsApp (formato wa.me) a todo el árbol cliente.
 * El número viene del server (config editable desde el panel).
 */
export function WhatsappProvider({
  numero,
  children,
}: {
  numero: string;
  children: React.ReactNode;
}) {
  return (
    <WhatsappContext.Provider value={numero}>
      {children}
    </WhatsappContext.Provider>
  );
}

/** Hook para leer el número de WhatsApp en cualquier Client Component. */
export function useWhatsappNumero(): string {
  return useContext(WhatsappContext);
}
