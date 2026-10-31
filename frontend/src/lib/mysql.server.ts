import mysql from "mysql2/promise";

let pool: mysql.Pool | null = null;

export function getMySqlPool(): mysql.Pool | null {
  if (pool) return pool;

  const host = process.env.DB_HOST || "localhost";
  const user = process.env.DB_USER || "u236567282_Amaravthisolar";
  const password = process.env.DB_PASSWORD || "Amaravthi@123";
  const database = process.env.DB_NAME || "u236567282_Amaravthisolar";
  const port = Number(process.env.DB_PORT) || 3306;

  try {
    pool = mysql.createPool({
      host,
      user,
      password,
      database,
      port,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 10000,
    });
    return pool;
  } catch (err) {
    console.warn("[MySQL Server] Pool creation warning:", err);
    return null;
  }
}

export async function saveBookingToMySql(data: {
  reference: string;
  full_name: string;
  phone: string;
  email: string;
  customer_type: string;
  solution: string;
  property_type: string;
  city: string;
  preferred_date: string;
  preferred_time: string;
  requirements?: string | null;
}) {
  const p = getMySqlPool();
  if (!p) return false;
  try {
    await p.query(
      `INSERT INTO demo_bookings 
      (reference, full_name, phone, email, customer_type, solution, property_type, city, preferred_date, preferred_time, requirements, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
      [
        data.reference,
        data.full_name,
        data.phone,
        data.email,
        data.customer_type,
        data.solution,
        data.property_type,
        data.city,
        data.preferred_date,
        data.preferred_time,
        data.requirements || null,
      ]
    );
    console.log("[MySQL Server] Booking saved successfully:", data.reference);
    return true;
  } catch (err) {
    console.error("[MySQL Server] Failed to insert booking into MySQL:", err);
    return false;
  }
}

export async function saveEnquiryToMySql(data: {
  full_name: string;
  phone: string;
  email: string;
  customer_type?: string;
  service?: string;
  city?: string;
  message?: string | null;
}) {
  const p = getMySqlPool();
  if (!p) return false;
  try {
    await p.query(
      `INSERT INTO enquiries (full_name, phone, email, customer_type, service, city, message)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        data.full_name,
        data.phone,
        data.email,
        data.customer_type || "Residential",
        data.service || "Rooftop Solar",
        data.city || "Amaravati",
        data.message || null,
      ]
    );
    console.log("[MySQL Server] Enquiry saved successfully:", data.full_name);
    return true;
  } catch (err) {
    console.error("[MySQL Server] Failed to insert enquiry into MySQL:", err);
    return false;
  }
}
