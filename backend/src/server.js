import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool, initDatabase } from "./db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize MySQL tables on startup
initDatabase();

// Health check endpoint
app.get("/api/health", async (req, res) => {
  let dbStatus = "disconnected";
  try {
    await pool.query("SELECT 1");
    dbStatus = "connected";
  } catch (err) {
    dbStatus = `error: ${err.message}`;
  }

  res.json({
    status: "ok",
    database: dbStatus,
    timestamp: new Date().toISOString(),
  });
});

// Demo booking endpoint
app.post("/api/bookings", async (req, res) => {
  try {
    const {
      full_name,
      phone,
      email,
      customer_type = "Residential",
      solution = "On-Grid Solar",
      property_type = "Independent House",
      city = "Amaravati",
      preferred_date,
      date,
      preferred_time,
      time_slot,
      requirements,
    } = req.body;

    if (!full_name || !phone || !email) {
      return res.status(400).json({ error: "Full name, phone, and email are required." });
    }

    const bookingDate = preferred_date || date || new Date().toISOString().slice(0, 10);
    const bookingTime = preferred_time || time_slot || "10:00 AM - 01:00 PM";
    const reference = `ASS-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

    await pool.query(
      `INSERT INTO demo_bookings 
      (reference, full_name, phone, email, customer_type, solution, property_type, city, preferred_date, preferred_time, requirements, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
      [
        reference,
        full_name,
        phone,
        email,
        customer_type,
        solution,
        property_type,
        city,
        bookingDate,
        bookingTime,
        requirements || null,
      ]
    );

    console.log("Demo booking saved to MySQL:", reference, full_name, phone);
    res.status(201).json({
      success: true,
      reference,
      message: "Booking confirmed successfully",
    });
  } catch (error) {
    console.error("Failed to save booking to MySQL:", error);
    res.status(500).json({ error: "Failed to save booking. Please try again." });
  }
});

// Get all bookings (for Admin / API)
app.get("/api/bookings", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM demo_bookings ORDER BY created_at DESC");
    res.json(rows);
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    res.status(500).json({ error: "Failed to fetch bookings." });
  }
});

// Enquiry & Proposal submission endpoint
app.post("/api/enquiries", async (req, res) => {
  try {
    const {
      full_name,
      phone,
      email,
      customer_type = "Residential",
      service = "Rooftop Solar",
      city = "Amaravati",
      message,
    } = req.body;

    if (!full_name || !phone) {
      return res.status(400).json({ error: "Full name and phone are required." });
    }

    const emailValue = email || `inquiry-${phone.replace(/[^0-9]/g, "")}@amaravatisolarsolutions.com`;

    await pool.query(
      `INSERT INTO enquiries (full_name, phone, email, customer_type, service, city, message)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [full_name, phone, emailValue, customer_type, service, city, message || null]
    );

    console.log("Enquiry saved to MySQL:", full_name, phone, service);
    res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully",
    });
  } catch (error) {
    console.error("Failed to save enquiry to MySQL:", error);
    res.status(500).json({ error: "Failed to save enquiry. Please try again." });
  }
});

// Get all enquiries (for Admin / API)
app.get("/api/enquiries", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM enquiries ORDER BY created_at DESC");
    res.json(rows);
  } catch (error) {
    console.error("Failed to fetch enquiries:", error);
    res.status(500).json({ error: "Failed to fetch enquiries." });
  }
});

app.listen(PORT, () => {
  console.log(`Backend API server running on http://localhost:${PORT}`);
});
