-- สร้างตาราง milestones สำหรับ Timeline
-- Run คำสั่งนี้ใน phpMyAdmin หรือ MySQL Console

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

-- ตัวอย่างข้อมูล (ไม่จำเป็นต้อง run ถ้าต้องการใส่ข้อมูลเองใน Admin)
-- INSERT INTO milestones (year, title, description, image_url, display_order) VALUES
-- ('2018', 'ก่อตั้งบริษัท', 'Pride Auto Group เริ่มต้นจากความมุ่งมั่นในการนำเสนอยานยนต์ไฟฟ้าคุณภาพสูงสู่ตลาดประเทศไทย', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800', 1),
-- ('2020', 'เปิดโชว์รูมแห่งแรก', 'เปิดตัวโชว์รูม BYD แห่งแรกในกรุงเทพฯ พร้อมทีมงานมืออาชีพ', 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=800', 2);
