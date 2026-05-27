import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProyectoPorSlug, getProyectos } from "@/lib/datos";

export async function generateStaticParams() {
  const proyectos = await getProyectos();
  return proyectos.map((p) => ({ slug: p.slug }));
}

export default async function ProyectoDetalle(
  props: PageProps<"/proyectos/[slug]">
) {
  const { slug } = await props.params;
  const proyecto = await getProyectoPorSlug(slug);

  if (!proyecto) notFound();

  const galeria = proyecto.imagenes ?? [];

  return (
    <article>
      <section className="relative h-[80vh] min-h-[600px] flex items-end">
        <div className="absolute inset-0">
          <Image
            src={proyecto.imagen_portada}
            alt={proyecto.titulo}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
        </div>
        <div className="relative w-full mx-auto max-w-[1400px] px-6 md:px-12 pb-12 md:pb-20 text-background">
          <Link
            href="/proyectos"
            className="eyebrow text-background/70 link-underline"
          >
            ← Volver a proyectos
          </Link>
          <h1 className="display text-5xl md:text-7xl lg:text-8xl mt-6 max-w-5xl">
            {proyecto.titulo}
          </h1>
        </div>
      </section>

      <section className="py-20 md:py-28 border-b hairline">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4 space-y-6">
            <Ficha rotulo="Ubicación" valor={proyecto.ubicacion} />
            <Ficha rotulo="Año" valor={String(proyecto.anio)} />
            <Ficha rotulo="Tipología" valor={proyecto.tipologia} />
            {proyecto.superficie && (
              <Ficha rotulo="Superficie" valor={proyecto.superficie} />
            )}
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <p className="font-serif text-2xl md:text-3xl leading-relaxed text-ink">
              {proyecto.descripcion}
            </p>
          </div>
        </div>
      </section>

      {galeria.length > 0 && (
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-[1400px] px-6 md:px-12 space-y-6 md:space-y-10">
            {galeria.map((img, i) => (
              <div
                key={i}
                className={`relative ${
                  i % 2 === 0
                    ? "aspect-[16/9]"
                    : "aspect-[4/5] md:max-w-[70%] md:ml-auto"
                } bg-line overflow-hidden`}
              >
                <Image
                  src={img}
                  alt={`${proyecto.titulo} ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 80vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="bg-ink text-background py-20">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="eyebrow text-background/60">— Próximo proyecto</p>
            <h3 className="font-serif text-3xl md:text-4xl mt-3">
              Seguí explorando la obra
            </h3>
          </div>
          <Link
            href="/proyectos"
            className="inline-flex items-center justify-center px-8 py-4 border border-background/40 text-background text-sm tracking-wider uppercase hover:bg-background hover:text-ink transition-colors"
          >
            Todos los proyectos →
          </Link>
        </div>
      </section>
    </article>
  );
}

function Ficha({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <div className="border-t hairline pt-3">
      <p className="eyebrow">{rotulo}</p>
      <p className="mt-2 font-serif text-xl text-ink">{valor}</p>
    </div>
  );
}
