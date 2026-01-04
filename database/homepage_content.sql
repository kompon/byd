-- Create homepage_awards table for "รู้จักกับเรา" section
CREATE TABLE IF NOT EXISTS homepage_awards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    year VARCHAR(10),
    icon VARCHAR(50) DEFAULT 'Trophy',
    image_url TEXT,
    display_order INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default awards data
INSERT INTO homepage_awards (title, description, year, icon, image_url, display_order) VALUES
('รางวัลโชว์รูมยอดเยี่ยม 2024', 'ได้รับการยกย่องจากสมาคมผู้จำหน่ายรถยนต์ไฟฟ้าแห่งประเทศไทย', '2024', 'Trophy', 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=800', 1),
('รางวัลบริการลูกค้าดีเด่น', 'ความพึงพอใจของลูกค้าสูงสุดในระดับ 5 ดาว', '2023', 'Star', 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=800', 2),
('รางวัลนวัตกรรมยานยนต์สีเขียว', 'ผู้นำด้านการส่งเสริมพลังงานสะอาดและยั่งยืน', '2023', 'Award', 'https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?auto=format&fit=crop&q=80&w=800', 3),
('รางวัลความเป็นเลิศด้านการขาย', 'ยอดขายสูงสุดในภูมิภาคเอเชียตะวันออกเฉียงใต้', '2022', 'Medal', 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800', 4);
