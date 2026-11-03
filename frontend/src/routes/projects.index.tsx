import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Sparkles } from "lucide-react";
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
import { setupParallaxAndPopAnimation } from "@/lib/parallax-animation";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Solar Gallery & Projects — Amaravati Solar Solutions" },
      { name: "description", content: "Browse residential, commercial and industrial solar installations by Amaravati Solar Solutions." },
      { property: "og:title", content: "Solar Projects & Gallery — Amaravati Solar Solutions" },
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
            let img = p.image || commercial;
            const imgStr = String(p.image || "");
            if (imgStr.includes("rooftop") || imgStr.includes("hyderabad")) img = solarHyderabadRooftop;
            else if (imgStr.includes("residential")) img = residential;
            else if (imgStr.includes("commercial")) img = commercial;
            else if (imgStr.includes("future")) img = future;
            else if (imgStr.includes("industrial")) img = industrial;
            else if (imgStr.includes("array") || imgStr.includes("panels")) img = solarPanelsArray;
            else if (imgStr.includes("installation")) img = installation;

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
    <section className="container-site pt-4 sm:pt-6 md:pt-8 pb-12 md:pb-16">
      {/* Header & Back Link with Pop-in Entrance */}
      <div className="mb-6 animate-pop-in pop-stagger-1">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-navy hover:text-primary transition-colors mb-3"
        >
          <ArrowLeft className="size-4 text-primary" /> Back to Home
        </Link>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-extrabold uppercase tracking-wider">
            <Sparkles className="size-3" /> Project Showcase
          </span>
        </div>
        <h1 className="mt-1.5 text-2xl sm:text-3xl md:text-4xl font-extrabold text-navy">
          All Projects & Installations
        </h1>
        <p className="mt-1.5 text-xs sm:text-sm text-slate-500 max-w-2xl">
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

      <p className="mt-3.5 text-xs sm:text-sm text-muted-foreground animate-pop-in pop-stagger-3">
        These are sample placeholders. Verified project photos and details will be added soon.
      </p>

      {list.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-dashed p-16 text-center text-muted-foreground animate-pop-in">
          No projects in this category yet.
        </div>
      ) : (
        /* Re-trigger spring pop animation on category switch */
        <div key={filter} className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p, index) => {
            const staggerClass = `pop-stagger-${Math.min((index % 6) + 1, 6)}`;
            return (
              <Link
                key={p.id}
                to="/projects/$id"
                params={{ id: p.id }}
                className={cn(
                  "group overflow-hidden rounded-2xl bg-card text-left shadow-card border border-slate-200/80 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 active:scale-[0.98] flex flex-col parallax-card animate-pop-in",
                  staggerClass
                )}
              >
                {/* Parallax Image Viewport */}
                <div className="relative aspect-[4/3] overflow-hidden parallax-wrap">
                  <img
                    src={p.image}
                    alt={p.title}
                    width={1920}
                    height={1088}
                    loading="lazy"
                    data-parallax
                    data-parallax-rate="0.08"
                    className="parallax-img h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-85" />
                  <span className="absolute left-3.5 top-3.5 rounded-full bg-white/95 backdrop-blur-md px-3 py-1 text-xs font-extrabold text-navy shadow-sm">
                    {p.category}
                  </span>
                  {p.capacity ? (
                    <span className="absolute right-3.5 top-3.5 rounded-full bg-primary/95 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
                      {p.capacity}
                    </span>
                  ) : p.placeholder ? (
                    <span className="absolute right-3.5 top-3.5 rounded-full bg-navy/80 px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm">
                      Sample
                    </span>
                  ) : null}
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-navy group-hover:text-primary transition-colors line-clamp-2">
                      {p.title}
                    </h2>
                    {p.summary && (
                      <p className="mt-1.5 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {p.summary}
                      </p>
                    )}
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      View Project Details →
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400">
                      {p.location || "AP"}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
