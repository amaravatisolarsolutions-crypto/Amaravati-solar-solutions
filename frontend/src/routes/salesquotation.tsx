// Hidden sales page: /salesquotation (not linked anywhere on the website, not indexed by search engines).
// Sales staff create quotations here; they are saved to the database and appear in Admin → Quotations.
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle2, Download, Plus } from "lucide-react";
import logo from "@/assets/logo.png";
import {
  QuotationModal,
  openPendingPdfWindow,
  openQuotationPdf,
  saveQuotationToServer,
  type AdminQuotation,
} from "@/components/quotation/QuotationForm";

export const Route = createFileRoute("/salesquotation")({
  head: () => ({
    meta: [
      { title: "Sales Quotation — Amaravati Solar Solutions" },
      { name: "robots", content: "noindex, nofollow, noarchive" },
    ],
  }),
  component: SalesQuotationPage,
});

function SalesQuotationPage() {
  const [existingNos, setExistingNos] = useState<string[]>([]);
  const [formKey, setFormKey] = useState(0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState<AdminQuotation | null>(null);

  // Load today's numbers so the form shows the right next number (the server confirms it on save)
  const loadNumbers = () => {
    fetch("/api/quotations")
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        if (json?.success && Array.isArray(json.data)) {
          setExistingNos(json.data.map((q: { quotation_no?: string }) => q.quotation_no || ""));
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    loadNumbers();
  }, []);

  const handleSave = async (data: Omit<AdminQuotation, "id"> & { id?: string | undefined }) => {
    if (saving) return;
    setSaving(true);
    setError(null);
    const newQuot: AdminQuotation = { ...data, id: `quot-${Date.now()}` };
    const pdfWindow = openPendingPdfWindow(); // opened inside the click so it is not popup-blocked
    const { ok, quotation } = await saveQuotationToServer(newQuot);
    setSaving(false);

    if (!ok) {
      try {
        pdfWindow?.close();
      } catch {}
      // The form stays filled in so they can try again
      setError("Could not save the quotation. Please check your internet connection and try again.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    openQuotationPdf(quotation, pdfWindow);
    setSaved(quotation);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const startNew = () => {
    setSaved(null);
    setError(null);
    setFormKey((k) => k + 1);
    loadNumbers();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="admin-portal min-h-screen bg-[#f8fafc] text-[#344054] text-left" data-admin="true">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto h-16 px-3 sm:px-6 flex items-center gap-3">
          <img src={logo} alt="Amaravati Solar Solutions" className="h-8 sm:h-9 w-auto object-contain" />
          <span className="h-6 w-px bg-slate-200" />
          <span className="text-sm font-semibold text-slate-700">Sales Quotation</span>
        </div>
        <div className="h-1 bg-[#E8590C]" />
      </header>

      <div className="max-w-4xl mx-auto px-3 sm:px-6 py-5 sm:py-8">
        {saved ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 text-center shadow-sm">
            <div className="mx-auto grid size-14 place-items-center rounded-full bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="size-8" />
            </div>
            <h1 className="mt-4 text-xl sm:text-2xl font-black text-[#082B4C]">Quotation created &amp; saved</h1>
            <p className="mt-2 text-sm text-slate-600 text-center max-w-xl mx-auto">
              Quotation <strong className="text-[#B83A16]">{saved.quotationNo}</strong> for{" "}
              <strong className="text-slate-800">{saved.customerName}</strong> has been saved. The PDF opened in a new
              tab — use <em>Save as PDF</em> to download it.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5">
              <button
                type="button"
                onClick={() => openQuotationPdf(saved)}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-[#082B4C] bg-white text-[#082B4C] text-sm font-bold hover:bg-slate-50 cursor-pointer"
              >
                <Download className="size-4" />
                <span>Download PDF again</span>
              </button>
              <button
                type="button"
                onClick={startNew}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#B83A16] hover:bg-[#9a3012] text-white text-sm font-bold cursor-pointer"
              >
                <Plus className="size-4" />
                <span>Create another quotation</span>
              </button>
            </div>
          </div>
        ) : (
          <>
            {error && (
              <div role="alert" className="mb-4 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                <AlertCircle className="size-4 mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}
            <QuotationModal
              key={formKey}
              variant="page"
              saving={saving}
              existingQuotationNos={existingNos}
              onSave={handleSave}
              onClose={() => {
                // "Clear Form": start fresh
                setError(null);
                setFormKey((k) => k + 1);
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}
