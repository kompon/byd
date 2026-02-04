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

-- Create milestones table for Timeline section
CREATE TABLE IF NOT EXISTS milestones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    year VARCHAR(10) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url TEXT,
    display_order INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default milestones data
INSERT INTO milestones (year, title, description, image_url, display_order) VALUES
('2018', 'ก่อตั้งบริษัท', 'Pride Auto Group เริ่มต้นจากความมุ่งมั่นในการนำเสนอยานยนต์ไฟฟ้าคุณภาพสูงสู่ตลาดประเทศไทย', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800', 1),
('2020', 'เปิดโชว์รูมแห่งแรก', 'เปิดตัวโชว์รูม BYD แห่งแรกในกรุงเทพฯ พร้อมทีมงานมืออาชีพ', 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=800', 2),
('2022', 'ขยายสาขาทั่วประเทศ', 'ขยายเครือข่ายโชว์รูมครอบคลุม 5 จังหวัดหลัก เพื่อบริการลูกค้าทั่วประเทศ', 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800', 3),
('2024', 'ผู้นำตลาด EV', 'ก้าวขึ้นสู่ตำแหน่งผู้นำตลาดยานยนต์ไฟฟ้าอันดับ 1 ด้วยยอดขายสูงสุด', 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=800', 4);
