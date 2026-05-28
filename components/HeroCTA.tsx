"use client";

import { useState } from "react";
import { ModalAsesoramiento } from "./ModalAsesoramiento";

export function HeroCTA() {
  const [abierto, setAbierto] = useState(false);
  return (
    <>
      <div className="mt-10 flex flex-col sm:flex-row gap-4 sm:items-center fade-up">
        <button
          type="button"
          onClick={() => setAbierto(true)}
          className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-accent text-background text-sm tracking-wider uppercase hover:bg-background hover:text-ink transition-colors"
        >
          Asesoramiento sin compromiso →
        </button>
      </div>
      <ModalAsesoramiento abierto={abierto} onCerrar={() => setAbierto(false)} />
    </>
  );
}
