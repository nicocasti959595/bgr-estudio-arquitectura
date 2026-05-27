"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createSupabaseBrowser } from "@/lib/supabase-browser";
import {
  crearProyectoAction,
  actualizarProyectoAction,
  eliminarProyectoAction,
  type ProyectoInput,
} from "@/lib/actions-admin";
import type { Proyecto } from "@/lib/proyectos";

type Props = {
  proyecto?: Proyecto | null;
};

const TIPOS = [
  "Reforma integral",
  "Remodelación",
  "Reforma",
  "Baño",
  "Cocina",
  "Obra nueva",
  "Interiorismo",
  "Dirección de obra",
  "Otro",
];

export function FormularioProyecto({ proyecto }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [estado, setEstado] = useState<"idle" | "ok" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [subiendo, setSubiendo] = useState(false);

  const [titulo, setTitulo] = useState(proyecto?.titulo ?? "");
  const [barrio, setBarrio] = useState(proyecto?.barrio ?? "");
  const [tipo, setTipo] = useState(proyecto?.tipo ?? "");
  const [descripcion, setDescripcion] = useState(proyecto?.descripcion ?? "");
  const [imagenPortada, setImagenPortada] = useState(
    proyecto?.imagen_portada ?? ""
  );
  const [imagenes, setImagenes] = useState<string[]>(
    proyecto?.imagenes ?? []
  );
  const [destacado, setDestacado] = useState(proyecto?.destacado ?? false);
  const [orden, setOrden] = useState(String(proyecto?.orden ?? 100));
  const [instagramUrl, setInstagramUrl] = useState(
    proyecto?.instagram_url ?? ""
  );
  const [ano, setAno] = useState(String(proyecto?.ano ?? ""));

  async function subirImagen(
    file: File,
    onUrl: (url: string) => void
  ): Promise<void> {
    setSubiendo(true);
    setErrorMsg("");
    try {
      const supabase = createSupabaseBrowser();
      const ext = file.name.split(".").pop() || "jpg";
      const nombre = `${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 8)}.${ext}`;
      const { error } = await supabase.storage
        .from("bgr-proyectos")
        .upload(nombre, file, { cacheControl: "3600", upsert: false });
      if (error) throw error;
      const { data } = supabase.storage
        .from("bgr-proyectos")
        .getPublicUrl(nombre);
      onUrl(data.publicUrl);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Error subiendo la imagen";
      setErrorMsg(msg);
      setEstado("error");
    } finally {
      setSubiendo(false);
    }
  }

  function handlePortadaChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) subirImagen(file, setImagenPortada);
  }

  function handleGaleriaChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    files.forEach((file) => {
      subirImagen(file, (url) => setImagenes((prev) => [...prev, url]));
    });
  }

  function quitarImagenGaleria(url: string) {
    setImagenes((prev) => prev.filter((u) => u !== url));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setEstado("idle");
    setErrorMsg("");

    if (!titulo.trim()) {
      setErrorMsg("El título es obligatorio.");
      setEstado("error");
      return;
    }

    const payload: ProyectoInput = {
      titulo: titulo.trim(),
      barrio: barrio.trim() || null,
      tipo: tipo.trim() || null,
      descripcion: descripcion.trim() || null,
      imagen_portada: imagenPortada || null,
      imagenes: imagenes.length > 0 ? imagenes : null,
      destacado,
      orden: parseInt(orden) || 100,
      instagram_url: instagramUrl.trim() || null,
      ano: ano ? parseInt(ano) : null,
    };

    startTransition(async () => {
      const res = proyecto
        ? await actualizarProyectoAction(proyecto.id, payload)
        : await crearProyectoAction(payload);
      if (res.ok) {
        setEstado("ok");
        router.push("/admin");
        router.refresh();
      } else {
        setEstado("error");
        setErrorMsg(res.error ?? "Error al guardar el proyecto.");
      }
    });
  }

  function handleEliminar() {
    if (!proyecto) return;
    if (!confirm(`¿Eliminar "${proyecto.titulo}"? Esta acción no se puede deshacer.`))
      return;
    startTransition(async () => {
      const res = await eliminarProyectoAction(proyecto.id);
      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        setErrorMsg(res.error ?? "Error al eliminar.");
        setEstado("error");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <Label htmlFor="titulo" required>
            Título de la obra
          </Label>
          <input
            id="titulo"
            type="text"
            required
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Ej: Cocina · Lavadero Coghlan"
            className="bgr-input"
          />
        </div>

        <div>
          <Label htmlFor="tipo">Tipo de obra</Label>
          <select
            id="tipo"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="bgr-input"
          >
            <option value="">Seleccioná</option>
            {TIPOS.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>

        <div>
          <Label htmlFor="barrio">Barrio / Ubicación</Label>
          <input
            id="barrio"
            type="text"
            value={barrio}
            onChange={(e) => setBarrio(e.target.value)}
            placeholder="Ej: Belgrano"
            className="bgr-input"
          />
        </div>

        <div>
          <Label htmlFor="ano">Año</Label>
          <input
            id="ano"
            type="number"
            value={ano}
            onChange={(e) => setAno(e.target.value)}
            placeholder="2024"
            className="bgr-input"
          />
        </div>

        <div>
          <Label htmlFor="orden">Orden (menor = aparece primero)</Label>
          <input
            id="orden"
            type="number"
            value={orden}
            onChange={(e) => setOrden(e.target.value)}
            className="bgr-input"
          />
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="descripcion">Descripción</Label>
          <textarea
            id="descripcion"
            rows={4}
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Contá brevemente de qué se trató la obra..."
            className="bgr-input resize-none"
          />
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="instagram_url">URL del posteo en Instagram (opcional)</Label>
          <input
            id="instagram_url"
            type="url"
            value={instagramUrl}
            onChange={(e) => setInstagramUrl(e.target.value)}
            placeholder="https://instagram.com/p/..."
            className="bgr-input"
          />
        </div>

        <label className="md:col-span-2 flex items-center gap-3 cursor-pointer pt-4">
          <input
            type="checkbox"
            checked={destacado}
            onChange={(e) => setDestacado(e.target.checked)}
            className="w-4 h-4 accent-accent2"
          />
          <span className="text-[12px] tracking-[1.5px] uppercase text-muted">
            Marcar como destacada
          </span>
        </label>
      </div>

      {/* PORTADA */}
      <div>
        <Label htmlFor="portada">Imagen de portada</Label>
        <div className="grid md:grid-cols-[200px_1fr] gap-6 mt-3">
          <div className="relative aspect-[4/3] bg-surface border border-line overflow-hidden">
            {imagenPortada ? (
              <Image
                src={imagenPortada}
                alt="Portada"
                fill
                sizes="200px"
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-muted text-[10px] tracking-widest uppercase">
                Sin imagen
              </div>
            )}
          </div>
          <div className="flex flex-col gap-3 justify-center">
            <label className="inline-flex items-center justify-center bg-paper border border-line text-white px-5 py-3 text-[10px] tracking-[2px] uppercase hover:bg-surface transition-colors cursor-pointer w-fit">
              <input
                type="file"
                accept="image/*"
                onChange={handlePortadaChange}
                className="hidden"
                disabled={subiendo}
              />
              {imagenPortada ? "Cambiar imagen" : "Subir imagen"}
            </label>
            {imagenPortada && (
              <button
                type="button"
                onClick={() => setImagenPortada("")}
                className="text-[11px] text-muted hover:text-white text-left w-fit tracking-wider uppercase"
              >
                Quitar
              </button>
            )}
            <p className="text-[11px] text-muted font-light">
              Recomendado: foto cuadrada o 4:3 de buena resolución.
            </p>
          </div>
        </div>
      </div>

      {/* GALERIA EXTRA */}
      <div>
        <Label htmlFor="galeria">Galería adicional (opcional)</Label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
          {imagenes.map((url) => (
            <div
              key={url}
              className="relative aspect-square bg-surface border border-line overflow-hidden group"
            >
              <Image
                src={url}
                alt="Imagen"
                fill
                sizes="200px"
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => quitarImagenGaleria(url)}
                className="absolute inset-0 bg-ink/80 text-white text-[10px] tracking-[2px] uppercase opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Quitar
              </button>
            </div>
          ))}
          <label className="aspect-square bg-paper border border-dashed border-line flex items-center justify-center text-muted hover:text-white hover:border-accent2 transition-colors cursor-pointer text-[10px] tracking-[2px] uppercase text-center px-2">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleGaleriaChange}
              className="hidden"
              disabled={subiendo}
            />
            + Agregar
          </label>
        </div>
      </div>

      {subiendo && (
        <div className="border border-accent2/40 bg-accent/10 px-5 py-3 text-[13px] text-accent2">
          Subiendo imagen al servidor…
        </div>
      )}

      {estado === "error" && errorMsg && (
        <div className="border border-red-700/40 bg-red-950/20 px-5 py-3 text-[13px] text-red-300">
          {errorMsg}
        </div>
      )}

      <div className="pt-7 border-t border-line2 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {proyecto ? (
          <button
            type="button"
            onClick={handleEliminar}
            disabled={isPending || subiendo}
            className="text-[11px] tracking-[1.5px] uppercase text-red-400 hover:text-red-300 border border-red-900/40 px-5 py-2.5 hover:bg-red-950/20 transition-colors disabled:opacity-50 w-fit"
          >
            Eliminar obra
          </button>
        ) : (
          <span />
        )}

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => router.push("/admin")}
            className="text-[11px] tracking-[1.5px] uppercase text-muted hover:text-white"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isPending || subiendo}
            className="bg-accent text-white px-9 py-3.5 text-[10px] tracking-[2px] uppercase hover:bg-accent2 transition-colors disabled:opacity-50"
          >
            {isPending
              ? "Guardando…"
              : proyecto
              ? "Guardar cambios →"
              : "Crear obra →"}
          </button>
        </div>
      </div>
    </form>
  );
}

function Label({
  htmlFor,
  required,
  children,
}: {
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-[9px] tracking-[2px] uppercase text-muted mb-2"
    >
      {children}
      {required && <sup className="text-accent2"> *</sup>}
    </label>
  );
}
