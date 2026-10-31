<?php
// =============================================================
// Amaravati Solar Solutions - Hostinger MySQL Auto-Setup
// Database: u236567282_Amaravthisolar
// =============================================================

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

// Read credentials from Environment or defaults
$host = getenv('DB_HOST') ?: (getenv('HOST') ?: 'localhost');
$user = getenv('DB_USER') ?: (getenv('USERNAME') ?: 'u236567282_Amaravthisolar');
$pass = getenv('DB_PASSWORD') ?: (getenv('PASSWORD') ?: 'Amaravathi@123');
$db   = getenv('DB_NAME') ?: (getenv('DATABASE_NAME') ?: 'u236567282_Amaravthisolar');
$port = 3306;

try {
    $mysqli = new mysqli($host, $user, $pass, $db, $port);
    if ($mysqli->connect_error) {
        throw new Exception("Connection failed: " . $mysqli->connect_error);
    }

    $mysqli->set_charset("utf8mb4");

    $tables = [
        "enquiries" => "CREATE TABLE IF NOT EXISTS `enquiries` (
            `id` INT AUTO_INCREMENT PRIMARY KEY,
            `full_name` VARCHAR(255) NOT NULL,
            `phone` VARCHAR(50) NOT NULL,
            `email` VARCHAR(255) NOT NULL,
            `customer_type` VARCHAR(100) NOT NULL DEFAULT 'Residential',
            `service` VARCHAR(100) NOT NULL DEFAULT 'Rooftop Solar',
            `city` VARCHAR(100) NOT NULL DEFAULT 'Amaravati',
            `message` TEXT NULL,
            `status` VARCHAR(50) NOT NULL DEFAULT 'New',
            `notes` TEXT NULL,
            `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            INDEX `idx_enquiries_status` (`status`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;",

        "demo_bookings" => "CREATE TABLE IF NOT EXISTS `demo_bookings` (
            `id` INT AUTO_INCREMENT PRIMARY KEY,
            `reference` VARCHAR(50) NOT NULL UNIQUE,
            `full_name` VARCHAR(255) NOT NULL,
            `phone` VARCHAR(50) NOT NULL,
            `email` VARCHAR(255) NOT NULL,
            `customer_type` VARCHAR(100) NOT NULL DEFAULT 'Residential',
            `solution` VARCHAR(100) NOT NULL DEFAULT 'On-Grid Solar',
            `property_type` VARCHAR(100) NOT NULL DEFAULT 'Independent House',
            `city` VARCHAR(100) NOT NULL DEFAULT 'Amaravati',
            `preferred_date` DATE NULL,
            `preferred_time` VARCHAR(50) NOT NULL DEFAULT '10:00 AM - 01:00 PM',
            `requirements` TEXT NULL,
            `status` VARCHAR(50) NOT NULL DEFAULT 'pending',
            `notes` TEXT NULL,
            `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            INDEX `idx_bookings_ref` (`reference`),
            INDEX `idx_bookings_status` (`status`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;",

        "services" => "CREATE TABLE IF NOT EXISTS `services` (
            `id` VARCHAR(50) NOT NULL PRIMARY KEY,
            `title` VARCHAR(255) NOT NULL,
            `service_order` INT NOT NULL DEFAULT 1,
            `category` VARCHAR(100) NOT NULL DEFAULT 'SOLAR',
            `description` TEXT NULL,
            `image` VARCHAR(500) NULL,
            `status` VARCHAR(50) NOT NULL DEFAULT 'Active',
            `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;",

        "projects" => "CREATE TABLE IF NOT EXISTS `projects` (
            `id` VARCHAR(50) NOT NULL PRIMARY KEY,
            `title` VARCHAR(255) NOT NULL,
            `category` VARCHAR(100) NOT NULL DEFAULT 'Residential',
            `client` VARCHAR(255) NULL,
            `capacity` VARCHAR(100) NULL,
            `location` VARCHAR(255) NULL,
            `image` VARCHAR(500) NULL,
            `description` TEXT NULL,
            `status` VARCHAR(50) NOT NULL DEFAULT 'Completed',
            `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;",

        "quotations" => "CREATE TABLE IF NOT EXISTS `quotations` (
            `id` VARCHAR(50) NOT NULL PRIMARY KEY,
            `quotation_no` VARCHAR(100) NOT NULL UNIQUE,
            `date` VARCHAR(50) NULL,
            `valid_upto` VARCHAR(50) NULL,
            `customer_name` VARCHAR(255) NOT NULL,
            `customer_phone` VARCHAR(50) NOT NULL,
            `customer_address` TEXT NULL,
            `system_capacity` VARCHAR(100) NULL,
            `housing_type` VARCHAR(100) NULL,
            `subsidy_type` VARCHAR(100) NULL,
            `items_json` LONGTEXT NULL,
            `site_details_json` LONGTEXT NULL,
            `subtotal` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
            `gst_amount` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
            `total_amount` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
            `subsidy_amount` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
            `from_hand` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
            `status` VARCHAR(50) NOT NULL DEFAULT 'Pending',
            `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;",

        "admin_users" => "CREATE TABLE IF NOT EXISTS `admin_users` (
            `id` INT AUTO_INCREMENT PRIMARY KEY,
            `email` VARCHAR(255) NOT NULL UNIQUE,
            `password_hash` VARCHAR(255) NOT NULL,
            `role` VARCHAR(50) NOT NULL DEFAULT 'admin',
            `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;"
    ];

    $created = [];
    foreach ($tables as $name => $sql) {
        if ($mysqli->query($sql) === TRUE) {
            $created[] = $name;
        } else {
            throw new Exception("Error on table $name: " . $mysqli->error);
        }
    }

    $mysqli->close();

    echo json_encode([
        "success" => true,
        "message" => "All 6 tables created successfully in Hostinger MySQL database!",
        "database" => $db,
        "tables" => $created,
        "timestamp" => date('c')
    ], JSON_PRETTY_PRINT);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "error" => $e->getMessage()
    ], JSON_PRETTY_PRINT);
}
