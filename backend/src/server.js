import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Demo booking endpoint
app.post("/api/bookings", (req, res) => {
  const { full_name, phone, email, date, time_slot } = req.body;
  console.log("New demo booking received:", { full_name, phone, email, date, time_slot });
  res.status(201).json({ success: true, message: "Booking confirmed successfully" });
});

// Enquiry endpoint
app.post("/api/enquiries", (req, res) => {
  const { full_name, phone, email, customer_type, service, city, message } = req.body;
  console.log("New enquiry received:", { full_name, phone, email, customer_type, service, city, message });
  res.status(201).json({ success: true, message: "Enquiry submitted successfully" });
});

app.listen(PORT, () => {
  console.log(`Backend API server running on http://localhost:${PORT}`);
});
