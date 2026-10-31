import { createFileRoute } from "@tanstack/react-router";
import {
  Clock,
  ExternalLink,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
} from "lucide-react";
import { useState } from "react";
import { BookingForm } from "@/components/site/BookingForm";
import { ProposalForm } from "@/components/site/ProposalForm";
import { COMPANY } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/book-a-demo")({
  head: () => ({
    meta: [
      { title: "Get a Quote / Book a Demo — Amaravati Solar Solutions" },
      {
        name: "description",
        content:
          "Request a site estimate, inquiry proposal or solar consultation with layout diagrams and ROI feasibility.",
      },
      { property: "og:title", content: "Get a Quote / Book a Demo" },
      {
        property: "og:description",
        content:
          "Estimate site proposal, view corporate headquarters and branch office locations on map.",
      },
    ],
  }),
  component: BookDemoPage,
});

function BookDemoPage() {
  const [formTab, setFormTab] = useState<"proposal" | "calendar">("proposal");

  const cleanWhatsapp = COMPANY.whatsapp.replace(/[^0-9]/g, "");

  return (
    <section className="bg-[#f8fafc] pt-2.5 sm:pt-3.5 md:pt-4 pb-8 md:pb-12">
      <div className="container-site">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.35fr] lg:items-start">
          {/* ================= LEFT COLUMN: Get In Touch ================= */}
          <div className="space-y-4">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-[#0c2340] sm:text-4xl">
                Get In Touch
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                Our regional technical officers and estimation managers are
                available to assist you with layout diagrams, ROI estimates, and
                feasibility checklists.
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
                <p className="text-xs font-medium text-slate-600">
                  {COMPANY.operationalHours.sunday}
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
                <div className="flex rounded-lg bg-slate-100 p-0.5 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setFormTab("proposal")}
                    className={cn(
                      "rounded-md px-3 py-1.5 transition-all",
                      formTab === "proposal"
                        ? "bg-white text-navy shadow-sm font-bold"
                        : "text-slate-500 hover:text-navy"
                    )}
                  >
                    Quick Quote
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormTab("calendar")}
                    className={cn(
                      "rounded-md px-3 py-1.5 transition-all",
                      formTab === "calendar"
                        ? "bg-white text-navy shadow-sm font-bold"
                        : "text-slate-500 hover:text-navy"
                    )}
                  >
                    Book Slot
                  </button>
                </div>
              </div>

              {formTab === "proposal" ? <ProposalForm /> : <BookingForm />}
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
