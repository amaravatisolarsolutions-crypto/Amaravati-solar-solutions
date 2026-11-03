import { useState, useId } from "react";
import { Calculator, CheckCircle2, ChevronRight, Home, MapPin, PhoneCall, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { COMPANY } from "@/lib/site-data";
import { cn } from "@/lib/utils";

interface SolarCalculatorProps {
  className?: string;
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

export function SolarCalculator({ className, onApplyPlan }: SolarCalculatorProps) {
  const [bill, setBill] = useState<number>(5000);
  const [billInput, setBillInput] = useState<string>("5000");
  const [location, setLocation] = useState<string>("Andhra Pradesh");
  const [load, setLoad] = useState<string>("5 kW");
  const [propertyType, setPropertyType] = useState<string>("Home (Residential)");
  const [showResult, setShowResult] = useState<boolean>(true); // Pre-show initial calculation

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

  const whatsappMessage = encodeURIComponent(
    `Hello Amaravati Solar Solutions, I used your Solar Calculator:\n- Monthly Bill: ₹${bill.toLocaleString("en-IN")}\n- Location: ${location}\n- Sanctioned Load: ${load}\n- Property Type: ${propertyType}\n- Recommended System: ${recommendedKw} kW\n- Estimated Subsidy: ₹${subsidy.toLocaleString("en-IN")}\nPlease provide a detailed quotation.`
  );

  return (
    <div
      className={cn(
        "rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-7 md:p-8 shadow-sm transition-all duration-300",
        className
      )}
    >
      {/* 1. Header matching exact user image style */}
      <div className="flex items-center gap-3 mb-6">
        <div className="grid size-11 place-items-center rounded-2xl bg-[#B83A16] text-white shadow-md shadow-[#B83A16]/20">
          <Calculator className="size-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#082B4C] tracking-tight">
            Calculate Your Solar Plan
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Instant rooftop solar estimate based on PM Surya Ghar guidelines in Andhra Pradesh
          </p>
        </div>
      </div>

      {/* 2. 2x2 Grid of Fields matching exact user image */}
      <form onSubmit={handleCalculate} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
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
                className="w-full h-11 sm:h-12 pl-8 pr-4 rounded-xl border border-slate-200/90 bg-white text-sm sm:text-base font-bold text-[#082B4C] focus:border-[#B83A16] focus:ring-2 focus:ring-[#B83A16]/15 outline-none transition-all shadow-2xs"
              />
            </div>
            {/* Quick Bill Selectors */}
            <div className="flex flex-wrap gap-1.5 pt-1">
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
                onChange={(e) => setLocation(e.target.value)}
                className="w-full h-11 sm:h-12 pl-9 pr-9 rounded-xl border border-slate-200/90 bg-white text-xs sm:text-sm font-bold text-[#082B4C] focus:border-[#B83A16] focus:ring-2 focus:ring-[#B83A16]/15 outline-none transition-all shadow-2xs appearance-none cursor-pointer"
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
                className="w-full h-11 sm:h-12 pl-9 pr-9 rounded-xl border border-slate-200/90 bg-white text-xs sm:text-sm font-bold text-[#082B4C] focus:border-[#B83A16] focus:ring-2 focus:ring-[#B83A16]/15 outline-none transition-all shadow-2xs appearance-none cursor-pointer"
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
                className="w-full h-11 sm:h-12 pl-9 pr-9 rounded-xl border border-slate-200/90 bg-white text-xs sm:text-sm font-bold text-[#082B4C] focus:border-[#B83A16] focus:ring-2 focus:ring-[#B83A16]/15 outline-none transition-all shadow-2xs appearance-none cursor-pointer"
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

        {/* 3. Button matching user image exact style */}
        <div className="flex justify-center pt-1">
          <button
            type="submit"
            className="w-full sm:w-auto min-w-[280px] inline-flex items-center justify-center gap-2.5 rounded-[30px] bg-[#B83A16] px-8 py-3.5 text-sm sm:text-base font-bold text-white shadow-md transition-all duration-200 hover:bg-[#A33112] hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
          >
            <Calculator className="size-4.5" />
            <span>Calculate Now →</span>
          </button>
        </div>
      </form>

      {/* 4. Instant Solar Calculation Result Card */}
      {showResult && (
        <div className="mt-8 pt-6 border-t border-slate-100 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-50/50 via-white to-orange-50/40 p-4 sm:p-6 shadow-xs">
            {/* Top Recommended Banner */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-amber-200/60">
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

              {/* Direct Actions */}
              <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                <a
                  href={`https://wa.me/${COMPANY.phone.replace(/[^0-9]/g, "")}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 rounded-[30px] bg-[#25D366] px-4 py-2 text-xs font-bold text-white hover:bg-[#20bd5a] transition-colors shadow-2xs whitespace-nowrap"
                >
                  <PhoneCall className="size-3.5" />
                  <span>WhatsApp Quote</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById("enquiry-form-card");
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth" });
                    }
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
                  }}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 rounded-[30px] bg-[#B83A16] px-4 py-2 text-xs font-bold text-white hover:bg-[#A33112] transition-colors shadow-2xs whitespace-nowrap cursor-pointer"
                >
                  <CheckCircle2 className="size-3.5" />
                  <span>Apply This Plan</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

