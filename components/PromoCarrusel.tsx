"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import type { Banner } from "@/lib/banners-config";

const INTERVALO_MS = 5000;

export function PromoCarrusel({ banners }: { banners: Banner[] }) {
  const [indice, setIndice] = useState(0);
  const total = banners.length;

  const ir = useCallback(
    (i: number) => setIndice(((i % total) + total) % total),
    [total]
  );
  const siguiente = useCallback(() => ir(indice + 1), [indice, ir]);
  const anterior = useCallback(() => ir(indice - 1), [indice, ir]);

  // Auto-rotación (se pausa si hay 1 solo banner)
  useEffect(() => {
    if (total <= 1) return;
    const t = setInterval(() => {
      setIndice((i) => (i + 1) % total);
    }, INTERVALO_MS);
    return () => clearInterval(t);
  }, [total]);

  if (total === 0) return null;

  return (
    <section
      className="relative w-full overflow-hidden bg-ink"
      aria-roledescription="carrusel"
      aria-label="Promociones y lanzamientos"
    >
      {/* Pista de slides */}
      <div className="relative aspect-[16/10] sm:aspect-[16/7] lg:aspect-[1920/720] max-h-[calc(100vh-7rem)]">
        {banners.map((b, i) => {
          const contenido = (
            <Image
              src={b.imagen_url}
              alt={b.titulo}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover object-center"
            />
          );
          return (
            <div
              key={b.id}
              className="absolute inset-0 transition-opacity duration-700 ease-in-out"
              style={{
                opacity: i === indice ? 1 : 0,
                pointerEvents: i === indice ? "auto" : "none",
              }}
              aria-hidden={i !== indice}
            >
              {b.link ? (
                b.link.startsWith("http") ? (
                  <a
                    href={b.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full h-full"
                    aria-label={b.titulo}
                  >
                    {contenido}
                  </a>
                ) : (
                  <Link
                    href={b.link}
                    className="block w-full h-full"
                    aria-label={b.titulo}
                  >
                    {contenido}
                  </Link>
                )
              ) : (
                contenido
              )}
            </div>
          );
        })}
      </div>

      {/* Flechas */}
      {total > 1 && (
        <>
          <button
            type="button"
            onClick={anterior}
            aria-label="Anterior"
            className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-10 h-11 w-11 flex items-center justify-center bg-background/80 hover:bg-background text-ink rounded-full shadow-md transition-colors"
          >
            <span className="text-2xl leading-none -mt-0.5">‹</span>
          </button>
          <button
            type="button"
            onClick={siguiente}
            aria-label="Siguiente"
            className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-10 h-11 w-11 flex items-center justify-center bg-background/80 hover:bg-background text-ink rounded-full shadow-md transition-colors"
          >
            <span className="text-2xl leading-none -mt-0.5">›</span>
          </button>

          {/* Puntitos */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
            {banners.map((b, i) => (
              <button
                key={b.id}
                type="button"
                onClick={() => ir(i)}
                aria-label={`Ir al banner ${i + 1}`}
                aria-current={i === indice}
                className={`h-2 rounded-full transition-all ${
                  i === indice
                    ? "w-7 bg-background"
                    : "w-2 bg-background/50 hover:bg-background/80"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
