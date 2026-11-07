import { createFileRoute, useRouterState } from "@tanstack/react-router";
import {
  Clock,
  ExternalLink,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
} from "lucide-react";
import { useEffect, useState } from "react";
import { BookingForm } from "@/components/site/BookingForm";
import { ProposalForm } from "@/components/site/ProposalForm";
import { COMPANY } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/book-a-demo")({
  head: () => ({
    meta: [
      { title: "Get a Free Solar Quote & Book Site Inspection — Amaravati Solar Solutions" },
      {
        name: "description",
        content:
          "Request a free rooftop solar site assessment, personalized 3D solar layout design, and subsidy calculation across Amaravati, Vijayawada, and Guntur. Fast 24-hour proposal: +91 63058 25402.",
      },
      {
        name: "keywords",
        content:
          "get solar quote amaravati, free solar consultation vijayawada, book solar inspection guntur, solar site survey andhra pradesh, solar rooftop proposal",
      },
      { property: "og:title", content: "Get a Free Solar Quote & Consultation — Amaravati Solar Solutions" },
      {
        property: "og:description",
        content:
          "Get an accurate solar quotation, engineering feasibility analysis, and subsidy calculation for your home or business.",
      },
      { property: "og:url", content: "https://amaravatisolarsolutions.com/book-a-demo" },
      { property: "og:image", content: "https://amaravatisolarsolutions.com/assets/hero-amaravati-exact-panoramic.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Book Free Solar Site Inspection — Amaravati Solar Solutions" },
      {
        name: "twitter:description",
        content:
          "Schedule a free site survey with certified solar engineers in Andhra Pradesh.",
      },
    ],
    links: [
      { rel: "canonical", href: "https://amaravatisolarsolutions.com/book-a-demo" },
    ],
  }),
  component: BookDemoPage,
});

