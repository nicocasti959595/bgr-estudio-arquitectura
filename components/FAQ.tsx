"use client";

import { useState } from "react";

const preguntas = [
  {
    q: "¿Ustedes se encargan de los materiales gruesos y de las terminaciones?",
    a: "En la modalidad llave en mano, nos encargamos de absolutamente todo. En la modalidad mano de obra, nos encargamos únicamente de la mano de obra, y como alternativa podemos también incluir los materiales gruesos (materiales de corralón, cañerías, electricidad, pintura, durlock, etc.), dado que contamos con un corralón de materiales propio en CABA. En esta modalidad el cliente elige y compra las terminaciones por su cuenta.",
  },
  {
    q: "En la visita profesional, ¿me entregan algo o es solo hablada?",
    a: "En la visita profesional tratamos de analizar la viabilidad de tu proyecto y te damos ideas a medida de la obra y de tu presupuesto para lograr el mejor resultado posible. En el caso de solicitar renders o documentación gráfica, los mismos tienen un costo adicional, que luego, si se confirma la obra, se descuenta del costo total — es decir, quedaría bonificado.",
  },
  {
    q: "¿Los materiales los puedo elegir yo?",
    a: "Por supuesto. En la modalidad llave en mano elegís todo antes de comenzar la obra. En la modalidad mano de obra, vos elegís los materiales finos (terminaciones) y te damos la posibilidad de comprar los materiales gruesos por tu cuenta, o podemos encargarnos nosotros a través de nuestro corralón.",
  },
  {
    q: "¿Hacen muebles a medida?",
    a: "Por supuesto. Hacemos todo tipo de mobiliario y equipamiento a medida, únicamente en obras nuestras, de forma integral. No realizamos mobiliario y equipamiento como tarea suelta, ni tampoco en obras o remodelaciones realizadas por terceros.",
  },
  {
    q: "¿Hacen arreglos o reparaciones parciales?",
    a: "Lamentablemente no. Únicamente nos abocamos a remodelaciones integrales. Por ejemplo, si solo desea cambiar un mueble o el revestimiento de un piso de un baño, no podemos ayudarlo. En cambio, si desea remodelar íntegramente un baño, una cocina, o un departamento / PH / casa de forma completa, podemos ayudarlo.",
  },
  {
    q: "¿Qué sería una remodelación / obra integral?",
    a: "Hay varios tipos. Una remodelación integral de una casa, departamento o PH es aquella que incluye no solamente la parte estética, sino también la parte de instalaciones y estructura de la vivienda. En este tipo de remodelaciones se renuevan cañerías de agua fría y caliente, desagües pluviales y cloacales, tableros y cables eléctricos, cañerías de gas, modificaciones de morfología de la vivienda, modificaciones estructurales, ampliaciones de superficie, obra nueva, etc. También se considera remodelación integral una reforma de un local sanitario completo (por ejemplo un baño completo o cocina completa), con cambio de cañerías, aberturas, modificaciones morfológicas, diseño de mobiliario, etc. Por último, una obra nueva desde cero también se considera una obra integral.",
  },
  {
    q: "¿Hacen obra nueva?",
    a: "Sí, realizamos obra nueva en todo el AMBA. ¡No dudes en consultarnos!",
  },
];

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
