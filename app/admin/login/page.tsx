"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createSupabaseBrowser } from "@/lib/supabase-browser";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createSupabaseBrowser();
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      setError(
        error.message === "Invalid login credentials"
          ? "Credenciales inválidas. Verificá email y contraseña."
          : error.message
      );
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

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

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-[9px] tracking-[2px] uppercase text-muted mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="info@bgr.com.ar"
                className="bgr-input"
                autoFocus
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-[9px] tracking-[2px] uppercase text-muted mb-2"
              >
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bgr-input"
              />
            </div>

            {error && (
              <div className="border border-red-700/40 bg-red-950/20 px-4 py-3 text-[13px] text-red-300">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent text-white py-3.5 text-[10px] tracking-[2px] uppercase hover:bg-accent2 transition-colors disabled:opacity-50"
            >
              {loading ? "Ingresando…" : "Entrar →"}
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
