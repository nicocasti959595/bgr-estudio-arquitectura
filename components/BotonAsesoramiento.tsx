"use client";

import { useState } from "react";
import { ModalAsesoramiento } from "./ModalAsesoramiento";

type Variant = "claro" | "oscuro" | "accent";

type Props = {
  label?: string;
  variant?: Variant;
  className?: string;
};

const variantClasses: Record<Variant, string> = {
  // Botón ocre sobre fondo claro
  accent:
    "bg-accent text-background hover:bg-ink hover:text-background",
  // Botón claro sobre fondo oscuro (hero)
  claro:
    "bg-accent text-background hover:bg-background hover:text-ink",
  // Botón oscuro sobre fondo claro (metodo-bgr)
  oscuro:
    "bg-ink text-background hover:bg-accent hover:text-background",
};

export function BotonAsesoramiento({
  label = "Asesoramiento sin compromiso →",
  variant = "accent",
  className = "",
}: Props) {
  const [abierto, setAbierto] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setAbierto(true)}
        className={`inline-flex items-center justify-center gap-3 px-10 py-5 text-sm tracking-wider uppercase transition-colors ${variantClasses[variant]} ${className}`}
      >
        {label}
      </button>
      <ModalAsesoramiento abierto={abierto} onCerrar={() => setAbierto(false)} />
    </>
  );
}
