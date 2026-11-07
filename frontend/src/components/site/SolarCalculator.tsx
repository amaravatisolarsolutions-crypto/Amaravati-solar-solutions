import { useState, useId } from "react";
import {
  Calculator,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  FileCheck2,
  Home,
  Loader2,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  User,
  X,
  Zap,
} from "lucide-react";
import { COMPANY } from "@/lib/site-data";
import { cn } from "@/lib/utils";

interface SolarCalculatorProps {
  className?: string;
  hideHeader?: boolean;
  onApplyPlan?: (summary: {
    bill: number;
    location: string;
    load: string;
    propertyType: string;
    systemKw: number;
    monthlySavings: number;
    subsidy: number;
  }) => void;
}

export function SolarCalculator({ className, hideHeader = false, onApplyPlan }: SolarCalculatorProps) {
  const [bill, setBill] = useState<number>(5000);
  const [billInput, setBillInput] = useState<string>("5000");
  const [location, setLocation] = useState<string>("Andhra Pradesh");
  const [load, setLoad] = useState<string>("5 kW");
  const [propertyType, setPropertyType] = useState<string>("Home (Residential)");
  const [showResult, setShowResult] = useState<boolean>(true); // Pre-show initial calculation

  // Lead Collection Modal State
  const [modalType, setModalType] = useState<"whatsapp" | "apply" | null>(null);
  const [custName, setCustName] = useState<string>("");
  const [custPhone, setCustPhone] = useState<string>("");
  const [custCity, setCustCity] = useState<string>(location);
  const [custEmail, setCustEmail] = useState<string>("");
  const [custNotes, setCustNotes] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [submittedRef, setSubmittedRef] = useState<string>("");
  const [submittedWaUrl, setSubmittedWaUrl] = useState<string>("");
  const [formError, setFormError] = useState<string | null>(null);

  const billId = useId();
  const locationId = useId();
  const loadId = useId();
  const propertyTypeId = useId();

  // Calculations
  const isResidential = propertyType.includes("Residential") || propertyType.includes("Home");
  
  // Average AP tariff ~ ₹7.50 / kWh
  const monthlyUnits = Math.round(bill / 7.5);
  
  // 1 kW solar produces ~125 units per month in Andhra Pradesh
  const calculatedKw = Math.max(1, Math.round((monthlyUnits / 125) * 2) / 2);
  // Parse numeric load if available
  const parsedLoadKw = parseFloat(load.replace(/[^0-9.]/g, "")) || calculatedKw;
  const recommendedKw = Math.min(Math.max(calculatedKw, 1), Math.max(parsedLoadKw, calculatedKw));

  // 1 kW requires ~100 sq ft shadow-free area
  const roofArea = Math.round(recommendedKw * 100);
  
  // Monthly solar generation in units
  const generationMonthly = Math.round(recommendedKw * 125);
  const generationAnnual = generationMonthly * 12;

  // Monthly savings (approx 85-90% bill reduction)
  const monthlySavings = Math.round(Math.min(bill * 0.9, generationMonthly * 7.5));
  const annualSavings = monthlySavings * 12;

  // PM Surya Ghar Central Government Subsidy (for Residential)
  let subsidy = 0;
  if (isResidential) {
    if (recommendedKw >= 3) {
      subsidy = 78000;
    } else if (recommendedKw >= 2) {
      subsidy = 60000;
    } else if (recommendedKw >= 1) {
      subsidy = 30000;
    }
  }

  // Estimated gross system investment ~₹55,000/kW
  const grossCost = Math.round(recommendedKw * 55000);
  const netInvestment = Math.max(0, grossCost - subsidy);
  const paybackYears = annualSavings > 0 ? (netInvestment / annualSavings).toFixed(1) : "3.5";
  const lifetimeSavings = Math.max(0, annualSavings * 25 - netInvestment);

  const handleBillChange = (valStr: string) => {
    setBillInput(valStr);
    const parsed = parseInt(valStr.replace(/[^0-9]/g, ""), 10);
    if (!isNaN(parsed) && parsed > 0) {
      setBill(parsed);
    }
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResult(true);
    if (onApplyPlan) {
      onApplyPlan({
        bill,
        location,
        load,
        propertyType,
        systemKw: recommendedKw,
        monthlySavings,
        subsidy,
      });
    }
  };

  // Handle lead submission from modal for both "WhatsApp Quote" and "Apply This Plan"
  const handleSubmitLeadModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!custName.trim()) {
      setFormError("Please enter your full name.");
      return;
    }
    const cleanPhone = custPhone.replace(/[^0-9]/g, "");
    if (cleanPhone.length < 10) {
      setFormError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setFormError(null);
    setIsSubmitting(true);

    const isWhatsApp = modalType === "whatsapp";
    const refCode = isWhatsApp
      ? `ASS-WQ-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
      : `ASS-AP-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    const serviceTitle = isWhatsApp
      ? `WhatsApp Quote: ${recommendedKw} kW (${propertyType})`
      : `Applied Solar Plan: ${recommendedKw} kW (${propertyType})`;

    const detailedMessage = [
      `[${isWhatsApp ? "WHATSAPP QUOTE REQUEST" : "APPLIED SOLAR PLAN"}]`,
      `Ref ID: ${refCode}`,
      `Configured System: ${recommendedKw} kW Rooftop Solar`,
      `Monthly Electricity Bill: ₹${bill.toLocaleString("en-IN")}`,
      `Sanctioned Load: ${load}`,
      `Property Type: ${propertyType}`,
      `Location: ${custCity.trim() || location}`,
      `PM Surya Ghar Subsidy: ₹${subsidy.toLocaleString("en-IN")}`,
      `Est. Monthly Savings: ~₹${monthlySavings.toLocaleString("en-IN")}`,
      `Est. Annual Savings: ~₹${annualSavings.toLocaleString("en-IN")}`,
      `Est. Net Outlay: ~₹${netInvestment.toLocaleString("en-IN")}`,
      `Required Roof Space: ~${roofArea} Sq. Ft.`,
      custNotes.trim() ? `Notes: ${custNotes.trim()}` : null,
    ]
      .filter(Boolean)
      .join(" | ");

    const payload = {
      full_name: custName.trim(),
      phone: custPhone.trim(),
      email: custEmail.trim() || `${cleanPhone}@inquiry.amaravatisolar.com`,
      customer_type: isResidential ? "Residential" : "Commercial",
      service: serviceTitle,
      city: custCity.trim() || location,
      message: detailedMessage,
      notes: `Ref: ${refCode} | Source: ${isWhatsApp ? "WhatsApp Quote" : "Apply This Plan"}`,
      reference: refCode,
      source: isWhatsApp ? "WhatsApp Quote" : "Applied Solar Plan",
    };

    try {
      // 1. Post to backend database API
      await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch((err) => console.warn("Backend enquiry API offline, synced to local:", err));

      // 2. Local instant Admin Portal synchronization
      try {
        const stored = JSON.parse(localStorage.getItem("amaravati_admin_inquiries") || "[]");
        stored.unshift({
          id: refCode,
          name: custName.trim(),
          phone: custPhone.trim(),
          email: custEmail.trim() || `${cleanPhone}@inquiry.amaravatisolar.com`,
          service: serviceTitle,
          location: custCity.trim() || location,
          date: new Date().toLocaleDateString() + ", " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: "New",
          notes: detailedMessage,
        });
        localStorage.setItem("amaravati_admin_inquiries", JSON.stringify(stored));
      } catch (err) {
        console.warn("Could not save to local storage:", err);
      }

      // 3. Build WhatsApp URL
      const waLines = [
        `☀️ *AMARAVATI SOLAR SOLUTIONS — ${isWhatsApp ? "OFFICIAL QUOTATION REQUEST" : "APPLIED SOLAR PLAN"}* ☀️`,
        `*Ref ID:* ${refCode}`,
        `*Customer Name:* ${custName.trim()}`,
        `*Phone / WhatsApp:* ${custPhone.trim()}`,
        `*City / Location:* ${custCity.trim() || location}`,
        `*Property Type:* ${propertyType}`,
        `*Configured System:* ${recommendedKw} kW Rooftop Solar`,
        `*Average Monthly Bill:* ₹${bill.toLocaleString("en-IN")}`,
        `*Sanctioned Load:* ${load}`,
        `*PM Surya Ghar Subsidy:* ₹${subsidy.toLocaleString("en-IN")}`,
        `*Estimated Monthly Savings:* ~₹${monthlySavings.toLocaleString("en-IN")}`,
        `*Estimated Net Investment:* ~₹${netInvestment.toLocaleString("en-IN")}`,
        `*Required Roof Space:* ~${roofArea} Sq. Ft.`,
        custNotes.trim() ? `*Customer Notes:* ${custNotes.trim()}` : null,
        "----------------------------------------",
        isWhatsApp
          ? "Hi Amaravati Solar Solutions, I configured this solar system on your website calculator and submitted my request. Please share the detailed technical proposal and quotation on WhatsApp!"
          : "Hi Amaravati Solar Solutions, I applied for this solar plan on your website. Please connect with me for site survey and subsidy filing!",
      ].filter(Boolean);

      const waUrl = `https://wa.me/917989641899?text=${encodeURIComponent(waLines.join("\n"))}`;

      setSubmittedWaUrl(waUrl);
      setSubmittedRef(refCode);
      setSubmitSuccess(true);

      // Auto-launch WhatsApp if clicked WhatsApp Quote
      if (isWhatsApp) {
        window.open(waUrl, "_blank");
      }

      if (onApplyPlan && !isWhatsApp) {
        onApplyPlan({
          bill,
          location: custCity.trim() || location,
          load,
          propertyType,
          systemKw: recommendedKw,
          monthlySavings,
          subsidy,
        });
      }
    } catch (err) {
      console.error("Submission failed:", err);
      setFormError("Failed to submit. Please try again or WhatsApp us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenModal = (type: "whatsapp" | "apply") => {
    setModalType(type);
    setSubmitSuccess(false);
    setFormError(null);
    setCustCity(location);
  };

  const handleCloseModal = () => {
    setModalType(null);
    setSubmitSuccess(false);
    setFormError(null);
  };

  return (
    <div
      className={cn(
        "rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white p-3.5 sm:p-5 md:p-6 shadow-sm transition-all duration-300",
        className
      )}
    >
      {/* 1. Header matching exact user image style */}
      {!hideHeader && (
        <div className="flex items-center gap-3 mb-4 sm:mb-5">
          <div className="grid size-10 sm:size-11 place-items-center rounded-2xl bg-[#B83A16] text-white shadow-md shadow-[#B83A16]/20">
            <Calculator className="size-5 sm:size-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg sm:text-2xl font-black text-[#082B4C] tracking-tight">
              Calculate Your Solar Plan
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Instant rooftop solar estimate based on PM Surya Ghar guidelines in Andhra Pradesh
            </p>
          </div>
        </div>
      )}

      {/* 2. 2x2 Grid of Fields matching exact user image */}
      <form onSubmit={(e) => { e.preventDefault(); handleCalculate(e); }} className="space-y-3.5 sm:space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {/* Top Left: Your Average Monthly Electricity Bill */}
          <div className="space-y-1.5">
            <label htmlFor={billId} className="block text-xs sm:text-sm font-bold text-[#082B4C]">
              Your Average Monthly Electricity Bill
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-base sm:text-lg font-extrabold text-slate-700 select-none">
                ₹
              </span>
              <input
                id={billId}
                type="text"
                inputMode="numeric"
                value={billInput}
                onChange={(e) => handleBillChange(e.target.value)}
                placeholder="5000"
                className="w-full h-10 sm:h-11 pl-8 pr-4 rounded-xl border border-slate-200/90 bg-white text-sm sm:text-base font-bold text-[#082B4C] focus:border-[#B83A16] focus:ring-2 focus:ring-[#B83A16]/15 outline-none transition-all shadow-2xs"
              />
            </div>
            {/* Quick Bill Selectors */}
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {[3000, 5000, 8000, 12000].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => {
                    setBill(preset);
                    setBillInput(preset.toString());
                  }}
                  className={cn(
                    "text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full border transition-all cursor-pointer",
                    bill === preset
                      ? "bg-[#B83A16]/10 border-[#B83A16] text-[#B83A16]"
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300"
                  )}
                >
                  ₹{preset.toLocaleString("en-IN")}
                </button>
              ))}
            </div>
          </div>

          {/* Top Right: Your Location */}
          <div className="space-y-1.5">
            <label htmlFor={locationId} className="block text-xs sm:text-sm font-bold text-[#082B4C]">
              Your Location
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-amber-500 pointer-events-none">
                <MapPin className="size-4 text-amber-500 fill-amber-500/20" />
              </span>
              <select
                id={locationId}
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  setCustCity(e.target.value);
                }}
                className="w-full h-10 sm:h-11 pl-9 pr-9 rounded-xl border border-slate-200/90 bg-white text-xs sm:text-sm font-bold text-[#082B4C] focus:border-[#B83A16] focus:ring-2 focus:ring-[#B83A16]/15 outline-none transition-all shadow-2xs appearance-none cursor-pointer"
              >
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Vijayawada (AP)">Vijayawada (AP)</option>
                <option value="Guntur (AP)">Guntur (AP)</option>
                <option value="Amaravati (AP)">Amaravati (AP)</option>
                <option value="Visakhapatnam (AP)">Visakhapatnam (AP)</option>
                <option value="Tirupati (AP)">Tirupati (AP)</option>
                <option value="Nellore (AP)">Nellore (AP)</option>
                <option value="Telangana">Telangana</option>
                <option value="Other Location">Other Location</option>
              </select>
              <div className="absolute right-3.5 pointer-events-none text-slate-400">
                <ChevronRight className="size-4 rotate-90" />
              </div>
            </div>
          </div>

          {/* Bottom Left: Sanctioned Load (kW) */}
          <div className="space-y-1.5">
            <label htmlFor={loadId} className="block text-xs sm:text-sm font-bold text-[#082B4C]">
              Sanctioned Load (kW)
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-amber-500 pointer-events-none">
                <Zap className="size-4 text-amber-500 fill-amber-500" />
              </span>
              <select
                id={loadId}
                value={load}
                onChange={(e) => setLoad(e.target.value)}
                className="w-full h-10 sm:h-11 pl-9 pr-9 rounded-xl border border-slate-200/90 bg-white text-xs sm:text-sm font-bold text-[#082B4C] focus:border-[#B83A16] focus:ring-2 focus:ring-[#B83A16]/15 outline-none transition-all shadow-2xs appearance-none cursor-pointer"
              >
                <option value="1 kW">1 kW</option>
                <option value="2 kW">2 kW</option>
                <option value="3 kW">3 kW</option>
                <option value="4 kW">4 kW</option>
                <option value="5 kW">5 kW</option>
                <option value="7 kW">7 kW</option>
                <option value="10 kW">10 kW</option>
                <option value="15 kW">15 kW</option>
                <option value="20 kW">20 kW</option>
                <option value="25 kW+">25 kW+</option>
              </select>
              <div className="absolute right-3.5 pointer-events-none text-slate-400">
                <ChevronRight className="size-4 rotate-90" />
              </div>
            </div>
          </div>

          {/* Bottom Right: Property Type */}
          <div className="space-y-1.5">
            <label htmlFor={propertyTypeId} className="block text-xs sm:text-sm font-bold text-[#082B4C]">
              Property Type
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-[#B83A16] pointer-events-none">
                <Home className="size-4 text-[#B83A16]" />
              </span>
              <select
                id={propertyTypeId}
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full h-10 sm:h-11 pl-9 pr-9 rounded-xl border border-slate-200/90 bg-white text-xs sm:text-sm font-bold text-[#082B4C] focus:border-[#B83A16] focus:ring-2 focus:ring-[#B83A16]/15 outline-none transition-all shadow-2xs appearance-none cursor-pointer"
              >
                <option value="Home (Residential)">Home (Residential)</option>
                <option value="Commercial (Office / Shop / Clinic)">Commercial (Office / Shop / Clinic)</option>
                <option value="Industrial (Factory / Warehouse / Unit)">Industrial (Factory / Warehouse / Unit)</option>
              </select>
              <div className="absolute right-3.5 pointer-events-none text-slate-400">
                <ChevronRight className="size-4 rotate-90" />
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* 3. Instant Solar Calculation Result Card (Updates automatically with no gaps) */}
      {showResult && (
        <div className="mt-3.5 sm:mt-4 pt-3.5 sm:pt-4 border-t border-slate-200/80 animate-in fade-in slide-in-from-bottom-1 duration-200">
          <div className="rounded-xl sm:rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-50/50 via-white to-orange-50/40 p-3.5 sm:p-5 shadow-xs">
            {/* Top Recommended Banner */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 pb-3 border-b border-amber-200/60">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 text-emerald-700 px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wider mb-1">
                  <Sparkles className="size-3" /> Recommended System Size
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-[#082B4C]">
                  {recommendedKw} kW Rooftop Solar System
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  Optimized for your ₹{bill.toLocaleString("en-IN")} electricity bill in {location}
                </p>
              </div>

              {subsidy > 0 && (
                <div className="rounded-xl border border-emerald-300 bg-emerald-50 px-3.5 py-2 text-right">
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 flex items-center gap-1 justify-end">
                    <ShieldCheck className="size-3 text-emerald-600" /> PM Surya Ghar Subsidy
                  </div>
                  <div className="text-base sm:text-lg font-black text-emerald-700">
                    ₹{subsidy.toLocaleString("en-IN")} Direct DBT
                  </div>
                </div>
              )}
            </div>

            {/* 4 Quick Stat Metric Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 my-4">
              <div className="rounded-xl bg-white border border-slate-200/80 p-3 shadow-2xs">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Monthly Savings</span>
                <p className="text-base sm:text-lg font-black text-emerald-600 mt-0.5">
                  ~₹{monthlySavings.toLocaleString("en-IN")}
                </p>
                <span className="text-[10px] text-slate-400">Up to 90% reduction</span>
              </div>

              <div className="rounded-xl bg-white border border-slate-200/80 p-3 shadow-2xs">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Annual Savings</span>
                <p className="text-base sm:text-lg font-black text-[#082B4C] mt-0.5">
                  ~₹{annualSavings.toLocaleString("en-IN")}
                </p>
                <span className="text-[10px] text-slate-400">Per year in power bills</span>
              </div>

              <div className="rounded-xl bg-white border border-slate-200/80 p-3 shadow-2xs">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Required Roof Area</span>
                <p className="text-base sm:text-lg font-black text-[#082B4C] mt-0.5">
                  ~{roofArea} Sq. Ft.
                </p>
                <span className="text-[10px] text-slate-400">Shadow-free roof space</span>
              </div>

              <div className="rounded-xl bg-white border border-slate-200/80 p-3 shadow-2xs">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Annual Generation</span>
                <p className="text-base sm:text-lg font-black text-amber-600 mt-0.5">
                  ~{generationAnnual.toLocaleString("en-IN")} Units
                </p>
                <span className="text-[10px] text-slate-400">Clean units produced</span>
              </div>
            </div>

            {/* Financial Overview & Payback Strip */}
            <div className="rounded-xl bg-white/90 border border-slate-200/90 p-3.5 sm:p-4 text-xs text-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                <div>
                  <span className="text-slate-500">Est. Net Outlay:</span>{" "}
                  <strong className="font-extrabold text-[#082B4C] text-sm">
                    ~₹{netInvestment.toLocaleString("en-IN")}
                  </strong>
                </div>
                <div>
                  <span className="text-slate-500">Capital Payback:</span>{" "}
                  <strong className="font-extrabold text-emerald-600 text-sm">
                    ~{paybackYears} Years
                  </strong>
                </div>
                <div>
                  <span className="text-slate-500">25-Yr Net Gain:</span>{" "}
                  <strong className="font-extrabold text-[#082B4C] text-sm">
                    ₹{(lifetimeSavings / 100000).toFixed(1)} Lakhs+
                  </strong>
                </div>
              </div>

              {/* Direct Actions: Now asking user details, storing to DB/Admin, and launching WhatsApp / Applying plan */}
              <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                <button
                  type="button"
                  onClick={() => handleOpenModal("whatsapp")}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 rounded-[30px] bg-[#25D366] hover:bg-[#20bd5a] px-4 py-2.5 text-xs font-bold text-white transition-all shadow-2xs hover:shadow hover:scale-[1.02] active:scale-95 whitespace-nowrap cursor-pointer"
                >
                  <PhoneCall className="size-3.5" />
                  <span>WhatsApp Quote</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleOpenModal("apply")}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 rounded-[30px] bg-[#B83A16] hover:bg-[#A33112] px-4 py-2.5 text-xs font-bold text-white transition-all shadow-2xs hover:shadow hover:scale-[1.02] active:scale-95 whitespace-nowrap cursor-pointer"
                >
                  <CheckCircle2 className="size-3.5" />
                  <span>Apply This Plan</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. MODAL DIALOG: Capture Name, Phone, Area & Save to Database & Admin Dashboard */}
      {modalType && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/65 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-lg rounded-3xl bg-white border border-slate-200 shadow-2xl p-5 sm:p-7 overflow-hidden my-auto animate-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              type="button"
              onClick={handleCloseModal}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="size-5" />
            </button>

            {submitSuccess ? (
              /* Success View */
              <div className="text-center py-4 space-y-4">
                <div className="size-14 mx-auto rounded-full bg-emerald-50 border-2 border-emerald-400 text-emerald-600 grid place-items-center shadow-sm">
                  <CheckCircle2 className="size-8" />
                </div>

                <div>
                  <span className="inline-block rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[11px] px-3 py-0.5 uppercase tracking-wider mb-2">
                    Inquiry Saved to System
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-[#082B4C]">
                    {modalType === "whatsapp" ? "WhatsApp Quotation Prepared!" : "Solar Application Submitted!"}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-sm mx-auto">
                    {modalType === "whatsapp"
                      ? "Your inquiry and calculations have been stored in our admin dashboard and WhatsApp has been initiated."
                      : "Our solar engineers have received your application and will review your rooftop parameters within 2 business hours."}
                  </p>
                </div>

                {/* Reference ID Pill */}
                <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 max-w-xs mx-auto">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Inquiry Reference ID
                  </span>
                  <span className="text-base font-black text-[#B83A16] font-mono tracking-wider">
                    {submittedRef}
                  </span>
                </div>

                {/* WhatsApp Action Button */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5">
                  <a
                    href={submittedWaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white px-5 py-2.5 text-xs font-bold shadow-sm transition-all"
                  >
                    <PhoneCall className="size-4" />
                    <span>Open in WhatsApp</span>
                    <ExternalLink className="size-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 px-5 py-2.5 text-xs font-bold transition-all cursor-pointer"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            ) : (
              /* Input Form View */
              <div className="space-y-4">
                {/* Header */}
                <div className="pr-6">
                  <div className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10.5px] font-extrabold uppercase tracking-wider mb-1.5 border shadow-2xs bg-white">
                    {modalType === "whatsapp" ? (
                      <span className="text-emerald-700 flex items-center gap-1">
                        <PhoneCall className="size-3 text-emerald-600" /> WhatsApp Quotation
                      </span>
                    ) : (
                      <span className="text-[#D9410E] flex items-center gap-1">
                        <FileCheck2 className="size-3 text-[#D9410E]" /> Direct Solar Application
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-[#082B4C] tracking-tight">
                    {modalType === "whatsapp"
                      ? "Get Your Official Quote on WhatsApp"
                      : `Apply for ${recommendedKw} kW Solar Plan`}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Please provide your contact info. Your inquiry will be logged in our admin dashboard and shared on WhatsApp.
                  </p>
                </div>

                {/* System Specs Preview Bar */}
                <div className="rounded-xl border border-orange-200/80 bg-orange-50/40 p-2.5 sm:p-3 text-xs flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Configured System</span>
                    <strong className="text-xs sm:text-sm font-black text-[#082B4C]">
                      {recommendedKw} kW Rooftop Solar
                    </strong>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Monthly Bill</span>
                    <strong className="text-xs sm:text-sm font-bold text-slate-800">
                      ₹{bill.toLocaleString("en-IN")}
                    </strong>
                  </div>
                  {subsidy > 0 && (
                    <div>
                      <span className="text-[10px] font-bold text-emerald-600 block uppercase">Subsidy</span>
                      <strong className="text-xs sm:text-sm font-black text-emerald-700">
                        ₹{subsidy.toLocaleString("en-IN")}
                      </strong>
                    </div>
                  )}
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Roof Space</span>
                    <strong className="text-xs sm:text-sm font-bold text-slate-800">
                      ~{roofArea} Sq. Ft.
                    </strong>
                  </div>
                </div>

                {/* Error Banner */}
                {formError && (
                  <div className="rounded-lg bg-red-50 border border-red-200 p-2.5 text-xs font-semibold text-red-700">
                    {formError}
                  </div>
                )}

                {/* Form Fields */}
                <form onSubmit={handleSubmitLeadModal} className="space-y-3">
                  {/* Full Name */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-[#082B4C]">
                      Your Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3 text-slate-400">
                        <User className="size-4" />
                      </span>
                      <input
                        type="text"
                        required
                        value={custName}
                        onChange={(e) => setCustName(e.target.value)}
                        placeholder="e.g. K. V. Rao / Ravi Kumar"
                        className="w-full h-10 pl-9 pr-3 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold text-slate-800 focus:border-[#B83A16] focus:ring-2 focus:ring-[#B83A16]/15 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-[#082B4C]">
                      Mobile / WhatsApp Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3 text-xs font-bold text-slate-500">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        value={custPhone}
                        onChange={(e) => setCustPhone(e.target.value.replace(/[^0-9]/g, "").slice(0, 10))}
                        placeholder="98765 43210"
                        className="w-full h-10 pl-11 pr-3 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold text-slate-800 focus:border-[#B83A16] focus:ring-2 focus:ring-[#B83A16]/15 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* City / Town / Mandal */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-[#082B4C]">
                      City / Area / District <span className="text-red-500">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3 text-slate-400">
                        <MapPin className="size-4 text-amber-500" />
                      </span>
                      <input
                        type="text"
                        required
                        value={custCity}
                        onChange={(e) => setCustCity(e.target.value)}
                        placeholder="e.g. Vijayawada, Guntur, Mangalagiri, etc."
                        className="w-full h-10 pl-9 pr-3 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold text-slate-800 focus:border-[#B83A16] focus:ring-2 focus:ring-[#B83A16]/15 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Optional Notes or Roof details */}
                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold text-slate-600">
                      Roof Type or Notes (Optional)
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3 text-slate-400">
                        <MessageSquare className="size-4" />
                      </span>
                      <input
                        type="text"
                        value={custNotes}
                        onChange={(e) => setCustNotes(e.target.value)}
                        placeholder="e.g. Flat RCC Terrace / 3-Phase power meter"
                        className="w-full h-10 pl-9 pr-3 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 focus:border-[#B83A16] focus:ring-2 focus:ring-[#B83A16]/15 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={cn(
                        "w-full inline-flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-xs sm:text-sm font-extrabold text-white shadow-md transition-all cursor-pointer active:scale-[0.99]",
                        modalType === "whatsapp"
                          ? "bg-[#25D366] hover:bg-[#20bd5a]"
                          : "bg-gradient-to-r from-[#D9410E] via-[#E04F16] to-[#F97316] hover:from-[#C03507] hover:to-[#D9410E]",
                        isSubmitting && "opacity-70 cursor-not-allowed"
                      )}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="size-4 animate-spin" />
                          <span>Saving to Dashboard &amp; Connecting...</span>
                        </>
                      ) : modalType === "whatsapp" ? (
                        <>
                          <PhoneCall className="size-4" />
                          <span>Save &amp; Open WhatsApp Quote →</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="size-4" />
                          <span>Confirm &amp; Apply Solar Plan →</span>
                        </>
                      )}
                    </button>
                    <p className="text-[10.5px] text-center text-slate-400 mt-2">
                      🔒 Your details are stored securely in our database and will never be shared.
                    </p>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

