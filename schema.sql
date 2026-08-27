-- Karunik Kalyan Samiti — MySQL database schema
-- Run this once inside phpMyAdmin (or the MySQL command line) to set up the database and tables.

CREATE DATABASE IF NOT EXISTS karunik_kalyan_samiti
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE karunik_kalyan_samiti;

CREATE TABLE IF NOT EXISTS volunteers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(150),
  village VARCHAR(150),
  interests VARCHAR(500),
  message TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS donations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150),
  phone VARCHAR(20),
  amount INT,
  note VARCHAR(500),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
