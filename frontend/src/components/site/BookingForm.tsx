import { useServerFn } from "@tanstack/react-start";
import {
  CalendarCheck,
  CheckCircle2,
  Clock,
  ExternalLink,
  Loader2,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  Sparkles,
  Zap,
} from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { submitBooking } from "@/lib/forms.functions";
import {
  CUSTOMER_TYPES,
  MONTHLY_BILL_RANGES,
  PROPERTY_TYPES,
  SOLUTIONS,
  TIME_SLOTS,
  buildSolarWhatsAppUrl,
} from "@/lib/site-data";
import { bookingSchema, todayISO } from "@/lib/validation";
import { Field, inputClass } from "./FormField";
import { cn } from "@/lib/utils";

interface BookingFormProps {
  initialSolution?: string;
  initialCustomerType?: string;
  initialPropertyType?: string;
  sourceContext?: string;
}

export function BookingForm({
  initialSolution = "",
  initialCustomerType = "Residential",
  initialPropertyType = "Independent House / Villa",
  sourceContext = "",
}: BookingFormProps) {
  const [selectedSolution, setSelectedSolution] = useState<string>(initialSolution || SOLUTIONS[0]);
  const [customerType, setCustomerType] = useState<string>(initialCustomerType);
  const [propertyType, setPropertyType] = useState<string>(initialPropertyType);
  const [monthlyBill, setMonthlyBill] = useState<string>(MONTHLY_BILL_RANGES[1]);
  const [fullName, setFullName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [preferredDate, setPreferredDate] = useState<string>("");
  const [preferredTime, setPreferredTime] = useState<string>(TIME_SLOTS[0]);
  const [requirements, setRequirements] = useState<string>("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [serverError, setServerError] = useState("");
  const [reference, setReference] = useState("");
  const [submittedWhatsappUrl, setSubmittedWhatsappUrl] = useState<string>("");
  const [minDate, setMinDate] = useState<string>();

  useEffect(() => {
    setMinDate(todayISO());
    // Default preferred date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setPreferredDate(tomorrow.toISOString().slice(0, 10));
  }, []);

  // Update selected solution if prop changes
  useEffect(() => {
    if (initialSolution) {
      // Find case-insensitive or partial match in SOLUTIONS if possible
      const found = SOLUTIONS.find(
        (s) => s.toLowerCase() === initialSolution.toLowerCase() || s.toLowerCase().includes(initialSolution.toLowerCase())
      );
      setSelectedSolution(found || initialSolution);
    }
  }, [initialSolution]);

  useEffect(() => {
    if (initialCustomerType && CUSTOMER_TYPES.includes(initialCustomerType as any)) {
      setCustomerType(initialCustomerType);
    }
  }, [initialCustomerType]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});

    const payload = {
      full_name: fullName.trim(),
      phone: phone.trim(),
      email: `${phone.replace(/[^0-9]/g, "")}@inquiry.amaravatisolar.com`,
      customer_type: customerType,
      solution: selectedSolution,
      property_type: propertyType,
      city: city.trim(),
      monthly_bill: monthlyBill,
      preferred_date: preferredDate,
      preferred_time: preferredTime,
      requirements: [requirements.trim(), sourceContext ? `Source: ${sourceContext}` : null].filter(Boolean).join(" | "),
    };

    const parsed = bookingSchema.safeParse(payload);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        errs[String(issue.path[0])] ??= issue.message;
      }
      setErrors(errs);
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || "Failed to book consultation. Please try again.");
      }

      const data = await res.json();
      const generatedRef = data.reference || `ASS-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      setReference(generatedRef);

      // Instant local admin sync
      try {
        const stored = JSON.parse(localStorage.getItem("amaravati_admin_inquiries") || "[]");
        stored.unshift({
          id: "b-" + generatedRef,
          name: payload.full_name,
          phone: payload.phone,
          email: payload.email,
          service: payload.solution,
          location: payload.city + (payload.preferred_date ? ` [${payload.preferred_date}]` : ""),
          date: new Date().toLocaleDateString() + ", " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: "New",
          notes: `Ref: ${generatedRef} | Property: ${payload.property_type} | Bill: ${payload.monthly_bill || ""} | ${payload.requirements || ""}`,
        });
        localStorage.setItem("amaravati_admin_inquiries", JSON.stringify(stored));
      } catch {}

      // Generate pre-filled WhatsApp link
      const waUrl = buildSolarWhatsAppUrl({
        reference: generatedRef,
        fullName: payload.full_name,
        phone: payload.phone,
        city: payload.city,
        service: payload.solution,
        propertyType: payload.property_type,
        monthlyBill: payload.monthly_bill,
        preferredDate: payload.preferred_date,
        preferredTime: payload.preferred_time,
        requirements: payload.requirements,
      });

      setSubmittedWhatsappUrl(waUrl);
      setStatus("done");

      // Seamlessly trigger WhatsApp in new tab
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
          <CalendarCheck className="size-8" />
        </div>

        <span className="inline-block text-[11px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-full mb-2">
          Request Confirmed &amp; Logged in Admin Desk
        </span>

        <h3 className="text-2xl sm:text-3xl font-black text-[#082B4C] tracking-tight">
          Thank you, <span className="text-[#E04F16]">{fullName || "Customer"}</span>!
        </h3>

        <p className="mt-1.5 text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
          Your solar consultation &amp; rooftop site survey request has been registered with our Vijayawada engineering team.
        </p>

        {/* Reference Code Card */}
        <div className="mt-5 p-4 rounded-2xl bg-white border border-emerald-200/90 shadow-xs max-w-md mx-auto text-left space-y-2">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Booking Reference
            </span>
            <span className="font-mono text-base font-black text-[#E04F16] tracking-wider">
              {reference}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-slate-500 text-[10px] block">Selected Solution:</span>
              <span className="font-bold text-[#082B4C] line-clamp-1">{selectedSolution}</span>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] block">Location / City:</span>
              <span className="font-bold text-[#082B4C] line-clamp-1">{city}</span>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] block">Preferred Date:</span>
              <span className="font-bold text-slate-700">{preferredDate}</span>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] block">Time Slot:</span>
              <span className="font-bold text-slate-700 truncate">{preferredTime.split(" ")[0]}</span>
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
            Our solar engineer in Vijayawada will review your site details and connect with you shortly.
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
              setRequirements("");
            }}
          >
            Book Another Consultation
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-3.5 sm:grid-cols-2">
      {/* 1. Highlight Banner for Pre-Selected Service */}
      {selectedSolution && (
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
                {selectedSolution}
              </span>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 text-[10px] font-black text-emerald-800 bg-emerald-100/90 px-2.5 py-1 rounded-full border border-emerald-300 shrink-0">
            <span className="size-1.5 rounded-full bg-emerald-600 animate-pulse" /> Pre-Selected
          </span>
        </div>
      )}

      {/* 2. Full Name */}
      <Field id="full_name" label="Full Name *" error={errors["full_name"]}>
        <input
          id="full_name"
          name="full_name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="e.g. K. Satyanarayana"
          autoComplete="name"
          className={inputClass}
        />
      </Field>

      {/* 3. Phone Number */}
      <Field id="phone" label="WhatsApp Phone Number *" error={errors["phone"]}>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="e.g. 9876543210"
          autoComplete="tel"
          className={inputClass}
        />
      </Field>

      {/* 4. City / Location */}
      <Field id="city" label="City / Location *" error={errors["city"]}>
        <input
          id="city"
          name="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="e.g. Vijayawada, Guntur, Amaravati, Hyderabad"
          className={inputClass}
        />
      </Field>

      {/* 5. Interested Solar Solution */}
      <Field id="solution" label="Selected Solar Service / Architecture *" error={errors["solution"]}>
        <select
          id="solution"
          name="solution"
          value={selectedSolution}
          onChange={(e) => setSelectedSolution(e.target.value)}
          className={inputClass}
        >
          {SOLUTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </Field>

      {/* 6. Property / Roof Type */}
      <Field id="property_type" label="Property / Roof Type" error={errors["property_type"]}>
        <select
          id="property_type"
          name="property_type"
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
          className={inputClass}
        >
          {PROPERTY_TYPES.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </Field>

      {/* 7. Monthly Electricity Bill */}
      <Field id="monthly_bill" label="Current Monthly Electricity Bill" error={errors["monthly_bill"]}>
        <select
          id="monthly_bill"
          name="monthly_bill"
          value={monthlyBill}
          onChange={(e) => setMonthlyBill(e.target.value)}
          className={inputClass}
        >
          {MONTHLY_BILL_RANGES.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </Field>

      {/* 8. Preferred Date for Free Site Survey */}
      <Field id="preferred_date" label="Preferred Site Visit Date" error={errors["preferred_date"]}>
        <input
          id="preferred_date"
          name="preferred_date"
          type="date"
          min={minDate}
          value={preferredDate}
          onChange={(e) => setPreferredDate(e.target.value)}
          className={inputClass}
        />
      </Field>

      {/* 9. Preferred Time Slot */}
      <Field id="preferred_time" label="Preferred Time Slot" error={errors["preferred_time"]}>
        <select
          id="preferred_time"
          name="preferred_time"
          value={preferredTime}
          onChange={(e) => setPreferredTime(e.target.value)}
          className={inputClass}
        >
          {TIME_SLOTS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </Field>

      {/* 10. Additional Requirements / Notes */}
      <Field
        id="requirements"
        label="Additional Requirements / Roof Size / Comments (Optional)"
        error={errors["requirements"]}
        className="sm:col-span-2"
      >
        <textarea
          id="requirements"
          name="requirements"
          rows={2}
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
          placeholder="e.g. Need 5 kW on-grid setup with PM Surya Ghar subsidy; RCC terrace available 600 sq.ft."
          className={inputClass}
        />
      </Field>

      {/* Server Error Alert */}
      {status === "error" && (
        <p role="alert" className="text-xs text-destructive sm:col-span-2 p-2.5 rounded-lg bg-red-50 border border-red-200">
          {serverError}
        </p>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        variant="cta"
        size="lg"
        disabled={status === "sending"}
        className="sm:col-span-2 h-12 rounded-2xl bg-gradient-to-r from-[#D9410E] via-[#E04F16] to-[#F97316] hover:from-[#C03507] hover:to-[#D9410E] text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
      >
        {status === "sending" ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="animate-spin size-4" /> Saving Request &amp; Connecting to WhatsApp...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <span>Confirm Consultation &amp; Send to WhatsApp</span>
            <Send className="size-4" />
          </span>
        )}
      </Button>

      {/* Transparency Guarantee */}
      <p className="text-[11px] text-center text-slate-500 sm:col-span-2 mt-1">
        🔒 100% Free Consultation &amp; Site Feasibility. Zero Sales Pressure. Your data is stored securely in our Admin Desk.
      </p>
    </form>
  );
}
