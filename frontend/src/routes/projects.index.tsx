import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { PROJECTS, type Project, type ProjectCategory } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import commercial from "@/assets/hero-commercial.jpg";
import residential from "@/assets/hero-residential.jpg";
import industrial from "@/assets/hero-industrial.jpg";
import future from "@/assets/hero-future.jpg";
import installation from "@/assets/installation.jpg";
import solarHyderabadRooftop from "@/assets/solar-hyderabad-rooftop.jpg";
import solarPanelsArray from "@/assets/solar-panels-array.jpg";
import projectCommercialRooftop from "@/assets/project-commercial-rooftop-75kwp.jpg";
import projectResidentialVilla from "@/assets/project-residential-villa-10kw.jpg";
import projectOfficeRooftop from "@/assets/project-office-rooftop-120kw.jpg";
import projectWarehouseIndustrial from "@/assets/project-warehouse-industrial-500kw.jpg";
import projectHybridStorageVilla from "@/assets/project-hybrid-storage-villa-8kw.jpg";
import projectAgriculturalSolarPump from "@/assets/project-agricultural-solar-pump-25hp.jpg";
import projectCommercialCarportCanopy from "@/assets/project-commercial-carport-canopy-75kw.jpg";
import { setupParallaxAndPopAnimation } from "@/lib/parallax-animation";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Solar Projects — Amaravati Solar Solutions" },
      { name: "description", content: "Browse residential, commercial and industrial solar installations by Amaravati Solar Solutions." },
      { property: "og:title", content: "Solar Projects — Amaravati Solar Solutions" },
      { property: "og:description", content: "Residential, commercial and industrial solar installations." },
    ],
  }),
  component: Projects,
});

const FILTERS: ("All" | ProjectCategory)[] = ["All", "Residential", "Commercial", "Industrial"];

