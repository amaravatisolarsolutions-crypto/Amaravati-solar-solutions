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
  MONTHLY_BILL_RANGES,
  PROPERTY_TYPES,
  SOLUTIONS,
  buildSolarWhatsAppUrl,
} from "@/lib/site-data";
import { proposalSchema } from "@/lib/validation";

interface ProposalFormProps {
  initialSolution?: string;
  initialCustomerType?: string;
  sourceContext?: string;
}

export function ProposalForm({
  initialSolution = "",
  initialCustomerType = "Residential",
  sourceContext = "",
}: ProposalFormProps) {
  const [selectedSolution, setSelectedSolution] = useState<string>(initialSolution || SOLUTIONS[0]);
  const [fullName, setFullName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [propertyType, setPropertyType] = useState<string>(PROPERTY_TYPES[0]);
  const [monthlyBill, setMonthlyBill] = useState<string>(MONTHLY_BILL_RANGES[1]);
  const [inquirySpecs, setInquirySpecs] = useState<string>("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [serverError, setServerError] = useState("");
  const [reference, setReference] = useState("");
  const [submittedWhatsappUrl, setSubmittedWhatsappUrl] = useState<string>("");

  useEffect(() => {
    if (initialSolution) {
      const found = SOLUTIONS.find(
        (s) => s.toLowerCase() === initialSolution.toLowerCase() || s.toLowerCase().includes(initialSolution.toLowerCase())
      );
      setSelectedSolution(found || initialSolution);
    }
  }, [initialSolution]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});

    const payload = {
      full_name: fullName.trim(),
      phone: phone.trim(),
      email: `${phone.replace(/[^0-9]/g, "")}@inquiry.amaravatisolar.com`,
      customer_type: initialCustomerType || "Residential",
      service: selectedSolution,
      city: city.trim(),
      message: [
        inquirySpecs.trim(),
        `Property: ${propertyType}`,
        `Monthly Bill: ${monthlyBill}`,
        sourceContext ? `Source: ${sourceContext}` : null,
      ]
        .filter(Boolean)
        .join(" | "),
    };

    if (!payload.full_name) {
      setErrors((prev) => ({ ...prev, full_name: "Full name is required" }));
      return;
    }
    if (!payload.phone || payload.phone.replace(/[^0-9]/g, "").length < 10) {
      setErrors((prev) => ({ ...prev, phone: "Enter a valid 10-digit WhatsApp number" }));
      return;
    }
    if (!payload.city) {
      setErrors((prev) => ({ ...prev, city: "City / location is required" }));
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || "Failed to submit proposal request. Please try again.");
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
        // Pop-up blocked fallback handled via direct button
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
          Inquiry Logged in Admin Desk
        </span>

        <h3 className="text-2xl sm:text-3xl font-black text-[#082B4C] tracking-tight">
          Proposal Request Received!
        </h3>

        <p className="mt-1.5 text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
          Thank you, <span className="font-bold text-[#E04F16]">{fullName}</span>. Our technical estimation manager will prepare an itemized solar proposal for your site.
        </p>

        {/* Reference Code Card */}
        <div className="mt-5 p-4 rounded-2xl bg-white border border-emerald-200/90 shadow-xs max-w-md mx-auto text-left space-y-2">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Inquiry Reference
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
              <span className="text-slate-500 text-[10px] block">Property Type:</span>
              <span className="font-bold text-slate-700">{propertyType}</span>
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
            Click above to review your estimation and chat with our solar engineer on WhatsApp immediately.
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
              setInquirySpecs("");
            }}
          >
            Submit Another Proposal
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      {/* Pre-Selected Highlight Banner */}
      {selectedSolution && (
        <div className="p-3 sm:p-3.5 rounded-2xl bg-gradient-to-r from-orange-50 via-amber-50/60 to-orange-50 border border-orange-200/90 flex items-center justify-between gap-3 shadow-2xs">
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

      <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
        {/* Full Name */}
        <div>
          <label htmlFor="p_full_name" className="block text-xs font-bold text-slate-800">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="p_full_name"
            name="full_name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="e.g. K. Satyanarayana"
            autoComplete="name"
            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-[#082B4C] placeholder:text-slate-400 focus:border-[#E04F16] focus:outline-none focus:ring-2 focus:ring-[#E04F16]/20"
          />
          {errors["full_name"] && <p className="mt-1 text-xs text-destructive">{errors["full_name"]}</p>}
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor="p_phone" className="block text-xs font-bold text-slate-800">
            WhatsApp Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            id="p_phone"
            name="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="e.g. 9876543210"
            autoComplete="tel"
            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-[#082B4C] placeholder:text-slate-400 focus:border-[#E04F16] focus:outline-none focus:ring-2 focus:ring-[#E04F16]/20"
          />
          {errors["phone"] && <p className="mt-1 text-xs text-destructive">{errors["phone"]}</p>}
        </div>
      </div>

      <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
        {/* Selected Service */}
        <div>
          <label htmlFor="p_service" className="block text-xs font-bold text-slate-800">
            Selected Service / Architecture <span className="text-red-500">*</span>
          </label>
          <select
            id="p_service"
            name="service"
            value={selectedSolution}
            onChange={(e) => setSelectedSolution(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-[#082B4C] focus:border-[#E04F16] focus:outline-none focus:ring-2 focus:ring-[#E04F16]/20"
          >
            {SOLUTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* City / Location */}
        <div>
          <label htmlFor="p_city" className="block text-xs font-bold text-slate-800">
            City / Location <span className="text-red-500">*</span>
          </label>
          <input
            id="p_city"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="e.g. Vijayawada, Guntur, Amaravati"
            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-[#082B4C] placeholder:text-slate-400 focus:border-[#E04F16] focus:outline-none focus:ring-2 focus:ring-[#E04F16]/20"
          />
          {errors["city"] && <p className="mt-1 text-xs text-destructive">{errors["city"]}</p>}
        </div>
      </div>

      <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
        {/* Property Type */}
        <div>
          <label htmlFor="p_property_type" className="block text-xs font-bold text-slate-800">
            Property / Roof Type
          </label>
          <select
            id="p_property_type"
            name="property_type"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-[#082B4C] focus:border-[#E04F16] focus:outline-none focus:ring-2 focus:ring-[#E04F16]/20"
          >
            {PROPERTY_TYPES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        {/* Monthly Bill */}
        <div>
          <label htmlFor="p_monthly_bill" className="block text-xs font-bold text-slate-800">
            Monthly Electricity Bill
          </label>
          <select
            id="p_monthly_bill"
            name="monthly_bill"
            value={monthlyBill}
            onChange={(e) => setMonthlyBill(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-[#082B4C] focus:border-[#E04F16] focus:outline-none focus:ring-2 focus:ring-[#E04F16]/20"
          >
            {MONTHLY_BILL_RANGES.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Specifications / Notes */}
      <div>
        <label htmlFor="p_inquiry_specs" className="block text-xs font-bold text-slate-800">
          Site Specifications / Special Requirements (Optional)
        </label>
        <textarea
          id="p_inquiry_specs"
          name="inquiry_specs"
          rows={2}
          value={inquirySpecs}
          onChange={(e) => setInquirySpecs(e.target.value)}
          placeholder="e.g. Roof area available, power backup requirements, subsidy enquiry..."
          className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-[#082B4C] placeholder:text-slate-400 focus:border-[#E04F16] focus:outline-none focus:ring-2 focus:ring-[#E04F16]/20"
        />
      </div>

      {status === "error" && (
        <p role="alert" className="text-xs text-destructive p-2 rounded-lg bg-red-50 border border-red-200">
          {serverError}
        </p>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        variant="cta"
        size="lg"
        disabled={status === "sending"}
        className="w-full h-12 rounded-2xl bg-gradient-to-r from-[#D9410E] via-[#E04F16] to-[#F97316] hover:from-[#C03507] hover:to-[#D9410E] text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
      >
        {status === "sending" ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="animate-spin size-4" /> Generating Proposal &amp; Connecting to WhatsApp...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <span>Get My Free Solar Quote &amp; Send to WhatsApp</span>
            <Send className="size-4" />
          </span>
        )}
      </Button>

      <p className="text-[11px] text-center text-slate-500 mt-1">
        🔒 100% Free Solar Feasibility Report. No Spam. Logged directly into our Admin Management Portal.
      </p>
    </form>
  );
}
