"use client";

import { useState } from "react";

const NUMERO_WA = "5491136910077";

type TipoObra =
  | "reforma-integral"
  | "cocina"
  | "bano"
  | "obra-nueva"
  | "interiorismo"
  | "otro";

type Datos = {
  tipo?: TipoObra;
  superficie?: string;
  ambientes?: string[];
  estado_actual?: string;
  estilo?: string;
  zona?: string;
  plazo?: string;
  presupuesto?: string;
  descripcion?: string;
  nombre?: string;
  whatsapp?: string;
  email?: string;
};

const TIPOS: Array<{
  id: TipoObra;
  titulo: string;
  desc: string;
  icono: string;
}> = [
  {
    id: "reforma-integral",
    titulo: "Reforma integral",
    desc: "Departamento completo, varios ambientes",
    icono: "▦",
  },
  {
    id: "cocina",
    titulo: "Cocina",
    desc: "Remodelación parcial o total de la cocina",
    icono: "□",
  },
  {
    id: "bano",
    titulo: "Baño",
    desc: "Remodelación de baño principal, suite o toilette",
    icono: "▢",
  },
  {
    id: "obra-nueva",
    titulo: "Obra nueva",
    desc: "Construcción desde cero (casa, depto, comercial)",
    icono: "△",
  },
  {
    id: "interiorismo",
    titulo: "Interiorismo",
    desc: "Diseño y mobiliario a medida",
    icono: "◇",
  },
  {
    id: "otro",
    titulo: "Otro",
    desc: "Contanos qué necesitás",
    icono: "○",
  },
];

const tituloDe = (id?: TipoObra) =>
  TIPOS.find((t) => t.id === id)?.titulo ?? "Consulta general";

function sanitizar(s: string): string {
  let out = "";
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    if ((c >= 32 && c < 127) || s[i] === "\n") out += s[i];
  }
  return out;
}

