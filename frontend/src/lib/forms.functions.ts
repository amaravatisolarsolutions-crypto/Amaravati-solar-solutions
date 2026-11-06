import { createServerFn } from "@tanstack/react-start";
import { bookingSchema, enquirySchema, proposalSchema } from "./validation";
import { saveBookingToMySql, saveEnquiryToMySql } from "./mysql.server";

export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => enquirySchema.parse(data))
  .handler(async ({ data }) => {
    // 1. Save to MySQL database
    await saveEnquiryToMySql(data);

    // 2. Also sync to Supabase if available
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { error } = await supabaseAdmin.from("enquiries").insert(data);
      if (error) {
        console.warn("[Supabase] sync notice:", error.message);
      }
    } catch {
      // Supabase is optional secondary sync
    }

    return { ok: true as const };
  });

export const submitBooking = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => bookingSchema.parse(data))
  .handler(async ({ data }) => {
    const reference = `ASS-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    const safeEmail = data.email && data.email.trim() ? data.email.trim() : `${data.phone.replace(/[^0-9]/g, "")}@inquiry.amaravatisolar.com`;
    const combinedRequirements = [
      data.requirements,
      data.monthly_bill ? `Monthly Bill: ${data.monthly_bill}` : null,
    ].filter(Boolean).join(" | ");

    // 1. Save to MySQL database
    await saveBookingToMySql({
      reference,
      full_name: data.full_name,
      phone: data.phone,
      email: safeEmail,
      customer_type: data.customer_type || "Residential",
      solution: data.solution,
      property_type: data.property_type,
      city: data.city,
      preferred_date: data.preferred_date || new Date().toISOString().slice(0, 10),
      preferred_time: data.preferred_time || "10:00 AM – 01:00 PM (Mid-Day)",
      requirements: combinedRequirements,
    });

    // 2. Also sync to Supabase if available
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { error } = await supabaseAdmin
        .from("demo_bookings")
        .insert({
          ...data,
          email: safeEmail,
          requirements: combinedRequirements,
          reference,
        });
      if (error) {
        console.warn("[Supabase] sync notice:", error.message);
      }
    } catch {
      // Supabase is optional secondary sync
    }

    return { ok: true as const, reference };
  });

export const submitProposal = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => proposalSchema.parse(data))
  .handler(async ({ data }) => {
    const emailVal =
      data.email && data.email.trim()
        ? data.email.trim()
        : `inquiry-${data.phone.replace(/[^0-9]/g, "")}@amaravatisolarsolutions.com`;

    const enquiryData = {
      full_name: data.full_name,
      phone: data.phone,
      email: emailVal,
      customer_type: "Commercial",
      service: data.inquiry_scope,
      city: data.site_location,
      message: data.inquiry_specs || "Site Estimation & Inquiry Proposal",
    };

    // 1. Save to MySQL database
    await saveEnquiryToMySql(enquiryData);

    // 2. Also sync to Supabase if available
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { error } = await supabaseAdmin.from("enquiries").insert(enquiryData);
      if (error) {
        console.warn("[Supabase] sync notice:", error.message);
      }
    } catch {
      // Supabase is optional secondary sync
    }

    return { ok: true as const };
  });
