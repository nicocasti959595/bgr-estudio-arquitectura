"use client";

import { BotonAsesoramiento } from "./BotonAsesoramiento";

export function HeroCTA() {
  return (
    <div className="mt-10 flex flex-col sm:flex-row gap-4 sm:items-center fade-up">
      <BotonAsesoramiento variant="claro" />
    </div>
  );
}
