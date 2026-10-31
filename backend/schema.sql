-- Amaravati Solar Solutions - MySQL Database Schema
-- Hostinger MySQL Database: u236567282_Amaravthisolar

CREATE DATABASE IF NOT EXISTS `u236567282_Amaravthisolar` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `u236567282_Amaravthisolar`;

-- 1. Enquiries & Proposals Table
CREATE TABLE IF NOT EXISTS `enquiries` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `full_name` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `customer_type` VARCHAR(100) NOT NULL DEFAULT 'Residential',
  `service` VARCHAR(100) NOT NULL DEFAULT 'Rooftop Solar',
  `city` VARCHAR(100) NOT NULL DEFAULT 'Amaravati',
  `message` TEXT,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Demo Bookings Table
CREATE TABLE IF NOT EXISTS `demo_bookings` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `reference` VARCHAR(50) NOT NULL UNIQUE,
  `full_name` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `customer_type` VARCHAR(100) NOT NULL DEFAULT 'Residential',
  `solution` VARCHAR(100) NOT NULL DEFAULT 'On-Grid Solar',
  `property_type` VARCHAR(100) NOT NULL DEFAULT 'Independent House',
  `city` VARCHAR(100) NOT NULL DEFAULT 'Amaravati',
  `preferred_date` DATE NOT NULL,
  `preferred_time` VARCHAR(50) NOT NULL DEFAULT '10:00 AM - 01:00 PM',
  `requirements` TEXT,
  `status` VARCHAR(50) NOT NULL DEFAULT 'pending',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
