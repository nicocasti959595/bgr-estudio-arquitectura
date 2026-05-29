"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * Imagen del Obelisco que cambia según el horario local del visitante.
 * Las horas del día/noche son configurables desde /admin/hero.
 *
 * Si `config.activo` es false → muestra siempre la imagen de día.
 */
const IMAGEN_DIA =
  "https://uzxhloolvpdzfduenkew.supabase.co/storage/v1/object/public/bgr-proyectos/obelisco-dia.jpg?v=3";
const IMAGEN_NOCHE =
  "https://uzxhloolvpdzfduenkew.supabase.co/storage/v1/object/public/bgr-proyectos/obelisco-noche.jpg?v=3";

type ConfigHorario = {
  activo: boolean;
  horaNocheInicio: number; // 0-23
  horaNocheFin: number; // 0-23
};

type Props = {
  alt?: string;
  invertir?: boolean; // si true, muestra la opuesta a la hora actual
  priority?: boolean;
  objectPosition?: string;
  config?: ConfigHorario;
};

const CONFIG_DEFAULT: ConfigHorario = {
  activo: true,
  horaNocheInicio: 19,
  horaNocheFin: 7,
};

function calcularEsNoche(cfg: ConfigHorario): boolean {
  if (!cfg.activo) return false; // si está desactivado → siempre día
  const h = new Date().getHours();
  const { horaNocheInicio: ini, horaNocheFin: fin } = cfg;
  // Rango "normal" (ej: 19 a 7) → cruza medianoche
  if (ini > fin) {
    return h >= ini || h < fin;
  }
  // Rango "diurno-invertido" (ej: 7 a 19) → noche dentro del rango
  return h >= ini && h < fin;
}

export function ImagenObelisco({
  alt,
  invertir = false,
  priority = false,
  objectPosition = "center 40%",
  config = CONFIG_DEFAULT,
}: Props) {
  // SSR default → asume día. Al hidratar se ajusta a la hora real.
  const [esNoche, setEsNoche] = useState(false);
  const [montado, setMontado] = useState(false);

  useEffect(() => {
    setMontado(true);
    setEsNoche(calcularEsNoche(config));
    const id = setInterval(() => setEsNoche(calcularEsNoche(config)), 60_000);
    return () => clearInterval(id);
  }, [config]);

  const mostrarNoche = montado ? (invertir ? !esNoche : esNoche) : invertir;
  const src = mostrarNoche ? IMAGEN_NOCHE : IMAGEN_DIA;
  const altText =
    alt ??
    (mostrarNoche
      ? "Obelisco de Buenos Aires de noche"
      : "Obelisco de Buenos Aires de día");

  return (
    <Image
      key={src}
      src={src}
      alt={altText}
      fill
      priority={priority}
      sizes="100vw"
      className="object-cover transition-opacity duration-700"
      style={{ objectPosition }}
    />
  );
}
