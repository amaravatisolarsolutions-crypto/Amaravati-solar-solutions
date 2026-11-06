import { z } from "zod";

const phone = z
  .string()
  .trim()
  .regex(/^[+]?[0-9\s-]{10,15}$/, "Enter a valid phone number");

export const enquirySchema = z.object({
  full_name: z.string().trim().min(2, "Enter your full name").max(100),
  phone,
  email: z.string().trim().email("Enter a valid email").max(255),
  customer_type: z.enum(["Residential", "Commercial", "Industrial"], { errorMap: () => ({ message: "Select a customer type" }) }),
  service: z.string().trim().min(1, "Select a service").max(100),
  city: z.string().trim().min(2, "Enter your city").max(100),
  message: z.string().trim().max(1000).optional().default(""),
});

export function todayISO(now = new Date()) {
  const d = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return d.toISOString().slice(0, 10);
}

export const bookingSchema = z.object({
  full_name: z.string().trim().min(2, "Enter your full name").max(100),
  phone,
  email: z.string().trim().email("Enter a valid email").max(255).optional().or(z.literal("")),
  customer_type: z.string().trim().default("Residential"),
  solution: z.string().trim().min(1, "Select a solution").max(200),
  property_type: z.string().trim().min(1, "Select a property type").max(100),
  city: z.string().trim().min(2, "Enter your city / location").max(100),
  monthly_bill: z.string().trim().max(100).optional().default(""),
  preferred_date: z.string().optional().default(""),
  preferred_time: z.string().optional().default(""),
  requirements: z.string().trim().max(1000).optional().default(""),
});

export const proposalSchema = z.object({
  full_name: z.string().trim().min(2, "Enter your full name").max(100),
  phone,
  email: z.string().trim().email("Enter a valid email").max(255).optional().or(z.literal("")),
  inquiry_scope: z.string().trim().min(1, "Select inquiry scope").default("Solar EPC Solutions"),
  site_location: z.string().trim().min(2, "Enter site location").max(100),
  inquiry_specs: z.string().trim().max(2000).optional().default(""),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
export type BookingInput = z.infer<typeof bookingSchema>;
export type ProposalInput = z.infer<typeof proposalSchema>;
