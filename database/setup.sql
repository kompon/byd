-- Create Database
CREATE DATABASE IF NOT EXISTS car_showroom CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE car_showroom;

-- 1. Admins Table
CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Seed Admin (password: "admin")
-- Hash: $2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi
INSERT INTO admins (username, password_hash) VALUES 
('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi')
ON DUPLICATE KEY UPDATE username=username;

-- 2. Car Models Table
CREATE TABLE IF NOT EXISTS car_models (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    base_price DECIMAL(10, 2) DEFAULT 0.00,
    status ENUM('active', 'inactive') DEFAULT 'active',
    main_image_url VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Seed Cars
INSERT INTO car_models (name, slug, base_price, main_image_url, description) VALUES
('SEAL 5', 'seal-5', 1100000.00, 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=800', '500 km range, 0-100 in 5.9s'),
('SEAL 6', 'seal-6', 1400000.00, 'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?auto=format&fit=crop&q=80&w=800', '600 km range, AWD'),
('DOLPHIN XT', 'dolphin-xt', 850000.00, 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800', 'Compact SUV, City Drive'),
('ATTO 3', 'atto-3', 1090000.00, 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=800', 'Family Size, V2L Function')
ON DUPLICATE KEY UPDATE name=name;

-- 3. Car Model Gallery
CREATE TABLE IF NOT EXISTS car_model_gallery (
    id INT AUTO_INCREMENT PRIMARY KEY,
    car_model_id INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    caption VARCHAR(100),
    sort_order INT DEFAULT 0,
    FOREIGN KEY (car_model_id) REFERENCES car_models(id) ON DELETE CASCADE
);

-- 4. Promotions Table
CREATE TABLE IF NOT EXISTS promotions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) NOT NULL UNIQUE,
    type ENUM('news', 'promotion') NOT NULL,
    short_description TEXT,
    content TEXT,
    banner_image_url VARCHAR(255),
    start_date DATE,
    end_date DATE,
    is_active TINYINT(1) DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Seed Promotions
INSERT INTO promotions (title, slug, type, short_description, start_date, is_active) VALUES
('จองวันนี้ รับฟรีประกันภัยชั้น 1', 'free-insurance-promo', 'promotion', 'สิทธิพิเศษสำหรับลูกค้าที่จองรถภายในเดือนนี้ รับฟรีประกันภัยชั้น 1', '2024-01-10', 1),
('เปิดตัวรุ่นใหม่ล่าสุด SEAL 7', 'seal-7-launch', 'news', 'เตรียมพบกับรถยนต์ไฟฟ้ารุ่นใหม่ล่าสุดที่มาพร้อมกับสมรรถนะที่เหนือกว่า', '2024-01-05', 1),
('Test Drive Event ที่ Mega Bangna', 'test-drive-mega', 'news', 'เชิญร่วมทดลองขับรถยนต์ทุกรุ่นได้ที่ลานกิจกรรม Mega Bangna', '2024-01-20', 1)
ON DUPLICATE KEY UPDATE title=title;

-- 5. Settings Table
CREATE TABLE IF NOT EXISTS settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    key_name VARCHAR(100) NOT NULL UNIQUE,
    value TEXT,
    description TEXT
);

-- Seed Settings
INSERT INTO settings (key_name, value, description) VALUES
('site_title', 'PRIDE AUTO Premium Showroom', 'Title of the website'),
('hero_headline', 'โชว์รูมรถยนต์<br/>สไตล์พรีเมียม', 'Main headline on hero section'),
('hero_subheadline', 'สัมผัสประสบการณ์การเลือกซื้อรถยนต์ไฟฟ้าและรถหรูในแบบของคุณ', 'Subheadline on hero section'),
('primary_color', '#cc913b', 'Main gold accent color'),
('navbar_bg_color', 'rgba(0,0,0,0.8)', 'Navbar background color')
ON DUPLICATE KEY UPDATE value=value;

-- 6. Navbar Items Table
CREATE TABLE IF NOT EXISTS navbar_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    label VARCHAR(50) NOT NULL,
    href VARCHAR(100) NOT NULL,
    sort_order INT DEFAULT 0,
    is_visible TINYINT(1) DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Seed Navbar
INSERT INTO navbar_items (label, href, sort_order) VALUES
('รุ่นรถ', '#models', 1),
('ข่าวสารและโปรโมชั่น', '#news', 2),
('ติดต่อ', '#contact', 3)
ON DUPLICATE KEY UPDATE label=label;
