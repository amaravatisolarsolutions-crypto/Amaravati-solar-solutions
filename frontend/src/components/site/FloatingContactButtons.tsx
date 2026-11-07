import { useState } from "react";
import { X } from "lucide-react";
import { COMPANY } from "@/lib/site-data";

const PhoneCallIcon = (props: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props} aria-hidden="true">
    <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-2.2 2.2a15.053 15.053 0 0 1-6.59-6.59l2.2-2.21a.96.96 0 0 0 .25-1A11.36 11.36 0 0 1 8.57 3.9c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.52c0-.55-.45-1-1-1z" />
  </svg>
);

const WhatsAppIcon = (props: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props} aria-hidden="true">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
);

export function FloatingContactButtons() {
  const [showCallModal, setShowCallModal] = useState(false);

  // Exact same primary number for both Call and WhatsApp
  const primaryNumber = COMPANY.phone || "+91 63058 25402";
  const cleanPhone = primaryNumber.replace(/[^0-9+]/g, "");
  const cleanWhatsapp = cleanPhone.replace("+", ""); // "916305825402"

  const whatsappUrl = `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
    "Hello Amaravati Solar Solutions, I am interested in solar rooftop systems. Please share more details."
  )}`;

  return (
    <>
      {/* Floating Buttons on Right Side - Compact & Perfectly Aligned */}
      <aside
        aria-label="Quick contact actions"
        className="fixed right-3 sm:right-4 bottom-3 sm:bottom-4 lg:bottom-20 xl:bottom-22 z-40 flex flex-col items-end gap-2 select-none"
      >
        {/* Call Option Button (Solar Gold) - Compact size-10 (40px) */}
        <div className="group relative flex items-center">
          {/* Tooltip on hover */}
          <span className="pointer-events-none absolute right-full mr-2.5 whitespace-nowrap rounded-lg bg-navy/95 px-2.5 py-1 text-[11px] font-semibold text-white opacity-0 shadow-lg backdrop-blur transition-opacity duration-200 group-hover:opacity-100">
            Call: {primaryNumber}
          </span>
          <a
            href={`tel:${cleanPhone}`}
            onClick={(e) => {
              // On desktop devices without phone handlers, open a quick modal
              if (!window.matchMedia("(max-width: 768px)").matches) {
                e.preventDefault();
                setShowCallModal(true);
              }
            }}
            aria-label={`Call Amaravati Solar Solutions at ${primaryNumber}`}
            className="flex size-10 sm:size-11 items-center justify-center rounded-full bg-[#F5A623] text-white shadow-[0_3px_12px_rgba(245,166,35,0.45)] transition-all duration-300 hover:scale-110 hover:bg-[#e09315] hover:shadow-[0_5px_18px_rgba(245,166,35,0.65)] active:scale-95"
          >
            <PhoneCallIcon className="size-4.5 sm:size-5 text-white" />
          </a>
        </div>

        {/* WhatsApp Option Button (Official WhatsApp Green) - Compact size-10 (40px) */}
        <div className="group relative flex items-center">
          {/* Tooltip on hover */}
          <span className="pointer-events-none absolute right-full mr-2.5 whitespace-nowrap rounded-lg bg-navy/95 px-2.5 py-1 text-[11px] font-semibold text-white opacity-0 shadow-lg backdrop-blur transition-opacity duration-200 group-hover:opacity-100">
            WhatsApp: {primaryNumber}
          </span>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Chat with Amaravati Solar Solutions on WhatsApp at ${primaryNumber}`}
            className="flex size-10 sm:size-11 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_3px_12px_rgba(37,211,102,0.45)] transition-all duration-300 hover:scale-110 hover:bg-[#20bd5a] hover:shadow-[0_5px_18px_rgba(37,211,102,0.65)] active:scale-95"
          >
            <WhatsAppIcon className="size-5 sm:size-5.5 text-white" />
          </a>
        </div>
      </aside>

      {/* Desktop Quick Call Dialog */}
      {showCallModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-slate-100">
            <button
              type="button"
              onClick={() => setShowCallModal(false)}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
              aria-label="Close call modal"
            >
              <X className="size-5" />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="grid size-12 place-items-center rounded-full bg-[#F5A623]/15 text-[#F5A623] mb-3">
                <PhoneCallIcon className="size-6" />
              </div>
              <h3 className="text-base font-bold text-navy">Call Amaravati Solar Solutions</h3>
              <p className="mt-1 text-xs text-slate-500">Reach our solar technical team directly for enquiries</p>
              
              <div className="mt-4 flex flex-col gap-2 w-full">
                <a
                  href={`tel:${cleanPhone}`}
                  className="w-full rounded-full bg-[#F5A623] py-2.5 text-center text-sm font-bold text-white shadow-md transition-all hover:bg-[#e09315] hover:shadow-lg active:scale-98 flex items-center justify-center gap-2"
                >
                  <PhoneCallIcon className="size-4 text-white" />
                  {primaryNumber}
                </a>
                <a
                  href="tel:+919966496500"
                  className="w-full rounded-full border border-slate-200 bg-white py-2.5 text-center text-sm font-bold text-navy shadow-sm transition-all hover:bg-slate-50 active:scale-98 flex items-center justify-center gap-2"
                >
                  <PhoneCallIcon className="size-4 text-slate-600" />
                  +91 99664 96500
                </a>
              </div>

              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(cleanPhone);
                  alert("Phone number copied to clipboard: " + cleanPhone);
                  setShowCallModal(false);
                }}
                className="mt-3 text-xs font-semibold text-slate-500 hover:text-navy underline"
              >
                Copy phone number
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
