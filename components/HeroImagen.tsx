"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { HeroImage, HeroModo } from "@/lib/hero-config";

type Props = {
  imagenes: HeroImage[];
  modo: HeroModo;
  priority?: boolean;
  objectPosition?: string;
};

const INTERVALO_MS = 6000;

export function HeroImagen({
  imagenes,
  modo,
  priority = false,
  objectPosition = "center 40%",
}: Props) {
  const [indice, setIndice] = useState(0);

  // Solo rotar si modo es 'rotacion' Y hay más de 1 imagen
  const debeRotar = modo === "rotacion" && imagenes.length > 1;

  useEffect(() => {
    if (!debeRotar) return;
    const id = setInterval(() => {
      setIndice((i) => (i + 1) % imagenes.length);
    }, INTERVALO_MS);
    return () => clearInterval(id);
  }, [debeRotar, imagenes.length]);

  if (imagenes.length === 0) return null;

  // Modo fijo: muestro solo la primera (ya viene ordenada con principal primero)
  if (!debeRotar) {
    const img = imagenes[0];
    return (
      <Image
        src={img.url}
        alt={img.label}
        fill
        priority={priority}
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition }}
      />
    );
  }

  // Modo rotación: capa todas las imágenes con fade entre ellas
  return (
    <>
      {imagenes.map((img, i) => (
        <Image
          key={img.id}
          src={img.url}
          alt={img.label}
          fill
          priority={priority && i === 0}
          sizes="100vw"
          className="object-cover transition-opacity duration-[1500ms] ease-in-out"
          style={{
            objectPosition,
            opacity: i === indice ? 1 : 0,
          }}
        />
      ))}
    </>
  );
}
