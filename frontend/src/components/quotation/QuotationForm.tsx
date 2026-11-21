// Shared quotation form + helpers used by the Admin panel and the public website footer.
import { useEffect, useState, type FormEvent } from "react";
import { Check, FileText, X } from "lucide-react";
import logo from "@/assets/logo.png";
import { buildQuotationPrintHtml } from "@/lib/quotationPrint";

export type AdminQuotationItem = {
  id: string;
  description: string;
  specification: string;
  qty: number;
  unitPrice: number;
  amount: number;
};

// Solar module types and kW-per-module factor used for Project Size
export const MODULE_TYPES = [
  { label: "545Wp-Monoperc", kw: 0.54 },
  { label: "575Wp-Monoperc", kw: 0.57 },
  { label: "610Wp-Topcon", kw: 0.61 },
  { label: "625Wp-Topcon", kw: 0.62 },
] as const;
export type ModuleType = (typeof MODULE_TYPES)[number]["label"];

export type AdminQuotation = {
  id: string;
  quotationNo: string;
  date: string;
  validUpto: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  systemCapacity: string;
  items: AdminQuotationItem[];
  subtotal: number;
  gstAmount: number;
  totalAmount: number;
  terms: string[];
  status: "Pending" | "Sent" | "Approved";

  // Site Details
  housingType: "Independent" | "Apartment" | "Commercial";
  subsidyType: "Non- Subsidy" | "Subsidy National DBT";
  noOfFloors: string;
  sanctionedPhase: "Single Phase" | "Three Phase";
  sanctionedLoad: string;
  cluster: string;
  discom: string;

  // Structure Details
  roofType: "Manglore tiles" | "Tin shed" | "RCC";
  structureType: "Pre fab - 4ft" | "Pre fab - 6ft" | "Pre fab - 8ft";
  noOfModules: number | string;
  moduleType?: string;
  projectSize?: string;
  overhangPossibility: "Yes" | "No";
  overhangSide?: "North" | "South" | "East" | "West" | "";
  amc: "Included" | "Not Included";

  // Bill Corrections
  loadChange: "Yes" | "No";
  phaseChange: "Yes" | "No";
  nameChange: "Yes" | "No";

  // Payment Summary
  paymentMode: "Direct" | "EMI";
  totalPrice: number;
  discount: number;
  finalPrice: number;
  subsidyAmount: number;
  fromHand: number;
  salesPerson?: string;
};

// Opens the professional A4 quotation in a new tab (Print / Save as PDF)
export function openQuotationPdf(quotation: AdminQuotation, existingWindow?: Window | null) {
  const w = existingWindow && !existingWindow.closed ? existingWindow : window.open("", "_blank");
  if (!w) return false;
  w.document.open();
  w.document.write(buildQuotationPrintHtml(quotation, new URL(logo, window.location.origin).href));
  w.document.close();
  return true;
}

// Quotation number: ASS/YYYY/MMDD/NNN — sequence restarts at 001 every day (server confirms the final number)
export function getNextQuotationNo(existingNos: string[], now: Date = new Date()) {
  const prefix = `ASS/${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}/`;
  let max = 0;
  for (const no of existingNos) {
    if (!no || !no.startsWith(prefix)) continue;
    const suffix = no.slice(prefix.length);
    if (/^\d+$/.test(suffix)) max = Math.max(max, Number(suffix));
  }
  return `${prefix}${String(max + 1).padStart(3, "0")}`;
}

/** Saves a quotation to the database. The server assigns the final quotation number. */
export async function saveQuotationToServer(q: AdminQuotation): Promise<{ ok: boolean; quotation: AdminQuotation }> {
  try {
    const res = await fetch("/api/quotations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(q),
    });
    const json = await res.json().catch(() => null);
    if (res.ok && json?.success) {
      const serverNo: string | undefined = json.quotation_no;
      return { ok: true, quotation: serverNo ? { ...q, quotationNo: serverNo } : q };
    }
    return { ok: false, quotation: q };
  } catch {
    return { ok: false, quotation: q };
  }
}

/** Opens a blank tab immediately (inside the click, so it is not popup-blocked) with a loading note. */
export function openPendingPdfWindow() {
  const w = window.open("", "_blank");
  try {
    w?.document.write(
      '<p style="font-family:Segoe UI,Arial,sans-serif;padding:40px;color:#555">Preparing quotation&hellip;</p>'
    );
  } catch {}
  return w;
}

