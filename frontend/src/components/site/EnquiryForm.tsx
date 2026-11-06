import { useServerFn } from "@tanstack/react-start";
import {
  CheckCircle2,
  ExternalLink,
  Loader2,
  MessageSquare,
  Send,
  Sparkles,
} from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  CUSTOMER_TYPES,
  MONTHLY_BILL_RANGES,
  PROPERTY_TYPES,
  SOLUTIONS,
  buildSolarWhatsAppUrl,
} from "@/lib/site-data";
import { Field, inputClass } from "./FormField";

interface EnquiryFormProps {
  initialService?: string;
  initialMessage?: string;
}

export function EnquiryForm({ initialService = "", initialMessage = "" }: EnquiryFormProps) {
  const [selectedService, setSelectedService] = useState<string>(initialService || SOLUTIONS[0]);
  const [customerType, setCustomerType] = useState<string>("Residential");
  const [propertyType, setPropertyType] = useState<string>(PROPERTY_TYPES[0]);
  const [monthlyBill, setMonthlyBill] = useState<string>(MONTHLY_BILL_RANGES[1]);
  const [fullName, setFullName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [message, setMessage] = useState<string>(initialMessage);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [serverError, setServerError] = useState("");
  const [reference, setReference] = useState("");
  const [submittedWhatsappUrl, setSubmittedWhatsappUrl] = useState<string>("");

  useEffect(() => {
    if (initialService) {
      const found = SOLUTIONS.find(
        (s) => s.toLowerCase() === initialService.toLowerCase() || s.toLowerCase().includes(initialService.toLowerCase())
      );
      setSelectedService(found || initialService);
    }
  }, [initialService]);

  useEffect(() => {
    if (initialMessage) {
      setMessage(initialMessage);
    }
  }, [initialMessage]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});

    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) newErrors.full_name = "Full name is required";
    if (!phone.trim() || phone.replace(/[^0-9]/g, "").length < 10) {
      newErrors.phone = "Enter a valid 10-digit WhatsApp phone number";
    }
    if (!city.trim()) newErrors.city = "City / location is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const payload = {
      full_name: fullName.trim(),
      phone: phone.trim(),
      email: `${phone.replace(/[^0-9]/g, "")}@inquiry.amaravatisolar.com`,
      customer_type: customerType,
      service: selectedService,
      city: city.trim(),
      message: [
        message.trim(),
        `Property: ${propertyType}`,
        `Monthly Bill: ${monthlyBill}`,
      ]
        .filter(Boolean)
        .join(" | "),
    };

    setStatus("sending");
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || "Failed to submit enquiry. Please try again.");
      }

      const generatedRef = `ASS-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      setReference(generatedRef);

      // Instant local admin sync
      try {
        const stored = JSON.parse(localStorage.getItem("amaravati_admin_inquiries") || "[]");
        stored.unshift({
          id: "e-" + generatedRef,
          name: payload.full_name,
          phone: payload.phone,
          email: payload.email,
          service: payload.service,
          location: payload.city,
          date: new Date().toLocaleDateString() + ", " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: "New",
          notes: `Ref: ${generatedRef} | ${payload.message || ""}`,
        });
        localStorage.setItem("amaravati_admin_inquiries", JSON.stringify(stored));
      } catch {}

      const waUrl = buildSolarWhatsAppUrl({
        reference: generatedRef,
        fullName: payload.full_name,
        phone: payload.phone,
        city: payload.city,
        service: payload.service,
        propertyType,
        monthlyBill,
        requirements: payload.message,
      });

      setSubmittedWhatsappUrl(waUrl);
      setStatus("done");

      try {
        window.open(waUrl, "_blank", "noopener,noreferrer");
      } catch {
        // Pop-up blocker fallback handled via direct button
      }
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-3xl border border-emerald-300 bg-gradient-to-br from-emerald-50/90 via-white to-emerald-50/40 p-6 sm:p-8 text-center shadow-lg animate-pop-in" role="status">
        <div className="mx-auto size-16 grid place-items-center rounded-full bg-emerald-600 text-white shadow-md mb-4">
          <CheckCircle2 className="size-8" />
        </div>

        <span className="inline-block text-[11px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-full mb-2">
          Enquiry Logged in Admin Desk
        </span>

        <h3 className="text-2xl sm:text-3xl font-black text-[#082B4C] tracking-tight">
          Thank you, <span className="text-[#E04F16]">{fullName}</span>!
        </h3>

        <p className="mt-1.5 text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
          Your solar enquiry has been received and registered. Our engineering desk will connect with you shortly.
        </p>

        {/* Reference Code Card */}
        <div className="mt-5 p-4 rounded-2xl bg-white border border-emerald-200/90 shadow-xs max-w-md mx-auto text-left space-y-2">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Enquiry Reference
            </span>
            <span className="font-mono text-base font-black text-[#E04F16] tracking-wider">
              {reference}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-slate-500 text-[10px] block">Selected Solution:</span>
              <span className="font-bold text-[#082B4C] line-clamp-1">{selectedService}</span>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] block">Location / City:</span>
              <span className="font-bold text-[#082B4C] line-clamp-1">{city}</span>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] block">Property:</span>
              <span className="font-bold text-slate-700 truncate">{propertyType}</span>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] block">Monthly Bill:</span>
              <span className="font-bold text-slate-700 truncate">{monthlyBill}</span>
            </div>
          </div>
        </div>

        {/* WhatsApp Action Button */}
        <div className="mt-6 max-w-md mx-auto space-y-3">
          <a
            href={submittedWhatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2.5 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-black py-3.5 px-6 shadow-md hover:shadow-lg transition-all text-sm select-none animate-pulse hover:animate-none"
          >
            <MessageSquare className="size-5 shrink-0" />
            <span>Chat Directly on WhatsApp</span>
            <ExternalLink className="size-4 shrink-0" />
          </a>

          <p className="text-[11px] text-slate-500">
            Click above to start a live conversation with our certified solar engineers on WhatsApp.
          </p>

          <Button
            type="button"
            variant="outline"
            className="mt-3 rounded-full border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-bold"
            onClick={() => {
              setStatus("idle");
              setFullName("");
              setPhone("");
              setCity("");
              setMessage("");
            }}
          >
            Submit Another Enquiry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-3 sm:gap-3.5 sm:grid-cols-2">
      {/* Pre-Selected Highlight Banner */}
      {selectedService && (
        <div className="sm:col-span-2 p-3 sm:p-3.5 rounded-2xl bg-gradient-to-r from-orange-50 via-amber-50/60 to-orange-50 border border-orange-200/90 flex items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="grid size-8 place-items-center rounded-xl bg-[#E04F16] text-white shrink-0 shadow-xs">
              <Sparkles className="size-4" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#B83A16] block">
                Selected Solar Architecture
              </span>
              <span className="text-xs sm:text-sm font-extrabold text-[#082B4C] truncate block">
                {selectedService}
              </span>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 text-[10px] font-black text-emerald-800 bg-emerald-100/90 px-2.5 py-1 rounded-full border border-emerald-300 shrink-0">
            <span className="size-1.5 rounded-full bg-emerald-600 animate-pulse" /> Pre-Selected
          </span>
        </div>
      )}

      {/* Full Name */}
      <Field id="c_full_name" label="Full Name *" error={errors["full_name"]}>
        <input
          id="c_full_name"
          name="full_name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className={inputClass}
          autoComplete="name"
          placeholder="e.g. K. Satyanarayana"
        />
      </Field>

      {/* Phone Number */}
      <Field id="c_phone" label="WhatsApp Phone Number *" error={errors["phone"]}>
        <input
          id="c_phone"
          name="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={inputClass}
          autoComplete="tel"
          placeholder="e.g. 9876543210"
        />
      </Field>

      {/* City / Location */}
      <Field id="c_city" label="City / Location *" error={errors["city"]}>
        <input
          id="c_city"
          name="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className={inputClass}
          placeholder="e.g. Vijayawada, Guntur, Amaravati, Hyderabad"
        />
      </Field>

      {/* Service / Solution Selection */}
      <Field id="c_service" label="Selected Service / Solution *" error={errors["service"]}>
        <select
          id="c_service"
          name="service"
          className={inputClass}
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
        >
          {SOLUTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </Field>

      {/* Property Type */}
      <Field id="c_property_type" label="Property / Roof Type">
        <select
          id="c_property_type"
          name="property_type"
          className={inputClass}
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
        >
          {PROPERTY_TYPES.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </Field>

      {/* Monthly Bill */}
      <Field id="c_monthly_bill" label="Monthly Electricity Bill">
        <select
          id="c_monthly_bill"
          name="monthly_bill"
          className={inputClass}
          value={monthlyBill}
          onChange={(e) => setMonthlyBill(e.target.value)}
        >
          {MONTHLY_BILL_RANGES.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </Field>

      {/* Message */}
      <Field id="c_message" label="Specific Requirements / Roof Area / Queries" error={errors["message"]} className="sm:col-span-2">
        <textarea
          id="c_message"
          name="message"
          rows={2}
          className={inputClass}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="e.g. Need 5 kW rooftop setup with PM Surya Ghar subsidy; RCC terrace available 600 sq.ft."
        />
      </Field>

      {status === "error" && (
        <p role="alert" className="text-xs text-destructive sm:col-span-2 p-2.5 rounded-lg bg-red-50 border border-red-200">
          {serverError}
        </p>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        variant="cta"
        size="default"
        disabled={status === "sending"}
        className="sm:col-span-2 h-12 text-xs sm:text-sm font-extrabold shadow-md hover:shadow-lg transition-all rounded-2xl bg-gradient-to-r from-[#D9410E] via-[#E04F16] to-[#F97316] hover:from-[#C03507] hover:to-[#D9410E] text-white cursor-pointer"
      >
        {status === "sending" ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="animate-spin size-4" /> Submitting Request &amp; Connecting to WhatsApp...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <span>Submit Consultation Request &amp; Send to WhatsApp</span>
            <Send className="size-4" />
          </span>
        )}
      </Button>

      <p className="text-[11px] text-center text-slate-500 sm:col-span-2 mt-1">
        🔒 100% Free Consultation. No spam. Your inquiry is safely archived in our Admin Portal.
      </p>
    </form>
  );
}