function BookDemoPage() {
  const routerSearch = useRouterState({
    select: (s) => (s.location.search as Record<string, string>) || {},
  });

  const [urlService, setUrlService] = useState<string>("");
  const [urlType, setUrlType] = useState<string>("");
  const [formTab, setFormTab] = useState<"proposal" | "calendar">("proposal");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    if (typeof window !== "undefined") {
      const sp = new URLSearchParams(window.location.search);
      const s = sp.get("service") || sp.get("solution") || routerSearch.service || routerSearch.solution || "";
      const t = sp.get("type") || sp.get("category") || routerSearch.type || routerSearch.category || "";
      const tab = sp.get("tab") || routerSearch.tab || "";
      if (s) setUrlService(s);
      if (t) setUrlType(t);
      if (tab === "calendar" || tab === "booking" || tab === "visit") {
        setFormTab("calendar");
      }
    }
  }, [routerSearch]);

  const cleanWhatsapp = COMPANY.whatsapp.replace(/[^0-9]/g, "");

  return (
    <section className="bg-transparent pt-2 sm:pt-2.5 md:pt-3 pb-8 md:pb-12 relative">
      <div className="container-site">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.35fr] lg:items-start">
          {/* ================= LEFT COLUMN: Get In Touch ================= */}
          <div className="space-y-4">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-[#0c2340] sm:text-4xl">
                Get In Touch
              </h1>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600 max-w-none">
                Our regional technical officers and estimation managers are available to assist you with layout diagrams, ROI estimates, and feasibility checklists.
              </p>
            </div>

            {/* Corporate Headquarters */}
            <div className="flex gap-4 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition-all hover:shadow-md">
              <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-100">
                <MapPin className="size-5" />
              </div>
              <div className="min-w-0">
                <h2 className="text-sm font-bold text-[#0c2340]">
                  {COMPANY.headquarters.title}
                </h2>
                <p className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-slate-800">
                  {COMPANY.headquarters.company}
                </p>
                <p className="mt-1.5 whitespace-pre-line text-xs font-medium leading-relaxed text-slate-600">
                  {COMPANY.headquarters.address}
                </p>
              </div>
            </div>

            {/* Branch Office */}
            <div className="flex gap-4 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition-all hover:shadow-md">
              <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-100">
                <MapPin className="size-5" />
              </div>
              <div className="min-w-0">
                <h2 className="text-sm font-bold text-[#0c2340]">
                  {COMPANY.branch.title}
                </h2>
                <p className="mt-1.5 whitespace-pre-line text-xs font-medium leading-relaxed text-slate-600">
                  {COMPANY.branch.address}
                </p>
              </div>
            </div>

            {/* Phone Support */}
            <div className="flex gap-4 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition-all hover:shadow-md">
              <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-100">
                <Phone className="size-5" />
              </div>
              <div className="min-w-0">
                <h2 className="text-sm font-bold text-[#0c2340]">Phone Support</h2>
                <div className="mt-1.5 space-y-1">
                  {COMPANY.phones.map((p) => (
                    <a
                      key={p}
                      href={`tel:${p.replace(/[^0-9+]/g, "")}`}
                      className="block text-sm font-medium text-slate-700 transition-colors hover:text-emerald-700"
                    >
                      {p}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Email Support */}
            <div className="flex gap-4 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition-all hover:shadow-md">
              <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-100">
                <Mail className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-sm font-bold text-[#0c2340]">Email Support</h2>
                <div className="mt-2 space-y-1 text-xs">
                  {COMPANY.emails.map(({ label, email }) => (
                    <div key={label} className="flex flex-wrap items-baseline gap-2">
                      <span className="w-24 shrink-0 font-semibold text-slate-800">
                        {label}:
                      </span>
                      <a
                        href={`mailto:${email}`}
                        className="text-slate-600 hover:text-emerald-700 hover:underline break-all"
                      >
                        {email}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Operational Hours */}
            <div className="flex gap-4 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition-all hover:shadow-md">
              <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-100">
                <Clock className="size-5" />
              </div>
              <div className="min-w-0">
                <h2 className="text-sm font-bold text-[#0c2340]">Operational Hours</h2>
                <p className="mt-1.5 text-xs font-medium text-slate-600">
                  {COMPANY.operationalHours.weekdays}
                </p>
              </div>
            </div>

            {/* WhatsApp Chat Support Banner */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-emerald-200 bg-emerald-50/80 p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-emerald-100 text-emerald-800">
                  <MessageSquare className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#0c2340]">
                    WhatsApp Chat Support
                  </p>
                  <p className="text-xs text-slate-600">
                    Connect with an engineer instantly
                  </p>
                </div>
              </div>
              <a
                href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
                  "Hello, I want to inquire about a solar proposal / site estimate."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center justify-center rounded-lg bg-[#00a859] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-[#00924d] hover:shadow"
              >
                START CHAT
              </a>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: Form + 2 Maps ================= */}
          <div className="space-y-6">
            {/* Form Card */}
            <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm md:p-8">
              {/* Optional Tab Switcher for convenience */}
              <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
                <h2 className="text-xl font-extrabold text-[#0c2340] sm:text-2xl">
                  {formTab === "proposal"
                    ? "Estimate Site / Inquiry Proposal"
                    : "Schedule a Consultation Demo"}
                </h2>
                <div className="flex rounded-full bg-slate-100 p-1 text-xs font-semibold shadow-inner border border-slate-200/80">
                  <button
                    type="button"
                    role="tab"
                    data-unstyled="true"
                    aria-selected={formTab === "proposal"}
                    onClick={() => setFormTab("proposal")}
                    className={cn(
                      "rounded-full px-4 py-1.5 transition-all text-xs font-bold cursor-pointer select-none",
                      formTab === "proposal"
                        ? "!bg-[#E04F16] !text-white shadow-md"
                        : "!bg-transparent !text-slate-600 hover:!text-[#E04F16] hover:!bg-orange-100/50"
                    )}
                  >
                    Quick Quote
                  </button>
                  <button
                    type="button"
                    role="tab"
                    data-unstyled="true"
                    aria-selected={formTab === "calendar"}
                    onClick={() => setFormTab("calendar")}
                    className={cn(
                      "rounded-full px-4 py-1.5 transition-all text-xs font-bold cursor-pointer select-none",
                      formTab === "calendar"
                        ? "!bg-[#E04F16] !text-white shadow-md"
                        : "!bg-transparent !text-slate-600 hover:!text-[#E04F16] hover:!bg-orange-100/50"
                    )}
                  >
                    Book Slot
                  </button>
                </div>
              </div>

              {formTab === "proposal" ? (
                <ProposalForm
                  initialSolution={urlService}
                  initialCustomerType={urlType}
                  sourceContext={urlService ? `Preselected: ${urlService}` : "Book A Demo"}
                />
              ) : (
                <BookingForm
                  initialSolution={urlService}
                  initialCustomerType={urlType}
                  sourceContext={urlService ? `Preselected: ${urlService}` : "Book A Demo"}
                />
              )}
            </div>

            {/* Maps Grid directly below Form */}
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Card 1: Corporate Headquarters Map */}
              <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/70 px-4 py-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-800">
                    CORPORATE HEADQUARTERS MAP
                  </span>
                  <a
                    href={COMPANY.headquarters.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700 transition-colors hover:border-emerald-600 hover:text-emerald-700"
                  >
                    Open in Maps <ExternalLink className="size-3" />
                  </a>
                </div>
                <div className="h-56 w-full bg-slate-100">
                  <iframe
                    title="Corporate Headquarters Map"
                    src={COMPANY.headquarters.mapEmbed}
                    className="h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>

              {/* Card 2: Branch Office Map */}
              <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/70 px-4 py-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-800">
                    BRANCH OFFICE MAP
                  </span>
                  <a
                    href={COMPANY.branch.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-md border border-sky-300 bg-sky-50 px-2.5 py-1 text-[11px] font-semibold text-sky-700 transition-colors hover:bg-sky-100"
                  >
                    Open in Maps <ExternalLink className="size-3" />
                  </a>
                </div>
                <div className="h-56 w-full bg-slate-100">
                  <iframe
                    title="Branch Office Map"
                    src={COMPANY.branch.mapEmbed}
                    className="h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
