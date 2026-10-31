import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import industrial from "@/assets/hero-industrial.jpg";
import { CtaSection, PageHero } from "@/components/site/Sections";
import { SERVICES } from "@/lib/site-data";

export const Route = createFileRoute("/services/")({
  beforeLoad: () => {
    throw redirect({
      to: "/",
      hash: "on-grid",
    });
  },
  head: () => ({
    meta: [
      { title: "Solar Services — Amaravati Solar Solutions" },
      { name: "description", content: "On-grid, off-grid, hybrid, residential, commercial and industrial solar, plus inspection and maintenance services." },
      { property: "og:title", content: "Solar Services — Amaravati Solar Solutions" },
      { property: "og:description", content: "Explore our complete range of solar energy services." },
    ],
  }),
  component: Services,
});

function Services() {
  return (
    <>
      <PageHero eyebrow="Our services" title="Complete solar solutions, end to end" text="Design, installation, inspection and maintenance for every type of property." image={industrial} />
      <section className="container-site py-8 md:py-10">
        <div className="grid gap-8 md:grid-cols-2">
          {SERVICES.map((s) => (
            <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className="group grid overflow-hidden rounded-2xl border bg-card shadow-card transition-all hover:-translate-y-1 hover:shadow-lift sm:grid-cols-[2fr_3fr]">
              <div className="aspect-[4/3] overflow-hidden sm:aspect-auto">
                <img src={s.image} alt={s.title} width={1920} height={1088} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="flex flex-col p-7">
                <h2 className="text-xl font-bold">{s.title}</h2>
                <p className="mt-3 flex-1 text-muted-foreground">{s.short}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary">View details <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <CtaSection />
    </>
  );
}
