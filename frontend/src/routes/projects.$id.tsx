import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  CheckCircle2,
  Clock,
  Compass,
  FileCheck,
  Leaf,
  MapPin,
  Phone,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Sun,
  TreePine,
  Wrench,
  Zap,
} from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ProjectImageShowcase } from "@/components/site/ProjectImageShowcase";
import { COMPANY, PROJECTS, type Project } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/projects/$id")({
  loader: ({ params }) => {
    const project = PROJECTS.find((p) => p.id === params.id || p.slug === params.id);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.project.title} — Amaravati Solar Solutions` },
          { name: "description", content: loaderData.project.summary },
          { property: "og:title", content: `${loaderData.project.title} — Solar Installation Case Study` },
          { property: "og:description", content: loaderData.project.summary },
        ]
      : [{ title: "Project not found" }, { name: "robots", content: "noindex" }],
  }),
  component: ProjectDetail,
});

function ProjectDetail() {
  const { project } = Route.useLoaderData();
  const relatedProjects = PROJECTS.filter((p) => p.id !== project.id).slice(0, 3);

  // Always scroll to top so any project opens directly from this showcase section
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [project.id]);

  return (
    <div className="bg-slate-50/60 pb-16">
      <div className="container-site pt-3 sm:pt-4 space-y-6 sm:space-y-7">
        {/* TOP SECTION: PROJECT SHOWCASE & KEY METRICS (IMAGE SHOWCASE ON LEFT, 4 METRICS ON RIGHT) */}
        <div className="max-w-[980px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 items-stretch">
          {/* Left Column: Project Image Showcase (1st Image) */}
          <div className="lg:col-span-8 flex">
            <ProjectImageShowcase project={project} className="h-full flex flex-col justify-between" />
          </div>

          {/* Right Column: 4 Key Metrics Cards Line-by-Line (2nd Image) */}
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-col justify-between gap-2.5 sm:gap-3">
            {/* System Capacity */}
            <div className="rounded-xl border border-slate-200/90 bg-white p-3 sm:p-3.5 shadow-xs flex-1 flex flex-col justify-center">
              <div className="flex items-center gap-1.5 text-primary font-bold text-[11px] uppercase tracking-wider">
                <Zap className="size-3.5 text-primary" /> System Capacity
              </div>
              <div className="mt-1 text-lg sm:text-xl font-black text-navy">{project.capacity}</div>
              <div className="mt-0.5 text-[11px] text-slate-500 font-medium">Installed peak power</div>
            </div>

            {/* Annual Generation */}
            <div className="rounded-xl border border-slate-200/90 bg-white p-3 sm:p-3.5 shadow-xs flex-1 flex flex-col justify-center">
              <div className="flex items-center gap-1.5 text-slate-600 font-bold text-[11px] uppercase tracking-wider">
                <Sun className="size-3.5 text-slate-500" /> Annual Generation
              </div>
              <div className="mt-1 text-lg sm:text-xl font-black text-navy">{project.annualGeneration}</div>
              <div className="mt-0.5 text-[11px] text-slate-500 font-medium">Estimated clean output</div>
            </div>

            {/* CO2 Offset */}
            <div className="rounded-xl border border-slate-200/90 bg-white p-3 sm:p-3.5 shadow-xs flex-1 flex flex-col justify-center">
              <div className="flex items-center gap-1.5 text-[#059669] font-bold text-[11px] uppercase tracking-wider">
                <Leaf className="size-3.5 text-[#059669]" /> CO₂ Offset
              </div>
              <div className="mt-1 text-lg sm:text-xl font-black text-navy">{project.co2Saved}</div>
              <div className="mt-0.5 text-[11px] text-slate-500 font-medium">Carbon emissions avoided</div>
            </div>

            {/* Economic Savings */}
            <div className="rounded-xl border border-slate-200/90 bg-white p-3 sm:p-3.5 shadow-xs flex-1 flex flex-col justify-center">
              <div className="flex items-center gap-1.5 text-primary font-bold text-[11px] uppercase tracking-wider">
                <Award className="size-3.5 text-primary" /> Economic Savings
              </div>
              <div className="mt-1 text-sm sm:text-base font-black text-navy leading-snug">
                {project.savings}
              </div>
              <div className="mt-0.5 text-[11px] text-slate-500 font-medium">Direct electricity reduction</div>
            </div>
          </div>
        </div>

        {/* 4. TWO-COLUMN CONTENT & SPECIFICATIONS */}
        <div className="grid gap-8 lg:grid-cols-[1.8fr_1fr] items-start">
          {/* LEFT: Project Overview, Features & Specs Table */}
          <div className="space-y-8">
            {/* Project Overview */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-muted-foreground border-b border-slate-100 pb-3">
                <span className="flex items-center gap-1 text-slate-700">
                  <MapPin className="size-3.5 text-primary" /> {project.location}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-slate-700">
                  <Clock className="size-3.5 text-sun" /> Completed in {project.completionTime}
                </span>
                <span>•</span>
                <span className="text-slate-700 font-bold">{project.clientType}</span>
              </div>

              <h2 className="mt-4 text-xl sm:text-2xl font-extrabold text-navy">Project Overview & Objectives</h2>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-700 text-left md:text-justify">
                {project.overview}
              </p>

              <h3 className="mt-6 text-base sm:text-lg font-bold text-navy flex items-center gap-2">
                <Sparkles className="size-4 text-primary" /> Key Project Highlights
              </h3>
              <ul className="mt-3.5 space-y-2.5">
                {project.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technical Specifications Table */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs">
              <h2 className="text-xl sm:text-2xl font-extrabold text-navy flex items-center gap-2">
                <Wrench className="size-5 text-primary" /> Technical Specifications
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Engineered with Tier-1 components compliant with MNRE, CEA and DISCOM safety guidelines.
              </p>

              <div className="mt-5 divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                <div className="grid grid-cols-1 sm:grid-cols-3 bg-slate-50/70 p-3 sm:p-4 text-xs font-semibold">
                  <span className="text-muted-foreground">Solar Modules / Panels</span>
                  <span className="sm:col-span-2 font-bold text-navy">{project.systemDetails.panelType}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 bg-white p-3 sm:p-4 text-xs font-semibold">
                  <span className="text-muted-foreground">Inverter Technology</span>
                  <span className="sm:col-span-2 font-bold text-navy">{project.systemDetails.inverterType}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 bg-slate-50/70 p-3 sm:p-4 text-xs font-semibold">
                  <span className="text-muted-foreground">Mounting Structure</span>
                  <span className="sm:col-span-2 font-bold text-navy">{project.systemDetails.mountingStructure}</span>
                </div>
                {project.systemDetails.batteryBackup && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 bg-white p-3 sm:p-4 text-xs font-semibold">
                    <span className="text-muted-foreground">Battery Storage</span>
                    <span className="sm:col-span-2 font-bold text-emerald-700">{project.systemDetails.batteryBackup}</span>
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-3 bg-slate-50/70 p-3 sm:p-4 text-xs font-semibold">
                  <span className="text-muted-foreground">System Telemetry & App</span>
                  <span className="sm:col-span-2 font-bold text-navy">{project.systemDetails.monitoring}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 bg-white p-3 sm:p-4 text-xs font-semibold">
                  <span className="text-muted-foreground">Guarantees & Warranty</span>
                  <span className="sm:col-span-2 font-bold text-navy">{project.systemDetails.warranty}</span>
                </div>
              </div>
            </div>

            {/* Environmental Impact Summary */}
            <div className="rounded-2xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50/70 via-white to-emerald-50/30 p-6 sm:p-8 shadow-xs">
              <h3 className="text-lg font-bold text-emerald-900 flex items-center gap-2">
                <TreePine className="size-5 text-emerald-600" /> Environmental Contribution
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-emerald-800/90 leading-relaxed text-left md:text-justify">
                By generating {project.annualGeneration} through clean solar photovoltaic power, this plant offsets {project.co2Saved} of harmful carbon dioxide emissions each year, equivalent to planting over 500 mature trees and saving thousands of litres of water otherwise consumed in thermal power generation.
              </p>
            </div>
          </div>

          {/* RIGHT: Consultation Card & Support Contacts */}
          <div className="space-y-6 lg:sticky lg:top-24">
            {/* Consultation Card */}
            <div className="rounded-2xl sm:rounded-3xl bg-[#082B4C] text-white p-6 sm:p-7 shadow-xl border border-navy/40 relative overflow-hidden flex flex-col justify-between">
              <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-primary opacity-25 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-16 -left-16 size-48 rounded-full bg-sun opacity-20 blur-2xl" />

              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold text-gold">
                  <Sparkles className="size-3" /> Get Similar System
                </span>

                <h3 className="mt-3 text-xl sm:text-2xl font-extrabold text-white leading-tight">
                  Want a Solar System for Your Property?
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-white/80 leading-relaxed">
                  Get a customized technical survey, 3D shadow analysis, and transparent quotation for your roof.
                </p>
              </div>

              <div className="mt-6 space-y-2.5">
                <Button asChild variant="cta" size="default" className="w-full justify-center py-5 text-sm font-bold shadow-md">
                  <Link to="/book-a-demo">Book Free Site Survey</Link>
                </Button>
                <a
                  href={`tel:${COMPANY.phone.replace(/[^0-9+]/g, "")}`}
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-white/20 transition-colors w-full"
                >
                  <PhoneCall className="size-4 text-gold" /> Call Solar Team: {COMPANY.phone}
                </a>
                <a
                  href={`https://wa.me/${COMPANY.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hello Amaravati Solar Solutions, I am interested in a solar installation similar to "${project.title}". Please share details.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-[#20ba59] transition-colors w-full shadow-sm"
                >
                  <svg className="size-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  WhatsApp Instant Inquiry
                </a>
              </div>
            </div>

            {/* Direct Support Contacts */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs">
              <h4 className="text-sm sm:text-base font-bold text-navy flex items-center gap-2">
                <Phone className="size-4 sm:size-5 text-primary" /> Need Technical Assistance?
              </h4>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Our solar engineers are available Monday to Saturday to answer queries regarding capacity, roof structural analysis, and grid subsidies.
              </p>
              <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-col gap-2 text-xs sm:text-sm font-bold text-slate-800">
                <a
                  href={`tel:${COMPANY.phone.replace(/[^0-9+]/g, "")}`}
                  className="flex items-center gap-2 text-navy hover:text-primary transition-colors"
                >
                  <PhoneCall className="size-3.5 text-primary" /> {COMPANY.phone}
                </a>
                <a
                  href={`tel:${COMPANY.phoneAlt.replace(/[^0-9+]/g, "")}`}
                  className="flex items-center gap-2 text-navy hover:text-primary transition-colors"
                >
                  <PhoneCall className="size-3.5 text-primary" /> {COMPANY.phoneAlt}
                </a>
              </div>
            </div>

            {/* Quality Guarantees Card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
              <h4 className="text-sm font-bold text-navy flex items-center gap-1.5">
                <ShieldCheck className="size-4 text-emerald-600" /> Guaranteed Quality Standards
              </h4>
              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-3.5 text-primary shrink-0" />
                  <span>25-Year Linear Power Output Warranty</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-3.5 text-primary shrink-0" />
                  <span>MNRE Approved & DISCOM Net-Metering Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-3.5 text-primary shrink-0" />
                  <span>100% Tier-1 Guaranteed Solar Components</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-3.5 text-primary shrink-0" />
                  <span>Dedicated After-Sales Maintenance Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 6. RELATED PROJECTS CAROUSEL / GRID */}
        <div className="mt-16 pt-10 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <p className="eyebrow text-primary">More Case Studies</p>
              <h3 className="text-2xl font-extrabold text-navy">Explore Other Solar Projects</h3>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
            >
              View all installations <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProjects.map((p) => (
              <Link
                key={p.id}
                to="/projects/$id"
                params={{ id: p.id }}
                className="group overflow-hidden rounded-2xl bg-white border border-slate-200/90 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    width={1920}
                    height={1088}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-0.5 text-[11px] font-bold text-navy shadow-sm">
                    {p.category}
                  </span>
                  <span className="absolute right-3 top-3 rounded-full bg-navy/80 px-2.5 py-0.5 text-[11px] font-semibold text-white shadow-sm">
                    {p.capacity}
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-semibold text-muted-foreground">{p.location}</span>
                    <h4 className="mt-1 text-base font-bold text-navy group-hover:text-primary transition-colors line-clamp-1">
                      {p.title}
                    </h4>
                    <p className="mt-1.5 text-xs text-slate-600 line-clamp-2">{p.summary}</p>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-primary">
                    View Case Study <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
