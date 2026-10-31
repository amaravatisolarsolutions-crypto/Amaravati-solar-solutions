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
    console.warn("[MySQL Frontend] Pool creation warning:", err);
    return null;
  }
}

/**
 * Universal Declarative Schema Registry
 */
export const SCHEMA_DEFINITIONS = [
  {
    name: "enquiries",
    primaryKey: "`id`",
    columns: {
      id: "INT AUTO_INCREMENT",
      full_name: "VARCHAR(255) NOT NULL",
      phone: "VARCHAR(50) NOT NULL",
      email: "VARCHAR(255) NOT NULL",
      customer_type: "VARCHAR(100) NOT NULL DEFAULT 'Residential'",
      service: "VARCHAR(100) NOT NULL DEFAULT 'Rooftop Solar'",
      city: "VARCHAR(100) NOT NULL DEFAULT 'Amaravati'",
      message: "TEXT NULL",
      status: "VARCHAR(50) NOT NULL DEFAULT 'New'",
      notes: "TEXT NULL",
      created_at: "TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP",
      updated_at: "TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
    },
  },
  {
    name: "demo_bookings",
    primaryKey: "`id`",
    columns: {
      id: "INT AUTO_INCREMENT",
      reference: "VARCHAR(50) NOT NULL UNIQUE",
      full_name: "VARCHAR(255) NOT NULL",
      phone: "VARCHAR(50) NOT NULL",
      email: "VARCHAR(255) NOT NULL",
      customer_type: "VARCHAR(100) NOT NULL DEFAULT 'Residential'",
      solution: "VARCHAR(100) NOT NULL DEFAULT 'On-Grid Solar'",
      property_type: "VARCHAR(100) NOT NULL DEFAULT 'Independent House'",
      city: "VARCHAR(100) NOT NULL DEFAULT 'Amaravati'",
      preferred_date: "DATE NULL",
      preferred_time: "VARCHAR(50) NOT NULL DEFAULT '10:00 AM - 01:00 PM'",
      requirements: "TEXT NULL",
      status: "VARCHAR(50) NOT NULL DEFAULT 'pending'",
      notes: "TEXT NULL",
      created_at: "TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP",
      updated_at: "TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
    },
  },
  {
    name: "services",
    primaryKey: "`id`",
    columns: {
      id: "VARCHAR(50) NOT NULL",
      title: "VARCHAR(255) NOT NULL",
      service_order: "INT NOT NULL DEFAULT 1",
      category: "VARCHAR(100) NOT NULL DEFAULT 'SOLAR'",
      description: "TEXT NULL",
      image: "VARCHAR(500) NULL",
      status: "VARCHAR(50) NOT NULL DEFAULT 'Active'",
      created_at: "TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP",
      updated_at: "TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
    },
  },
  {
    name: "projects",
    primaryKey: "`id`",
    columns: {
      id: "VARCHAR(50) NOT NULL",
      title: "VARCHAR(255) NOT NULL",
      category: "VARCHAR(100) NOT NULL DEFAULT 'Residential'",
      client: "VARCHAR(255) NULL",
      capacity: "VARCHAR(100) NULL",
      location: "VARCHAR(255) NULL",
      image: "VARCHAR(500) NULL",
      description: "TEXT NULL",
      status: "VARCHAR(50) NOT NULL DEFAULT 'Completed'",
      created_at: "TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP",
      updated_at: "TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
    },
  },
  {
    name: "quotations",
    primaryKey: "`id`",
    columns: {
      id: "VARCHAR(50) NOT NULL",
      quotation_no: "VARCHAR(100) NOT NULL UNIQUE",
      date: "VARCHAR(50) NULL",
      valid_upto: "VARCHAR(50) NULL",
      customer_name: "VARCHAR(255) NOT NULL",
      customer_phone: "VARCHAR(50) NOT NULL",
      customer_address: "TEXT NULL",
      system_capacity: "VARCHAR(100) NULL",
      housing_type: "VARCHAR(100) NULL",
      subsidy_type: "VARCHAR(100) NULL",
      items_json: "LONGTEXT NULL",
      site_details_json: "LONGTEXT NULL",
      subtotal: "DECIMAL(12, 2) NOT NULL DEFAULT 0.00",
      gst_amount: "DECIMAL(12, 2) NOT NULL DEFAULT 0.00",
      total_amount: "DECIMAL(12, 2) NOT NULL DEFAULT 0.00",
      subsidy_amount: "DECIMAL(12, 2) NOT NULL DEFAULT 0.00",
      from_hand: "DECIMAL(12, 2) NOT NULL DEFAULT 0.00",
      status: "VARCHAR(50) NOT NULL DEFAULT 'Pending'",
      created_at: "TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP",
      updated_at: "TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
    },
  },
];

