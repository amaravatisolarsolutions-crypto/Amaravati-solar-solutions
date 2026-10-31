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

    // 1. Save to MySQL database
    await saveBookingToMySql({
      reference,
      full_name: data.full_name,
      phone: data.phone,
      email: data.email,
      customer_type: data.customer_type,
      solution: data.solution,
      property_type: data.property_type,
      city: data.city,
      preferred_date: data.preferred_date,
      preferred_time: data.preferred_time,
      requirements: data.requirements,
    });

    // 2. Also sync to Supabase if available
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { error } = await supabaseAdmin
        .from("demo_bookings")
        .insert({ ...data, reference });
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
