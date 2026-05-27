"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * Imagen del Obelisco que cambia según el horario local del visitante.
 * - 7:00 a 18:59 → imagen de día
 * - 19:00 a 6:59 → imagen de noche
 *
 * Si querés usar TUS imágenes propias:
 *   1) Guardalas en /public como obelisco-dia.jpg y obelisco-noche.jpg
 *   2) Cambiá las URLs de abajo por "/obelisco-dia.jpg" y "/obelisco-noche.jpg"
 */
const IMAGEN_DIA =
  "https://uzxhloolvpdzfduenkew.supabase.co/storage/v1/object/public/bgr-proyectos/obelisco-dia.jpg";
const IMAGEN_NOCHE =
  "https://uzxhloolvpdzfduenkew.supabase.co/storage/v1/object/public/bgr-proyectos/obelisco-noche.jpg";

type Props = {
  alt?: string;
  invertir?: boolean; // si true, muestra la opuesta a la hora actual
  priority?: boolean;
  objectPosition?: string;
};

function calcularEsNoche(): boolean {
  const h = new Date().getHours();
  return h < 7 || h >= 19;
}

export function ImagenObelisco({
  alt,
  invertir = false,
  priority = false,
  objectPosition = "center 40%",
}: Props) {
  // SSR default → asume día (la mayoría de visitas serán diurnas).
  // Al hidratar, se ajusta a la hora real del cliente.
  const [esNoche, setEsNoche] = useState(false);
  const [montado, setMontado] = useState(false);

  useEffect(() => {
    setMontado(true);
    setEsNoche(calcularEsNoche());
    const id = setInterval(() => setEsNoche(calcularEsNoche()), 60_000);
    return () => clearInterval(id);
  }, []);

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
