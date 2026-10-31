import { createServerFn } from "@tanstack/react-start";
import { bookingSchema, enquirySchema, proposalSchema } from "./validation";

export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => enquirySchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("enquiries").insert(data);
    if (error) {
      console.error("enquiry insert failed", error);
      throw new Error("We couldn't save your enquiry. Please try again.");
    }
    return { ok: true as const };
  });

export const submitBooking = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => bookingSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("demo_bookings")
      .insert(data)
      .select("reference")
      .single();
    if (error || !row) {
      console.error("booking insert failed", error);
      throw new Error("We couldn't save your booking. Please try again.");
    }
    return { ok: true as const, reference: row.reference };
  });

export const submitProposal = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => proposalSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const emailVal =
      data.email && data.email.trim()
        ? data.email.trim()
        : `inquiry-${data.phone.replace(/[^0-9]/g, "")}@amaravatisolarsolutions.com`;
    const { error } = await supabaseAdmin.from("enquiries").insert({
      full_name: data.full_name,
      phone: data.phone,
      email: emailVal,
      customer_type: "Commercial",
      service: data.inquiry_scope,
      city: data.site_location,
      message: data.inquiry_specs || "Site Estimation & Inquiry Proposal",
    });
    if (error) {
      console.error("proposal insert failed", error);
      throw new Error("We couldn't save your inquiry. Please try again.");
    }
    return { ok: true as const };
  });

