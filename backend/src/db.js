import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "u236567282_Amaravthisolar",
  password: process.env.DB_PASSWORD || "Amaravthi@123",
  database: process.env.DB_NAME || "u236567282_Amaravthisolar",
  port: Number(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000,
});

/**
 * Universal Declarative Schema Registry
 * Any table or column added here will be automatically created or added on redeploy!
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
  {
    name: "admin_users",
    primaryKey: "`id`",
    columns: {
      id: "INT AUTO_INCREMENT",
      email: "VARCHAR(255) NOT NULL UNIQUE",
      password_hash: "VARCHAR(255) NOT NULL",
      role: "VARCHAR(50) NOT NULL DEFAULT 'admin'",
      created_at: "TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP",
      updated_at: "TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
    },
  },
];

/**
 * Automatically creates all tables and synchronizes new columns whenever redeployed.
 */
export async function syncDatabaseSchema() {
  let connection;
  try {
    connection = await pool.getConnection();
    console.log(`[Auto-Migration] Running schema check on database: ${process.env.DB_NAME || "u236567282_Amaravthisolar"}`);

    for (const tableDef of SCHEMA_DEFINITIONS) {
      // 1. Check if table exists
      const [tables] = await connection.query(
        `SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ?`,
        [tableDef.name]
      );

      if (tables.length === 0) {
        // Table does not exist -> Create it with all columns & primary key
        const columnSqls = Object.entries(tableDef.columns).map(
          ([colName, colType]) => `\`${colName}\` ${colType}`
        );
        if (tableDef.primaryKey) {
          columnSqls.push(`PRIMARY KEY (${tableDef.primaryKey})`);
        }

        const createQuery = `
          CREATE TABLE \`${tableDef.name}\` (
            ${columnSqls.join(",\n            ")}
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `;
        await connection.query(createQuery);
        console.log(`[Auto-Migration] Created table: ${tableDef.name}`);
      } else {
        // Table exists -> Check for any missing columns (schema evolution)
        const [existingCols] = await connection.query(
          `SELECT COLUMN_NAME FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ?`,
          [tableDef.name]
        );
        const existingColNames = new Set(existingCols.map((c) => c.COLUMN_NAME.toLowerCase()));

        for (const [colName, colType] of Object.entries(tableDef.columns)) {
          if (!existingColNames.has(colName.toLowerCase())) {
            const alterQuery = `ALTER TABLE \`${tableDef.name}\` ADD COLUMN \`${colName}\` ${colType};`;
            await connection.query(alterQuery);
            console.log(`[Auto-Migration] Added new column '${colName}' to table '${tableDef.name}'`);
          }
        }
      }
    }

    console.log("[Auto-Migration] All tables and columns are up to date.");
    return { success: true };
  } catch (error) {
    console.warn("[Auto-Migration] Notice:", error.message);
    return { success: false, error: error.message };
  } finally {
    if (connection) connection.release();
  }
}

// Startup alias
export const initDatabase = syncDatabaseSchema;

/**
 * Universal Query Engine with Dynamic Filtering, Search, Sorting & Pagination
 */
export async function queryTable(tableName, options = {}) {
  const {
    filters = {},
    search = "",
    searchFields = [],
    startDate = null,
    endDate = null,
    dateField = "created_at",
    sort = "created_at",
    order = "DESC",
    page = 1,
    limit = 50,
  } = options;

  const conditions = [];
  const params = [];

  // 1. Exact filters (e.g. status: 'pending', category: 'SOLAR')
  for (const [key, value] of Object.entries(filters)) {
    if (value !== undefined && value !== null && value !== "") {
      conditions.push(`\`${key}\` = ?`);
      params.push(value);
    }
  }

  // 2. Keyword Search across specified text fields
  if (search && searchFields.length > 0) {
    const searchClauses = searchFields.map((f) => `\`${f}\` LIKE ?`);
    conditions.push(`(${searchClauses.join(" OR ")})`);
    const searchPattern = `%${search}%`;
    for (let i = 0; i < searchFields.length; i++) {
      params.push(searchPattern);
    }
  }

  // 3. Date range filter
  if (startDate) {
    conditions.push(`\`${dateField}\` >= ?`);
    params.push(startDate);
  }
  if (endDate) {
    conditions.push(`\`${dateField}\` <= ?`);
    params.push(endDate);
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
  const sanitizedSort = sort.replace(/[^a-zA-Z0-9_]/g, "");
  const sanitizedOrder = order.toUpperCase() === "ASC" ? "ASC" : "DESC";

  // Count total matching records
  const countQuery = `SELECT COUNT(*) AS total FROM \`${tableName}\` ${whereClause}`;
  const [countResult] = await pool.query(countQuery, params);
  const total = countResult[0]?.total || 0;

  // Pagination calculation
  const offset = (Math.max(1, Number(page)) - 1) * Math.max(1, Number(limit));
  const pagedLimit = Math.max(1, Number(limit));

  // Query records
  const dataQuery = `
    SELECT * FROM \`${tableName}\`
    ${whereClause}
    ORDER BY \`${sanitizedSort}\` ${sanitizedOrder}
    LIMIT ? OFFSET ?
  `;
  const [rows] = await pool.query(dataQuery, [...params, pagedLimit, offset]);

  return {
    data: rows,
    total,
    page: Number(page),
    limit: pagedLimit,
    totalPages: Math.ceil(total / pagedLimit),
  };
}

/**
 * Universal Insert / Create
 */
export async function insertRow(tableName, data) {
  const fields = Object.keys(data);
  const values = Object.values(data);
  const placeholders = fields.map(() => "?").join(", ");
  const query = `INSERT INTO \`${tableName}\` (\`${fields.join("`, `")}\`) VALUES (${placeholders})`;
  const [result] = await pool.query(query, values);
  return result;
}

/**
 * Universal Update by ID or key
 */
export async function updateRow(tableName, id, data, idField = "id") {
  const fields = Object.keys(data).filter((k) => k !== idField);
  if (fields.length === 0) return null;

  const setClause = fields.map((k) => `\`${k}\` = ?`).join(", ");
  const values = fields.map((k) => data[k]);
  values.push(id);

  const query = `UPDATE \`${tableName}\` SET ${setClause} WHERE \`${idField}\` = ?`;
  const [result] = await pool.query(query, values);
  return result;
}

/**
 * Universal Delete by ID or key
 */
export async function deleteRow(tableName, id, idField = "id") {
  const query = `DELETE FROM \`${tableName}\` WHERE \`${idField}\` = ?`;
  const [result] = await pool.query(query, [id]);
  return result;
}
