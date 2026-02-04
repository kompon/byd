-- สร้างตาราง activities สำหรับ Latest Activities
-- Run คำสั่งนี้ใน phpMyAdmin หรือ MySQL Console

CREATE TABLE IF NOT EXISTS activities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    url VARCHAR(500) NOT NULL,
    platform ENUM('tiktok', 'facebook', 'instagram', 'youtube') NOT NULL DEFAULT 'tiktok',
    description TEXT,
    thumbnail_url TEXT,
    display_order INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
