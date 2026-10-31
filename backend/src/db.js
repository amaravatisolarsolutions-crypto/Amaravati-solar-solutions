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

export async function initDatabase() {
  try {
    const connection = await pool.getConnection();
    console.log(`[MySQL] Connected successfully to database: ${process.env.DB_NAME || "u236567282_Amaravthisolar"}`);

    // Create enquiries table if not exists
    await connection.query(`
      CREATE TABLE IF NOT EXISTS enquiries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        email VARCHAR(255) NOT NULL,
        customer_type VARCHAR(100) NOT NULL DEFAULT 'Residential',
        service VARCHAR(100) NOT NULL DEFAULT 'Rooftop Solar',
        city VARCHAR(100) NOT NULL DEFAULT 'Amaravati',
        message TEXT,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // Create demo_bookings table if not exists
    await connection.query(`
      CREATE TABLE IF NOT EXISTS demo_bookings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        reference VARCHAR(50) NOT NULL UNIQUE,
        full_name VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        email VARCHAR(255) NOT NULL,
        customer_type VARCHAR(100) NOT NULL DEFAULT 'Residential',
        solution VARCHAR(100) NOT NULL DEFAULT 'On-Grid Solar',
        property_type VARCHAR(100) NOT NULL DEFAULT 'Independent House',
        city VARCHAR(100) NOT NULL DEFAULT 'Amaravati',
        preferred_date DATE NOT NULL,
        preferred_time VARCHAR(50) NOT NULL DEFAULT '10:00 AM - 01:00 PM',
        requirements TEXT,
        status VARCHAR(50) NOT NULL DEFAULT 'pending',
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    connection.release();
    console.log("[MySQL] Tables verified / initialized successfully (enquiries, demo_bookings).");
    return true;
  } catch (error) {
    console.warn("[MySQL] Database connection warning:", error.message);
    return false;
  }
}
