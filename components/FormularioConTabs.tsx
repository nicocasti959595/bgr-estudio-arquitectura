"use client";

import { useState, useTransition } from "react";
import { enviarConsultaAction } from "@/lib/actions";

type TabId = "general" | "reforma" | "bano" | "cocina" | "obra";

const tabs: { id: TabId; label: string }[] = [
  { id: "general", label: "General" },
  { id: "reforma", label: "Reforma integral" },
  { id: "bano", label: "Baño" },
  { id: "cocina", label: "Cocina" },
  { id: "obra", label: "Obra nueva" },
];

type Estado = "idle" | "enviando" | "ok" | "error";

export function FormularioConTabs() {
  const [tab, setTab] = useState<TabId>("general");
  const [estado, setEstado] = useState<Estado>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const data = new FormData(formEl);

    const nombre = String(data.get("nombre") ?? "").trim();
    const whatsapp = String(data.get("whatsapp") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();

    if (!nombre || !email || !whatsapp) {
      setEstado("error");
      setErrorMsg("Por favor completá nombre, WhatsApp y email.");
      return;
    }

    // recopilar campos (incluyendo chips marcados)
    const payload: Record<string, unknown> = { tipo_form: tab };
    data.forEach((v, k) => {
      if (k === "chips_seleccionados") return;
      const val = String(v ?? "").trim();
      if (val) payload[k] = val;
    });

    // chips: leemos directamente del DOM dentro del form
    const chipsSel = Array.from(
      formEl.querySelectorAll<HTMLElement>(".chip.sel")
    ).map((el) => ({
      grupo: el.dataset.grupo ?? "chips",
      valor: el.dataset.valor ?? el.textContent?.trim() ?? "",
    }));
    if (chipsSel.length > 0) {
      const grouped: Record<string, string[]> = {};
      for (const c of chipsSel) {
        if (!grouped[c.grupo]) grouped[c.grupo] = [];
        grouped[c.grupo].push(c.valor);
      }
      payload.opciones = grouped;
    }

    setEstado("enviando");
    setErrorMsg("");

    startTransition(async () => {
      const res = await enviarConsultaAction(payload);
      if (res.ok) {
        setEstado("ok");
        formEl.reset();
        formEl
          .querySelectorAll(".chip.sel")
          .forEach((el) => el.classList.remove("sel"));
      } else {
        setEstado("error");
        setErrorMsg(res.error ?? "Hubo un problema al enviar la consulta.");
      }
    });
  }

  return (
    <div>
      {/* TABS */}
      <div className="flex flex-wrap gap-0 mb-8 border-b border-line2">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`text-[10px] tracking-[1.5px] uppercase px-4 py-2.5 border-b-2 transition-all ${
              tab === t.id
                ? "text-accent2 border-accent2"
                : "text-muted border-transparent hover:text-soft"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* PANELS */}
      <form key={tab} onSubmit={handleSubmit}>
        {tab === "general" && <PanelGeneral />}
        {tab === "reforma" && <PanelReforma />}
        {tab === "bano" && <PanelBano />}
        {tab === "cocina" && <PanelCocina />}
        {tab === "obra" && <PanelObra />}

        {estado === "ok" && (
          <div className="mt-6 border border-accent/60 bg-accent/10 px-5 py-3 text-[13px] text-foreground">
            Consulta enviada. Te respondemos en menos de 24 horas hábiles.
          </div>
        )}
        {estado === "error" && errorMsg && (
          <div className="mt-6 border border-red-700/40 bg-red-950/20 px-5 py-3 text-[13px] text-red-300">
            {errorMsg}
          </div>
        )}

        <div className="mt-8 pt-7 border-t border-line2 flex items-center gap-6">
          <button
            type="submit"
            disabled={estado === "enviando"}
            className="bg-accent text-white px-9 py-3.5 text-[10px] tracking-[2px] uppercase hover:bg-accent2 transition-colors disabled:opacity-50"
          >
            {estado === "enviando" ? "Enviando…" : "Enviar consulta →"}
          </button>
          <span className="text-[10px] tracking-[1px] uppercase text-muted">
            * Campos obligatorios
          </span>
        </div>
      </form>
    </div>
  );
}

// ============== PANELES ==============

function Label({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-[9px] tracking-[2px] uppercase text-muted mb-2"
    >
      {children}
      {required && <sup className="text-accent2">*</sup>}
    </label>
  );
}

function ChipGroup({
  grupo,
  opciones,
  label,
}: {
  grupo: string;
  opciones: string[];
  label: string;
}) {
  return (
    <div className="col-span-full">
      <Label htmlFor={`chips-${grupo}`}>{label}</Label>
      <div id={`chips-${grupo}`} className="flex flex-wrap gap-1.5 mt-1">
        {opciones.map((op) => (
          <button
            key={op}
            type="button"
            data-grupo={grupo}
            data-valor={op}
            onClick={(e) => e.currentTarget.classList.toggle("sel")}
            className="chip"
          >
            {op}
          </button>
        ))}
      </div>
    </div>
  );
}

function CamposBase() {
  return (
    <>
      <div>
        <Label htmlFor="nombre" required>
          Nombre y apellido{" "}
        </Label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          required
          placeholder="Ej: Javier García"
          className="bgr-input"
        />
      </div>
      <div>
        <Label htmlFor="whatsapp" required>
          WhatsApp{" "}
        </Label>
        <input
          id="whatsapp"
          name="whatsapp"
          type="tel"
          required
          placeholder="11 XXXX-XXXX"
          className="bgr-input"
        />
      </div>
      <div>
        <Label htmlFor="email" required>
          Email{" "}
        </Label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="tu@email.com"
          className="bgr-input"
        />
      </div>
    </>
  );
}

function PanelGeneral() {
  return (
    <div className="grid sm:grid-cols-2 gap-6">
      <CamposBase />
      <div>
        <Label htmlFor="zona">Barrio / Zona</Label>
        <input
          id="zona"
          name="zona"
          type="text"
          placeholder="Ej: Belgrano, CABA"
          className="bgr-input"
        />
      </div>
      <ChipGroup
        grupo="necesidad"
        label="¿Qué necesitás?"
        opciones={[
          "Obra nueva",
          "Reforma integral",
          "Baño",
          "Cocina",
          "Lavadero",
          "Interiorismo",
          "Dirección de obra",
          "Llave en mano",
        ]}
      />
      <div>
        <Label htmlFor="superficie">Superficie del depto</Label>
        <select id="superficie" name="superficie" className="bgr-input">
          <option value="">Seleccioná</option>
          <option>Hasta 50m²</option>
          <option>50 – 80m²</option>
          <option>80 – 120m²</option>
          <option>Más de 120m²</option>
        </select>
      </div>
      <div>
        <Label htmlFor="cuando">¿Cuándo empezás?</Label>
        <select id="cuando" name="cuando" className="bgr-input">
          <option value="">Seleccioná</option>
          <option>De inmediato</option>
          <option>1 a 3 meses</option>
          <option>3 a 6 meses</option>
          <option>Más adelante</option>
        </select>
      </div>
      <div className="col-span-full">
        <Label htmlFor="mensaje">Mensaje (opcional)</Label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows={3}
          placeholder="Describí brevemente tu proyecto..."
          className="bgr-input resize-none"
        />
      </div>
    </div>
  );
}

function PanelReforma() {
  return (
    <div className="grid sm:grid-cols-2 gap-6">
      <CamposBase />
      <div>
        <Label htmlFor="direccion" required>
          Dirección del departamento{" "}
        </Label>
        <input
          id="direccion"
          name="direccion"
          type="text"
          required
          placeholder="Ej: Av. Cramer 1900, Belgrano"
          className="bgr-input"
        />
      </div>
      <div>
        <Label htmlFor="superficie">Superficie total (m²)</Label>
        <input
          id="superficie"
          name="superficie"
          type="text"
          placeholder="Ej: 85m²"
          className="bgr-input"
        />
      </div>
      <div>
        <Label htmlFor="estado">Estado actual</Label>
        <select id="estado" name="estado" className="bgr-input">
          <option value="">Seleccioná</option>
          <option>Habitable</option>
          <option>Semi-habitable</option>
          <option>Vacío</option>
          <option>A demoler</option>
        </select>
      </div>
      <ChipGroup
        grupo="ambientes"
        label="¿Qué ambientes incluye la reforma?"
        opciones={[
          "Cocina",
          "Baño principal",
          "Baño secundario",
          "Living",
          "Comedor",
          "Dormitorios",
          "Lavadero",
          "Balcón",
          "Todo el departamento",
        ]}
      />
      <div>
        <Label htmlFor="estilo">Estilo preferido</Label>
        <select id="estilo" name="estilo" className="bgr-input">
          <option value="">Seleccioná</option>
          <option>Minimalista</option>
          <option>Industrial</option>
          <option>Clásico</option>
          <option>Moderno</option>
          <option>Sin preferencia</option>
        </select>
      </div>
      <div>
        <Label htmlFor="presupuesto">Presupuesto aproximado</Label>
        <select id="presupuesto" name="presupuesto" className="bgr-input">
          <option>No lo sé todavía</option>
          <option>Hasta $10M</option>
          <option>$10M – $25M</option>
          <option>$25M – $50M</option>
          <option>Más de $50M</option>
        </select>
      </div>
      <div>
        <Label htmlFor="cuando">¿Cuándo querés empezar?</Label>
        <select id="cuando" name="cuando" className="bgr-input">
          <option value="">Seleccioná</option>
          <option>De inmediato</option>
          <option>1 a 3 meses</option>
          <option>3 a 6 meses</option>
          <option>Más adelante</option>
        </select>
      </div>
      <div className="col-span-full">
        <Label htmlFor="mensaje">Descripción del proyecto</Label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows={3}
          placeholder="Contanos qué tenés en mente..."
          className="bgr-input resize-none"
        />
      </div>
    </div>
  );
}

function PanelBano() {
  return (
    <div className="grid sm:grid-cols-2 gap-6">
      <CamposBase />
      <div>
        <Label htmlFor="zona" required>
          Barrio / Zona{" "}
        </Label>
        <input
          id="zona"
          name="zona"
          type="text"
          required
          placeholder="Ej: Belgrano, CABA"
          className="bgr-input"
        />
      </div>
      <ChipGroup
        grupo="tipo_bano"
        label="¿Qué tipo de baño es?"
        opciones={[
          "Baño principal",
          "Baño secundario",
          "Suite (en dormitorio)",
          "Toilette",
          "Baño de servicio",
        ]}
      />
      <ChipGroup
        grupo="incluye"
        label="¿Qué incluye la remodelación?"
        opciones={[
          "Revestimientos",
          "Sanitarios",
          "Mesada / bacha",
          "Ducha / bañadera",
          "Griferías",
          "Vanitory",
          "Espejo / botiquín",
          "Iluminación",
          "Reforma total",
        ]}
      />
      <div>
        <Label htmlFor="superficie">Superficie aproximada</Label>
        <select id="superficie" name="superficie" className="bgr-input">
          <option value="">Seleccioná</option>
          <option>Hasta 3m²</option>
          <option>3 a 5m²</option>
          <option>5 a 8m²</option>
          <option>Más de 8m²</option>
        </select>
      </div>
      <div>
        <Label htmlFor="estilo">Estilo preferido</Label>
        <select id="estilo" name="estilo" className="bgr-input">
          <option value="">Seleccioná</option>
          <option>Minimalista</option>
          <option>Industrial</option>
          <option>Clásico</option>
          <option>Moderno</option>
          <option>Sin preferencia</option>
        </select>
      </div>
      <div className="col-span-full">
        <Label htmlFor="mensaje">Descripción / referencias</Label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows={3}
          placeholder="Contanos qué tenés en mente o adjuntá fotos por WhatsApp..."
          className="bgr-input resize-none"
        />
      </div>
    </div>
  );
}

function PanelCocina() {
  return (
    <div className="grid sm:grid-cols-2 gap-6">
      <CamposBase />
      <div>
        <Label htmlFor="zona" required>
          Barrio / Zona{" "}
        </Label>
        <input
          id="zona"
          name="zona"
          type="text"
          required
          placeholder="Ej: Belgrano, CABA"
          className="bgr-input"
        />
      </div>
      <ChipGroup
        grupo="estado_actual"
        label="¿Cómo es la cocina actualmente?"
        opciones={[
          "Cerrada",
          "Semiabierta",
          "Abierta / integrada",
          "Con lavadero separado",
          "Con lavadero integrado",
        ]}
      />
      <ChipGroup
        grupo="incluye"
        label="¿Qué incluye la reforma?"
        opciones={[
          "Muebles de cocina",
          "Mesada",
          "Bachas",
          "Griferías",
          "Electrodomésticos empotrados",
          "Revestimientos",
          "Piso",
          "Iluminación",
          "Lavadero",
          "Reforma total",
        ]}
      />
      <div>
        <Label htmlFor="material_muebles">Material de muebles</Label>
        <select
          id="material_muebles"
          name="material_muebles"
          className="bgr-input"
        >
          <option value="">Seleccioná</option>
          <option>Melamina</option>
          <option>Madera</option>
          <option>Lacado</option>
          <option>Sin preferencia</option>
        </select>
      </div>
      <div>
        <Label htmlFor="material_mesada">Material de mesada</Label>
        <select
          id="material_mesada"
          name="material_mesada"
          className="bgr-input"
        >
          <option value="">Seleccioná</option>
          <option>Granito</option>
          <option>Silestone / Cuarzo</option>
          <option>Acero inoxidable</option>
          <option>Porcelanato</option>
          <option>Sin preferencia</option>
        </select>
      </div>
      <div className="col-span-full">
        <Label htmlFor="mensaje">Descripción / referencias</Label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows={3}
          placeholder="Contanos qué tenés en mente o adjuntá fotos por WhatsApp..."
          className="bgr-input resize-none"
        />
      </div>
    </div>
  );
}

function PanelObra() {
  return (
    <div className="grid sm:grid-cols-2 gap-6">
      <CamposBase />
      <div>
        <Label htmlFor="ubicacion" required>
          Ubicación del terreno / inmueble{" "}
        </Label>
        <input
          id="ubicacion"
          name="ubicacion"
          type="text"
          required
          placeholder="Ej: Av. del Libertador 2350, CABA"
          className="bgr-input"
        />
      </div>
      <ChipGroup
        grupo="tipo_obra"
        label="¿Qué tipo de obra es?"
        opciones={[
          "Casa unifamiliar",
          "Departamento",
          "Local comercial",
          "Oficina",
          "Barrio privado / countries",
          "Otro",
        ]}
      />
      <ChipGroup
        grupo="etapa"
        label="¿En qué etapa está el proyecto?"
        opciones={[
          "Solo tengo el terreno",
          "Tengo idea, sin proyecto",
          "Tengo proyecto, necesito dirección",
          "Quiero llave en mano completo",
        ]}
      />
      <div>
        <Label htmlFor="superficie_terreno">Superficie del terreno (m²)</Label>
        <input
          id="superficie_terreno"
          name="superficie_terreno"
          type="text"
          placeholder="Ej: 300m²"
          className="bgr-input"
        />
      </div>
      <div>
        <Label htmlFor="superficie_construir">
          Superficie a construir (m²)
        </Label>
        <input
          id="superficie_construir"
          name="superficie_construir"
          type="text"
          placeholder="Ej: 180m²"
          className="bgr-input"
        />
      </div>
      <div>
        <Label htmlFor="presupuesto">Presupuesto total estimado</Label>
        <select id="presupuesto" name="presupuesto" className="bgr-input">
          <option value="">Seleccioná</option>
          <option>Hasta USD 50.000</option>
          <option>USD 50.000 – 100.000</option>
          <option>USD 100.000 – 250.000</option>
          <option>Más de USD 250.000</option>
          <option>A definir</option>
        </select>
      </div>
      <div>
        <Label htmlFor="cuando">¿Cuándo querés empezar?</Label>
        <select id="cuando" name="cuando" className="bgr-input">
          <option value="">Seleccioná</option>
          <option>De inmediato</option>
          <option>1 a 3 meses</option>
          <option>3 a 6 meses</option>
          <option>Más adelante</option>
        </select>
      </div>
      <div className="col-span-full">
        <Label htmlFor="mensaje">Descripción del proyecto</Label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows={3}
          placeholder="Contanos qué tenés en mente, estilo, ambientes prioritarios..."
          className="bgr-input resize-none"
        />
      </div>
    </div>
  );
}
