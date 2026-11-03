import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { submitEnquiry } from "@/lib/forms.functions";
import { enquirySchema } from "@/lib/validation";
import { Field, inputClass } from "./FormField";

const SERVICE_OPTIONS = ["Residential", "Commercial", "Industrial"] as const;

interface EnquiryFormProps {
  initialService?: string;
  initialMessage?: string;
}

export function EnquiryForm({ initialService = "", initialMessage = "" }: EnquiryFormProps) {
  const send = useServerFn(submitEnquiry);
  const [selectedService, setSelectedService] = useState<string>(initialService);
  const [message, setMessage] = useState<string>(initialMessage);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    if (initialService) {
      setSelectedService(initialService);
    }
  }, [initialService]);

  useEffect(() => {
    if (initialMessage) {
      setMessage(initialMessage);
    }
  }, [initialMessage]);

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
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || "Failed to submit enquiry. Please try again.");
      }
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
        <h3 className="mt-4 text-2xl font-bold text-[#082B4C]">Thank you — enquiry received</h3>
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
        <input {...a("city")} className={inputClass} placeholder="e.g. Vijayawada, Guntur" />
      </Field>

      {/* Dropdown Menu with ONLY: "Residential, Commercial, Industrial" */}
      <Field id="service" label="Service interested in" error={errors["service"]} className="sm:col-span-2">
        <select
          {...a("service")}
          className={inputClass}
          value={selectedService}
          onChange={(e) => {
            setSelectedService(e.target.value);
            if (errors["service"]) {
              setErrors((prev) => {
                const next = { ...prev };
                delete next["service"];
                return next;
              });
            }
          }}
        >
          <option value="" disabled>Select…</option>
          {SERVICE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </Field>
      <input type="hidden" name="customer_type" value={selectedService || "Residential"} />

      <Field id="message" label="Message" error={errors["message"]} className="sm:col-span-2">
        <textarea
          {...a("message")}
          rows={2}
          className={inputClass}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Your requirements or queries..."
        />
      </Field>
      {status === "error" && <p role="alert" className="text-xs text-destructive sm:col-span-2">{serverError}</p>}
      <Button type="submit" variant="cta" size="default" disabled={status === "sending"} className="sm:col-span-2 py-2.5 sm:py-3 text-xs sm:text-sm font-bold shadow-sm">
        {status === "sending" && <Loader2 className="animate-spin size-4" />} Submit Enquiry
      </Button>
    </form>
  );
}
