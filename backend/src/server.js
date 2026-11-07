import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {
  pool,
  initDatabase,
  syncDatabaseSchema,
  queryTable,
  insertRow,
  updateRow,
  deleteRow,
} from "./db.js";

dotenv.config();

const app = express();
// HTTP server port: uses PORT unless set to 3306 (which is reserved for MySQL)
const PORT = process.env.APP_PORT || (process.env.PORT && process.env.PORT !== "3306" ? process.env.PORT : 5000);

app.use(cors());
app.use(express.json());

// Automatically create/sync tables and columns on boot / redeploy
initDatabase();

// -------------------------------------------------------------
// 1. HEALTH & MIGRATION TRIGGER
// -------------------------------------------------------------
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

// Trigger schema migration on demand
app.post("/api/migrate", async (req, res) => {
  const result = await syncDatabaseSchema();
  res.json(result);
});

// -------------------------------------------------------------
// 2. DEMO BOOKINGS (CRUD + FILTER + SEARCH)
// -------------------------------------------------------------
// CREATE Booking
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
      monthly_bill,
      service,
      notes,
    } = req.body;

    if (!full_name || !phone) {
      return res.status(400).json({ error: "Full name and phone number are required." });
    }

    const safeEmail =
      email && email.trim()
        ? email.trim()
        : `${phone.replace(/[^0-9]/g, "")}@inquiry.amaravatisolar.com`;

    const selectedSolution = solution || service || "Residential Rooftop Solar (On-Grid)";
    const bookingDate = preferred_date || date || new Date().toISOString().slice(0, 10);
    const bookingTime = preferred_time || time_slot || "10:00 AM - 01:00 PM";
    const reference = `ASS-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

    const combinedRequirements = [
      requirements,
      monthly_bill ? `Monthly Bill: ${monthly_bill}` : null,
      service && service !== selectedSolution ? `Service: ${service}` : null,
    ]
      .filter(Boolean)
      .join(" | ");

    await insertRow("demo_bookings", {
      reference,
      full_name,
      phone,
      email: safeEmail,
      customer_type,
      solution: selectedSolution,
      property_type,
      city,
      preferred_date: bookingDate,
      preferred_time: bookingTime,
      requirements: combinedRequirements || null,
      status: "pending",
      notes: notes || null,
    });

    console.log("[MySQL] Demo booking created:", reference, full_name);
    res.status(201).json({
      success: true,
      reference,
      message: "Booking confirmed successfully",
    });
  } catch (error) {
    console.error("Booking creation failed:", error);
    res.status(500).json({ error: "Failed to save booking. Please try again." });
  }
});

// READ Bookings with Filtering & Search
app.get("/api/bookings", async (req, res) => {
  try {
    const { status, solution, city, search, startDate, endDate, sort, order, page, limit } = req.query;

    const filters = {};
    if (status) filters.status = status;
    if (solution) filters.solution = solution;
    if (city) filters.city = city;

    const result = await queryTable("demo_bookings", {
      filters,
      search,
      searchFields: ["reference", "full_name", "phone", "email", "city"],
      startDate,
      endDate,
      dateField: "preferred_date",
      sort: sort || "created_at",
      order: order || "DESC",
      page: page || 1,
      limit: limit || 50,
    });

    res.json(result);
  } catch (error) {
    console.error("Fetching bookings failed:", error);
    res.status(500).json({ error: "Failed to fetch bookings." });
  }
});

// UPDATE Booking (Status, Notes, etc.)
app.put("/api/bookings/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const allowed = [
      "status",
      "notes",
      "preferred_date",
      "preferred_time",
      "solution",
      "customer_type",
    ];
    const updateData = {};
    for (const key of allowed) {
      if (req.body[key] !== undefined) updateData[key] = req.body[key];
    }

    await updateRow("demo_bookings", id, updateData, "id");
    res.json({ success: true, message: "Booking updated successfully" });
  } catch (error) {
    console.error("Updating booking failed:", error);
    res.status(500).json({ error: "Failed to update booking." });
  }
});

// DELETE Booking
app.delete("/api/bookings/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await deleteRow("demo_bookings", id, "id");
    res.json({ success: true, message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Deleting booking failed:", error);
    res.status(500).json({ error: "Failed to delete booking." });
  }
});

// -------------------------------------------------------------
// 3. ENQUIRIES & PROPOSALS (CRUD + FILTER + SEARCH)
// -------------------------------------------------------------
// CREATE Enquiry
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
      notes,
      reference,
      source,
    } = req.body;

    if (!full_name || !phone) {
      return res.status(400).json({ error: "Full name and phone are required." });
    }

    const emailValue = email || `inquiry-${phone.replace(/[^0-9]/g, "")}@amaravatisolarsolutions.com`;
    const refId = reference || `ASS-ENQ-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    const combinedNotes = [
      notes,
      source ? `Source: ${source}` : null,
      `Ref: ${refId}`,
    ]
      .filter(Boolean)
      .join(" | ");

    const result = await insertRow("enquiries", {
      full_name,
      phone,
      email: emailValue,
      customer_type,
      service,
      city,
      message: message || null,
      status: "New",
      notes: combinedNotes || null,
    });

    console.log("[MySQL] Enquiry created:", full_name, service, refId);
    res.status(201).json({
      success: true,
      reference: refId,
      id: result?.insertId,
      message: "Enquiry submitted successfully",
    });
  } catch (error) {
    console.error("Enquiry creation failed:", error);
    res.status(500).json({ error: "Failed to save enquiry." });
  }
});