let isSchemaInitialized = false;

/**
 * Automatically creates all tables and synchronizes columns
 */
export async function autoMigrate() {
  if (isSchemaInitialized) return true;
  const p = getMySqlPool();
  if (!p) return false;

  let connection;
  try {
    connection = await p.getConnection();
    for (const tableDef of SCHEMA_DEFINITIONS) {
      const [tables]: [any[], any] = await connection.query(
        `SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ?`,
        [tableDef.name]
      );

      if (tables.length === 0) {
        const columnSqls = Object.entries(tableDef.columns).map(
          ([colName, colType]) => `\`${colName}\` ${colType}`
        );
        if (tableDef.primaryKey) {
          columnSqls.push(`PRIMARY KEY (${tableDef.primaryKey})`);
        }
        await connection.query(`
          CREATE TABLE \`${tableDef.name}\` (
            ${columnSqls.join(",\n            ")}
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);
      } else {
        const [existingCols]: [any[], any] = await connection.query(
          `SELECT COLUMN_NAME FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ?`,
          [tableDef.name]
        );
        const existingColNames = new Set(existingCols.map((c: any) => c.COLUMN_NAME.toLowerCase()));

        for (const [colName, colType] of Object.entries(tableDef.columns)) {
          if (!existingColNames.has(colName.toLowerCase())) {
            await connection.query(`ALTER TABLE \`${tableDef.name}\` ADD COLUMN \`${colName}\` ${colType};`);
          }
        }
      }
    }
    isSchemaInitialized = true;
    return true;
  } catch (err) {
    console.warn("[MySQL Frontend Auto-Migrate] Notice:", err);
    return false;
  } finally {
    if (connection) connection.release();
  }
}

// -------------------------------------------------------------
// CRUD Operations with Filtering & Search
// -------------------------------------------------------------

export async function saveBookingToMySql(data: {
  reference: string;
  full_name: string;
  phone: string;
  email: string;
  customer_type: string;
  solution: string;
  property_type: string;
  city: string;
  preferred_date?: string;
  preferred_time?: string;
  requirements?: string | null;
}) {
  await autoMigrate();
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
        data.preferred_date || null,
        data.preferred_time || "10:00 AM - 01:00 PM",
        data.requirements || null,
      ]
    );
    return true;
  } catch (err) {
    console.error("[MySQL Frontend] Failed to save booking:", err);
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
  await autoMigrate();
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
    return true;
  } catch (err) {
    console.error("[MySQL Frontend] Failed to save enquiry:", err);
    return false;
  }
}

export async function getBookingsFromMySql(filterStatus?: string) {
  await autoMigrate();
  const p = getMySqlPool();
  if (!p) return [];
  try {
    const query = filterStatus
      ? `SELECT * FROM demo_bookings WHERE status = ? ORDER BY created_at DESC`
      : `SELECT * FROM demo_bookings ORDER BY created_at DESC`;
    const params = filterStatus ? [filterStatus] : [];
    const [rows]: [any[], any] = await p.query(query, params);
    return rows;
  } catch {
    return [];
  }
}

export async function getEnquiriesFromMySql(filterStatus?: string) {
  await autoMigrate();
  const p = getMySqlPool();
  if (!p) return [];
  try {
    const query = filterStatus
      ? `SELECT * FROM enquiries WHERE status = ? ORDER BY created_at DESC`
      : `SELECT * FROM enquiries ORDER BY created_at DESC`;
    const params = filterStatus ? [filterStatus] : [];
    const [rows]: [any[], any] = await p.query(query, params);
    return rows;
  } catch {
    return [];
  }
}