// Modal Component for Creating an Official Quotation
export function QuotationModal({
  onClose,
  onSave,
  existingQuotationNos,
  variant = "modal",
  saving = false,
}: {
  onClose: () => void;
  onSave: (data: Omit<AdminQuotation, "id"> & { id?: string | undefined }) => void;
  existingQuotationNos: string[];
  /** "modal" = popup over the page (admin); "page" = form shown directly on a page (/salesquotation) */
  variant?: "modal" | "page";
  /** disables the submit button while the quotation is being saved */
  saving?: boolean;
}) {
  const isPage = variant === "page";
  // Auto-generated, e.g. ASS/2026/1121/001 (updates live if the list refreshes while the form is open)
  const quotationNo = getNextQuotationNo(existingQuotationNos);
  const [customerName, setCustomerName] = useState("");
  // Who prepared this quotation (shown only to admin in the quotations table)
  const [salesPerson, setSalesPerson] = useState("");
  const [salesTouched, setSalesTouched] = useState(false);
  const salesPersonValid = /^[A-Za-z][A-Za-z .']{1,}$/.test(salesPerson.trim());
  const [customerPhone, setCustomerPhone] = useState("+91 ");
  const [customerAddress, setCustomerAddress] = useState("");

  // Format today's date & valid upto (15 days from now)
  const todayStr = new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(new Date());
  // Local YYYY-MM-DD (for the native date picker)
  const toIsoLocal = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const todayIso = toIsoLocal(new Date());
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 15);

  const [date] = useState(todayStr);
  const [validUptoIso, setValidUptoIso] = useState(() => toIsoLocal(futureDate));
  // Display format saved & printed on the quotation, e.g. "06 Dec 2026"
  const validUpto = (() => {
    const [y, m, d] = validUptoIso.split("-").map(Number);
    if (!y || !m || !d) return "";
    return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(y, m - 1, d));
  })();

  // 1. Site Details
  const [housingType, setHousingType] = useState<"Independent" | "Apartment" | "Commercial">("Independent");
  const [subsidyType, setSubsidyType] = useState<"Non- Subsidy" | "Subsidy National DBT">("Subsidy National DBT");
  const [noOfFloors, setNoOfFloors] = useState<string>("G+1");
  const [customFloors, setCustomFloors] = useState<string>("");
  const [sanctionedPhase, setSanctionedPhase] = useState<"Single Phase" | "Three Phase">("Single Phase");
  const [sanctionedLoad, setSanctionedLoad] = useState<string>("3 kW");
  const [cluster, setCluster] = useState<string>("Vijayawada Urban");
  const [discom, setDiscom] = useState<string>("APCPDCL");

  // 2. Structure Details
  const [roofType, setRoofType] = useState<"Manglore tiles" | "Tin shed" | "RCC">("RCC");
  const [structureType, setStructureType] = useState<"Pre fab - 4ft" | "Pre fab - 6ft" | "Pre fab - 8ft">("Pre fab - 6ft");
  const [noOfModules, setNoOfModules] = useState<number | string>(6);
  const [overhangPossibility, setOverhangPossibility] = useState<"Yes" | "No">("No");
  const [overhangSide, setOverhangSide] = useState<"North" | "South" | "East" | "West" | "">("");
  const [amc, setAmc] = useState<"Included" | "Not Included">("Included");

  // Module type → kW per module; Project Size = modules × factor
  const [moduleType, setModuleType] = useState<ModuleType>("610Wp-Topcon");
  const moduleFactor = MODULE_TYPES.find((m) => m.label === moduleType)?.kw ?? 0.61;
  const projectSizeKw = Number(((Number(noOfModules) || 0) * moduleFactor).toFixed(2));
  const systemCapacity = `${projectSizeKw} kW On-Grid Rooftop`;

  // 3. Bill Corrections
  const [loadChange, setLoadChange] = useState<"Yes" | "No">("No");
  const [phaseChange, setPhaseChange] = useState<"Yes" | "No">("No");
  const [nameChange, setNameChange] = useState<"Yes" | "No">("No");

  // 4. Payment Summary
  const [paymentMode, setPaymentMode] = useState<"Direct" | "EMI">("Direct");
  // Admin enters these manually (digits only)
  const [totalPrice, setTotalPrice] = useState<string>("");
  const [discount, setDiscount] = useState<string>("");
  const [subsidyAmount, setSubsidyAmount] = useState<string>("");
  const [paymentTouched, setPaymentTouched] = useState(false);
  const onlyDigits = (v: string) => v.replace(/\D/g, "").replace(/^0+(?=\d)/, "").slice(0, 9);

  // Calculated fields
  const totalNum = Number(totalPrice) || 0;
  const discountNum = Number(discount) || 0;
  const subsidyNum = subsidyType === "Non- Subsidy" ? 0 : Number(subsidyAmount) || 0;
  const finalPrice = Math.max(0, totalNum - discountNum);
  const fromHand = Math.max(0, finalPrice - subsidyNum);

  const totalError = totalNum <= 0 ? "Enter the total price" : "";
  const discountError = discountNum > totalNum ? "Discount cannot be more than total price" : "";
  const subsidyError =
    subsidyType === "Subsidy National DBT" && subsidyAmount === ""
      ? "Enter the subsidy amount"
      : subsidyNum > finalPrice
        ? "Subsidy cannot be more than final price"
        : "";
  const paymentValid = !totalError && !discountError && !subsidyError;

  // Scope of supply (bill of materials) printed on the quotation — derived from the form, no per-item prices
  const items: AdminQuotationItem[] = [
    { id: "1", description: "Solar PV Modules", specification: `${moduleType} high-efficiency modules`, qty: Number(noOfModules) || 0, unitPrice: 0, amount: 0 },
    { id: "2", description: "On-Grid Solar Inverter", specification: `${sanctionedPhase}, ${projectSizeKw} kW class with WiFi monitoring`, qty: 1, unitPrice: 0, amount: 0 },
    { id: "3", description: "Module Mounting Structure", specification: `${structureType} GI elevated structure for ${roofType} roof`, qty: 1, unitPrice: 0, amount: 0 },
    { id: "4", description: "ACDB / DCDB, Cabling & Earthing", specification: "SPD, MCBs, DC/AC cables, earthing kit & lightning arrestor", qty: 1, unitPrice: 0, amount: 0 },
    { id: "5", description: "Installation, Net-metering & Commissioning", specification: `${discom} liaison, net-meter & subsidy portal assistance`, qty: 1, unitPrice: 0, amount: 0 },
  ];

  const handleSubsidyTypeSelect = (type: "Non- Subsidy" | "Subsidy National DBT") => {
    setSubsidyType(type);
    if (type === "Non- Subsidy") setSubsidyAmount("");
  };

  const phoneDigits = customerPhone.replace(/^\+91\s*/, "").replace(/\D/g, "");
  const phoneValid = /^[6-9]\d{9}$/.test(phoneDigits);
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [nameTouched, setNameTouched] = useState(false);
  const nameValid = /^[A-Za-z][A-Za-z .']{1,}$/.test(customerName.trim());

  const handlePhoneChange = (val: string) => {
    // Allow only digits after the fixed +91 prefix, max 10 digits
    const digits = val.replace(/^\+91\s*/, "").replace(/\D/g, "").slice(0, 10);
    const formatted = digits.length > 5 ? `${digits.slice(0, 5)} ${digits.slice(5)}` : digits;
    setCustomerPhone(`+91 ${formatted}`);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setPhoneTouched(true);
    setNameTouched(true);
    setPaymentTouched(true);
    setSalesTouched(true);
    if (!nameValid || !phoneValid || !validUpto || !paymentValid || !salesPersonValid) return;

    const resolvedFloors = noOfFloors === "Other" ? (customFloors.trim() || "Ground") : noOfFloors;

    onSave({
      quotationNo,
      date,
      validUpto,
      customerName,
      customerPhone,
      customerAddress: customerAddress || "Vijayawada, Andhra Pradesh",
      systemCapacity,
      items,
      subtotal: finalPrice,
      gstAmount: 0,
      totalAmount: finalPrice,
      terms: [
        "Price valid for 15 days from issuance date.",
        "Includes complete system supply, structure fabrication, installation, and commissioning.",
        `Comprehensive AMC: ${amc === "Included" ? "5 years included" : "Available on request"}.`,
        "Complete assistance with DISCOM net-metering approvals and National DBT subsidy portal.",
        "Payment Mode: Direct or EMI.",
      ],
      status: "Pending",

      // Site Details
      housingType,
      subsidyType,
      noOfFloors: resolvedFloors,
      sanctionedPhase,
      sanctionedLoad,
      cluster,
      discom,

      // Structure Details
      roofType,
      structureType,
      noOfModules,
      moduleType,
      projectSize: `${projectSizeKw} kW`,
      overhangPossibility,
      overhangSide: overhangPossibility === "Yes" ? overhangSide : "",
      amc,

      // Bill Corrections
      loadChange,
      phaseChange,
      nameChange,

      // Payment Summary
      paymentMode,
      totalPrice: totalNum,
      discount: discountNum,
      finalPrice,
      subsidyAmount: subsidyNum,
      fromHand,
      salesPerson: salesPerson.trim(),
    });
  };

  return (
    <div
      className={
        isPage
          ? "admin-portal text-[#344054] text-xs sm:text-sm text-left"
          : "admin-portal fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-xs p-2 sm:p-4 md:p-6 overflow-y-auto text-[#344054] text-xs sm:text-sm text-left"
      }
      data-admin="true"
    >
      <div
        className={
          isPage
            ? "relative w-full max-w-4xl mx-auto rounded-2xl bg-white p-3.5 sm:p-6 md:p-7 shadow-sm border border-slate-200"
            : "relative w-full max-w-4xl rounded-2xl bg-white p-3.5 sm:p-6 md:p-7 shadow-2xl my-4 sm:my-6 max-h-[94vh] overflow-y-auto border border-slate-200"
        }
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="grid size-8 sm:size-9 place-items-center rounded-xl bg-[#082B4C] text-[#F5A623] shadow-xs shrink-0">
              <FileText className="size-4 sm:size-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-xl font-black text-[#082B4C] uppercase tracking-tight">Create Quotation</h2>
              <p className="text-[11px] sm:text-xs text-slate-500 line-clamp-1 sm:line-clamp-none">Enter site survey details, structure specifications, bill corrections, and payment summary</p>
            </div>
          </div>
          {!isPage && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close form"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer transition-colors shrink-0"
            >
              <X className="size-5" />
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-6 text-xs font-semibold">
          {/* Header Row: Quotation Meta */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 bg-slate-50/80 rounded-xl border border-slate-200">
            <div>
              <label className="block text-slate-600 mb-1 font-bold">Quotation No</label>
              <input
                type="text"
                readOnly
                tabIndex={-1}
                value={quotationNo}
                title="Auto-generated: ASS / Year / MonthDay / Number of the day"
                className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-[#B83A16] bg-orange-50/60 font-mono font-bold cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-slate-600 mb-1 font-bold">Quotation Date</label>
              <input
                type="text"
                disabled
                value={date}
                className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-slate-500 bg-slate-100"
              />
            </div>
            <div>
              <label className="block text-slate-600 mb-1 font-bold">Valid Upto</label>
              <input
                type="date"
                required
                min={todayIso}
                value={validUptoIso}
                onChange={(e) => setValidUptoIso(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key !== "Tab") e.preventDefault();
                }}
                onClick={(e) => (e.currentTarget as HTMLInputElement).showPicker?.()}
                className="w-full rounded-lg border border-slate-300 px-3 py-1.5 text-slate-800 bg-white cursor-pointer"
              />
            </div>
          </div>

          {/* Customer & Basic Information */}
          <div className="rounded-xl border border-slate-200 p-4 bg-white shadow-2xs space-y-3.5">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#082B4C] flex items-center gap-1.5">
              <span>Customer & System Overview</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-slate-700 mb-1 font-bold">Customer Full Name *</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value.replace(/[^A-Za-z .']/g, ""))}
                  onBlur={() => setNameTouched(true)}
                  maxLength={60}
                  placeholder="e.g. K. Satyanarayana"
                  className={`w-full rounded-xl border px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#082B4C]/20 ${nameTouched && !nameValid ? "border-red-500" : "border-slate-300"}`}
                />
                {nameTouched && !nameValid && (
                  <p className="mt-1 text-[11px] font-semibold text-red-600">Enter a valid name (letters only, min 2 characters)</p>
                )}
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Contact Phone Number *</label>
                <input
                  type="tel"
                  inputMode="numeric"
                  required
                  value={customerPhone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  onBlur={() => setPhoneTouched(true)}
                  placeholder="+91 98480 33445"
                  className={`w-full rounded-xl border px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#082B4C]/20 ${phoneTouched && !phoneValid ? "border-red-500" : "border-slate-300"}`}
                />
                {phoneTouched && !phoneValid && (
                  <p className="mt-1 text-[11px] font-semibold text-red-600">Enter a valid 10-digit mobile number starting with 6-9</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3.5">
              <div>
                <label className="block text-slate-700 mb-1 font-bold">Site / Installation Address</label>
                <input
                  type="text"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  placeholder="e.g. Ring Road, Vijayawada, Andhra Pradesh - 520010"
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#082B4C]/20"
                />
              </div>
            </div>
          </div>

          {/* 1. SITE DETAILS */}
          <div className="rounded-xl border border-slate-200 p-4 bg-white shadow-2xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
              <div className="size-6 rounded-lg bg-sky-100 text-sky-800 grid place-items-center font-bold text-xs">1</div>
              <h3 className="text-xs font-black uppercase tracking-wider text-[#082B4C]">Site Details</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              {/* Housing Type */}
              <div>
                <label className="block text-slate-700 mb-1.5 font-bold">Housing Type</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 sm:gap-2">
                  {(["Independent", "Apartment", "Commercial"] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setHousingType(type)}
                      className={`py-2 px-2.5 rounded-xl border text-center font-bold text-xs transition-all cursor-pointer ${
                        housingType === type
                          ? "bg-[#082B4C] text-white border-[#082B4C] shadow-xs"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subsidy Type */}
              <div>
                <label className="block text-slate-700 mb-1.5 font-bold">Subsidy Type</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                  {(["Non- Subsidy", "Subsidy National DBT"] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => handleSubsidyTypeSelect(type)}
                      className={`py-2 px-2 rounded-xl border text-center font-bold text-xs transition-all cursor-pointer ${
                        subsidyType === type
                          ? "bg-[#B83A16] text-white border-[#B83A16] shadow-xs"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* No of Floors */}
              <div>
                <label className="block text-slate-700 mb-1.5 font-bold">No of Floors</label>
                <div className="flex gap-1.5">
                  <select
                    value={noOfFloors}
                    onChange={(e) => setNoOfFloors(e.target.value)}
                    className="flex-1 rounded-xl border border-slate-300 px-3 py-2 text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#082B4C]/20"
                  >
                    <option value="Ground">Ground</option>
                    <option value="G+1">G+1</option>
                    <option value="G+2">G+2</option>
                    <option value="G+3">G+3</option>
                    <option value="G+4">G+4</option>
                    <option value="Other">Other (Custom)</option>
                  </select>
                  {noOfFloors === "Other" && (
                    <input
                      type="text"
                      placeholder="e.g. G+5"
                      value={customFloors}
                      onChange={(e) => setCustomFloors(e.target.value)}
                      className="w-24 rounded-xl border border-slate-300 px-2 py-2 text-slate-800 bg-white"
                    />
                  )}
                </div>
              </div>

              {/* Sanctioned Phase */}
              <div>
                <label className="block text-slate-700 mb-1.5 font-bold">Sanctioned Phase</label>
                <div className="grid grid-cols-2 gap-2">
                  {(["Single Phase", "Three Phase"] as const).map((ph) => (
                    <button
                      key={ph}
                      type="button"
                      onClick={() => setSanctionedPhase(ph)}
                      className={`py-2 px-1.5 rounded-xl border text-center font-bold text-xs transition-all cursor-pointer ${
                        sanctionedPhase === ph
                          ? "bg-[#082B4C] text-white border-[#082B4C]"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {ph}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sanctioned Load */}
              <div>
                <label className="block text-slate-700 mb-1.5 font-bold">Sanctioned Load</label>
                <input
                  type="text"
                  value={sanctionedLoad}
                  onChange={(e) => setSanctionedLoad(e.target.value)}
                  placeholder="e.g. 3 kW / 5 kW"
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#082B4C]/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Cluster */}
              <div>
                <label className="block text-slate-700 mb-1.5 font-bold">Cluster</label>
                <input
                  type="text"
                  value={cluster}
                  onChange={(e) => setCluster(e.target.value)}
                  placeholder="e.g. Vijayawada Urban / Cluster 1"
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#082B4C]/20"
                />
              </div>

              {/* DISCOM */}
              <div>
                <label className="block text-slate-700 mb-1.5 font-bold">DISCOM</label>
                <input
                  type="text"
                  value={discom}
                  onChange={(e) => setDiscom(e.target.value)}
                  placeholder="e.g. APCPDCL / APEPDCL / APSPDCL"
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#082B4C]/20"
                />
              </div>
            </div>
          </div>

          {/* 2. STRUCTURE DETAILS */}
          <div className="rounded-xl border border-slate-200 p-4 bg-white shadow-2xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
              <div className="size-6 rounded-lg bg-amber-100 text-amber-800 grid place-items-center font-bold text-xs">2</div>
              <h3 className="text-xs font-black uppercase tracking-wider text-[#082B4C]">Structure Details</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              {/* Roof Type */}
              <div>
                <label className="block text-slate-700 mb-1.5 font-bold">Roof Type</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 sm:gap-2">
                  {(["Manglore tiles", "Tin shed", "RCC"] as const).map((roof) => (
                    <button
                      key={roof}
                      type="button"
                      onClick={() => setRoofType(roof)}
                      className={`py-2 px-1.5 rounded-xl border text-center font-bold text-xs transition-all cursor-pointer ${
                        roofType === roof
                          ? "bg-[#082B4C] text-white border-[#082B4C]"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {roof}
                    </button>
                  ))}
                </div>
              </div>

              {/* Structure Type */}
              <div>
                <label className="block text-slate-700 mb-1.5 font-bold">Structure Type</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 sm:gap-2">
                  {(["Pre fab - 4ft", "Pre fab - 6ft", "Pre fab - 8ft"] as const).map((struct) => (
                    <button
                      key={struct}
                      type="button"
                      onClick={() => setStructureType(struct)}
                      className={`py-2 px-1.5 rounded-xl border text-center font-bold text-xs transition-all cursor-pointer ${
                        structureType === struct
                          ? "bg-[#082B4C] text-white border-[#082B4C]"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {struct}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Module Type */}
              <div>
                <label className="block text-slate-700 mb-1.5 font-bold">Module Type</label>
                <select
                  value={moduleType}
                  onChange={(e) => setModuleType(e.target.value as ModuleType)}
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#082B4C]/20 cursor-pointer"
                >
                  {MODULE_TYPES.map((m) => (
                    <option key={m.label} value={m.label}>
                      {m.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* No of Modules */}
              <div>
                <label className="block text-slate-700 mb-1.5 font-bold">No of Modules</label>
                <input
                  type="number"
                  min={1}
                  step={1}
                  value={noOfModules}
                  onChange={(e) => setNoOfModules(e.target.value.replace(/\D/g, ""))}
                  placeholder="e.g. 6 / 8 / 10"
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#082B4C]/20"
                />
              </div>

              {/* Project Size (auto-calculated) */}
              <div>
                <label className="block text-slate-700 mb-1.5 font-bold">
                  Project Size <span className="text-slate-400 font-normal">(auto)</span>
                </label>
                <input
                  type="text"
                  readOnly
                  tabIndex={-1}
                  value={`${projectSizeKw} kW`}
                  className="w-full rounded-xl border border-orange-200 bg-orange-50 px-3.5 py-2 font-extrabold text-[#B83A16] cursor-not-allowed"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* Overhang Possibility */}
              <div>
                <label className="block text-slate-700 mb-1.5 font-bold">Overhang Possibility</label>
                <div className="grid grid-cols-2 gap-2">
                  {(["Yes", "No"] as const).map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => {
                        setOverhangPossibility(val);
                        if (val === "Yes" && !overhangSide) setOverhangSide("South");
                      }}
                      className={`py-2 px-2 rounded-xl border text-center font-bold text-xs transition-all cursor-pointer ${
                        overhangPossibility === val
                          ? val === "Yes" ? "bg-emerald-600 text-white border-emerald-600" : "bg-slate-700 text-white border-slate-700"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>

              {/* Overhang Side (Conditional) */}
              <div>
                <label className="block text-slate-700 mb-1.5 font-bold">
                  Which Side? {overhangPossibility === "No" && <span className="text-slate-400 font-normal">(N/A)</span>}
                </label>
                <select
                  disabled={overhangPossibility === "No"}
                  value={overhangSide}
                  onChange={(e) => setOverhangSide(e.target.value as "North" | "South" | "East" | "West")}
                  className={`w-full rounded-xl border border-slate-300 px-3.5 py-2 text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#082B4C]/20 ${
                    overhangPossibility === "No" ? "opacity-50 cursor-not-allowed bg-slate-100" : ""
                  }`}
                >
                  <option value="">Select Side</option>
                  <option value="North">North</option>
                  <option value="South">South</option>
                  <option value="East">East</option>
                  <option value="West">West</option>
                </select>
              </div>
            </div>

            {/* AMC */}
            <div>
              <label className="block text-slate-700 mb-1.5 font-bold">AMC (Annual Maintenance Contract)</label>
              <div className="grid grid-cols-2 max-w-xs gap-2">
                {(["Included", "Not Included"] as const).map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setAmc(val)}
                    className={`py-2 px-2.5 rounded-xl border text-center font-bold text-xs transition-all cursor-pointer ${
                      amc === val
                        ? val === "Included" ? "bg-emerald-600 text-white border-emerald-600 shadow-xs" : "bg-slate-700 text-white border-slate-700 shadow-xs"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 3. BILL CORRECTIONS */}
          <div className="rounded-xl border border-slate-200 p-4 bg-white shadow-2xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
              <div className="size-6 rounded-lg bg-purple-100 text-purple-800 grid place-items-center font-bold text-xs">3</div>
              <h3 className="text-xs font-black uppercase tracking-wider text-[#082B4C]">Bill Corrections</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Load Change */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="block text-slate-700 font-bold mb-2">Load Change</span>
                <div className="grid grid-cols-2 gap-2">
                  {(["Yes", "No"] as const).map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setLoadChange(val)}
                      className={`py-1.5 px-2 rounded-lg border text-center font-bold text-xs transition-all cursor-pointer ${
                        loadChange === val
                          ? val === "Yes" ? "bg-[#B83A16] text-white border-[#B83A16]" : "bg-slate-700 text-white border-slate-700"
                          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>

              {/* Phase Change */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="block text-slate-700 font-bold mb-2">Phase Change</span>
                <div className="grid grid-cols-2 gap-2">
                  {(["Yes", "No"] as const).map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setPhaseChange(val)}
                      className={`py-1.5 px-2 rounded-lg border text-center font-bold text-xs transition-all cursor-pointer ${
                        phaseChange === val
                          ? val === "Yes" ? "bg-[#B83A16] text-white border-[#B83A16]" : "bg-slate-700 text-white border-slate-700"
                          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name Change */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="block text-slate-700 font-bold mb-2">Name Change</span>
                <div className="grid grid-cols-2 gap-2">
                  {(["Yes", "No"] as const).map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setNameChange(val)}
                      className={`py-1.5 px-2 rounded-lg border text-center font-bold text-xs transition-all cursor-pointer ${
                        nameChange === val
                          ? val === "Yes" ? "bg-[#B83A16] text-white border-[#B83A16]" : "bg-slate-700 text-white border-slate-700"
                          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 4. PAYMENT SUMMARY */}
          <div className="rounded-xl border border-slate-200 p-4 bg-white shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2">
                <div className="size-6 rounded-lg bg-emerald-100 text-emerald-800 grid place-items-center font-bold text-xs">4</div>
                <h3 className="text-xs font-black uppercase tracking-wider text-[#082B4C]">Payment Summary</h3>
              </div>

              {/* Mode of Payment Pills */}
              <div className="flex items-center gap-2">
                <span className="text-slate-500 text-[11px] font-bold">Mode:</span>
                {(["Direct", "EMI"] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setPaymentMode(mode)}
                    className={`py-1 px-3 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                      paymentMode === mode
                        ? "bg-[#082B4C] text-white border-[#082B4C] shadow-xs"
                        : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Breakdown Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div>
                <label className="block text-slate-700 mb-1 font-bold">Total Price (₹) *</label>
                <input
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  value={totalPrice}
                  onChange={(e) => setTotalPrice(onlyDigits(e.target.value))}
                  onBlur={() => setPaymentTouched(true)}
                  placeholder="Enter total price"
                  className={`w-full rounded-xl border px-3.5 py-2 text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-[#082B4C]/20 ${paymentTouched && totalError ? "border-red-500" : "border-slate-300"}`}
                />
                {paymentTouched && totalError && <p className="mt-1 text-[11px] font-semibold text-red-600">{totalError}</p>}
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Discount (₹)</label>
                <input
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  value={discount}
                  onChange={(e) => setDiscount(onlyDigits(e.target.value))}
                  onBlur={() => setPaymentTouched(true)}
                  placeholder="0"
                  className={`w-full rounded-xl border px-3.5 py-2 text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-[#082B4C]/20 ${paymentTouched && discountError ? "border-red-500" : "border-slate-300"}`}
                />
                {paymentTouched && discountError && <p className="mt-1 text-[11px] font-semibold text-red-600">{discountError}</p>}
              </div>

              <div className="rounded-xl bg-slate-50 border border-slate-200 p-2.5 flex flex-col justify-center">
                <span className="text-[11px] font-bold text-slate-500 uppercase">Final Price (Total - Discount)</span>
                <span className="text-lg font-black text-[#082B4C]">₹{finalPrice.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              <div>
                <label className="block text-slate-700 mb-1 font-bold">
                  Subsidy Amount (₹) {subsidyType === "Subsidy National DBT" ? "*" : <span className="text-slate-400 font-normal">(Non-Subsidy)</span>}
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  disabled={subsidyType === "Non- Subsidy"}
                  value={subsidyType === "Non- Subsidy" ? "0" : subsidyAmount}
                  onChange={(e) => setSubsidyAmount(onlyDigits(e.target.value))}
                  onBlur={() => setPaymentTouched(true)}
                  placeholder="Enter subsidy amount"
                  className={`w-full rounded-xl border px-3.5 py-2 text-emerald-700 font-bold focus:outline-none focus:ring-2 focus:ring-[#082B4C]/20 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed ${paymentTouched && subsidyError ? "border-red-500" : "border-slate-300"}`}
                />
                {paymentTouched && subsidyError && <p className="mt-1 text-[11px] font-semibold text-red-600">{subsidyError}</p>}
              </div>

              {/* From the Hand Highlight Box */}
              <div className="rounded-xl bg-[#082B4C] text-white p-3.5 flex items-center justify-between shadow-xs">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#F5A623] block">
                    FROM THE HAND (NET PAYABLE)
                  </span>
                  <p className="text-[11px] text-slate-300 mt-0.5">Final Price minus DBT Subsidy</p>
                </div>
                <div className="text-right">
                  <span className="text-xl sm:text-2xl font-black text-white">
                    ₹{fromHand.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Prepared By (Sales Person) */}
          <div className="rounded-xl border border-orange-200 bg-orange-50/50 p-4">
            <label className="block text-slate-700 mb-1 font-bold">Sales Person Name *</label>
            <input
              type="text"
              value={salesPerson}
              onChange={(e) => setSalesPerson(e.target.value.replace(/[^A-Za-z .']/g, ""))}
              onBlur={() => setSalesTouched(true)}
              maxLength={60}
              placeholder="Enter your name (who is preparing this quotation)"
              className={`w-full sm:max-w-md rounded-xl border bg-white px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#082B4C]/20 ${salesTouched && !salesPersonValid ? "border-red-500" : "border-slate-300"}`}
            />
            {salesTouched && !salesPersonValid && (
              <p className="mt-1 text-[11px] font-semibold text-red-600">Enter the sales person name (letters only)</p>
            )}
          </div>

          {/* Form Submit Footer (Responsive Stacking for Mobile) */}
          <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 sm:gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer text-center"
            >
              {isPage ? "Clear Form" : "Cancel"}
            </button>
            <button
              type="submit"
              disabled={saving}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#B83A16] hover:bg-[#9a3012] text-white font-extrabold transition-all shadow-md active:scale-95 cursor-pointer uppercase tracking-wider text-center disabled:opacity-60 disabled:cursor-wait"
            >
              <Check className="size-4 stroke-[3]" />
              <span>{saving ? "Saving…" : "Create Quotation"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
