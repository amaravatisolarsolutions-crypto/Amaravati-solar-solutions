import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { submitEnquiry } from "@/lib/forms.functions";
import { CUSTOMER_TYPES, SOLUTIONS } from "@/lib/site-data";
import { enquirySchema } from "@/lib/validation";
import { Field, inputClass } from "./FormField";

export function EnquiryForm() {
  const send = useServerFn(submitEnquiry);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [serverError, setServerError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const parsed = enquirySchema.safeParse(Object.fromEntries(new FormData(form)));
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const issue of parsed.error.issues) errs[String(issue.path[0])] ??= issue.message;
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
      <div className="rounded-2xl border border-success/30 bg-success/5 p-8 text-center" role="status">
        <CheckCircle2 className="mx-auto size-12 text-success" />
        <h3 className="mt-4 text-2xl font-bold">Thank you — enquiry received</h3>
        <p className="mt-2 text-muted-foreground">Our team will get back to you shortly.</p>
        <Button variant="outline" className="mt-6" onClick={() => setStatus("idle")}>Send another enquiry</Button>
      </div>
    );
  }

  const a = (k: string) => ({ id: k, name: k, "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `${k}-error` : undefined });

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-3 sm:gap-3.5 sm:grid-cols-2">
      <Field id="full_name" label="Full name" error={errors["full_name"]}>
        <input {...a("full_name")} className={inputClass} autoComplete="name" placeholder="Enter your name" />
      </Field>
      <Field id="phone" label="Phone number" error={errors["phone"]}>
        <input {...a("phone")} type="tel" className={inputClass} autoComplete="tel" placeholder="Enter phone number" />
      </Field>
      <Field id="email" label="Email address" error={errors["email"]}>
        <input {...a("email")} type="email" className={inputClass} autoComplete="email" placeholder="example@email.com" />
      </Field>
      <Field id="city" label="City / location" error={errors["city"]}>
        <input {...a("city")} className={inputClass} placeholder="e.g. Hyderabad" />
      </Field>
      <Field id="customer_type" label="Customer type" error={errors["customer_type"]}>
        <select {...a("customer_type")} className={inputClass} defaultValue="">
          <option value="" disabled>Select…</option>
          {CUSTOMER_TYPES.map((t) => <option key={t}>{t}</option>)}
        </select>
      </Field>
      <Field id="service" label="Service interested in" error={errors["service"]}>
        <select {...a("service")} className={inputClass} defaultValue="">
          <option value="" disabled>Select…</option>
          {SOLUTIONS.map((t) => <option key={t}>{t}</option>)}
        </select>
      </Field>
      <Field id="message" label="Message" error={errors["message"]} className="sm:col-span-2">
        <textarea {...a("message")} rows={2} className={inputClass} placeholder="Your requirements or queries..." />
      </Field>
      {status === "error" && <p role="alert" className="text-xs text-destructive sm:col-span-2">{serverError}</p>}
      <Button type="submit" variant="cta" size="default" disabled={status === "sending"} className="sm:col-span-2 py-2.5 sm:py-3 text-xs sm:text-sm font-bold shadow-sm">
        {status === "sending" && <Loader2 className="animate-spin size-4" />} Submit Enquiry
      </Button>
    </form>
  );
}
