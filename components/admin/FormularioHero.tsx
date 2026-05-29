"use client";

import { useRef, useState, useTransition } from "react";
import Image from "next/image";
import {
  actualizarHeroModoAction,
  eliminarHeroImageAction,
  setHeroPrincipalAction,
  subirHeroImagenAction,
  toggleHeroActivaAction,
} from "@/lib/actions-admin";
import { HERO_LIMITE_IMAGENES, HERO_VALIDACION } from "@/lib/hero-config";
import type { HeroImage, HeroModo } from "@/lib/hero-config";
import { AvisoAccion } from "./AvisoAccion";

type Aviso = { tipo: "ok" | "error" | "info"; mensaje: string } | null;

export function FormularioHero({
  imagenes,
  modoInicial,
}: {
  imagenes: HeroImage[];
  modoInicial: HeroModo;
}) {
  const [modo, setModo] = useState<HeroModo>(modoInicial);
  const [aviso, setAviso] = useState<Aviso>(null);
  const [isPending, startTransition] = useTransition();

  const llegoAlLimite = imagenes.length >= HERO_LIMITE_IMAGENES;
  const cantActivas = imagenes.filter((i) => i.activa).length;

  function showAviso(a: Aviso) {
    setAviso(a);
  }

  function handleCambiarModo(nuevo: HeroModo) {
    if (nuevo === modo) return;
    const previo = modo;
    setModo(nuevo); // optimistic
    startTransition(async () => {
      const res = await actualizarHeroModoAction(nuevo);
      if (!res.ok) {
        setModo(previo);
        showAviso({ tipo: "error", mensaje: res.error });
      } else {
        showAviso({
          tipo: "ok",
          mensaje:
            nuevo === "rotacion"
              ? "Modo cambiado a rotación. Las imágenes activas van a ir rotando en la home."
              : "Modo cambiado a imagen fija. Se muestra la marcada como principal.",
        });
      }
    });
  }

  function handleToggleActiva(img: HeroImage) {
    startTransition(async () => {
      const res = await toggleHeroActivaAction(img.id, !img.activa);
      if (!res.ok) showAviso({ tipo: "error", mensaje: res.error });
      else
        showAviso({
          tipo: "ok",
          mensaje: !img.activa
            ? `"${img.label}" activada.`
            : `"${img.label}" desactivada.`,
        });
    });
  }

  function handleMarcarPrincipal(img: HeroImage) {
    if (img.principal) return;
    startTransition(async () => {
      const res = await setHeroPrincipalAction(img.id);
      if (!res.ok) showAviso({ tipo: "error", mensaje: res.error });
      else
        showAviso({
          tipo: "ok",
          mensaje: `"${img.label}" es ahora la imagen principal.`,
        });
    });
  }

  function handleEliminar(img: HeroImage) {
    const confirma = window.confirm(
      `¿Eliminar "${img.label}"? Esta acción no se puede deshacer.`
    );
    if (!confirma) return;
    startTransition(async () => {
      const res = await eliminarHeroImageAction(img.id);
      if (!res.ok) showAviso({ tipo: "error", mensaje: res.error });
      else showAviso({ tipo: "ok", mensaje: `"${img.label}" eliminada.` });
    });
  }

  return (
    <>
      {/* Selector de modo */}
      <section className="mt-10 border hairline bg-paper p-6 md:p-8">
        <p className="eyebrow mb-3">Modo de visualización</p>
        <h2 className="font-serif text-2xl text-ink">¿Cómo se muestra?</h2>
        <p className="text-[13px] text-muted mt-2 font-light">
          Elegí entre una imagen fija (la marcada como principal) o que las
          imágenes activas vayan rotando con un fade suave cada 6 segundos.
        </p>
        <div className="mt-5 grid sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleCambiarModo("fija")}
            disabled={isPending}
            className={`text-left p-5 border-2 transition-colors ${
              modo === "fija"
                ? "border-accent bg-accent/5"
                : "border-line hover:border-muted"
            } disabled:opacity-50`}
          >
            <p className="font-serif text-lg text-ink">Imagen fija</p>
            <p className="text-[12px] text-muted mt-1 font-light">
              Se ve siempre la marcada como principal.
            </p>
          </button>
          <button
            type="button"
            onClick={() => handleCambiarModo("rotacion")}
            disabled={isPending}
            className={`text-left p-5 border-2 transition-colors ${
              modo === "rotacion"
                ? "border-accent bg-accent/5"
                : "border-line hover:border-muted"
            } disabled:opacity-50`}
          >
            <p className="font-serif text-lg text-ink">Rotación automática</p>
            <p className="text-[12px] text-muted mt-1 font-light">
              Cicla entre todas las imágenes activas ({cantActivas}).
            </p>
          </button>
        </div>
      </section>

      {/* Upload */}
      <section className="mt-8">
        <UploadHero
          deshabilitar={llegoAlLimite}
          cantActual={imagenes.length}
          limite={HERO_LIMITE_IMAGENES}
          onAviso={showAviso}
        />
      </section>

      {/* Lista de imágenes */}
      <section className="mt-10">
        <p className="eyebrow mb-3">Galería</p>
        <h2 className="font-serif text-2xl text-ink">
          Imágenes cargadas ({imagenes.length} / {HERO_LIMITE_IMAGENES})
        </h2>
        <p className="text-[13px] text-muted mt-2 font-light">
          Activá las que quieras mostrar. La que tenga la estrella es la
          principal en modo "imagen fija".
        </p>

        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {imagenes.map((img) => (
            <TarjetaHero
              key={img.id}
              imagen={img}
              disabled={isPending}
              onToggleActiva={() => handleToggleActiva(img)}
              onMarcarPrincipal={() => handleMarcarPrincipal(img)}
              onEliminar={() => handleEliminar(img)}
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

// ---------- TARJETA DE IMAGEN ----------
function TarjetaHero({
  imagen,
  disabled,
  onToggleActiva,
  onMarcarPrincipal,
  onEliminar,
}: {
  imagen: HeroImage;
  disabled: boolean;
  onToggleActiva: () => void;
  onMarcarPrincipal: () => void;
  onEliminar: () => void;
}) {
  return (
    <div
      className={`border-2 bg-paper transition-colors ${
        imagen.principal
          ? "border-accent"
          : imagen.activa
          ? "border-line"
          : "border-line opacity-60"
      }`}
    >
      <div className="relative aspect-[16/9] bg-surface overflow-hidden">
        <Image
          src={imagen.url}
          alt={imagen.label}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
        {imagen.principal && (
          <span className="absolute top-2 left-2 bg-accent text-background px-2 py-1 text-[9px] tracking-[1.5px] uppercase flex items-center gap-1">
            ★ Principal
          </span>
        )}
        {!imagen.activa && (
          <span className="absolute top-2 right-2 bg-ink/80 text-background px-2 py-1 text-[9px] tracking-[1.5px] uppercase">
            Inactiva
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="font-serif text-base text-ink truncate">{imagen.label}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onToggleActiva}
            disabled={disabled}
            className="text-[10px] tracking-[1.5px] uppercase border hairline px-3 py-1.5 hover:bg-ink hover:text-background hover:border-ink transition-colors disabled:opacity-40"
          >
            {imagen.activa ? "Desactivar" : "Activar"}
          </button>
          <button
            type="button"
            onClick={onMarcarPrincipal}
            disabled={disabled || imagen.principal || !imagen.activa}
            className="text-[10px] tracking-[1.5px] uppercase border border-accent text-accent px-3 py-1.5 hover:bg-accent hover:text-background transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {imagen.principal ? "★ Principal" : "Hacer principal"}
          </button>
          <button
            type="button"
            onClick={onEliminar}
            disabled={disabled}
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
function UploadHero({
  deshabilitar,
  cantActual,
  limite,
  onAviso,
}: {
  deshabilitar: boolean;
  cantActual: number;
  limite: number;
  onAviso: (a: Aviso) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [archivo, setArchivo] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [label, setLabel] = useState("");
  const [validando, setValidando] = useState(false);
  const [errorValidacion, setErrorValidacion] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function validarArchivo(f: File): Promise<string | null> {
    if (!HERO_VALIDACION.formatosPermitidos.includes(f.type)) {
      return `Formato no permitido. Subí ${HERO_VALIDACION.formatosTexto}.`;
    }
    if (f.size > HERO_VALIDACION.pesoMaximoMB * 1024 * 1024) {
      return `El archivo pesa más de ${HERO_VALIDACION.pesoMaximoMB}MB. Optimizalo (ej: tinypng.com) y volvé a intentar.`;
    }
    // Validar dimensiones y aspect
    const dims = await leerDimensiones(f);
    if (!dims) {
      return "No se pudo leer la imagen. Probá con otro archivo.";
    }
    if (
      dims.ancho < HERO_VALIDACION.anchoMinimo ||
      dims.alto < HERO_VALIDACION.altoMinimo
    ) {
      return `La imagen es muy chica (${dims.ancho}x${dims.alto}). Mínimo recomendado: ${HERO_VALIDACION.anchoMinimo}x${HERO_VALIDACION.altoMinimo} para que se vea nítida en pantallas grandes.`;
    }
    const aspect = dims.ancho / dims.alto;
    const dif = Math.abs(aspect - HERO_VALIDACION.aspectRatioObjetivo);
    const tolerancia = HERO_VALIDACION.aspectRatioObjetivo *
      HERO_VALIDACION.toleranciaAspect;
    if (dif > tolerancia) {
      return `La proporción no es panorámica (16:9 aprox). La imagen es ${dims.ancho}x${dims.alto}. Recortala antes para que no se corte feo en el hero.`;
    }
    return null;
  }

  async function handleSeleccionar(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setValidando(true);
    setErrorValidacion(null);
    const err = await validarArchivo(f);
    setValidando(false);
    if (err) {
      setErrorValidacion(err);
      setArchivo(null);
      setPreview(null);
      if (inputRef.current) inputRef.current.value = "";
      return;
    }
    setArchivo(f);
    setPreview(URL.createObjectURL(f));
    if (!label) setLabel(f.name.replace(/\.[^.]+$/, ""));
  }

  function reset() {
    setArchivo(null);
    setPreview(null);
    setLabel("");
    setErrorValidacion(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  function handleSubir() {
    if (!archivo) return;
    const fd = new FormData();
    fd.append("archivo", archivo);
    fd.append("label", label);
    startTransition(async () => {
      const res = await subirHeroImagenAction(fd);
      if (!res.ok) {
        onAviso({ tipo: "error", mensaje: res.error });
      } else {
        onAviso({ tipo: "ok", mensaje: "Imagen subida correctamente." });
        reset();
      }
    });
  }

  if (deshabilitar) {
    return (
      <div className="border-2 border-dashed border-line bg-paper p-6 text-center">
        <p className="text-[13px] text-muted font-light">
          Llegaste al límite de {limite} imágenes. Eliminá una para poder subir
          otra.
        </p>
      </div>
    );
  }

  return (
    <div className="border-2 border-dashed border-line bg-paper p-6 md:p-8">
      <p className="eyebrow mb-3">Subir imagen</p>
      <h2 className="font-serif text-2xl text-ink">Cargar nueva imagen</h2>
      <p className="text-[13px] text-muted mt-2 font-light">
        {cantActual} de {limite} usadas. Requisitos:{" "}
        <strong className="text-ink">
          {HERO_VALIDACION.formatosTexto}, mínimo{" "}
          {HERO_VALIDACION.anchoMinimo}x{HERO_VALIDACION.altoMinimo},
          proporción ~16:9, máx {HERO_VALIDACION.pesoMaximoMB}MB
        </strong>
        .
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
          {validando && (
            <p className="text-[12px] text-muted">Validando imagen…</p>
          )}
          {errorValidacion && (
            <p className="text-[12px] text-red-700 leading-relaxed">
              {errorValidacion}
            </p>
          )}
          {archivo && (
            <div>
              <label className="block text-[10px] tracking-[0.22em] uppercase text-muted mb-2 font-medium">
                Nombre de la imagen (para identificarla en el panel)
              </label>
              <input
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="Ej: Fachada moderna"
                className="bgr-input w-full"
              />
            </div>
          )}
        </div>

        {preview && (
          <div className="relative w-full md:w-64 aspect-[16/9] bg-surface border hairline overflow-hidden">
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
            onClick={handleSubir}
            disabled={isPending}
            className="bg-accent text-background px-6 py-3 text-[10px] tracking-[2px] uppercase hover:bg-ink transition-colors disabled:opacity-30"
          >
            {isPending ? "Subiendo…" : "Subir al hero"}
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
