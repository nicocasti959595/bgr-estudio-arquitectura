"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { loginAction } from "@/lib/actions-admin";

const INITIAL_STATE: { error: string | null } = { error: null };

// Mismo sanitizar que el server: solo deja ASCII imprimible.
function sanitizarCliente(s: string): string {
  let out = "";
  for (let i = 0; i < s.length; i++) {
    const code = s.charCodeAt(i);
    if (code >= 32 && code < 127) out += s[i];
  }
  return out;
}

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(
    loginAction,
    INITIAL_STATE
  );
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-ink px-6 py-20">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="block text-center mb-10"
          aria-label="Volver al inicio"
        >
          <span className="font-bold text-[15px] text-white tracking-[0.12em]">
            BGR
          </span>{" "}
          <span className="font-serif italic text-[14px] text-accent2">
            Arquitectura y Construcción
          </span>
        </Link>

        <div className="bg-paper border border-line p-8 md:p-10">
          <div className="eyebrow mb-3">Panel privado</div>
          <h1 className="font-serif text-3xl text-white mb-1">
            Iniciar sesión
          </h1>
          <p className="text-sm text-muted mb-8 font-light">
            Acceso reservado al equipo de BGR.
          </p>

          <form action={formAction} className="space-y-6">
            {/* Usuario fijo (adminbgr) — no se muestra; lo resuelve el server */}
            <div>
              <label
                htmlFor="password"
                className="block text-[9px] tracking-[2px] uppercase text-muted mb-2"
              >
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="bgr-input"
                autoFocus
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(sanitizarCliente(e.target.value))}
                onPaste={(e) => {
                  e.preventDefault();
                  const texto = e.clipboardData.getData("text");
                  setPassword(sanitizarCliente(texto));
                }}
              />
            </div>

            {state?.error && (
              <div className="border border-red-700/40 bg-red-950/20 px-4 py-3 text-[13px] text-red-300">
                {state.error}
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-accent text-white py-3.5 text-[10px] tracking-[2px] uppercase hover:bg-ink transition-colors disabled:opacity-50"
            >
              {isPending ? "Ingresando…" : "Entrar →"}
            </button>
          </form>

          <p className="text-[10px] text-muted mt-8 tracking-wider uppercase text-center">
            <Link href="/" className="hover:text-white transition-colors">
              ← Volver al sitio
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
