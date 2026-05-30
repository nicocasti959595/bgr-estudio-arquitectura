"use client";

import { useRef, useState, useTransition } from "react";
import {
  subirAssetAction,
  programarPostAction,
} from "@/lib/actions-saas";
import type { CuentaSocial, Horario, PostProgramado } from "@/lib/saas-client";
import { AvisoAccion } from "./AvisoAccion";

type Item = {
  uid: string;
  file: File;
  preview: string;
  caption: string;
  asset_id?: string;
  estado: "pendiente" | "subiendo" | "subida" | "programada" | "error";
  error?: string;
};

const HH = Array.from({ length: 24 }, (_, i) => i);
const MM = [0, 15, 30, 45];

export function ProgramadorPublicaciones({
  horariosDefault,
  cuentas,
  programadosIniciales,
}: {
  horariosDefault: Horario[];
  cuentas: CuentaSocial[];
  programadosIniciales: PostProgramado[];
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [tipo, setTipo] = useState<"feed" | "story">("feed");
  const [horarios, setHorarios] = useState<Horario[]>(horariosDefault);
  const [fechaInicio, setFechaInicio] = useState("");
  const [cuenta, setCuenta] = useState(cuentas[0]?.id ?? "");
  const [captionBase, setCaptionBase] = useState("");
  const [aviso, setAviso] = useState<
    { tipo: "ok" | "error" | "info"; mensaje: string } | null
  >(null);
  const [progreso, setProgreso] = useState<{ hechos: number; total: number } | null>(null);
  const [isPending, startTransition] = useTransition();

  function onElegir(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    const nuevos: Item[] = files.map((f, i) => ({
      uid: `${Date.now()}-${i}-${Math.random().toString(36).slice(2, 7)}`,
      file: f,
      preview: URL.createObjectURL(f),
      caption: captionBase,
      estado: "pendiente",
    }));
    setItems((prev) => [...prev, ...nuevos]);
    if (inputRef.current) inputRef.current.value = "";
  }

  function setCaption(uid: string, v: string) {
    setItems((prev) => prev.map((it) => (it.uid === uid ? { ...it, caption: v } : it)));
  }
  function quitar(uid: string) {
    setItems((prev) => prev.filter((it) => it.uid !== uid));
  }
  function aplicarCaptionATodas() {
    setItems((prev) => prev.map((it) => ({ ...it, caption: captionBase })));
  }

  function setHora(i: number, campo: "hora" | "minuto", val: number) {
    setHorarios((prev) => prev.map((h, idx) => (idx === i ? { ...h, [campo]: val } : h)));
  }
  function addHorario() {
    if (horarios.length >= 6) return;
    setHorarios((prev) => [...prev, { hora: 12, minuto: 0 }]);
  }
  function delHorario(i: number) {
    setHorarios((prev) => prev.filter((_, idx) => idx !== i));
  }

  // Cuántos días ocupa el lote y vista previa de cuándo sale cada una
  const diasNecesarios = items.length
    ? Math.ceil(items.length / Math.max(horarios.length, 1))
    : 0;

  function fechaSlot(index: number): string {
    if (!fechaInicio) return "—";
    const [y, m, d] = fechaInicio.split("-").map(Number);
    const dia = Math.floor(index / horarios.length);
    const slot = horarios[index % horarios.length];
    const dt = new Date(y, m - 1, d + dia, slot.hora, slot.minuto);
    return dt.toLocaleString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function validar(): string | null {
    if (items.length === 0) return "Subí al menos una imagen.";
    if (!fechaInicio) return "Elegí la fecha de inicio.";
    if (horarios.length === 0) return "Configurá al menos un horario.";
    if (items.some((it) => !it.caption.trim()) && tipo === "feed")
      return "Hay publicaciones sin texto. Completá todos los textos o usá el texto general.";
    return null;
  }

  function programarTodo() {
    const err = validar();
    if (err) {
      setAviso({ tipo: "error", mensaje: err });
      return;
    }
    const offsetMinutos = new Date().getTimezoneOffset();
    const [y, m, d] = fechaInicio.split("-").map(Number);

    startTransition(async () => {
      setProgreso({ hechos: 0, total: items.length });
      let hechos = 0;

      // Trabajamos sobre una copia y vamos actualizando estado por item.
      const lista = [...items];
      for (let i = 0; i < lista.length; i++) {
        const it = lista[i];
        if (it.estado === "programada") {
          hechos++;
          setProgreso({ hechos, total: lista.length });
          continue;
        }

        // 1) Subir si no tiene asset_id
        let assetId = it.asset_id;
        if (!assetId) {
          marcar(it.uid, { estado: "subiendo" });
          const fd = new FormData();
          fd.append("file", it.file);
          const up = await subirAssetAction(fd);
          if (!up.ok) {
            marcar(it.uid, { estado: "error", error: up.error });
            continue;
          }
          assetId = up.asset_id;
          marcar(it.uid, { estado: "subida", asset_id: assetId });
        }

        // 2) Calcular fecha y programar
        const dia = Math.floor(i / horarios.length);
        const slot = horarios[i % horarios.length];
        const localMs = Date.UTC(y, m - 1, d + dia, slot.hora, slot.minuto);
        const scheduled_at = new Date(localMs + offsetMinutos * 60_000).toISOString();

        const res = await programarPostAction({
          type: tipo,
          caption: it.caption.trim() || captionBase.trim(),
          asset_ids: [assetId!],
          scheduled_at,
          ...(cuenta ? { social_account_id: cuenta } : {}),
        });
        if (!res.ok) {
          marcar(it.uid, { estado: "error", error: res.error });
        } else {
          marcar(it.uid, { estado: "programada" });
          hechos++;
        }
        setProgreso({ hechos, total: lista.length });
      }

      setProgreso(null);
      const fallidas = lista.length - hechos;
      if (fallidas === 0) {
        setAviso({
          tipo: "ok",
          mensaje: `¡Listo! Se programaron ${hechos} ${tipo === "story" ? "historias" : "publicaciones"}.`,
        });
      } else {
        setAviso({
          tipo: "error",
          mensaje: `Se programaron ${hechos} de ${lista.length}. Quedaron ${fallidas} con error (revisá la lista).`,
        });
      }
    });
  }

  function marcar(uid: string, parche: Partial<Item>) {
    setItems((prev) => prev.map((it) => (it.uid === uid ? { ...it, ...parche } : it)));
  }

  const programadasOk = items.filter((it) => it.estado === "programada").length;

  return (
    <div className="mt-10 space-y-8">
      {/* Parámetros */}
      <section className="border hairline bg-paper p-6 md:p-8 grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-[10px] tracking-[0.22em] uppercase text-muted mb-2 font-medium">
            Tipo de contenido
          </label>
          <div className="flex gap-2">
            <BotonTipo activo={tipo === "feed"} onClick={() => setTipo("feed")}>
              Publicación (feed)
            </BotonTipo>
            <BotonTipo activo={tipo === "story"} onClick={() => setTipo("story")}>
              Historia
            </BotonTipo>
          </div>
        </div>

        <div>
          <label className="block text-[10px] tracking-[0.22em] uppercase text-muted mb-2 font-medium">
            Fecha de inicio
          </label>
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            className="bgr-input w-full"
          />
        </div>

        {cuentas.length > 0 && (
          <div>
            <label className="block text-[10px] tracking-[0.22em] uppercase text-muted mb-2 font-medium">
              Cuenta
            </label>
            <select
              value={cuenta}
              onChange={(e) => setCuenta(e.target.value)}
              className="bgr-input w-full"
            >
              {cuentas.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.account_name} ({c.platform})
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="md:col-span-2">
          <label className="block text-[10px] tracking-[0.22em] uppercase text-muted mb-2 font-medium">
            Horarios por día ({horarios.length})
          </label>
          <div className="flex flex-wrap gap-3 items-center">
            {horarios.map((h, i) => (
              <div key={i} className="flex items-center gap-1">
                <select value={h.hora} onChange={(e) => setHora(i, "hora", Number(e.target.value))} className="bgr-input w-20">
                  {HH.map((x) => <option key={x} value={x}>{String(x).padStart(2, "0")}</option>)}
                </select>
                <span>:</span>
                <select value={h.minuto} onChange={(e) => setHora(i, "minuto", Number(e.target.value))} className="bgr-input w-20">
                  {MM.map((x) => <option key={x} value={x}>{String(x).padStart(2, "0")}</option>)}
                </select>
                {horarios.length > 1 && (
                  <button type="button" onClick={() => delHorario(i)} className="text-red-700 text-lg leading-none ml-1" aria-label="Quitar">×</button>
                )}
              </div>
            ))}
            {horarios.length < 6 && (
              <button type="button" onClick={addHorario} className="text-[10px] tracking-[1.5px] uppercase border hairline px-3 py-2 hover:bg-background transition-colors">
                + horario
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Texto general + subir */}
      <section className="border-2 border-dashed border-line bg-paper p-6 md:p-8">
        <div className="mb-5">
          <label className="block text-[10px] tracking-[0.22em] uppercase text-muted mb-2 font-medium">
            Texto general (se aplica a las nuevas imágenes; editable por cada una)
          </label>
          <textarea
            rows={2}
            value={captionBase}
            onChange={(e) => setCaptionBase(e.target.value)}
            placeholder="Ej: Reformas integrales en CABA. Consultanos por WhatsApp. #arquitectura #reformas"
            className="bgr-input w-full resize-none"
          />
          {items.length > 0 && (
            <button type="button" onClick={aplicarCaptionATodas} className="mt-2 text-[10px] tracking-[1.5px] uppercase text-accent hover:underline">
              Aplicar este texto a todas
            </button>
          )}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          onChange={onElegir}
          className="block w-full text-[13px] text-ink file:mr-4 file:py-2 file:px-4 file:border file:border-line file:bg-background file:text-[10px] file:tracking-[1.5px] file:uppercase file:text-ink hover:file:bg-accent hover:file:text-background hover:file:border-accent file:transition-colors file:cursor-pointer"
        />
        <p className="text-[12px] text-muted mt-2 font-light">
          Podés seleccionar muchas a la vez. Subí hasta 90 para cubrir el mes
          completo (3 por día × 30 días).
        </p>
      </section>

      {/* Resumen + acción */}
      {items.length > 0 && (
        <section className="border hairline bg-background p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-[13px] text-ink">
            <strong>{items.length}</strong> {items.length === 1 ? "imagen" : "imágenes"} ·{" "}
            <strong>{horarios.length}</strong> por día ·{" "}
            ocupa <strong>{diasNecesarios}</strong> {diasNecesarios === 1 ? "día" : "días"}
            {fechaInicio && (
              <>
                {" "}· primera: <strong>{fechaSlot(0)}</strong>
                {items.length > 1 && <> · última: <strong>{fechaSlot(items.length - 1)}</strong></>}
              </>
            )}
          </div>
          <button
            type="button"
            onClick={programarTodo}
            disabled={isPending}
            className="bg-accent text-background px-7 py-3.5 text-[10px] tracking-[2px] uppercase hover:bg-ink transition-colors disabled:opacity-40 shrink-0"
          >
            {isPending
              ? progreso
                ? `Programando ${progreso.hechos}/${progreso.total}…`
                : "Programando…"
              : `Programar ${items.length} ${tipo === "story" ? "historias" : "publicaciones"}`}
          </button>
        </section>
      )}

      {/* Grilla de imágenes */}
      {items.length > 0 && (
        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((it, idx) => (
            <div key={it.uid} className="border-2 border-line bg-paper overflow-hidden">
              <div className="relative aspect-square bg-surface">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={it.preview} alt="" className="absolute inset-0 w-full h-full object-cover" />
                <span className="absolute top-2 left-2 bg-ink/80 text-background px-2 py-1 text-[9px] tracking-[1.5px] uppercase">
                  #{idx + 1}
                </span>
                <span className={`absolute top-2 right-2 px-2 py-1 text-[9px] tracking-[1.5px] uppercase ${
                  it.estado === "programada" ? "bg-accent text-background"
                  : it.estado === "error" ? "bg-red-600 text-white"
                  : it.estado === "subiendo" ? "bg-ink text-background"
                  : "bg-muted/70 text-background"
                }`}>
                  {it.estado === "pendiente" ? "lista" : it.estado}
                </span>
              </div>
              <div className="p-3">
                {fechaInicio && (
                  <p className="text-[11px] text-muted mb-1">📅 {fechaSlot(idx)}</p>
                )}
                {tipo === "feed" ? (
                  <textarea
                    rows={2}
                    value={it.caption}
                    onChange={(e) => setCaption(it.uid, e.target.value)}
                    placeholder="Texto de esta publicación…"
                    className="w-full text-[12px] border hairline p-2 resize-none focus:outline-none focus:border-accent"
                  />
                ) : (
                  <p className="text-[11px] text-muted italic">Las historias no llevan texto.</p>
                )}
                {it.error && <p className="text-[11px] text-red-700 mt-1">{it.error}</p>}
                <button
                  type="button"
                  onClick={() => quitar(it.uid)}
                  disabled={isPending}
                  className="mt-2 text-[10px] tracking-[1.5px] uppercase text-red-700 hover:underline disabled:opacity-40"
                >
                  Quitar
                </button>
              </div>
            </div>
          ))}
        </section>
      )}

      {programadasOk > 0 && !isPending && (
        <p className="text-[13px] text-accent">
          ✓ {programadasOk} ya programadas en esta sesión.
        </p>
      )}

      {/* Cola ya programada en el SaaS */}
      {programadosIniciales.length > 0 && (
        <section className="mt-4">
          <p className="eyebrow mb-3">Ya programadas ({programadosIniciales.length})</p>
          <div className="border hairline bg-paper divide-y divide-line">
            {programadosIniciales.slice(0, 20).map((p) => (
              <div key={p.id} className="flex items-center justify-between gap-4 px-4 py-3 text-[13px]">
                <span className="truncate text-ink">{p.caption || "(sin texto)"}</span>
                <span className="text-muted shrink-0">
                  {new Date(p.scheduled_at).toLocaleString("es-AR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {aviso && (
        <AvisoAccion tipo={aviso.tipo} mensaje={aviso.mensaje} onCerrar={() => setAviso(null)} autoCierreMs={6000} />
      )}
    </div>
  );
}

function BotonTipo({ activo, onClick, children }: { activo: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-[11px] tracking-[1.5px] uppercase px-4 py-2.5 border-2 transition-colors ${
        activo ? "border-accent bg-accent/5 text-ink" : "border-line text-muted hover:border-muted"
      }`}
    >
      {children}
    </button>
  );
}
