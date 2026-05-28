"use client";

import { useState, useTransition } from "react";
import { actualizarConfigAction } from "@/lib/actions-admin";
import { youTubeEmbedUrl } from "@/lib/youtube";
import { AvisoAccion } from "./AvisoAccion";

export function FormularioVideoMetodo({
  urlInicial,
}: {
  urlInicial: string | null;
}) {
  const [url, setUrl] = useState(urlInicial ?? "");
  const [aviso, setAviso] = useState<
    { tipo: "ok" | "error"; mensaje: string } | null
  >(null);
  const [isPending, startTransition] = useTransition();

  const embed = youTubeEmbedUrl(url);
  const tieneUrl = url.trim().length > 0;
  const urlValida = !tieneUrl || embed !== null;

  function handleSave() {
    if (!urlValida) {
      setAviso({
        tipo: "error",
        mensaje: "La URL no es de YouTube. Probá con un link tipo youtu.be/... o youtube.com/watch?v=...",
      });
      return;
    }
    setAviso(null);
    startTransition(async () => {
      const res = await actualizarConfigAction("video_metodo_url", url);
      if (res.ok) {
        setAviso({
          tipo: "ok",
          mensaje: "Video actualizado. Ya está visible en /metodo-bgr.",
        });
      } else {
        setAviso({
          tipo: "error",
          mensaje: res.error ?? "No se pudo guardar el video.",
        });
      }
    });
  }

  function handleClear() {
    setUrl("");
    startTransition(async () => {
      await actualizarConfigAction("video_metodo_url", "");
      setAviso({
        tipo: "ok",
        mensaje: "Video eliminado. /metodo-bgr muestra el placeholder.",
      });
    });
  }

  return (
    <div className="border hairline bg-paper p-7 md:p-9 space-y-6">
      <div>
        <label
          htmlFor="video-url"
          className="block text-[10px] tracking-[0.22em] uppercase text-muted mb-2 font-medium"
        >
          URL de YouTube
        </label>
        <input
          id="video-url"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://www.youtube.com/watch?v=ABC123xyz"
          className="w-full bg-transparent border-b hairline focus:border-accent focus:outline-none pb-2 text-base text-ink transition-colors"
        />
        <p className="text-xs text-muted mt-2">
          Aceptamos cualquier formato: youtu.be, youtube.com/watch, /embed,
          /shorts.
        </p>
        {tieneUrl && !urlValida && (
          <p className="text-xs text-red-700 mt-2">
            ⚠️ URL no reconocida como video de YouTube
          </p>
        )}
      </div>

      {embed && (
        <div>
          <p className="text-[10px] tracking-[0.22em] uppercase text-accent mb-3 font-medium">
            Previsualización
          </p>
          <div className="aspect-video bg-ink border hairline overflow-hidden">
            <iframe
              src={embed}
              title="Vista previa del video"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between pt-2 border-t hairline">
        <button
          type="button"
          onClick={handleClear}
          disabled={isPending || !tieneUrl}
          className="text-[10px] tracking-[1.5px] uppercase text-red-700 hover:text-red-900 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Quitar video
        </button>
        <button
          type="button"
          onClick={handleSave}
          disabled={isPending || !urlValida}
          className="bg-accent text-background px-7 py-3 text-[10px] tracking-[2px] uppercase hover:bg-ink hover:text-background transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {isPending ? "Guardando…" : "Guardar"}
        </button>
      </div>

      {aviso && (
        <AvisoAccion
          tipo={aviso.tipo}
          mensaje={aviso.mensaje}
          onCerrar={() => setAviso(null)}
        />
      )}
    </div>
  );
}