// READ Enquiries with Filtering & Search
app.get("/api/enquiries", async (req, res) => {
  try {
    const { status, service, city, search, startDate, endDate, sort, order, page, limit } = req.query;

    const filters = {};
    if (status) filters.status = status;
    if (service) filters.service = service;
    if (city) filters.city = city;

    const result = await queryTable("enquiries", {
      filters,
      search,
      searchFields: ["full_name", "phone", "email", "service", "city", "message"],
      startDate,
      endDate,
      dateField: "created_at",
      sort: sort || "created_at",
      order: order || "DESC",
      page: page || 1,
      limit: limit || 50,
    });

    res.json(result);
  } catch (error) {
    console.error("Fetching enquiries failed:", error);
    res.status(500).json({ error: "Failed to fetch enquiries." });
  }
});

// UPDATE Enquiry
app.put("/api/enquiries/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const allowed = ["status", "notes", "customer_type", "service", "city"];
    const updateData = {};
    for (const key of allowed) {
      if (req.body[key] !== undefined) updateData[key] = req.body[key];
    }

    await updateRow("enquiries", id, updateData, "id");
    res.json({ success: true, message: "Enquiry updated successfully" });
  } catch (error) {
    console.error("Updating enquiry failed:", error);
    res.status(500).json({ error: "Failed to update enquiry." });
  }
});

// DELETE Enquiry
app.delete("/api/enquiries/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await deleteRow("enquiries", id, "id");
    res.json({ success: true, message: "Enquiry deleted successfully" });
  } catch (error) {
    console.error("Deleting enquiry failed:", error);
    res.status(500).json({ error: "Failed to delete enquiry." });
  }
});

// -------------------------------------------------------------
// 4. SERVICES (CRUD + FILTER)
// -------------------------------------------------------------
app.get("/api/services", async (req, res) => {
  try {
    const { category, search, sort, order, page, limit } = req.query;
    const filters = {};
    if (category) filters.category = category;

    const result = await queryTable("services", {
      filters,
      search,
      searchFields: ["title", "description", "category"],
      sort: sort || "service_order",
      order: order || "ASC",
      page: page || 1,
      limit: limit || 100,
    });

    res.json(result);
  } catch (error) {
    console.error("Fetching services failed:", error);
    res.status(500).json({ error: "Failed to fetch services." });
  }
});

app.post("/api/services", async (req, res) => {
  try {
    const { id, title, service_order = 1, category = "SOLAR", description, image, status = "Active" } = req.body;
    const serviceId = id || `s-${Date.now()}`;

    await insertRow("services", {
      id: serviceId,
      title,
      service_order,
      category,
      description: description || null,
      image: image || null,
      status,
    });

    res.status(201).json({ success: true, id: serviceId, message: "Service created successfully" });
  } catch (error) {
    console.error("Creating service failed:", error);
    res.status(500).json({ error: "Failed to create service." });
  }
});

app.put("/api/services/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await updateRow("services", id, req.body, "id");
    res.json({ success: true, message: "Service updated successfully" });
  } catch (error) {
    console.error("Updating service failed:", error);
    res.status(500).json({ error: "Failed to update service." });
  }
});

app.delete("/api/services/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await deleteRow("services", id, "id");
    res.json({ success: true, message: "Service deleted successfully" });
  } catch (error) {
    console.error("Deleting service failed:", error);
    res.status(500).json({ error: "Failed to delete service." });
  }
});

// -------------------------------------------------------------
// 5. PROJECTS (CRUD + FILTER)
// -------------------------------------------------------------
app.get("/api/projects", async (req, res) => {
  try {
    const { category, search, sort, order, page, limit } = req.query;
    const filters = {};
    if (category) filters.category = category;

    const result = await queryTable("projects", {
      filters,
      search,
      searchFields: ["title", "client", "capacity", "location", "description"],
      sort: sort || "created_at",
      order: order || "DESC",
      page: page || 1,
      limit: limit || 100,
    });

    res.json(result);
  } catch (error) {
    console.error("Fetching projects failed:", error);
    res.status(500).json({ error: "Failed to fetch projects." });
  }
});

