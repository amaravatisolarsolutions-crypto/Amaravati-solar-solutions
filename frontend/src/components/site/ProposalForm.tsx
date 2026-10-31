import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { submitProposal } from "@/lib/forms.functions";
import { proposalSchema } from "@/lib/validation";

const SCOPES = [
  "Solar EPC Solutions",
  "On-Grid Solar Systems",
  "Off-Grid Solar Systems",
  "Hybrid Solar Systems",
  "Commercial & Industrial Rooftop",
  "Residential Solar Solutions",
];

export function ProposalForm() {
  const send = useServerFn(submitProposal);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [serverError, setServerError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const parsed = proposalSchema.safeParse(Object.fromEntries(new FormData(form)));

    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        errs[String(issue.path[0])] ??= issue.message;
      }
      setErrors(errs);
      return;
    }

    setErrors({});
    setStatus("sending");

    try {
      await send({ data: parsed.data });
      setStatus("done");
      form.reset();
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-emerald-300 bg-emerald-50/60 p-8 text-center" role="status">
        <CheckCircle2 className="mx-auto size-12 text-emerald-600" />
        <h3 className="mt-3 text-2xl font-bold text-navy">Inquiry Proposal Submitted!</h3>
        <p className="mt-2 text-sm text-slate-600">
          Thank you. Our regional technical officers and estimation managers will review your site details and get back to you shortly.
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-6 border-emerald-600 text-emerald-800 hover:bg-emerald-100"
          onClick={() => setStatus("idle")}
        >
          Submit another proposal
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Full Name */}
        <div>
          <label htmlFor="full_name" className="block text-xs font-bold text-slate-800">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="full_name"
            name="full_name"
            placeholder="e.g. John Doe"
            autoComplete="name"
            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-navy placeholder:text-slate-400 focus:border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
          />
          {errors["full_name"] && <p className="mt-1 text-xs text-destructive">{errors["full_name"]}</p>}
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor="phone" className="block text-xs font-bold text-slate-800">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="e.g. 9876543210"
            autoComplete="tel"
            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-navy placeholder:text-slate-400 focus:border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
          />
          {errors["phone"] && <p className="mt-1 text-xs text-destructive">{errors["phone"]}</p>}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Inquiry Scope */}
        <div>
          <label htmlFor="inquiry_scope" className="block text-xs font-bold text-slate-800">
            Inquiry Scope
          </label>
          <div className="relative mt-1.5">
            <select
              id="inquiry_scope"
              name="inquiry_scope"
              defaultValue={SCOPES[0]}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-navy focus:border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
            >
              {SCOPES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <svg className="size-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Site Location */}
        <div>
          <label htmlFor="site_location" className="block text-xs font-bold text-slate-800">
            Site Location <span className="text-red-500">*</span>
          </label>
          <input
            id="site_location"
            name="site_location"
            placeholder="e.g. Hyderabad, Gadwal"
            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-navy placeholder:text-slate-400 focus:border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
          />
          {errors["site_location"] && <p className="mt-1 text-xs text-destructive">{errors["site_location"]}</p>}
        </div>
      </div>

      {/* Inquiry Specifications */}
      <div>
        <label htmlFor="inquiry_specs" className="block text-xs font-bold text-slate-800">
          Inquiry Specifications
        </label>
        <textarea
          id="inquiry_specs"
          name="inquiry_specs"
          rows={3}
          placeholder="Enter any load details, current average monthly bills, or PPA specifics..."
          className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-navy placeholder:text-slate-400 focus:border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
        />
      </div>

      {status === "error" && (
        <p role="alert" className="text-xs text-destructive">
          {serverError}
        </p>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#153e20] px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-md transition-all duration-200 hover:bg-[#0f2e18] hover:shadow-lg active:scale-[0.99] disabled:opacity-60"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            <span>SUBMITTING...</span>
          </>
        ) : (
          <>
            <Send className="size-4" />
            <span>SUBMIT INQUIRY</span>
          </>
        )}
      </button>
    </form>
  );
}
