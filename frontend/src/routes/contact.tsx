import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { useEffect } from "react";

import { EnquiryForm } from "@/components/site/EnquiryForm";
import { COMPANY } from "@/lib/site-data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Amaravati Solar Solutions" },
      { name: "description", content: "Send an enquiry to Amaravati Solar Solutions for residential, commercial or industrial solar." },
      { property: "og:title", content: "Contact Amaravati Solar Solutions" },
      { property: "og:description", content: "Get in touch about your solar project." },
    ],
  }),
  component: Contact,
});

function Contact() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  const cleanPhone = COMPANY.phone.replace(/[^0-9+]/g, "");
  const cleanWhatsapp = COMPANY.whatsapp.replace(/[^0-9]/g, "");

  const items = [
    {
      icon: MapPin,
      label: "Corporate Headquarters",
      value: `${COMPANY.headquarters.company}\n${COMPANY.headquarters.address}`,
      href: COMPANY.headquarters.mapsUrl,
    },
    {
      icon: MapPin,
      label: "Branch Office",
      value: COMPANY.branch.address,
      href: COMPANY.branch.mapsUrl,
    },
    {
      icon: Phone,
      label: "Phone Support",
      value: `${COMPANY.phones.join(" / ")}`,
      href: `tel:${cleanPhone}`,
    },
    {
      icon: Mail,
      label: "Email Support",
      value: COMPANY.email,
      href: `mailto:${COMPANY.email}`,
    },
    {
      icon: Clock,
      label: "Business hours",
      value: `${COMPANY.operationalHours.weekdays} | ${COMPANY.operationalHours.sunday}`,
    },
    {
      icon: MessageCircle,
      label: "WhatsApp Chat Support",
      value: "Chat with an engineer instantly",
      href: `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
        "Hello, I want to enquire about solar installation."
      )}`,
    },
  ];

  return (
    <div className="bg-slate-50/60 pt-3 sm:pt-5 pb-10 md:pb-14">
      <section className="container-site grid gap-6 sm:gap-8 lg:grid-cols-[3fr_2fr]">
        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-6 shadow-xs">
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#0c2340]">Send an enquiry</h1>
          <p className="mt-1 text-xs text-muted-foreground">All fields except message are required.</p>
          <div className="mt-4 sm:mt-5"><EnquiryForm /></div>
        </div>
        <aside className="space-y-6">
          <div className="rounded-3xl bg-surface p-6 shadow-card border border-slate-100">
            <ul className="space-y-4">
              {items.map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="flex gap-4">
                  <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-background text-primary shadow-card"><Icon className="size-5" /></div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-navy">{label}</p>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-muted-foreground hover:text-primary transition-colors text-sm break-words inline-block whitespace-pre-line"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-muted-foreground text-sm whitespace-pre-line">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <div className="overflow-hidden rounded-2xl border shadow-card bg-surface">
              <div className="px-4 py-2.5 bg-slate-100/80 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-700">
                Corporate Headquarters Map
              </div>
              <div className="h-48">
                <iframe
                  title="Corporate Headquarters Location"
                  src={COMPANY.headquarters.mapEmbed}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border shadow-card bg-surface">
              <div className="px-4 py-2.5 bg-slate-100/80 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-700">
                Branch Office Map
              </div>
              <div className="h-48">
                <iframe
                  title="Branch Office Location"
                  src={COMPANY.branch.mapEmbed}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
