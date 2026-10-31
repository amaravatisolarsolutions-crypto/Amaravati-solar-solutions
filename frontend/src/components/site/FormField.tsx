import type { ReactNode } from "react";

export const inputClass =
  "w-full rounded-xl border border-slate-200/90 bg-white px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-navy outline-none transition placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20 aria-[invalid=true]:border-destructive";

export function Field({ id, label, error, children, className }: { id: string; label: string; error?: string | undefined; children: ReactNode; className?: string | undefined }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1 block text-xs sm:text-sm font-bold text-[#0c2340]">{label}</label>
      {children}
      {error && <p id={`${id}-error`} role="alert" className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
