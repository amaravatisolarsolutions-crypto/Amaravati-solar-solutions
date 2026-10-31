import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
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

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "View All Projects — Amaravati Solar Solutions" },
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

  const list = filter === "All" ? projectList : projectList.filter((p) => p.category === filter);

  return (
    <section className="container-site pt-4 sm:pt-6 md:pt-8 pb-12 md:pb-16">
      {/* Header & Back Link */}
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-navy hover:text-primary transition-colors mb-3"
        >
          <ArrowLeft className="size-4 text-primary" /> Back to Home
        </Link>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-navy">
          All Projects & Installations
        </h1>
        <p className="mt-1.5 text-xs sm:text-sm text-slate-500">
          Browse our complete portfolio of residential, commercial, and industrial solar installations.
        </p>
      </div>

      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
        {FILTERS.map((f) => (
          <button
            key={f}
            role="tab"
            aria-selected={filter === f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-full border px-5 py-2.5 text-sm font-semibold transition-all active:scale-95 cursor-pointer select-none",
              filter === f
                ? "border-navy bg-navy text-navy-foreground shadow-sm"
                : "bg-background text-navy hover:border-primary hover:text-primary active:bg-slate-100"
            )}
          >
            {f}
          </button>
        ))}
      </div>
      <p className="mt-3.5 text-xs sm:text-sm text-muted-foreground">
        These are sample placeholders. Verified project photos and details will be added soon.
      </p>

      {list.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-dashed p-16 text-center text-muted-foreground">
          No projects in this category yet.
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <Link
              key={p.id}
              to="/projects/$id"
              params={{ id: p.id }}
              className="group overflow-hidden rounded-2xl bg-card text-left shadow-card transition-all duration-300 hover:shadow-lift hover:-translate-y-1 active:scale-[0.98] flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  width={1920}
                  height={1088}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-navy/0 transition-colors group-hover:bg-navy/30" />
                <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-bold text-navy">
                  {p.category}
                </span>
                {p.placeholder && (
                  <span className="absolute right-4 top-4 rounded-full bg-navy/80 px-3 py-1 text-xs font-semibold text-navy-foreground">
                    Sample
                  </span>
                )}
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <h2 className="text-lg font-bold text-navy group-hover:text-primary transition-colors">
                  {p.title}
                </h2>
                <span className="mt-2 inline-block text-sm font-bold text-primary">
                  View Project →
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
