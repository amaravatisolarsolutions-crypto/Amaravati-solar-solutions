// "Quotation" button for the website footer — opens the same quotation form as the admin panel.
// The quotation is saved to the database (visible in Admin → Quotations) and the A4 PDF opens for download.
import { useState } from "react";
import { CheckCircle2, FileText, X } from "lucide-react";
import {
  QuotationModal,
  openPendingPdfWindow,
  openQuotationPdf,
  saveQuotationToServer,
  type AdminQuotation,
} from "@/components/quotation/QuotationForm";

export function FooterQuotationButton() {
  const [open, setOpen] = useState(false);
  const [existingNos, setExistingNos] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<{ ok: boolean; text: string } | null>(null);

  const openForm = () => {
    setNotice(null);
    setOpen(true);
    // Load today's numbers so the form shows the right next number (the server confirms it on save)
    fetch("/api/quotations")
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        if (json?.success && Array.isArray(json.data)) {
          setExistingNos(json.data.map((q: { quotation_no?: string }) => q.quotation_no || ""));
        }
      })
      .catch(() => {});
  };

  const handleSave = async (data: Omit<AdminQuotation, "id"> & { id?: string | undefined }) => {
    if (saving) return;
    setSaving(true);
    const newQuot: AdminQuotation = { ...data, id: `quot-${Date.now()}` };
    const pdfWindow = openPendingPdfWindow(); // opened inside the click so it is not popup-blocked
    const { ok, quotation } = await saveQuotationToServer(newQuot);
    setSaving(false);

    if (!ok) {
      try {
        pdfWindow?.close();
      } catch {}
      // Keep the form open with everything filled in so they can try again
      setNotice({ ok: false, text: "Could not save the quotation. Please check your internet and try again." });
      return;
    }

    setOpen(false);
    openQuotationPdf(quotation, pdfWindow);
    setNotice({ ok: true, text: `Quotation ${quotation.quotationNo} created and saved.` });
  };

  return (
    <>
      <button
        type="button"
        onClick={openForm}
        data-unstyled
        className="inline-flex items-center gap-1.5 rounded-lg border border-[#E04F16]/60 bg-[#E04F16]/10 px-3 py-1.5 text-xs font-bold text-white hover:bg-[#E04F16] transition-colors cursor-pointer"
      >
        <FileText className="size-3.5" />
        <span>Quotation</span>
      </button>

      {open && (
        <QuotationModal onClose={() => setOpen(false)} onSave={handleSave} existingQuotationNos={existingNos} />
      )}

      {notice && (
        <div
          role="status"
          className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-[110] flex items-center gap-2.5 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold shadow-xl ${
            notice.ok ? "bg-[#082B4C] text-white" : "bg-red-600 text-white"
          }`}
        >
          {notice.ok ? <CheckCircle2 className="size-4 text-emerald-400 shrink-0" /> : null}
          <span>{notice.text}</span>
          <button
            type="button"
            data-unstyled
            aria-label="Close message"
            onClick={() => setNotice(null)}
            className="ml-1 p-0.5 rounded text-white/70 hover:text-white cursor-pointer"
          >
            <X className="size-4" />
          </button>
        </div>
      )}
    </>
  );
}
