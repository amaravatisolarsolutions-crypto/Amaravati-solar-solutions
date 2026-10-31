import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

export function PageHero({ eyebrow, title, text, image }: { eyebrow: string; title: string; text: string; image: string }) {
  return (
    <section className="relative overflow-hidden bg-navy">
      <img src={image} alt="" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="container-site relative py-24 md:py-32">
        <p className="eyebrow text-gold">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-extrabold text-navy-foreground md:text-6xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg text-navy-foreground/85">{text}</p>
      </div>
    </section>
  );
}

import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  text,
  center,
  className,
  titleClassName,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  center?: boolean;
  className?: string;
  titleClassName?: string;
}) {
  return (
    <div className={cn(center ? "mx-auto max-w-2xl text-center" : "max-w-4xl", className)}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className={cn("mt-2 text-2xl font-extrabold sm:text-3xl md:text-4xl", titleClassName)}>{title}</h2>
      {text && <p className="mt-2 text-base text-muted-foreground sm:text-lg">{text}</p>}
    </div>
  );
}

export function CtaSection({
  id = "contact",
  title = "Ready to Switch to Solar?",
  text = "Let us help you explore the right solar solution for your home or business.",
}: { id?: string; title?: string; text?: string }) {
  return (
    <section id={id} className="container-site pt-2 pb-6 md:pt-3 md:pb-7 scroll-mt-20">
      <div className="relative overflow-hidden rounded-2xl bg-navy px-6 py-7 text-center md:px-12 md:py-9">
        <div className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-sun opacity-30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 size-80 rounded-full bg-solar-blue opacity-30 blur-3xl" />
        <h2 className="relative text-2xl font-extrabold text-navy-foreground md:text-4xl">{title}</h2>
        <p className="relative mx-auto mt-2 max-w-xl text-sm text-navy-foreground/80 sm:text-base">{text}</p>
        <div className="relative mt-5 flex flex-wrap justify-center gap-3">
          <Button asChild variant="cta" size="default"><Link to="/book-a-demo">Book a Free Consultation</Link></Button>
          <Button asChild variant="heroOutline" size="default"><Link to="/contact">Talk to Our Team</Link></Button>
        </div>
      </div>
    </section>
  );
}

export function ServiceCard({ id, icon, title, text, slug }: { id?: string; icon: ReactNode; title: string; text: string; slug: string }) {
  return (
    <Link
      id={id}
      to="/services/$slug"
      params={{ slug }}
      className="group flex flex-col rounded-2xl border bg-card p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lift scroll-mt-28"
    >
      <div className="grid size-14 place-items-center rounded-xl bg-accent text-primary transition-colors group-hover:bg-sun group-hover:text-primary-foreground">
        {icon}
      </div>
      <h3 className="mt-6 text-xl font-bold">{title}</h3>
      <p className="mt-3 flex-1 text-muted-foreground">{text}</p>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary">
        Learn More <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
