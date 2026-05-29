"use client";

import { useRef, useState, useTransition } from "react";
import Image from "next/image";
import {
  subirBannerAction,
  actualizarBannerAction,
  toggleBannerActivoAction,
  moverBannerAction,
  eliminarBannerAction,
} from "@/lib/actions-admin";
import { BANNERS_LIMITE, BANNER_VALIDACION } from "@/lib/banners-config";
import type { Banner } from "@/lib/banners-config";
import { AvisoAccion } from "./AvisoAccion";

type Aviso = { tipo: "ok" | "error" | "info"; mensaje: string } | null;

export function FormularioBanners({ banners }: { banners: Banner[] }) {
  const [aviso, setAviso] = useState<Aviso>(null);
  const [isPending, startTransition] = useTransition();
  const llegoAlLimite = banners.length >= BANNERS_LIMITE;
  const activos = banners.filter((b) => b.activo).length;

  function handleToggle(b: Banner) {
    startTransition(async () => {
      const res = await toggleBannerActivoAction(b.id, !b.activo);
      if (!res.ok) setAviso({ tipo: "error", mensaje: res.error });
      else
        setAviso({
          tipo: "ok",
          mensaje: !b.activo ? "Banner activado." : "Banner desactivado.",
        });
    });
  }

  function handleMover(b: Banner, dir: "subir" | "bajar") {
    startTransition(async () => {
      const res = await moverBannerAction(b.id, dir);
      if (!res.ok) setAviso({ tipo: "error", mensaje: res.error });
    });
  }

  function handleEliminar(b: Banner) {
    if (!window.confirm(`¿Eliminar el banner "${b.titulo}"?`)) return;
    startTransition(async () => {
      const res = await eliminarBannerAction(b.id);
      if (!res.ok) setAviso({ tipo: "error", mensaje: res.error });
      else setAviso({ tipo: "ok", mensaje: "Banner eliminado." });
    });
  }

  return (
    <>
      <section className="mt-10">
        <UploadBanner
          deshabilitar={llegoAlLimite}
          cantActual={banners.length}
          onAviso={setAviso}
        />
      </section>

      <section className="mt-10">
        <p className="eyebrow mb-3">Banners cargados</p>
        <h2 className="font-serif text-2xl text-ink">
          {banners.length} / {BANNERS_LIMITE} · {activos} activo
          {activos === 1 ? "" : "s"} en la portada
        </h2>
        {banners.length === 0 && (
          <p className="text-[13px] text-muted mt-3 font-light">
            Todavía no cargaste banners. Subí el primero arriba.
          </p>
        )}

        <div className="mt-6 space-y-4">
          {banners.map((b, i) => (
            <TarjetaBanner
              key={b.id}
              banner={b}
              esPrimero={i === 0}
              esUltimo={i === banners.length - 1}
              disabled={isPending}
              onToggle={() => handleToggle(b)}
              onSubir={() => handleMover(b, "subir")}
              onBajar={() => handleMover(b, "bajar")}
              onEliminar={() => handleEliminar(b)}
              onAviso={setAviso}
            />
          ))}
        </div>
      </section>

      {aviso && (
        <AvisoAccion
          tipo={aviso.tipo}
          mensaje={aviso.mensaje}
          onCerrar={() => setAviso(null)}
        />
      )}
    </>
  );
}

