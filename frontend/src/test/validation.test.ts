import { describe, expect, it } from "vitest";
import { bookingSchema, todayISO } from "@/lib/validation";

const base = {
  full_name: "Ravi Kumar",
  phone: "9876543210",
  email: "ravi@example.com",
  customer_type: "Residential",
  solution: "On-Grid Solar Systems",
  property_type: "Apartment",
  city: "Vijayawada",
  preferred_time: "09:00 – 11:00",
};

describe("demo booking date", () => {
  it("rejects past dates", () => {
    expect(bookingSchema.safeParse({ ...base, preferred_date: "2000-01-01" }).success).toBe(false);
  });
  it("accepts today", () => {
    expect(bookingSchema.safeParse({ ...base, preferred_date: todayISO() }).success).toBe(true);
  });
});
