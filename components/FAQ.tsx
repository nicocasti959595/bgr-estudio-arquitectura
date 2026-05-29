"use client";

import { useState } from "react";
import { preguntasFaq as preguntas } from "@/lib/faq-data";

export function FAQ() {
  const [abierta, setAbierta] = useState<number | null>(0);

  return (
    <div className="border-t hairline divide-y divide-line">
      {preguntas.map((item, i) => {
        const isOpen = abierta === i;
        return (
          <div key={i}>
            <button
              type="button"
              onClick={() => setAbierta(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="w-full flex items-start justify-between gap-6 text-left py-6 md:py-8 group"
            >
              <div className="flex items-start gap-5">
                <span className="display text-2xl md:text-3xl text-accent shrink-0 mt-1 leading-none">
                  /0{i + 1}
                </span>
                <h3 className="font-serif text-xl md:text-2xl text-ink group-hover:text-accent transition-colors leading-snug">
                  {item.q}
                </h3>
              </div>
              <span
                className={`text-accent text-3xl shrink-0 transition-transform duration-300 leading-none ${
                  isOpen ? "rotate-45" : ""
                }`}
                aria-hidden="true"
              >
                +
              </span>
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="pb-6 md:pb-8 pl-10 md:pl-14 pr-8 text-muted leading-relaxed max-w-3xl">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