export function WizardServicios() {
  const [paso, setPaso] = useState<1 | 2 | 3 | 4>(1);
  const [d, setD] = useState<Datos>({});
  const [error, setError] = useState<string | null>(null);

  const set = (k: keyof Datos, v: string) =>
    setD((prev) => ({ ...prev, [k]: v }));

  const toggleAmbiente = (a: string) => {
    setD((prev) => {
      const lista = prev.ambientes ?? [];
      const yaEsta = lista.includes(a);
      return {
        ...prev,
        ambientes: yaEsta ? lista.filter((x) => x !== a) : [...lista, a],
      };
    });
  };

  function siguiente() {
    setError(null);
    if (paso === 1 && !d.tipo) {
      setError("Elegí qué tipo de obra estás pensando.");
      return;
    }
    if (paso === 3) {
      if (!d.nombre?.trim() || !d.whatsapp?.trim()) {
        setError("Necesitamos al menos tu nombre y WhatsApp.");
        return;
      }
      enviarPorWhatsApp();
      return;
    }
    setPaso((p) => (p + 1) as typeof paso);
  }

  function atras() {
    setError(null);
    setPaso((p) => (Math.max(1, p - 1) as typeof paso));
  }

  function enviarPorWhatsApp() {
    const partes: string[] = [
      `Hola BGR, soy ${sanitizar(d.nombre || "")}.`,
      `Tipo de consulta: *${tituloDe(d.tipo)}*.`,
      "",
    ];
    if (d.zona) partes.push(`Zona: ${sanitizar(d.zona)}`);
    if (d.superficie) partes.push(`Superficie: ${sanitizar(d.superficie)}`);
    if (d.ambientes && d.ambientes.length > 0)
      partes.push(`Ambientes: ${d.ambientes.join(", ")}`);
    if (d.estado_actual)
      partes.push(`Estado actual: ${sanitizar(d.estado_actual)}`);
    if (d.estilo) partes.push(`Estilo: ${sanitizar(d.estilo)}`);
    if (d.plazo) partes.push(`Plazo: ${sanitizar(d.plazo)}`);
    if (d.presupuesto)
      partes.push(`Presupuesto aprox: ${sanitizar(d.presupuesto)}`);
    if (d.descripcion) {
      partes.push("");
      partes.push(`Comentario:`);
      partes.push(sanitizar(d.descripcion));
    }
    partes.push("");
    partes.push(`WhatsApp: ${sanitizar(d.whatsapp || "")}`);
    if (d.email?.trim()) partes.push(`Email: ${sanitizar(d.email)}`);
    partes.push("");
    partes.push("— Enviado desde bgr.com.ar");

    const url = `https://wa.me/${NUMERO_WA}?text=${encodeURIComponent(
      partes.join("\n")
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setPaso(4);
  }

  return (
    <div className="border hairline bg-background">
      {/* PROGRESO */}
      <div className="px-7 md:px-10 pt-6 pb-5 border-b hairline flex items-center gap-3">
        {[1, 2, 3].map((n) => (
          <div key={n} className="flex items-center gap-3 flex-1">
            <span
              className={`flex items-center justify-center w-8 h-8 border text-[11px] tracking-wider transition-colors ${
                paso >= n
                  ? "bg-accent text-background border-accent"
                  : "border-line text-muted"
              }`}
            >
              {n}
            </span>
            <span
              className={`text-[10px] tracking-[0.2em] uppercase ${
                paso === n ? "text-accent font-medium" : "text-muted"
              }`}
            >
              {n === 1 ? "Tipo" : n === 2 ? "Detalles" : "Tus datos"}
            </span>
            {n < 3 && (
              <span
                className={`flex-1 h-px ${
                  paso > n ? "bg-accent" : "bg-line"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="px-7 md:px-10 py-8 md:py-10 min-h-[400px]">
        {/* PASO 1 — TIPO */}
        {paso === 1 && (
          <div>
            <p className="eyebrow">— Paso 1 de 3</p>
            <h3 className="font-serif text-2xl md:text-3xl text-ink mt-3 mb-2">
              ¿Qué tipo de obra estás pensando?
            </h3>
            <p className="text-sm text-muted mb-6">
              Elegí una opción. Te vamos a hacer preguntas específicas según
              el tipo.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {TIPOS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => set("tipo", t.id)}
                  className={`text-left p-5 border-2 transition-all ${
                    d.tipo === t.id
                      ? "border-accent bg-accent/5"
                      : "border-line bg-background hover:border-muted"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`text-2xl leading-none mt-0.5 ${
                        d.tipo === t.id ? "text-accent" : "text-muted"
                      }`}
                    >
                      {t.icono}
                    </span>
                    <div>
                      <p
                        className={`font-serif text-lg ${
                          d.tipo === t.id ? "text-accent" : "text-ink"
                        }`}
                      >
                        {t.titulo}
                      </p>
                      <p className="text-xs text-muted mt-1 leading-relaxed">
                        {t.desc}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* PASO 2 — DETALLES POR TIPO */}
        {paso === 2 && (
          <div>
            <p className="eyebrow">— Paso 2 de 3</p>
            <h3 className="font-serif text-2xl md:text-3xl text-ink mt-3 mb-6">
              Contanos un poco más sobre tu{" "}
              <span className="italic text-accent">
                {tituloDe(d.tipo).toLowerCase()}
              </span>
              .
            </h3>

            <div className="space-y-6">
              <div>
                <Label>Zona o barrio</Label>
                <Input
                  value={d.zona ?? ""}
                  onChange={(v) => set("zona", v)}
                  placeholder="Ej: Belgrano, Caballito, Vicente López..."
                />
              </div>

              {(d.tipo === "reforma-integral" ||
                d.tipo === "obra-nueva") && (
                <>
                  <div>
                    <Label>Superficie aproximada</Label>
                    <Select
                      value={d.superficie ?? ""}
                      onChange={(v) => set("superficie", v)}
                      opciones={[
                        "Hasta 50 m²",
                        "50 – 80 m²",
                        "80 – 120 m²",
                        "120 – 200 m²",
                        "Más de 200 m²",
                      ]}
                    />
                  </div>
                  <ChipGroup
                    label="¿Qué ambientes incluye?"
                    seleccionados={d.ambientes ?? []}
                    onToggle={toggleAmbiente}
                    opciones={[
                      "Cocina",
                      "Baño principal",
                      "Baño secundario",
                      "Living",
                      "Comedor",
                      "Dormitorios",
                      "Lavadero",
                      "Balcón",
                      "Todo el depto",
                    ]}
                  />
                </>
              )}

              {d.tipo === "cocina" && (
                <>
                  <div>
                    <Label>¿Cómo es la cocina actualmente?</Label>
                    <Select
                      value={d.estado_actual ?? ""}
                      onChange={(v) => set("estado_actual", v)}
                      opciones={[
                        "Cerrada",
                        "Semi-abierta",
                        "Abierta / integrada",
                        "Con lavadero separado",
                      ]}
                    />
                  </div>
                  <ChipGroup
                    label="¿Qué querés cambiar?"
                    seleccionados={d.ambientes ?? []}
                    onToggle={toggleAmbiente}
                    opciones={[
                      "Muebles",
                      "Mesada",
                      "Bachas y griferías",
                      "Electrodomésticos",
                      "Revestimientos",
                      "Piso",
                      "Iluminación",
                      "Reforma total",
                    ]}
                  />
                </>
              )}

              {d.tipo === "bano" && (
                <>
                  <div>
                    <Label>Tipo de baño</Label>
                    <Select
                      value={d.estado_actual ?? ""}
                      onChange={(v) => set("estado_actual", v)}
                      opciones={[
                        "Baño principal",
                        "Baño secundario",
                        "Suite (en dormitorio)",
                        "Toilette",
                        "Baño de servicio",
                      ]}
                    />
                  </div>
                  <ChipGroup
                    label="¿Qué incluye la reforma?"
                    seleccionados={d.ambientes ?? []}
                    onToggle={toggleAmbiente}
                    opciones={[
                      "Revestimientos",
                      "Sanitarios",
                      "Ducha / bañera",
                      "Mesada y bacha",
                      "Griferías",
                      "Vanitory",
                      "Iluminación",
                      "Reforma total",
                    ]}
                  />
                </>
              )}

              {d.tipo === "interiorismo" && (
                <>
                  <div>
                    <Label>Estilo preferido</Label>
                    <Select
                      value={d.estilo ?? ""}
                      onChange={(v) => set("estilo", v)}
                      opciones={[
                        "Minimalista",
                        "Industrial",
                        "Clásico",
                        "Moderno",
                        "Escandinavo",
                        "Sin preferencia",
                      ]}
                    />
                  </div>
                  <div>
                    <Label>¿Qué necesitás?</Label>
                    <textarea
                      value={d.descripcion ?? ""}
                      onChange={(e) =>
                        set("descripcion", sanitizar(e.target.value))
                      }
                      rows={3}
                      placeholder="Mobiliario, paleta de materiales, iluminación..."
                      className="w-full bg-transparent border-b hairline focus:border-accent focus:outline-none pb-2 text-base text-ink resize-none transition-colors"
                    />
                  </div>
                </>
              )}

              {d.tipo === "otro" && (
                <div>
                  <Label>Contanos qué necesitás</Label>
                  <textarea
                    value={d.descripcion ?? ""}
                    onChange={(e) =>
                      set("descripcion", sanitizar(e.target.value))
                    }
                    rows={5}
                    placeholder="Describí el tipo de obra o servicio..."
                    className="w-full bg-transparent border-b hairline focus:border-accent focus:outline-none pb-2 text-base text-ink resize-none transition-colors"
                  />
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <Label>¿Cuándo querés empezar?</Label>
                  <Select
                    value={d.plazo ?? ""}
                    onChange={(v) => set("plazo", v)}
                    opciones={[
                      "De inmediato",
                      "1 a 3 meses",
                      "3 a 6 meses",
                      "Más adelante",
                    ]}
                  />
                </div>
                <div>
                  <Label>Presupuesto aproximado (opcional)</Label>
                  <Select
                    value={d.presupuesto ?? ""}
                    onChange={(v) => set("presupuesto", v)}
                    opciones={[
                      "No lo sé todavía",
                      "Hasta ARS 10M",
                      "ARS 10M – 25M",
                      "ARS 25M – 50M",
                      "Más de ARS 50M",
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PASO 3 — DATOS DE CONTACTO */}
        {paso === 3 && (
          <div>
            <p className="eyebrow">— Paso 3 de 3</p>
            <h3 className="font-serif text-2xl md:text-3xl text-ink mt-3 mb-2">
              ¿Cómo te contactamos?
            </h3>
            <p className="text-sm text-muted mb-6">
              Al enviar te abrimos WhatsApp con el resumen listo para mandar.
            </p>

            <div className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <Label required>Nombre y apellido</Label>
                  <Input
                    value={d.nombre ?? ""}
                    onChange={(v) => set("nombre", v)}
                    placeholder="Ej: Javier García"
                    autoFocus
                  />
                </div>
                <div>
                  <Label required>WhatsApp</Label>
                  <Input
                    value={d.whatsapp ?? ""}
                    onChange={(v) => set("whatsapp", v)}
                    placeholder="11 XXXX-XXXX"
                  />
                </div>
              </div>
              <div>
                <Label>Email (opcional)</Label>
                <Input
                  value={d.email ?? ""}
                  onChange={(v) => set("email", v)}
                  placeholder="tu@email.com"
                />
              </div>

              {/* RESUMEN */}
              <div className="border hairline bg-paper p-5 mt-4">
                <p className="text-[10px] tracking-[0.22em] uppercase text-accent font-medium mb-3">
                  Resumen de tu consulta
                </p>
                <dl className="space-y-2 text-sm">
                  <Item k="Tipo" v={tituloDe(d.tipo)} />
                  {d.zona && <Item k="Zona" v={d.zona} />}
                  {d.superficie && <Item k="Superficie" v={d.superficie} />}
                  {d.ambientes && d.ambientes.length > 0 && (
                    <Item k="Incluye" v={d.ambientes.join(", ")} />
                  )}
                  {d.estado_actual && (
                    <Item k="Detalle" v={d.estado_actual} />
                  )}
                  {d.estilo && <Item k="Estilo" v={d.estilo} />}
                  {d.plazo && <Item k="Plazo" v={d.plazo} />}
                  {d.presupuesto && (
                    <Item k="Presupuesto" v={d.presupuesto} />
                  )}
                </dl>
              </div>
            </div>
          </div>
        )}

        {/* PASO 4 — CONFIRMACIÓN */}
        {paso === 4 && (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-[#25D366]/10 border-2 border-[#25D366] mb-6">
              <svg
                viewBox="0 0 24 24"
                fill="#25D366"
                className="h-10 w-10"
                aria-hidden="true"
              >
                <path d="M19.077 4.928C17.191 3.041 14.683 2 12.011 2c-5.508 0-9.99 4.482-9.99 9.99 0 1.762.46 3.482 1.336 4.999L2 22l5.146-1.359a9.953 9.953 0 0 0 4.865 1.239h.004c5.509 0 9.991-4.482 9.991-9.99 0-2.673-1.041-5.181-2.929-7.068z" />
              </svg>
            </div>
            <h3 className="font-serif text-2xl md:text-3xl text-ink">
              Se abrió WhatsApp con tu mensaje.
            </h3>
            <p className="mt-3 text-muted">
              Solo tenés que tocar "Enviar" y te respondemos a la brevedad.
            </p>
            <button
              type="button"
              onClick={() => {
                setPaso(1);
                setD({});
              }}
              className="mt-7 text-[11px] tracking-[1.5px] uppercase text-accent link-underline"
            >
              Hacer otra consulta
            </button>
          </div>
        )}

        {error && (
          <p className="mt-5 text-sm text-red-700 bg-red-50 border border-red-200 px-4 py-2">
            {error}
          </p>
        )}
      </div>

      {/* BOTONES NAVEGACIÓN */}
      {paso < 4 && (
        <div className="border-t hairline px-7 md:px-10 py-5 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={atras}
            disabled={paso === 1}
            className="text-sm text-muted hover:text-ink tracking-wider uppercase disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ← Atrás
          </button>
          <button
            type="button"
            onClick={siguiente}
            className={`inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold tracking-wider uppercase transition-colors ${
              paso === 3
                ? "bg-[#25D366] text-white hover:bg-[#1ebe57]"
                : "bg-ink text-background hover:bg-accent"
            }`}
          >
            {paso === 3 ? (
              <>
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M19.077 4.928C17.191 3.041 14.683 2 12.011 2c-5.508 0-9.99 4.482-9.99 9.99 0 1.762.46 3.482 1.336 4.999L2 22l5.146-1.359a9.953 9.953 0 0 0 4.865 1.239h.004c5.509 0 9.991-4.482 9.991-9.99 0-2.673-1.041-5.181-2.929-7.068z" />
                </svg>
                Enviar por WhatsApp
              </>
            ) : (
              "Siguiente →"
            )}
          </button>
        </div>
      )}
    </div>
  );
}

// ============== Helpers UI ==============

function Label({
  children,
  required,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="block text-[10px] tracking-[0.22em] uppercase text-muted mb-2 font-medium">
      {children} {required && <sup className="text-accent">*</sup>}
    </label>
  );
}

function Input({
  value,
  onChange,
  placeholder,
  autoFocus,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
}) {
  return (
    <input
      type="text"
      value={value}
      autoFocus={autoFocus}
      onChange={(e) => onChange(sanitizar(e.target.value))}
      placeholder={placeholder}
      className="w-full bg-transparent border-b hairline focus:border-accent focus:outline-none pb-2 text-base text-ink transition-colors"
    />
  );
}

function Select({
  value,
  onChange,
  opciones,
}: {
  value: string;
  onChange: (v: string) => void;
  opciones: string[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-transparent border-b hairline focus:border-accent focus:outline-none pb-2 text-base text-ink transition-colors cursor-pointer"
    >
      <option value="">Seleccioná</option>
      {opciones.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

function ChipGroup({
  label,
  opciones,
  seleccionados,
  onToggle,
}: {
  label: string;
  opciones: string[];
  seleccionados: string[];
  onToggle: (v: string) => void;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="flex flex-wrap gap-2 mt-1">
        {opciones.map((op) => {
          const sel = seleccionados.includes(op);
          return (
            <button
              key={op}
              type="button"
              onClick={() => onToggle(op)}
              className={`text-[11px] tracking-[0.16em] uppercase border px-3 py-2 transition-colors ${
                sel
                  ? "border-accent text-accent bg-accent/10"
                  : "border-line text-muted hover:border-muted"
              }`}
            >
              {op}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Item({ k, v }: { k: string; v: string }) {
  return (
    <div className="grid grid-cols-[100px_1fr] gap-3">
      <dt className="text-muted">{k}</dt>
      <dd className="text-ink">{v}</dd>
    </div>
  );
}
