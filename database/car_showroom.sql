-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 05, 2026 at 01:01 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `car_showroom`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `username`, `password_hash`, `created_at`, `updated_at`) VALUES
(1, 'admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '2026-01-04 09:02:57', '2026-01-04 09:02:57');

-- --------------------------------------------------------

--
-- Table structure for table `car_models`
--

CREATE TABLE `car_models` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `base_price` decimal(10,2) DEFAULT 0.00,
  `status` enum('active','inactive') DEFAULT 'active',
  `main_image_url` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `car_models`
--

INSERT INTO `car_models` (`id`, `name`, `slug`, `description`, `base_price`, `status`, `main_image_url`, `created_at`, `updated_at`) VALUES
(6, 'BYD SEAL 5 DM-i super hybrid', 'byd-seal-5-dm-i-super-hybrid', 'UNLEASH YOUR IMAGINATION', 0.00, 'active', '/uploads/1767576700443_BYD_SEAL_5_DM-i_super_hybrid.png', '2026-01-05 08:33:22', '2026-01-05 08:35:24'),
(7, 'BYD SEALION 7', 'byd-sealion-7', 'LIFE IN MOTION', 0.00, 'active', '/uploads/1767576902097_BYD_SEALION_7.png', '2026-01-05 08:35:09', '2026-01-05 08:35:09'),
(8, 'BYD M6', 'byd-m6', 'Where Life Comes Together', 0.00, 'active', '/uploads/1767577003128_BYD_M6.png', '2026-01-05 08:36:45', '2026-01-05 08:36:45'),
(9, 'BYD SEALION 6 DM-i', 'byd-sealion-6-dm-i', 'EFFICIENCY UNLEASHED', 0.00, 'active', '/uploads/1767577047221_BYD_SEALION_6_DM-i.png', '2026-01-05 08:38:11', '2026-01-05 08:38:11'),
(10, 'BYD Seal', 'byd-seal', 'DRIVE INTO THE FUTURE', 0.00, 'active', '/uploads/1767577174369_BYD_Seal.png', '2026-01-05 08:39:35', '2026-01-05 08:39:35'),
(11, 'New BYD Atto 3', 'new-byd-atto-3', 'ENERGY AWAKEN', 0.00, 'active', '/uploads/1767577260323_New_BYD_Atto_3.png', '2026-01-05 08:41:04', '2026-01-05 08:41:04'),
(12, 'New BYD Dolphin', 'new-byd-dolphin', 'SURGE OF INNOVATION', 0.00, 'active', '/uploads/1767577284920_New_BYD_Dolphin.png', '2026-01-05 08:41:49', '2026-01-05 08:41:49');

-- --------------------------------------------------------

--
-- Table structure for table `car_model_gallery`
--

CREATE TABLE `car_model_gallery` (
  `id` int(11) NOT NULL,
  `car_model_id` int(11) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `caption` varchar(100) DEFAULT NULL,
  `sort_order` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `car_variants`
--

CREATE TABLE `car_variants` (
  `id` int(11) NOT NULL,
  `car_model_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL DEFAULT 0.00,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `car_variants`
--

INSERT INTO `car_variants` (`id`, `car_model_id`, `name`, `price`, `created_at`) VALUES
(17, 7, ' Premium', 1249900.00, '2026-01-05 01:35:09'),
(18, 7, 'AWD Performance', 1399900.00, '2026-01-05 01:35:09'),
(19, 6, ' Premium', 769900.00, '2026-01-05 01:35:24'),
(20, 8, 'Extended', 929900.00, '2026-01-05 01:36:45'),
(21, 8, 'Dynamic', 829900.00, '2026-01-05 01:36:45'),
(22, 9, 'Premium', 1099900.00, '2026-01-05 01:38:11'),
(23, 9, 'Dynamic', 999900.00, '2026-01-05 01:38:11'),
(24, 10, 'Dynamic', 1325000.00, '2026-01-05 01:39:35'),
(25, 10, 'Premium', 1449000.00, '2026-01-05 01:39:35'),
(26, 10, 'AWD Performance', 1599000.00, '2026-01-05 01:39:35'),
(27, 11, 'Extended', 1049900.00, '2026-01-05 01:41:04'),
(28, 11, 'Premium', 949900.00, '2026-01-05 01:41:04'),
(29, 12, 'Extended Range', 709900.00, '2026-01-05 01:41:49'),
(30, 12, 'Standard Range', 569900.00, '2026-01-05 01:41:49');

-- --------------------------------------------------------

--
-- Table structure for table `homepage_awards`
--

CREATE TABLE `homepage_awards` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `year` varchar(10) DEFAULT NULL,
  `icon` varchar(50) DEFAULT 'Trophy',
  `image_url` text DEFAULT NULL,
  `display_order` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `homepage_awards`
--

INSERT INTO `homepage_awards` (`id`, `title`, `description`, `year`, `icon`, `image_url`, `display_order`, `is_active`, `created_at`, `updated_at`) VALUES
(4, 'Think of New Energy Vehicle, Think of Pride Auto Group. 🌏🌱💯🚙', '16 ธันวาคม 2568. \nBYD ไพรด์ ออโต้ กาฬสินธุ์ นำทีมขายและทีมช่างเทคนิคที่มีประสบการณ์ ความรู้เกี่ยวกับยานยนต์พลังงานใหม่ ✨พร้อมสนับสนุนรถยนต์ไฟฟ้า 100% ในกิจกรรมการแข่งขันทักษะวิชาชีพ \"ทักษะยานยนต์ไฟฟ้า\" ระดับ ปวส. ณ อาชีวศึกษาจังหวัดกาฬสินธุ์ \nเราดีใจที่ได้เป็นส่วนหนึ่งในการสนับสนุน ส่งเสริมการเพิ่มทักษะ ความรู้และประสบการณ์เกี่ยวกับยานยนต์พลังงานใหม่ ให้กับน้องๆเยาวชน ซึ่งจะเติบโตไปเป็นกำลังสำคัญของประเทศ 🇹🇭🚙💯', '2025', 'Star', '/uploads/1767578795419_600309578_836791629340050_643303471364685170_n.jpg', 1, 1, '2026-01-05 02:06:37', '2026-01-05 02:06:37'),
(5, 'อีกหนึ่งความภาคภูมิใจของเรา ⭐️⭐️⭐️⭐️⭐️ ขอแสดงความยินดีกับ \"ช่างจื้อ\" - คุณโสธร สำอางเนตร (หัวหน้าช่างเทคนิค -ไพรด์ ออโต้ กรุ๊ป) กับรางวัล THE ADMIRATION AWARD', '🌟SERVICE WITH PRIDE 🌟🏆\nไพรด์ ออโต้ กรุ๊ป - การันตีดีลเลอร์คุณภาพ \nด้วยคะแนนความพึงพอใจลูกค้า ด้านบริการ NPS \nอันดับ 1 ของประเทศไทยปี 2567\nขอขอบพระคุณลูกค้าทุกท่านที่ให้ความไว้วางใจ\nและสนับสนุนตลอดมา', '2025', 'Trophy', '/uploads/1767579008572_573614514_802135752805638_3223509054915257740_n.jpg', 2, 1, '2026-01-05 02:10:10', '2026-01-05 02:10:10');

-- --------------------------------------------------------

--
-- Table structure for table `navbar_items`
--

CREATE TABLE `navbar_items` (
  `id` int(11) NOT NULL,
  `label` varchar(50) NOT NULL,
  `href` varchar(100) NOT NULL,
  `sort_order` int(11) DEFAULT 0,
  `is_visible` tinyint(1) DEFAULT 1,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `navbar_items`
--

INSERT INTO `navbar_items` (`id`, `label`, `href`, `sort_order`, `is_visible`, `created_at`, `updated_at`) VALUES
(1, 'รุ่นรถ', '#models', 1, 1, '2026-01-04 09:02:58', '2026-01-04 09:02:58'),
(2, 'ข่าวสารและโปรโมชั่น', '#news', 2, 1, '2026-01-04 09:02:58', '2026-01-04 09:02:58'),
(3, 'ติดต่อ', '#contact', 3, 1, '2026-01-04 09:02:58', '2026-01-04 09:02:58');

-- --------------------------------------------------------

--
-- Table structure for table `promotions`
--

CREATE TABLE `promotions` (
  `id` int(11) NOT NULL,
  `title` varchar(200) NOT NULL,
  `slug` varchar(200) NOT NULL,
  `type` enum('news','promotion') NOT NULL,
  `short_description` text DEFAULT NULL,
  `content` text DEFAULT NULL,
  `banner_image_url` varchar(255) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `promotions`
--

INSERT INTO `promotions` (`id`, `title`, `slug`, `type`, `short_description`, `content`, `banner_image_url`, `start_date`, `end_date`, `is_active`, `created_at`, `updated_at`) VALUES
(5, '‼️ ทักได้ทุกช่องทางค่ะ 🚙🩵 ไพรด์ ออโต้ กรุ๊ป รับจองต่อ มุ่งสู่ยอดจอง 100 คัน สำหรับเดือนธันวาคม 68 นี้ 🩵 สอบถามโปร EV 3.0 Expo ทัก Inbox เพจได้เลยค่ะ', '‼️-ทักได้ทุกช่องทางค่ะ-🚙🩵-ไพรด์-ออโต้-กรุ๊ป-รับจองต่อ-มุ่งสู่ยอดจอง-100-คัน-สำหรับเดือนธันวาคม-68-นี้-🩵-สอบถามโปร-ev-3.0-expo-ทัก-inbox-เพจได้เลยค่ะ', 'promotion', '', NULL, '/uploads/1767577507489_603921805_843533615332518_1544266956487828972_n.jpg', '2026-12-11', '2026-12-31', 1, '2026-01-05 08:45:57', '2026-01-05 08:45:57'),
(6, '👉 ชี้เป้า 3 รุ่นขายดี ประจำเดือนนี้ 💥ห้ามพลาด ‼️ถึง 31 ธ.ค. 68 นี้เท่านั้น ก่อนจบมาตรการ EV 3.0 ข้อเสนอเดียวกับ MOTOR EXPO 2025*', '👉-ชี้เป้า-3-รุ่นขายดี-ประจำเดือนนี้-💥ห้ามพลาด-‼️ถึง-31-ธ.ค.-68-นี้เท่านั้น-ก่อนจบมาตรการ-ev-3.0-ข้อเสนอเดียวกับ-motor-expo-2025*', 'promotion', '📍สนใจทดลองขับ หรือสอบถามโปรโมชั่นเพิ่มเติมได้ที่โชว์รูม BYD ไพรด์ ออโต้ กรุ๊ป ทุกสาขา', NULL, '/uploads/1767577712500_602333031_840780692274477_4679538744395343681_n.jpg', '2026-12-11', '2026-12-31', 1, '2026-01-05 08:48:56', '2026-01-05 08:48:56'),
(12, '‼️ ทักได้ทุกช่องทางค่ะ 🚙🩵 ไพรด์ ออโต้ กรุ๊ป รับจองต่อ มุ่งสู่ยอดจอง 100 คัน สำหรับเดือนธันวาคม 68 นี้ 🩵 สอบถามโปร EV 3.0 Expo ทัก Inbox เพจได้เลยค่ะ', '', 'promotion', NULL, NULL, '/uploads/1767577842682_600492359_843535645332315_8949518785855824849_n.jpg', NULL, NULL, 1, '2026-01-05 08:51:20', '2026-01-05 08:51:20');

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` int(11) NOT NULL,
  `key_name` varchar(100) NOT NULL,
  `value` text DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `key_name`, `value`, `description`) VALUES
(1, 'site_title', 'BYD PRIDE AUTO', 'Title of the website'),
(2, 'hero_headline', '/uploads/1767543596901_LOGO_BYD.png', 'Main headline on hero section'),
(3, 'hero_subheadline', 'สัมผัสประสบการณ์การเลือกซื้อรถยนต์ไฟฟ้าและรถหรูในแบบของคุณ', 'Subheadline on hero section'),
(4, 'primary_color', '#cc913b', 'Main gold accent color'),
(5, 'navbar_bg_color', 'rgba(0,0,0,0.8)', 'Navbar background color'),
(11, 'site_logo_url', '/uploads/1767543629676_LOGO_BYD.png', NULL),
(60, 'popup_is_active', '0', NULL),
(61, 'popup_image_url', '', NULL),
(62, 'popup_link_url', '', NULL),
(63, 'popup_show_once_per_session', '1', NULL),
(67, 'hero_background_image_url', 'https://youtu.be/hSeUpI0p7jA', NULL),
(191, 'contact_line_1', '@bydmhk', NULL),
(192, 'contact_phone_1', ' 0659554666', NULL),
(199, 'contact_address_1', 'สี่แยกบายพาส (เยื้องตลาดเกษตร), Maha Sarakham, Thailand, Maha Sarakham', NULL),
(200, 'contact_phone_2', ' 0610954987', NULL),
(201, 'contact_line_2', '@bydkalasin', NULL),
(202, 'contact_address_2', '222/3 ถ.กุดยางสามัคคี ต.กาฬสินธุ์, Kalasin, Thailand, Kalasin', NULL),
(203, 'contact_map_url_2', '<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3826.9709406118463!2d103.48322907514353!3d16.426302184306117!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3122b581488076cf%3A0xbde8222f4e7c36ea!2sBYD%20Pride%20Auto%20Kalasin!5e0!3m2!1sen!2sth!4v1767578498397!5m2!1sen!2sth\" width=\"400\" height=\"300\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>', NULL),
(258, 'contact_name_1', 'BYD Pride auto สารคาม', NULL),
(259, 'contact_name_2', 'BYD Pride auto กาฬสินธุ์', NULL),
(320, 'contact_map_url_1', '<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1915.721624033638!2d103.2597550749779!3d16.19763680930569!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3122a1001b0203ad%3A0x2984bb184294e71b!2zQllEIFByaWRlIEF1dG8g4Lia4Li14Lin4Liy4Lii4LiU4Li1IOC5hOC4nuC4o-C4lOC5jCDguK3guK3guYLguJXguYkg4Lih4Lir4Liy4Liq4Liy4Lij4LiE4Liy4Lih!5e0!3m2!1sen!2sth!4v1767582299438!5m2!1sen!2sth\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `car_models`
--
ALTER TABLE `car_models`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `car_model_gallery`
--
ALTER TABLE `car_model_gallery`
  ADD PRIMARY KEY (`id`),
  ADD KEY `car_model_id` (`car_model_id`);

--
-- Indexes for table `car_variants`
--
ALTER TABLE `car_variants`
  ADD PRIMARY KEY (`id`),
  ADD KEY `car_model_id` (`car_model_id`);

--
-- Indexes for table `homepage_awards`
--
ALTER TABLE `homepage_awards`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `navbar_items`
--
ALTER TABLE `navbar_items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `promotions`
--
ALTER TABLE `promotions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `key_name` (`key_name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `car_models`
--
ALTER TABLE `car_models`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `car_model_gallery`
--
ALTER TABLE `car_model_gallery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `car_variants`
--
ALTER TABLE `car_variants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `homepage_awards`
--
ALTER TABLE `homepage_awards`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `navbar_items`
--
ALTER TABLE `navbar_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `promotions`
--
ALTER TABLE `promotions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=321;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `car_model_gallery`
--
ALTER TABLE `car_model_gallery`
  ADD CONSTRAINT `car_model_gallery_ibfk_1` FOREIGN KEY (`car_model_id`) REFERENCES `car_models` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `car_variants`
--
ALTER TABLE `car_variants`
  ADD CONSTRAINT `car_variants_ibfk_1` FOREIGN KEY (`car_model_id`) REFERENCES `car_models` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
