import { useServerFn } from "@tanstack/react-start";
import { CalendarCheck, Loader2 } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { submitBooking } from "@/lib/forms.functions";
import { CUSTOMER_TYPES, PROPERTY_TYPES, SOLUTIONS, TIME_SLOTS } from "@/lib/site-data";
import { bookingSchema, todayISO } from "@/lib/validation";
import { Field, inputClass } from "./FormField";

export function BookingForm() {
  const send = useServerFn(submitBooking);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [serverError, setServerError] = useState("");
  const [reference, setReference] = useState("");
  const [minDate, setMinDate] = useState<string>();

  useEffect(() => setMinDate(todayISO()), []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const parsed = bookingSchema.safeParse(Object.fromEntries(new FormData(form)));
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const issue of parsed.error.issues) errs[String(issue.path[0])] ??= issue.message;
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      const res = await send({ data: parsed.data });
      setReference(res.reference);
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
        <CalendarCheck className="mx-auto size-12 text-success" />
        <h3 className="mt-4 text-2xl font-bold">Your request is booked</h3>
        <p className="mt-2 text-muted-foreground">Booking reference</p>
        <p className="mt-1 font-mono text-2xl font-bold tracking-wider text-primary">{reference}</p>
        <p className="mt-4 text-muted-foreground">Status: pending confirmation. Our team will contact you to confirm the slot.</p>
        <Button variant="outline" className="mt-6" onClick={() => setStatus("idle")}>Book another</Button>
      </div>
    );
  }

  const a = (k: string) => ({ id: k, name: k, "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `${k}-error` : undefined });
  const sel = (k: string, opts: readonly string[]) => (
    <select {...a(k)} className={inputClass} defaultValue="">
      <option value="" disabled>Select…</option>
      {opts.map((t) => <option key={t}>{t}</option>)}
    </select>
  );

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-3 sm:grid-cols-2">
      <Field id="full_name" label="Full name" error={errors["full_name"]}><input {...a("full_name")} className={inputClass} autoComplete="name" /></Field>
      <Field id="phone" label="Phone number" error={errors["phone"]}><input {...a("phone")} type="tel" className={inputClass} autoComplete="tel" /></Field>
      <Field id="email" label="Email address" error={errors["email"]} className="sm:col-span-2"><input {...a("email")} type="email" className={inputClass} autoComplete="email" /></Field>
      <Field id="customer_type" label="Customer type" error={errors["customer_type"]}>{sel("customer_type", CUSTOMER_TYPES)}</Field>
      <Field id="solution" label="Interested solar solution" error={errors["solution"]}>{sel("solution", SOLUTIONS)}</Field>
      <Field id="property_type" label="Property type" error={errors["property_type"]}>{sel("property_type", PROPERTY_TYPES)}</Field>
      <Field id="city" label="City" error={errors["city"]}><input {...a("city")} className={inputClass} /></Field>
      <Field id="preferred_date" label="Preferred date" error={errors["preferred_date"]}><input {...a("preferred_date")} type="date" min={minDate} className={inputClass} /></Field>
      <Field id="preferred_time" label="Preferred time" error={errors["preferred_time"]}>{sel("preferred_time", TIME_SLOTS)}</Field>
      <Field id="requirements" label="Additional requirements" error={errors["requirements"]} className="sm:col-span-2"><textarea {...a("requirements")} rows={2} className={inputClass} /></Field>
      {status === "error" && <p role="alert" className="text-sm text-destructive sm:col-span-2">{serverError}</p>}
      <Button type="submit" variant="cta" size="lg" disabled={status === "sending"} className="sm:col-span-2">
        {status === "sending" && <Loader2 className="animate-spin" />} Book My Demo
      </Button>
    </form>
  );
}