app.post("/api/projects", async (req, res) => {
  try {
    const { id, title, category, client, capacity, location, image, description, status = "Completed" } = req.body;
    const projectId = id || `p-${Date.now()}`;

    await insertRow("projects", {
      id: projectId,
      title,
      category: category || "Residential",
      client: client || null,
      capacity: capacity || null,
      location: location || null,
      image: image || null,
      description: description || null,
      status,
    });

    res.status(201).json({ success: true, id: projectId, message: "Project created successfully" });
  } catch (error) {
    console.error("Creating project failed:", error);
    res.status(500).json({ error: "Failed to create project." });
  }
});

app.put("/api/projects/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await updateRow("projects", id, req.body, "id");
    res.json({ success: true, message: "Project updated successfully" });
  } catch (error) {
    console.error("Updating project failed:", error);
    res.status(500).json({ error: "Failed to update project." });
  }
});

app.delete("/api/projects/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await deleteRow("projects", id, "id");
    res.json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    console.error("Deleting project failed:", error);
    res.status(500).json({ error: "Failed to delete project." });
  }
});

// -------------------------------------------------------------
// 6. QUOTATIONS (CRUD + FILTER)
// -------------------------------------------------------------
app.get("/api/quotations", async (req, res) => {
  try {
    const { status, search, sort, order, page, limit } = req.query;
    const filters = {};
    if (status) filters.status = status;

    const result = await queryTable("quotations", {
      filters,
      search,
      searchFields: ["quotation_no", "customer_name", "customer_phone", "system_capacity"],
      sort: sort || "created_at",
      order: order || "DESC",
      page: page || 1,
      limit: limit || 100,
    });

    // Parse JSON fields
    result.data = result.data.map((q) => ({
      ...q,
      items: q.items_json ? JSON.parse(q.items_json) : [],
      site_details: q.site_details_json ? JSON.parse(q.site_details_json) : {},
    }));

    res.json(result);
  } catch (error) {
    console.error("Fetching quotations failed:", error);
    res.status(500).json({ error: "Failed to fetch quotations." });
  }
});

app.post("/api/quotations", async (req, res) => {
  try {
    const q = req.body;
    const quotId = q.id || `quot-${Date.now()}`;
    const quotNo = q.quotationNo || q.quotation_no || `ASS/${new Date().getFullYear()}/${Math.floor(100 + Math.random() * 900)}`;

    await insertRow("quotations", {
      id: quotId,
      quotation_no: quotNo,
      date: q.date || new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
      valid_upto: q.validUpto || q.valid_upto || null,
      customer_name: q.customerName || q.customer_name || "",
      customer_phone: q.customerPhone || q.customer_phone || "",
      customer_address: q.customerAddress || q.customer_address || null,
      system_capacity: q.systemCapacity || q.system_capacity || null,
      housing_type: q.housingType || q.housing_type || null,
      subsidy_type: q.subsidyType || q.subsidy_type || null,
      items_json: JSON.stringify(q.items || []),
      site_details_json: JSON.stringify(q.siteDetails || {}),
      subtotal: Number(q.subtotal) || 0,
      gst_amount: Number(q.gstAmount || q.gst_amount) || 0,
      total_amount: Number(q.totalAmount || q.total_price || q.total_amount) || 0,
      subsidy_amount: Number(q.subsidyAmount || q.subsidy_amount) || 0,
      from_hand: Number(q.fromHand || q.from_hand) || 0,
      status: q.status || "Pending",
    });

    res.status(201).json({ success: true, id: quotId, quotationNo: quotNo, message: "Quotation created successfully" });
  } catch (error) {
    console.error("Creating quotation failed:", error);
    res.status(500).json({ error: "Failed to create quotation." });
  }
});

app.put("/api/quotations/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const q = req.body;
    const updateData = {};

    if (q.status !== undefined) updateData.status = q.status;
    if (q.items !== undefined) updateData.items_json = JSON.stringify(q.items);
    if (q.siteDetails !== undefined) updateData.site_details_json = JSON.stringify(q.siteDetails);
    if (q.customerName || q.customer_name) updateData.customer_name = q.customerName || q.customer_name;
    if (q.customerPhone || q.customer_phone) updateData.customer_phone = q.customerPhone || q.customer_phone;
    if (q.totalAmount !== undefined) updateData.total_amount = Number(q.totalAmount);

    await updateRow("quotations", id, updateData, "id");
    res.json({ success: true, message: "Quotation updated successfully" });
  } catch (error) {
    console.error("Updating quotation failed:", error);
    res.status(500).json({ error: "Failed to update quotation." });
  }
});

app.delete("/api/quotations/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await deleteRow("quotations", id, "id");
    res.json({ success: true, message: "Quotation deleted successfully" });
  } catch (error) {
    console.error("Deleting quotation failed:", error);
    res.status(500).json({ error: "Failed to delete quotation." });
  }
});

app.listen(PORT, () => {
  console.log(`Backend API server running on http://localhost:${PORT}`);
});