function Projects() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [projectList, setProjectList] = useState<Project[]>(PROJECTS);

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d?.success && Array.isArray(d.data) && d.data.length > 0) {
          const mapped: Project[] = d.data.map((p: any) => {
            let img = projectCommercialRooftop;
            const pid = String(p.id || "").toLowerCase();
            const title = String(p.title || "").toLowerCase();
            if (pid === "p0" || title.includes("roof top solar power plant")) img = projectCommercialRooftop;
            else if (pid === "p1" || title.includes("family home")) img = projectResidentialVilla;
            else if (pid === "p2" || title.includes("office building")) img = projectOfficeRooftop;
            else if (pid === "p3" || title.includes("warehouse")) img = projectWarehouseIndustrial;
            else if (pid === "p4" || title.includes("hybrid")) img = projectHybridStorageVilla;
            else if (pid === "p5" || title.includes("agricultural") || title.includes("water pump")) img = projectAgriculturalSolarPump;
            else if (pid === "p6" || title.includes("carport")) img = projectCommercialCarportCanopy;
            else if (p.image) img = p.image;

            return {
              id: String(p.id),
              slug: String(p.id),
              title: p.title || "Solar Project",
              category: (p.category as any) || "Commercial",
              image: img,
              images: [img],
              summary: p.description || "",
              placeholder: false,
              capacity: p.capacity || "",
              location: p.location || "Andhra Pradesh",
              clientType: p.client || "",
              completionTime: "Standard",
              annualGeneration: "",
              co2Saved: "",
              savings: "",
              overview: p.description || "",
              systemDetails: {
                panelType: "Tier-1 Mono PERC High Efficiency Modules",
                inverterType: "Three-Phase Smart Grid-Tie Inverter",
                mountingStructure: "Hot-Dip Galvanized Structure",
                monitoring: "Cloud WiFi Remote Telemetry",
                warranty: "25-Year Performance Guarantee",
              },
            };
          });
          setProjectList(mapped);
        }
      })
      .catch(() => {});
  }, []);

  // Activate pop and parallax scroll controller
  useEffect(() => {
    return setupParallaxAndPopAnimation();
  }, [filter, projectList]);

  const list = filter === "All" ? projectList : projectList.filter((p) => p.category === filter);

  return (
    <section className="container-site pt-1.5 sm:pt-2 md:pt-2.5 pb-10 md:pb-14">
      {/* Header & Back Link with Pop-in Entrance */}
      <div className="mb-3.5 sm:mb-4 animate-pop-in pop-stagger-1">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-navy hover:text-primary transition-colors mb-1.5"
        >
          <ArrowLeft className="size-4 text-primary" /> Back to Home
        </Link>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-extrabold uppercase tracking-wider">
            <Sparkles className="size-3" /> Project Showcase
          </span>
        </div>
        <h1 className="mt-1 text-2xl sm:text-3xl md:text-4xl font-extrabold text-navy tracking-tight">
          All Projects & Installations
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-none leading-relaxed">
          Browse our complete portfolio of residential, commercial, and industrial turnkey solar installations across Vijayawada, Guntur, and Andhra Pradesh.
        </p>
      </div>

      {/* Filter Tabs with Active Pop Indicator */}
      <div className="flex flex-wrap gap-2 animate-pop-in pop-stagger-2" role="tablist" aria-label="Filter projects">
        {FILTERS.map((f) => {
          const isSelected = filter === f;
          return (
            <button
              key={f}
              role="tab"
              aria-selected={isSelected}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full border px-5 py-2 text-xs sm:text-sm font-bold transition-all duration-200 active:scale-95 cursor-pointer select-none",
                isSelected
                  ? "border-navy bg-navy text-white shadow-md scale-[1.02]"
                  : "bg-white text-navy hover:border-primary hover:text-primary active:bg-slate-100"
              )}
            >
              {f}
            </button>
          );
        })}
      </div>

      <p className="mt-3 text-xs sm:text-sm text-muted-foreground animate-pop-in pop-stagger-3 max-w-none">
        These are sample placeholders. Verified project photos and details will be added soon.
      </p>

      {list.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-dashed p-16 text-center text-muted-foreground animate-pop-in">
          No projects in this category yet.
        </div>
      ) : (
        /* Re-trigger spring pop animation on category switch */
        <div key={filter} className="mt-5 sm:mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4.5 sm:gap-5 xl:gap-6">
          {list.map((p, index) => {
            const staggerClass = `pop-stagger-${Math.min((index % 6) + 1, 6)}`;
            const eyebrow =
              p.category?.toLowerCase() === "residential"
                ? "FOR HOMES"
                : p.category?.toLowerCase() === "commercial"
                ? "FOR BUSINESSES"
                : p.category?.toLowerCase() === "industrial"
                ? "FOR INDUSTRY"
                : "SOLAR PROJECT";

            return (
              <Link
                key={p.id}
                to="/projects/$id"
                params={{ id: p.id }}
                className={cn(
                  "group relative overflow-hidden rounded-none bg-gradient-to-br from-[#FFFDF9] via-white to-[#FFF5EA] text-left p-4 sm:p-5 shadow-[0_4px_16px_rgba(224,79,22,0.06)] border border-orange-200/70 hover:border-[#E04F16] hover:shadow-[0_16px_36px_rgba(224,79,22,0.15)] hover:-translate-y-1.5 transition-all duration-300 flex flex-row items-center justify-between gap-3 sm:gap-4 parallax-card animate-pop-in",
                  staggerClass
                )}
              >
                {/* Left: Content & Circular Arrow Button */}
                <div className="flex-1 flex flex-col justify-between h-full min-w-0 pr-1">
                  <div>
                    <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-[#E04F16] bg-[#E04F16]/10 border border-[#E04F16]/20 px-2.5 py-0.5 rounded-full inline-block">
                      {eyebrow}
                    </span>
                    <h2 className="mt-1.5 text-sm sm:text-base font-extrabold text-[#082B4C] leading-snug line-clamp-2 group-hover:text-[#E04F16] transition-colors">
                      {p.title}
                    </h2>
                    {p.summary && (
                      <p className="mt-1.5 text-[11px] sm:text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {p.summary}
                      </p>
                    )}
                  </div>

                  <div className="mt-3.5 sm:mt-4 flex items-center justify-between">
                    <div className="size-8 sm:size-8.5 rounded-full bg-gradient-to-r from-[#D9410E] via-[#E04F16] to-[#F97316] text-white shadow-md shadow-[#E04F16]/25 group-hover:shadow-lg group-hover:scale-110 transition-all duration-300 grid place-items-center">
                      <ArrowRight className="size-3.5 sm:size-4 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                    {p.capacity ? (
                      <span className="text-[10px] sm:text-[11px] font-bold text-[#B83A16] bg-white border border-orange-200/80 px-2 py-0.5 rounded-md shadow-2xs">
                        {p.capacity}
                      </span>
                    ) : p.location ? (
                      <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 bg-white border border-orange-100 px-2 py-0.5 rounded-md">
                        {p.location}
                      </span>
                    ) : null}
                  </div>
                </div>

                {/* Right: Square Image Viewport */}
                <div className="w-28 sm:w-32 md:w-36 aspect-square rounded-none overflow-hidden shrink-0 shadow-2xs border border-orange-100/80 relative bg-slate-100">
                  <img
                    src={p.image}
                    alt={p.title}
                    width={1920}
                    height={1088}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-108"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
