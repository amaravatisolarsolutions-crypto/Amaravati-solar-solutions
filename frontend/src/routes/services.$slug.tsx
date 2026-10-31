import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/Sections";
import { SERVICES } from "@/lib/site-data";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = SERVICES.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.service.title} — Amaravati Solar Solutions` },
          { name: "description", content: loaderData.service.short },
          { property: "og:title", content: `${loaderData.service.title} — Amaravati Solar Solutions` },
          { property: "og:description", content: loaderData.service.short },
        ]
      : [{ title: "Service not found" }, { name: "robots", content: "noindex" }],
  }),
  component: ServiceDetail,
});

const PROCESS = ["Free consultation", "Site inspection & assessment", "Customised proposal", "Installation & support"];

function ServiceDetail() {
  const { service } = Route.useLoaderData();
  return (
    <>
      <PageHero eyebrow="Service" title={service.title} text={service.short} image={service.image} />
      <section className="container-site grid gap-10 py-8 md:py-12 lg:grid-cols-[2fr_1fr]">
        <div>
          <Link to="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary">
            <ArrowLeft className="size-4" /> All services
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold">Overview</h2>
          <p className="mt-4 text-lg leading-relaxed">{service.description}</p>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="text-xl font-bold">Benefits</h3>
              <ul className="mt-4 space-y-3">
                {service.benefits.map((b) => (
                  <li key={b} className="flex gap-3">
                    <Check className="mt-1 size-4 shrink-0 text-primary" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold">Suitable for</h3>
              <ul className="mt-4 space-y-3">
                {service.applications.map((b) => (
                  <li key={b} className="flex gap-3">
                    <Check className="mt-1 size-4 shrink-0 text-solar-blue" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <h3 className="mt-12 text-xl font-bold">Consultation process</h3>
          <ol className="mt-4 grid gap-4 sm:grid-cols-2">
            {PROCESS.map((p, i) => (
              <li key={p} className="flex items-center gap-4 rounded-xl bg-surface p-4">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-sun text-sm font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <span className="font-semibold text-navy">{p}</span>
              </li>
            ))}
          </ol>
        </div>
        <aside className="h-fit rounded-2xl bg-navy p-8 lg:sticky lg:top-28">
          <h3 className="text-2xl font-bold text-navy-foreground">Request a Quote</h3>
          <p className="mt-3 text-navy-foreground/75">Get a customised proposal for {service.title.toLowerCase()}.</p>
          <div className="mt-6 flex flex-col gap-3">
            <Button asChild variant="cta" size="lg">
              <Link to="/contact">Request a Quote</Link>
            </Button>
            <Button asChild variant="heroOutline" size="lg">
              <Link to="/book-a-demo">Book a Demo</Link>
            </Button>
          </div>
        </aside>
      </section>
    </>
  );
}