// ---------- TARJETA ----------
function TarjetaBanner({
  banner,
  esPrimero,
  esUltimo,
  disabled,
  onToggle,
  onSubir,
  onBajar,
  onEliminar,
  onAviso,
}: {
  banner: Banner;
  esPrimero: boolean;
  esUltimo: boolean;
  disabled: boolean;
  onToggle: () => void;
  onSubir: () => void;
  onBajar: () => void;
  onEliminar: () => void;
  onAviso: (a: Aviso) => void;
}) {
  const [titulo, setTitulo] = useState(banner.titulo);
  const [link, setLink] = useState(banner.link ?? "");
  const [isPending, startTransition] = useTransition();

  const cambios = titulo !== banner.titulo || link !== (banner.link ?? "");

  function guardar() {
    startTransition(async () => {
      const res = await actualizarBannerAction(banner.id, { titulo, link });
      if (!res.ok) onAviso({ tipo: "error", mensaje: res.error });
      else onAviso({ tipo: "ok", mensaje: "Banner actualizado." });
    });
  }

  return (
    <div
      className={`border-2 bg-paper p-4 grid md:grid-cols-[260px_1fr] gap-5 ${
        banner.activo ? "border-line" : "border-line opacity-70"
      }`}
    >
      <div className="relative aspect-[16/7] bg-surface overflow-hidden">
        <Image
          src={banner.imagen_url}
          alt={banner.titulo}
          fill
          sizes="260px"
          className="object-cover"
        />
        {!banner.activo && (
          <span className="absolute top-2 left-2 bg-muted/80 text-background px-2 py-1 text-[9px] tracking-[1.5px] uppercase">
            Inactivo
          </span>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[10px] tracking-[0.22em] uppercase text-muted mb-1 font-medium">
              Nombre interno
            </label>
            <input
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="bgr-input w-full"
              placeholder="Promo otoño"
            />
          </div>
          <div>
            <label className="block text-[10px] tracking-[0.22em] uppercase text-muted mb-1 font-medium">
              Link al hacer click (opcional)
            </label>
            <input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="bgr-input w-full"
              placeholder="/contacto o https://wa.me/..."
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mt-auto">
          <button
            type="button"
            onClick={onToggle}
            disabled={disabled || isPending}
            className="text-[10px] tracking-[1.5px] uppercase border hairline px-3 py-1.5 hover:bg-ink hover:text-background hover:border-ink transition-colors disabled:opacity-40"
          >
            {banner.activo ? "Desactivar" : "Activar"}
          </button>
          <button
            type="button"
            onClick={onSubir}
            disabled={disabled || isPending || esPrimero}
            className="text-[10px] tracking-[1.5px] uppercase border hairline px-3 py-1.5 hover:bg-paper transition-colors disabled:opacity-25"
          >
            ↑ Subir
          </button>
          <button
            type="button"
            onClick={onBajar}
            disabled={disabled || isPending || esUltimo}
            className="text-[10px] tracking-[1.5px] uppercase border hairline px-3 py-1.5 hover:bg-paper transition-colors disabled:opacity-25"
          >
            ↓ Bajar
          </button>
          {cambios && (
            <button
              type="button"
              onClick={guardar}
              disabled={isPending}
              className="text-[10px] tracking-[1.5px] uppercase bg-accent text-background px-4 py-1.5 hover:bg-ink transition-colors disabled:opacity-40"
            >
              Guardar
            </button>
          )}
          <button
            type="button"
            onClick={onEliminar}
            disabled={disabled || isPending}
            className="text-[10px] tracking-[1.5px] uppercase text-red-700 hover:underline ml-auto disabled:opacity-40"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------- UPLOAD ----------
function UploadBanner({
  deshabilitar,
  cantActual,
  onAviso,
}: {
  deshabilitar: boolean;
  cantActual: number;
  onAviso: (a: Aviso) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [archivo, setArchivo] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [titulo, setTitulo] = useState("");
  const [link, setLink] = useState("");
  const [validando, setValidando] = useState(false);
  const [errorVal, setErrorVal] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function validar(f: File): Promise<string | null> {
    if (!BANNER_VALIDACION.formatosPermitidos.includes(f.type)) {
      return `Formato no permitido. Subí ${BANNER_VALIDACION.formatosTexto}.`;
    }
    if (f.size > BANNER_VALIDACION.pesoMaximoMB * 1024 * 1024) {
      return `Pesa más de ${BANNER_VALIDACION.pesoMaximoMB}MB. Optimizalo (ej: tinypng.com).`;
    }
    const dims = await leerDimensiones(f);
    if (dims && dims.ancho < BANNER_VALIDACION.anchoMinimo) {
      return `El banner es angosto (${dims.ancho}px de ancho). Mínimo ${BANNER_VALIDACION.anchoMinimo}px para que se vea nítido.`;
    }
    return null;
  }

  async function handleSeleccionar(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setValidando(true);
    setErrorVal(null);
    const err = await validar(f);
    setValidando(false);
    if (err) {
      setErrorVal(err);
      setArchivo(null);
      setPreview(null);
      if (inputRef.current) inputRef.current.value = "";
      return;
    }
    setArchivo(f);
    setPreview(URL.createObjectURL(f));
    if (!titulo) setTitulo(f.name.replace(/\.[^.]+$/, ""));
  }

  function reset() {
    setArchivo(null);
    setPreview(null);
    setTitulo("");
    setLink("");
    setErrorVal(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  function subir() {
    if (!archivo) return;
    const fd = new FormData();
    fd.append("archivo", archivo);
    fd.append("titulo", titulo);
    fd.append("link", link);
    startTransition(async () => {
      const res = await subirBannerAction(fd);
      if (!res.ok) onAviso({ tipo: "error", mensaje: res.error });
      else {
        onAviso({ tipo: "ok", mensaje: "Banner subido." });
        reset();
      }
    });
  }

  if (deshabilitar) {
    return (
      <div className="border-2 border-dashed border-line bg-paper p-6 text-center">
        <p className="text-[13px] text-muted font-light">
          Llegaste al límite de {BANNERS_LIMITE} banners. Eliminá uno para subir
          otro.
        </p>
      </div>
    );
  }

  return (
    <div className="border-2 border-dashed border-line bg-paper p-6 md:p-8">
      <p className="eyebrow mb-3">Subir banner</p>
      <h2 className="font-serif text-2xl text-ink">Nuevo banner de promo</h2>
      <p className="text-[13px] text-muted mt-2 font-light">
        {cantActual} de {BANNERS_LIMITE} usados. Subí la imagen{" "}
        <strong className="text-ink">ya diseñada</strong> (con su texto/precio).
        Recomendado: <strong className="text-ink">1920×800px</strong> apaisada,{" "}
        {BANNER_VALIDACION.formatosTexto}, máx {BANNER_VALIDACION.pesoMaximoMB}MB.
        Diseñá el contenido importante hacia el centro (en celular se recorta a
        los costados).
      </p>

      <div className="mt-5 grid md:grid-cols-[1fr_auto] gap-5 items-start">
        <div className="space-y-3">
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleSeleccionar}
            disabled={isPending || validando}
            className="block w-full text-[13px] text-ink file:mr-4 file:py-2 file:px-4 file:border file:border-line file:bg-background file:text-[10px] file:tracking-[1.5px] file:uppercase file:text-ink hover:file:bg-accent hover:file:text-background hover:file:border-accent file:transition-colors file:cursor-pointer"
          />
          {validando && <p className="text-[12px] text-muted">Validando…</p>}
          {errorVal && (
            <p className="text-[12px] text-red-700 leading-relaxed">{errorVal}</p>
          )}
          {archivo && (
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] tracking-[0.22em] uppercase text-muted mb-1 font-medium">
                  Nombre interno
                </label>
                <input
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  placeholder="Promo otoño"
                  className="bgr-input w-full"
                />
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.22em] uppercase text-muted mb-1 font-medium">
                  Link (opcional)
                </label>
                <input
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="/contacto o https://wa.me/..."
                  className="bgr-input w-full"
                />
              </div>
            </div>
          )}
        </div>

        {preview && (
          <div className="relative w-full md:w-72 aspect-[16/7] bg-surface border hairline overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt="Preview"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      {archivo && (
        <div className="mt-5 flex gap-3">
          <button
            type="button"
            onClick={subir}
            disabled={isPending}
            className="bg-accent text-background px-6 py-3 text-[10px] tracking-[2px] uppercase hover:bg-ink transition-colors disabled:opacity-30"
          >
            {isPending ? "Subiendo…" : "Subir banner"}
          </button>
          <button
            type="button"
            onClick={reset}
            disabled={isPending}
            className="border hairline px-6 py-3 text-[10px] tracking-[2px] uppercase text-muted hover:text-ink transition-colors"
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
}

async function leerDimensiones(
  f: File
): Promise<{ ancho: number; alto: number } | null> {
  return new Promise((resolve) => {
    const img = new window.Image();
    const url = URL.createObjectURL(f);
    img.onload = () => {
      const dims = { ancho: img.naturalWidth, alto: img.naturalHeight };
      URL.revokeObjectURL(url);
      resolve(dims);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(null);
    };
    img.src = url;
  });
}
