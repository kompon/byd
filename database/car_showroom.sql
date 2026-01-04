-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 04, 2026 at 06:52 PM
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
(3, 'DOLPHIN XT', 'dolphin-xt', 'สวยๆๆๆๆ', 850000.00, 'active', '/uploads/1767518570171_seal5-dm-i-horizon-white.webp', '2026-01-04 09:02:57', '2026-01-04 16:34:33');

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
(14, 3, 'standard', 10000.00, '2026-01-04 14:38:17'),
(15, 3, 'premime', 256000.00, '2026-01-04 14:38:17');

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
(1, 'เทส', 'เทส', '2020', 'Trophy', NULL, 1, 1, '2026-01-04 08:04:37', '2026-01-04 08:04:37'),
(2, '1', '1', NULL, 'Trophy', NULL, 2, 1, '2026-01-04 08:05:14', '2026-01-04 08:05:14'),
(3, '3', '3', NULL, 'Trophy', NULL, 3, 1, '2026-01-04 08:05:17', '2026-01-04 08:05:17');

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
(4, 'เทส', 'เทส', 'news', 'ทดสอบ', 'ทดสอบ', '/uploads/1767548150249_Screenshot_2025-12-21_193253.png', '2026-01-05', '2026-01-05', 1, '2026-01-05 00:36:01', '2026-01-05 00:36:01');

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
(67, 'hero_background_image_url', 'https://youtu.be/hSeUpI0p7jA', NULL);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `car_model_gallery`
--
ALTER TABLE `car_model_gallery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `car_variants`
--
ALTER TABLE `car_variants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `homepage_awards`
--
ALTER TABLE `homepage_awards`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `navbar_items`
--
ALTER TABLE `navbar_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `promotions`
--
ALTER TABLE `promotions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=186;

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
