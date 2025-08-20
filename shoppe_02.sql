-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost:8889
-- Thời gian đã tạo: Th8 20, 2025 lúc 02:15 PM
-- Phiên bản máy phục vụ: 8.0.40
-- Phiên bản PHP: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `shoppe_02`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `banners`
--

CREATE TABLE `banners` (
  `id` bigint NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `link_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `position` enum('homepage','category','campaign','under_slider','promo_main') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'homepage',
  `status` enum('active','inactive') COLLATE utf8mb4_unicode_ci DEFAULT 'active',
  `sort_order` int DEFAULT '0',
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `banners`
--

INSERT INTO `banners` (`id`, `title`, `image_url`, `link_url`, `position`, `status`, `sort_order`, `start_date`, `end_date`, `created_at`) VALUES
(1, 'Banner 01', 'uploads/images/image-1754623467349-765635397.jpg', 'http://localhost:5174/products', 'homepage', 'active', 0, NULL, NULL, '2025-08-08 03:24:27'),
(2, 'Slider 2', 'uploads/images/image-1754623498209-481947137.jpg', 'http://localhost:5174/products', 'homepage', 'active', 0, NULL, NULL, '2025-08-08 03:24:58'),
(3, 'Slider 3', 'uploads/images/image-1754623526691-635401859.jpg', 'http://localhost:5174/products', 'homepage', 'active', 0, NULL, NULL, '2025-08-08 03:25:26'),
(4, 'Banner 2', 'uploads/images/image-1754626107131-943507759.jpg', 'http://localhost:5174/products', 'under_slider', 'active', 0, NULL, NULL, '2025-08-08 04:08:27'),
(5, 'Banner 3', 'uploads/images/image-1754626130619-227486509.jpg', '', 'under_slider', 'active', 0, NULL, NULL, '2025-08-08 04:08:50'),
(6, '<h3>only <span>$45</span> per kilogram</h3>', 'uploads/images/image-1755182693325-717008642.jpg', 'http://localhost:5174/', 'promo_main', 'active', 0, '2025-08-13 17:00:00', '2025-08-19 17:00:00', '2025-08-14 14:26:42');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `blogs`
--

CREATE TABLE `blogs` (
  `id` bigint NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` text COLLATE utf8mb4_unicode_ci,
  `summary` text COLLATE utf8mb4_unicode_ci,
  `image_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `author_id` bigint DEFAULT NULL,
  `tags` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('draft','published','hidden') COLLATE utf8mb4_unicode_ci DEFAULT 'draft',
  `published_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `campaigns`
--

CREATE TABLE `campaigns` (
  `id` bigint NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `banner_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `carts`
--

CREATE TABLE `carts` (
  `id` bigint NOT NULL,
  `user_id` bigint DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `carts`
--

INSERT INTO `carts` (`id`, `user_id`, `created_at`, `updated_at`) VALUES
(2, 1, '2025-08-07 04:46:34', '2025-08-07 04:46:34'),
(3, 19, '2025-08-07 08:37:26', '2025-08-07 08:37:26'),
(4, 20, '2025-08-15 14:38:17', '2025-08-15 14:38:17');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cart_items`
--

CREATE TABLE `cart_items` (
  `id` bigint NOT NULL,
  `cart_id` bigint DEFAULT NULL,
  `product_id` bigint DEFAULT NULL,
  `variation_id` bigint DEFAULT NULL,
  `quantity` int DEFAULT '1',
  `selected` tinyint(1) DEFAULT '1',
  `added_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `cart_items`
--

INSERT INTO `cart_items` (`id`, `cart_id`, `product_id`, `variation_id`, `quantity`, `selected`, `added_at`, `created_at`, `updated_at`) VALUES
(8, 3, 20, NULL, 2, 1, '2025-08-07 08:37:26', '2025-08-07 08:37:26', '2025-08-07 08:37:26'),
(9, 3, 5, NULL, 1, 1, '2025-08-07 08:37:26', '2025-08-07 08:37:26', '2025-08-07 08:37:26'),
(10, 3, 11, NULL, 1, 1, '2025-08-07 08:37:50', '2025-08-07 08:37:50', '2025-08-07 08:37:50'),
(11, 3, 23, NULL, 1, 1, '2025-08-07 08:38:46', '2025-08-07 08:38:46', '2025-08-07 08:38:46'),
(18, 4, 23, NULL, 1, 1, '2025-08-15 14:38:17', '2025-08-15 14:38:17', '2025-08-15 14:38:17'),
(19, 2, 23, NULL, 16, 1, '2025-08-16 03:02:36', '2025-08-16 03:02:36', '2025-08-17 00:48:17'),
(20, 2, 20, NULL, 2, 1, '2025-08-16 15:12:17', '2025-08-16 15:12:17', '2025-08-16 15:12:17'),
(21, 2, 6, NULL, 1, 1, '2025-08-19 04:19:09', '2025-08-19 04:19:09', '2025-08-19 04:19:09');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categories`
--

CREATE TABLE `categories` (
  `id` bigint NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `parent_id` bigint DEFAULT NULL,
  `image_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('active','inactive') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `categories`
--

INSERT INTO `categories` (`id`, `name`, `parent_id`, `image_url`, `status`, `created_at`) VALUES
(5, 'Chăm sóc sắc đẹp', NULL, NULL, 'active', '2025-07-29 21:40:27');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `discounts`
--

CREATE TABLE `discounts` (
  `id` bigint NOT NULL,
  `product_id` bigint DEFAULT NULL,
  `percentage` int DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `favorites`
--

CREATE TABLE `favorites` (
  `id` bigint NOT NULL,
  `user_id` bigint DEFAULT NULL,
  `product_id` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `flash_sales`
--

CREATE TABLE `flash_sales` (
  `id` bigint NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `flash_sale_items`
--

CREATE TABLE `flash_sale_items` (
  `id` bigint NOT NULL,
  `flash_sale_id` bigint DEFAULT NULL,
  `product_id` bigint DEFAULT NULL,
  `sale_price` decimal(12,2) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `inventories`
--

CREATE TABLE `inventories` (
  `id` bigint NOT NULL,
  `product_id` bigint DEFAULT NULL,
  `warehouse_id` bigint DEFAULT NULL,
  `stock` int DEFAULT '0',
  `reserved` int DEFAULT '0',
  `inbound` int DEFAULT '0',
  `outbound` int DEFAULT '0',
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `inventory_logs`
--

CREATE TABLE `inventory_logs` (
  `id` bigint NOT NULL,
  `product_id` bigint DEFAULT NULL,
  `warehouse_id` bigint DEFAULT NULL,
  `action` enum('import','export','transfer_in','transfer_out','adjust') COLLATE utf8mb4_unicode_ci NOT NULL,
  `qty` int DEFAULT NULL,
  `note` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ref_order_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `notifications`
--

CREATE TABLE `notifications` (
  `id` bigint NOT NULL,
  `user_id` bigint DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` text COLLATE utf8mb4_unicode_ci,
  `type` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `target_id` bigint DEFAULT NULL,
  `status` enum('unread','read') COLLATE utf8mb4_unicode_ci DEFAULT 'unread',
  `sent_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `read_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `options`
--

CREATE TABLE `options` (
  `id` bigint NOT NULL,
  `option_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `option_value` longtext COLLATE utf8mb4_unicode_ci,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `options`
--

INSERT INTO `options` (`id`, `option_name`, `option_value`, `created_at`, `updated_at`) VALUES
(1, 'primary_color', '#0a923c', '2025-08-07 12:36:49', '2025-08-07 17:10:14'),
(2, 'body_font', '\"Be Vietnam Pro\", sans-serif', '2025-08-07 12:36:49', '2025-08-07 17:10:14'),
(7, 'site_favicon', 'uploads/images/option_image-1754570516458-595328560.jpg', '2025-08-07 12:42:09', '2025-08-07 17:10:14'),
(8, 'site_logo', 'uploads/images/option_image-1754570528103-469627288.png', '2025-08-07 12:42:09', '2025-08-07 17:10:14'),
(13, 'company_address', '174 Phan Văn Đáng, Hoà Xuân, Đà Nẵng', '2025-08-07 16:29:48', '2025-08-07 17:10:14'),
(19, 'company_phone', '0373707024', '2025-08-07 16:29:53', '2025-08-07 17:10:14'),
(20, 'company_email', 'pthanhtuyen2411@gmail.com', '2025-08-07 16:29:53', '2025-08-07 17:10:14'),
(42, 'main_menu', '[\n  {\n    \"id\": 1754585406726,\n    \"label\": \"Trang chủ\",\n    \"url\": \"/\"\n  },\n  {\n    \"id\": 1754585415614,\n    \"label\": \"Sản phẩm\",\n    \"url\": \"/products\"\n  }\n]', '2025-08-07 16:50:35', '2025-08-07 17:10:14');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `id` bigint NOT NULL,
  `user_id` bigint DEFAULT NULL,
  `seller_id` bigint DEFAULT NULL,
  `address_id` bigint DEFAULT NULL,
  `total` decimal(12,2) DEFAULT NULL,
  `shipping_fee` decimal(12,2) DEFAULT '0.00',
  `voucher_id` bigint DEFAULT NULL,
  `status` enum('pending','paid','shipped','completed','cancelled','returned') COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `shipping_status` enum('not_yet','shipping','delivered') COLLATE utf8mb4_unicode_ci DEFAULT 'not_yet',
  `payment_status` enum('unpaid','paid','refunded') COLLATE utf8mb4_unicode_ci DEFAULT 'unpaid',
  `payment_method` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `receiver_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `receiver_phone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `receiver_address` text COLLATE utf8mb4_unicode_ci,
  `note` text COLLATE utf8mb4_unicode_ci,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `seller_id`, `address_id`, `total`, `shipping_fee`, `voucher_id`, `status`, `shipping_status`, `payment_status`, `payment_method`, `receiver_name`, `receiver_phone`, `receiver_address`, `note`, `created_at`, `updated_at`) VALUES
(1, 1, NULL, NULL, 699000.00, 0.00, NULL, 'pending', 'not_yet', 'unpaid', NULL, '', '', ', , , ', '', '2025-08-05 17:42:36', '2025-08-05 17:42:36'),
(2, 20, NULL, NULL, 699000.00, 0.00, NULL, 'pending', 'not_yet', 'unpaid', NULL, 'Tuyen Pham', '0373707024', 'Quế Phong, , , ', 'Ghi chú nhé', '2025-08-05 17:43:55', '2025-08-05 17:43:55'),
(3, 1, NULL, NULL, 699000.00, 0.00, NULL, 'pending', 'not_yet', 'unpaid', NULL, 'P HUYNH THANH TUYEN', '0373707024', ', , , ', '', '2025-08-05 17:52:23', '2025-08-05 17:52:23'),
(4, 20, NULL, NULL, 699000.00, 0.00, NULL, 'pending', 'not_yet', 'unpaid', NULL, 'P HUYNH THANH TUYEN', '0373707024', ', , , ', '', '2025-08-05 17:52:40', '2025-08-05 17:52:40'),
(5, 20, NULL, NULL, 1062000.00, 0.00, NULL, 'pending', 'not_yet', 'unpaid', NULL, 'Tuyen Pham', '0373707024', 'Quế Phong, , , ', '', '2025-08-05 18:01:13', '2025-08-05 18:01:13'),
(6, 20, NULL, NULL, 1062000.00, 0.00, NULL, 'pending', 'not_yet', 'unpaid', NULL, 'Tuyen Pham', '0373707024', 'Quế Phong, , , ', '', '2025-08-05 18:02:01', '2025-08-05 18:02:01'),
(7, 20, NULL, NULL, 1062000.00, 0.00, NULL, 'pending', 'not_yet', 'unpaid', NULL, 'P HUYNH THANH TUYEN', '0373707024', ', , , ', '', '2025-08-05 18:02:31', '2025-08-05 18:02:31'),
(8, 1, NULL, NULL, 1062000.00, 0.00, NULL, 'pending', 'not_yet', 'unpaid', NULL, 'P HUYNH THANH TUYEN', '0373707024', ', , , ', '', '2025-08-05 18:04:36', '2025-08-05 18:04:36'),
(9, 1, NULL, NULL, 1062000.00, 0.00, NULL, 'pending', 'not_yet', 'unpaid', NULL, 'P HUYNH THANH TUYEN', '0373707024', ', , , ', '', '2025-08-05 18:05:19', '2025-08-05 18:05:19'),
(10, 1, NULL, NULL, 1062000.00, 0.00, NULL, 'pending', 'not_yet', 'unpaid', NULL, 'P HUYNH THANH TUYEN', '0373707024', ', , , ', '', '2025-08-05 18:06:28', '2025-08-05 18:06:28'),
(11, 1, NULL, NULL, 1062000.00, 0.00, NULL, 'pending', 'not_yet', 'unpaid', NULL, 'P HUYNH THANH TUYEN', '0373707024', ', , , ', '', '2025-08-05 18:13:02', '2025-08-05 18:13:02'),
(12, 20, NULL, NULL, 49000.00, 0.00, NULL, 'pending', 'not_yet', 'unpaid', NULL, 'Tuyen Pham', '0373707024', ', , , ', '', '2025-08-05 18:13:18', '2025-08-05 18:13:18'),
(13, 1, NULL, NULL, 294000.00, 0.00, NULL, 'pending', 'not_yet', 'unpaid', NULL, 'P HUYNH THANH TUYEN', '0373707024', 'Hùng Vương, Phường Phúc Xá, Quận Ba Đình, Thành phố Hà Nội', '', '2025-08-07 05:51:35', '2025-08-07 05:51:35'),
(14, 1, NULL, NULL, 294000.00, 0.00, NULL, 'pending', 'not_yet', 'unpaid', NULL, 'Tuyen Pham', '0373707024', 'Tuyen Pham, Phường Sông Bằng, Thành phố Cao Bằng, Tỉnh Cao Bằng', '', '2025-08-07 05:54:14', '2025-08-07 05:54:14');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_items`
--

CREATE TABLE `order_items` (
  `id` bigint NOT NULL,
  `order_id` bigint DEFAULT NULL,
  `product_id` bigint DEFAULT NULL,
  `variation_id` bigint DEFAULT NULL,
  `product_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sku` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `seller_id` bigint DEFAULT NULL,
  `status` enum('pending','shipped','cancelled','refunded','completed') COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `quantity` int DEFAULT NULL,
  `price` decimal(12,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `variation_id`, `product_name`, `sku`, `image_url`, `seller_id`, `status`, `quantity`, `price`) VALUES
(1, 1, 20, NULL, 'Cà Phê Sữa Đá Hòa Tan Sài Gòn - UFO Coffee 123', NULL, NULL, 1, 'pending', 5, 49000.00),
(2, 1, 23, NULL, 'Cà Phê Sữa Đá Hòa Tan Sài Gòn - UFO Coffee 1', NULL, NULL, 1, 'pending', 4, 49000.00),
(3, 1, 15, NULL, 'Cà Phê Sữa Đá Hòa Tan Sài Gòn - UFO Coffee', NULL, NULL, 1, 'pending', 2, 49000.00),
(4, 1, 14, NULL, 'Son dưỡng handmade Dừa', NULL, NULL, 1, 'pending', 4, 40000.00),
(5, 2, 20, NULL, 'Cà Phê Sữa Đá Hòa Tan Sài Gòn - UFO Coffee 123', NULL, NULL, 1, 'pending', 5, 49000.00),
(6, 2, 23, NULL, 'Cà Phê Sữa Đá Hòa Tan Sài Gòn - UFO Coffee 1', NULL, NULL, 1, 'pending', 4, 49000.00),
(7, 2, 15, NULL, 'Cà Phê Sữa Đá Hòa Tan Sài Gòn - UFO Coffee', NULL, NULL, 1, 'pending', 2, 49000.00),
(8, 2, 14, NULL, 'Son dưỡng handmade Dừa', NULL, NULL, 1, 'pending', 4, 40000.00),
(9, 3, 20, NULL, 'Cà Phê Sữa Đá Hòa Tan Sài Gòn - UFO Coffee 123', NULL, NULL, 1, 'pending', 5, 49000.00),
(10, 3, 23, NULL, 'Cà Phê Sữa Đá Hòa Tan Sài Gòn - UFO Coffee 1', NULL, NULL, 1, 'pending', 4, 49000.00),
(11, 3, 15, NULL, 'Cà Phê Sữa Đá Hòa Tan Sài Gòn - UFO Coffee', NULL, NULL, 1, 'pending', 2, 49000.00),
(12, 3, 14, NULL, 'Son dưỡng handmade Dừa', NULL, NULL, 1, 'pending', 4, 40000.00),
(13, 4, 20, NULL, 'Cà Phê Sữa Đá Hòa Tan Sài Gòn - UFO Coffee 123', NULL, NULL, 1, 'pending', 5, 49000.00),
(14, 4, 23, NULL, 'Cà Phê Sữa Đá Hòa Tan Sài Gòn - UFO Coffee 1', NULL, NULL, 1, 'pending', 4, 49000.00),
(15, 4, 15, NULL, 'Cà Phê Sữa Đá Hòa Tan Sài Gòn - UFO Coffee', NULL, NULL, 1, 'pending', 2, 49000.00),
(16, 4, 14, NULL, 'Son dưỡng handmade Dừa', NULL, NULL, 1, 'pending', 4, 40000.00),
(17, 5, 20, NULL, 'Cà Phê Sữa Đá Hòa Tan Sài Gòn - UFO Coffee 123', NULL, NULL, 1, 'pending', 6, 49000.00),
(18, 5, 23, NULL, 'Cà Phê Sữa Đá Hòa Tan Sài Gòn - UFO Coffee 1', NULL, NULL, 1, 'pending', 4, 49000.00),
(19, 5, 15, NULL, 'Cà Phê Sữa Đá Hòa Tan Sài Gòn - UFO Coffee', NULL, NULL, 1, 'pending', 3, 49000.00),
(20, 5, 14, NULL, 'Son dưỡng handmade Dừa', NULL, NULL, 1, 'pending', 5, 40000.00),
(21, 5, 10, NULL, 'Kem chống nắng dưỡng da Trái nhàu ADEVA NONI', NULL, NULL, 2, 'pending', 1, 225000.00),
(22, 6, 20, NULL, 'Cà Phê Sữa Đá Hòa Tan Sài Gòn - UFO Coffee 123', NULL, NULL, 1, 'pending', 6, 49000.00),
(23, 6, 23, NULL, 'Cà Phê Sữa Đá Hòa Tan Sài Gòn - UFO Coffee 1', NULL, NULL, 1, 'pending', 4, 49000.00),
(24, 6, 15, NULL, 'Cà Phê Sữa Đá Hòa Tan Sài Gòn - UFO Coffee', NULL, NULL, 1, 'pending', 3, 49000.00),
(25, 6, 14, NULL, 'Son dưỡng handmade Dừa', NULL, NULL, 1, 'pending', 5, 40000.00),
(26, 6, 10, NULL, 'Kem chống nắng dưỡng da Trái nhàu ADEVA NONI', NULL, NULL, 2, 'pending', 1, 225000.00),
(27, 7, 20, NULL, 'Cà Phê Sữa Đá Hòa Tan Sài Gòn - UFO Coffee 123', NULL, NULL, 1, 'pending', 6, 49000.00),
(28, 7, 23, NULL, 'Cà Phê Sữa Đá Hòa Tan Sài Gòn - UFO Coffee 1', NULL, NULL, 1, 'pending', 4, 49000.00),
(29, 7, 15, NULL, 'Cà Phê Sữa Đá Hòa Tan Sài Gòn - UFO Coffee', NULL, NULL, 1, 'pending', 3, 49000.00),
(30, 7, 14, NULL, 'Son dưỡng handmade Dừa', NULL, NULL, 1, 'pending', 5, 40000.00),
(31, 7, 10, NULL, 'Kem chống nắng dưỡng da Trái nhàu ADEVA NONI', NULL, NULL, 2, 'pending', 1, 225000.00),
(32, 8, 20, NULL, 'Cà Phê Sữa Đá Hòa Tan Sài Gòn - UFO Coffee 123', NULL, NULL, 1, 'pending', 6, 49000.00),
(33, 8, 23, NULL, 'Cà Phê Sữa Đá Hòa Tan Sài Gòn - UFO Coffee 1', NULL, NULL, 1, 'pending', 4, 49000.00),
(34, 8, 15, NULL, 'Cà Phê Sữa Đá Hòa Tan Sài Gòn - UFO Coffee', NULL, NULL, 1, 'pending', 3, 49000.00),
(35, 8, 14, NULL, 'Son dưỡng handmade Dừa', NULL, NULL, 1, 'pending', 5, 40000.00),
(36, 8, 10, NULL, 'Kem chống nắng dưỡng da Trái nhàu ADEVA NONI', NULL, NULL, 2, 'pending', 1, 225000.00),
(37, 9, 20, NULL, 'Cà Phê Sữa Đá Hòa Tan Sài Gòn - UFO Coffee 123', NULL, NULL, 1, 'pending', 6, 49000.00),
(38, 9, 23, NULL, 'Cà Phê Sữa Đá Hòa Tan Sài Gòn - UFO Coffee 1', NULL, NULL, 1, 'pending', 4, 49000.00),
(39, 9, 15, NULL, 'Cà Phê Sữa Đá Hòa Tan Sài Gòn - UFO Coffee', NULL, NULL, 1, 'pending', 3, 49000.00),
(40, 9, 14, NULL, 'Son dưỡng handmade Dừa', NULL, NULL, 1, 'pending', 5, 40000.00),
(41, 9, 10, NULL, 'Kem chống nắng dưỡng da Trái nhàu ADEVA NONI', NULL, NULL, 2, 'pending', 1, 225000.00),
(42, 10, 20, NULL, 'Cà Phê Sữa Đá Hòa Tan Sài Gòn - UFO Coffee 123', NULL, NULL, 1, 'pending', 6, 49000.00),
(43, 10, 23, NULL, 'Cà Phê Sữa Đá Hòa Tan Sài Gòn - UFO Coffee 1', NULL, NULL, 1, 'pending', 4, 49000.00),
(44, 10, 15, NULL, 'Cà Phê Sữa Đá Hòa Tan Sài Gòn - UFO Coffee', NULL, NULL, 1, 'pending', 3, 49000.00),
(45, 10, 14, NULL, 'Son dưỡng handmade Dừa', NULL, NULL, 1, 'pending', 5, 40000.00),
(46, 10, 10, NULL, 'Kem chống nắng dưỡng da Trái nhàu ADEVA NONI', NULL, NULL, 2, 'pending', 1, 225000.00),
(47, 11, 20, NULL, 'Cà Phê Sữa Đá Hòa Tan Sài Gòn - UFO Coffee 123', NULL, NULL, 1, 'pending', 6, 49000.00),
(48, 11, 23, NULL, 'Cà Phê Sữa Đá Hòa Tan Sài Gòn - UFO Coffee 1', NULL, NULL, 1, 'pending', 4, 49000.00),
(49, 11, 15, NULL, 'Cà Phê Sữa Đá Hòa Tan Sài Gòn - UFO Coffee', NULL, NULL, 1, 'pending', 3, 49000.00),
(50, 11, 14, NULL, 'Son dưỡng handmade Dừa', NULL, NULL, 1, 'pending', 5, 40000.00),
(51, 11, 10, NULL, 'Kem chống nắng dưỡng da Trái nhàu ADEVA NONI', NULL, NULL, 2, 'pending', 1, 225000.00),
(52, 12, 20, NULL, 'Cà Phê Sữa Đá Hòa Tan Sài Gòn - UFO Coffee 123', NULL, NULL, 1, 'pending', 1, 49000.00),
(53, 13, 23, NULL, 'Cà Phê Sữa Đá Hòa Tan Sài Gòn - UFO Coffee 1', NULL, NULL, 1, 'pending', 6, 49000.00),
(54, 14, 23, NULL, 'Cà Phê Sữa Đá Hòa Tan Sài Gòn - UFO Coffee 1', NULL, NULL, 1, 'pending', 6, 49000.00);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_logs`
--

CREATE TABLE `order_logs` (
  `id` bigint NOT NULL,
  `order_id` bigint DEFAULT NULL,
  `status` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `note` text COLLATE utf8mb4_unicode_ci,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_payments`
--

CREATE TABLE `order_payments` (
  `id` bigint NOT NULL,
  `order_id` bigint DEFAULT NULL,
  `payment_method` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `amount` decimal(12,2) DEFAULT NULL,
  `status` enum('pending','success','failed') COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `paid_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_returns`
--

CREATE TABLE `order_returns` (
  `id` bigint NOT NULL,
  `order_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `reason` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('requested','approved','rejected','completed') COLLATE utf8mb4_unicode_ci DEFAULT 'requested',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_shipments`
--

CREATE TABLE `order_shipments` (
  `id` bigint NOT NULL,
  `order_id` bigint DEFAULT NULL,
  `shipping_method` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tracking_code` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shipping_fee` decimal(12,2) DEFAULT NULL,
  `status` enum('pending','shipping','delivered','returned') COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `shipped_at` datetime DEFAULT NULL,
  `delivered_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_shipping_logs`
--

CREATE TABLE `order_shipping_logs` (
  `id` bigint NOT NULL,
  `order_id` bigint NOT NULL,
  `status` enum('not_yet','shipping','delivered','failed') COLLATE utf8mb4_unicode_ci DEFAULT 'not_yet',
  `note` text COLLATE utf8mb4_unicode_ci,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `payments`
--

CREATE TABLE `payments` (
  `id` bigint NOT NULL,
  `order_id` bigint DEFAULT NULL,
  `payment_method` enum('cod','bank','e_wallet') COLLATE utf8mb4_unicode_ci DEFAULT 'cod',
  `amount` decimal(12,2) DEFAULT NULL,
  `status` enum('pending','success','failed') COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `transaction_code` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paid_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `id` bigint NOT NULL,
  `seller_id` bigint DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sku` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `barcode` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `short_description` text COLLATE utf8mb4_unicode_ci,
  `price` decimal(12,2) DEFAULT NULL,
  `sale_price` decimal(12,2) DEFAULT NULL,
  `sale_start` datetime DEFAULT NULL,
  `sale_end` datetime DEFAULT NULL,
  `stock` int DEFAULT '0',
  `brand_id` bigint DEFAULT NULL,
  `status` enum('active','inactive') COLLATE utf8mb4_unicode_ci DEFAULT 'active',
  `visibility` enum('public','private') COLLATE utf8mb4_unicode_ci DEFAULT 'public',
  `meta_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_description` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `main_image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `weight` decimal(8,2) DEFAULT NULL,
  `length` decimal(8,2) DEFAULT NULL,
  `width` decimal(8,2) DEFAULT NULL,
  `height` decimal(8,2) DEFAULT NULL,
  `up_sell_ids` text COLLATE utf8mb4_unicode_ci,
  `cross_sell_ids` text COLLATE utf8mb4_unicode_ci,
  `external_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `video_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rating_avg` decimal(3,2) DEFAULT '0.00',
  `rating_count` int DEFAULT '0',
  `sold_count` int DEFAULT '0',
  `view_count` int DEFAULT '0',
  `is_featured` tinyint(1) DEFAULT '0',
  `is_new` tinyint(1) DEFAULT '0',
  `is_best_seller` tinyint(1) DEFAULT '0',
  `shipping_class_id` bigint DEFAULT NULL,
  `min_order_quantity` int DEFAULT '1',
  `max_order_quantity` int DEFAULT NULL,
  `tax_class` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `barcode_type` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `draft_status` tinyint(1) DEFAULT '0',
  `available_from` datetime DEFAULT NULL,
  `available_to` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `is_deleted` tinyint(1) DEFAULT '0',
  `deleted_at` datetime DEFAULT NULL,
  `scheduled_public_at` datetime DEFAULT NULL,
  `scheduled_status` enum('scheduled','processing','done') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `product_type` enum('simple','grouped','external','variable') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'simple',
  `button_text` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT 'Buy Now',
  `purchase_note` text COLLATE utf8mb4_unicode_ci,
  `menu_order` int NOT NULL DEFAULT '0',
  `default_variation_id` bigint DEFAULT NULL,
  `enable_reviews` tinyint(1) NOT NULL DEFAULT '1',
  `manage_stock` tinyint(1) NOT NULL DEFAULT '1',
  `stock_status` enum('in_stock','out_of_stock','on_backorder') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'in_stock',
  `allow_backorders` enum('no','notify','yes') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'no',
  `low_stock_threshold` int DEFAULT NULL,
  `sold_individually` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`id`, `seller_id`, `name`, `slug`, `sku`, `barcode`, `description`, `short_description`, `price`, `sale_price`, `sale_start`, `sale_end`, `stock`, `brand_id`, `status`, `visibility`, `meta_title`, `meta_description`, `main_image`, `weight`, `length`, `width`, `height`, `up_sell_ids`, `cross_sell_ids`, `external_url`, `video_url`, `rating_avg`, `rating_count`, `sold_count`, `view_count`, `is_featured`, `is_new`, `is_best_seller`, `shipping_class_id`, `min_order_quantity`, `max_order_quantity`, `tax_class`, `barcode_type`, `draft_status`, `available_from`, `available_to`, `created_at`, `updated_at`, `is_deleted`, `deleted_at`, `scheduled_public_at`, `scheduled_status`, `product_type`, `button_text`, `purchase_note`, `menu_order`, `default_variation_id`, `enable_reviews`, `manage_stock`, `stock_status`, `allow_backorders`, `low_stock_threshold`, `sold_individually`) VALUES
(4, NULL, 'An Đường Khang – Viên Uống Hỗ Trợ Điều Trị Đái Tháo Đường (30 viên)', 'an-djuong-khang-vien-uong-ho-tro-djieu-tri-djai-thao-djuong-30-vien', NULL, NULL, 'An Đường Khang với công thức Đông Y mang tính đột phá hỗ trợ hạ – ổn định đường huyết, giảm nguy cơ biến chứng của bệnh tiểu đường. 100% chiết xuất tự nhiên với 3 thành phần chính đông trùng hạ thảo, khổ qua rừng, đậu bắp.', NULL, 198000.00, NULL, NULL, NULL, 50, 3, 'active', 'public', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0.00, 0, 0, 0, 1, 0, 0, NULL, 1, NULL, NULL, NULL, 0, NULL, NULL, '2025-07-31 07:54:29', '2025-07-31 10:33:39', 0, NULL, NULL, NULL, 'simple', 'Buy Now', NULL, 0, NULL, 1, 1, 'in_stock', 'no', NULL, 0),
(5, NULL, 'Bột mầm ngũ cốc Trái Nhàu', 'bot-mam-ngu-coc-trai-nhau', NULL, NULL, '<p>Bột mầm ngũ cốc trái nhàu là bột mầm, tức là đậu ngâm lên mầm rồi sau đó mới sấy khô, rang chín, nghiền bột và mix trộn với bột trái nhàu… Việc ngâm đậu giúp loại bỏ những chất độc hại trong đậu, chuyển thành những hợp chất, vitamin có lợi cho cơ thể và hệ tiêu hoá, bổ sung estrogen cho cơ thể nên rất tốt cho phụ nữ.</p><figure class=\"image\"><img style=\"aspect-ratio:600/600;\" src=\"https://showroomhangviet.com/wp-content/uploads/2020/10/0755e45829d3d48d8dc2-600x600-1.jpg\" alt=\"\" srcset=\"https://showroomhangviet.com/wp-content/uploads/2020/10/0755e45829d3d48d8dc2-600x600-1.jpg 600w, https://showroomhangviet.com/wp-content/uploads/2020/10/0755e45829d3d48d8dc2-600x600-1-450x450.jpg 450w, https://showroomhangviet.com/wp-content/uploads/2020/10/0755e45829d3d48d8dc2-600x600-1-150x150.jpg 150w, https://showroomhangviet.com/wp-content/uploads/2020/10/0755e45829d3d48d8dc2-600x600-1-595x595.jpg 595w, https://showroomhangviet.com/wp-content/uploads/2020/10/0755e45829d3d48d8dc2-600x600-1-300x300.jpg 300w\" sizes=\"100vw\" width=\"600\" height=\"600\"></figure><p><br><strong>1. Thành phần</strong></p><p>Ngoài thành phần chính là Bột nhàu siêu mịn. Còn có các loại mầm ngũ cốc như: đậu đỏ, đậu đen xanh lòng, đậu xanh, đậu nành, đậu ngự và gạo lứt, hạt sen.</p><p><strong>2. Công dụng</strong></p><p>✅Bổ sung nội tiết tố, đẹp da, trẻ lâu<br>✅Chống lão hóa, duy trì nét thanh xuân<br>✅Tốt cho tiêu hóa, tim mạch, giảm cholesterol xấu<br>✅Ổn định huyết áp, giảm tiểu đường<br>✅Lợi sữa tốt cho cả mẹ và bé</p><p><strong>3. Hướng dẫn sử dụng</strong></p><p>Pha tầm 2 muống bột mầm ngũ cốc nhàu với tầm 250ml nước sôi để bột dậy mùi thơm ngon hơn nhen!</p><p>Cả nhà có thể mix thêm với sữa hoặc đường cho dễ uống nhen</p><p>Có thể thay thế bữa ăn nhẹ</p><p><strong>4. HSD:</strong> 2 năm kể từ ngày sản xuất</p><p>Sản phẩm của ADEVA Naturals</p><p><i><strong>Khách hàng có thể đặt mua online tại đây và được giao hàng trên toàn quốc.</strong></i></p>', 'Bột mầm ngũ cốc Trái nhàu thơm ngon dinh dưỡng thay thế cho bữa ăn nhẹ!', 150000.00, NULL, NULL, NULL, 30, 3, 'active', 'public', NULL, NULL, 'uploads/images/main_image-1753957494410-90961105.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0.00, 0, 0, 0, 1, 0, 0, NULL, 1, NULL, NULL, NULL, 0, NULL, NULL, '2025-07-31 08:00:27', '2025-07-31 10:30:44', 0, NULL, NULL, NULL, 'simple', 'Buy Now', NULL, 0, NULL, 1, 1, 'in_stock', 'no', NULL, 0),
(6, 2, 'Đông Trùng Hạ Thảo Hector Sấy Thăng Hoa', 'djong-trung-ha-thao-hector-say-thang-hoa', NULL, NULL, '<p>Đông trùng hạ thảo Hector, một sản phẩm nấm dược liệu được nuôi trồng khoa học, chất lượng cao, ổn định, được nhiều người dùng khen ngợi về hiệu quả tốt cho các vấn đề sức khoẻ. “Sợi nấm đông trùng hạ thảo được sấy thăng hoa, thích hợp cho bảo quản thời gian dài trong quá trình sử dụng hàng ngày. Có thể dùng nấm khô để hãm trà, hay chế biến như nấm tươi. Mỗi ngày sử dụng trung bình 0.2 – 0.4 gr, tương đương 4 – 10 sợi nấm.” Thành phần: 100% Đông trùng hạ thảo sấy thăng hoa. Đóng gói: Lọ thủy tinh 5gr.</p>', 'Đông trùng hạ thảo Hector, một sản phẩm nấm dược liệu được nuôi trồng khoa học, chất lượng cao, ổn định, được nhiều người dùng khen ngợi về hiệu quả tốt cho các vấn đề sức khoẻ.', 900000.00, NULL, NULL, NULL, 50, 2, 'active', 'public', NULL, NULL, 'uploads/images/main_image-1753979316999-791800343.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0.00, 0, 0, 0, 1, 0, 0, NULL, 1, NULL, NULL, NULL, 0, NULL, NULL, '2025-07-31 08:42:21', '2025-07-31 16:28:37', 0, NULL, NULL, NULL, 'simple', 'Buy Now', NULL, 0, NULL, 1, 1, 'in_stock', 'no', NULL, 0),
(7, 1, 'Hạ Áp Khang – Viên Uống Hỗ Trợ Điều Trị Cao Huyết Áp', 'ha-ap-khang-vien-uong-ho-tro-djieu-tri-cao-huyet-ap', '1234568', '12345678', '<p><strong>Hạ Áp Khang – Bệnh cao huyết áp (tăng huyết áp) được ví như “kẻ giết người thầm lặng” bởi những diễn tiến âm thầm của bệnh. Triệu chứng tăng huyết áp thường chỉ thoáng qua, nhưng lại ngấm ngầm hủy hoại các cơ quan trong cơ thể, gây ra nhiều biến chứng nghiêm trọng lên thận, động mạch, tim, và hệ nội tiết.</strong></p><p>Hiện tại Hạ Áp Khang đã có mặt tại hơn +1.000 nhà thuốc lớn nhỏ trên toàn quốc.</p><figure class=\"image\"><img style=\"aspect-ratio:600/544;\" src=\"https://showroomhangviet.com/wp-content/uploads/2020/10/Ha-Ap-Khang-ho-tro-dieu-tri-cao-huyet-ap-600x544-1.jpg\" alt=\"\" srcset=\"https://showroomhangviet.com/wp-content/uploads/2020/10/Ha-Ap-Khang-ho-tro-dieu-tri-cao-huyet-ap-600x544-1.jpg 600w, https://showroomhangviet.com/wp-content/uploads/2020/10/Ha-Ap-Khang-ho-tro-dieu-tri-cao-huyet-ap-600x544-1-450x408.jpg 450w, https://showroomhangviet.com/wp-content/uploads/2020/10/Ha-Ap-Khang-ho-tro-dieu-tri-cao-huyet-ap-600x544-1-595x539.jpg 595w, https://showroomhangviet.com/wp-content/uploads/2020/10/Ha-Ap-Khang-ho-tro-dieu-tri-cao-huyet-ap-600x544-1-300x272.jpg 300w\" sizes=\"100vw\" width=\"600\" height=\"544\"></figure><figure class=\"table\"><table><thead><tr><th><strong>Tên dược liệu</strong></th><th><strong>Khối lượng</strong></th></tr></thead><tbody><tr><td>Styphnolobium japonicum (Hoa hoè)</td><td>150 mg</td></tr><tr><td>Momordica charantia L (Khổ qua)</td><td>150 mg</td></tr><tr><td>Stevia rebaudiana (Cỏ ngọt)</td><td>40 mg</td></tr><tr><td>Polyscias fruticosa (Đinh lăng)</td><td>80 mg</td></tr><tr><td>Mentha arvensis (Bạc hà)</td><td>40 mg</td></tr><tr><td>Cordyceps miliraris L (Đông trùng hạ thảo)</td><td>5 mg</td></tr><tr><td colspan=\"2\"><i>Phụ liệu: chất làm dày (Tinh bột), chất chống đông vón (talc, magnesi stearate) vừa đủ 1 viên 500mg</i></td></tr></tbody></table></figure><h2><strong>Công dụng của Hạ Áp Khang</strong></h2><ul><li>Hỗ trợ điều trị bệnh cao huyết áp.</li><li>Hỗ trợ giúp tăng độ bền thành mạch, giảm huyết áp.</li><li>Hỗ trợ giảm các biểu hiện khó chịu do tăng huyết áp như: đau đầu, ù tai, hoa mắt, chóng mặt.</li></ul><p><i>(*) Lưu ý: Hiệu quả có thể khác nhau tùy theo cơ địa mỗi người.</i></p><figure class=\"image\"><img style=\"aspect-ratio:768/432;\" src=\"https://showroomhangviet.com/wp-content/uploads/2020/10/Slide3-768x432-1.png\" alt=\"\" srcset=\"https://showroomhangviet.com/wp-content/uploads/2020/10/Slide3-768x432-1.png 768w, https://showroomhangviet.com/wp-content/uploads/2020/10/Slide3-768x432-1-450x253.png 450w, https://showroomhangviet.com/wp-content/uploads/2020/10/Slide3-768x432-1-595x335.png 595w, https://showroomhangviet.com/wp-content/uploads/2020/10/Slide3-768x432-1-300x169.png 300w\" sizes=\"100vw\" width=\"768\" height=\"432\"></figure><h2><strong>Đối tượng sử dụng</strong></h2><p>Dùng cho người cao huyết áp, người có nguy cơ tăng huyết áp.</p><h2><strong>Liều dùng và cách dùng</strong></h2><ul><li>Uống từ 1 đến 2 viên/ ngày.</li><li>Có thể dùng Hạ Áp Khang kèm với các thuốc tân dược điều trị cao huyết áp.</li><li><strong>Uống ngay sau khi ăn</strong>. Không dùng khi bụng đói hoặc khi có dấu hiệu hạ đường huyết hay huyết áp thấp.</li></ul><h2><strong>Quy cách đóng gói</strong></h2><p><strong>Đóng gói</strong>: 30 viên/hộp, lọ. Hạn sử dụng: 36 tháng kể từ ngày sản xuất.</p><p>(Ngày sản xuất và hạn sử dụng xem trên sản phẩm)</p><p>Bảo quản<strong>: Nơi khô ráo và thoáng mát, tránh ánh nắng mặt trời. Để xa tầm tay trẻ em.</strong></p><p><strong>Chống chỉ định</strong>:</p><ul><li>Không dùng khi huyết áp thấp, đường huyết thấp.</li><li>Không dùng cho phụ nữ có thai hoặc đang cho con bú.</li><li>Không sử dụng nếu mẫn cảm với bất kì thành phần nào của sản phẩm.</li></ul><h2><strong>Các giấy chứng nhận của sản phẩm:</strong></h2><p><img src=\"https://showroomhangviet.com/wp-content/uploads/2020/10/Giay-chung-nhan-bo-y-te-ha-ap-khang.jpg\" alt=\"Phiếu công bố Bộ Y Tế\" srcset=\"https://showroomhangviet.com/wp-content/uploads/2020/10/Giay-chung-nhan-bo-y-te-ha-ap-khang.jpg 960w, https://showroomhangviet.com/wp-content/uploads/2020/10/Giay-chung-nhan-bo-y-te-ha-ap-khang-450x621.jpg 450w, https://showroomhangviet.com/wp-content/uploads/2020/10/Giay-chung-nhan-bo-y-te-ha-ap-khang-595x821.jpg 595w, https://showroomhangviet.com/wp-content/uploads/2020/10/Giay-chung-nhan-bo-y-te-ha-ap-khang-218x300.jpg 218w, https://showroomhangviet.com/wp-content/uploads/2020/10/Giay-chung-nhan-bo-y-te-ha-ap-khang-742x1024.jpg 742w, https://showroomhangviet.com/wp-content/uploads/2020/10/Giay-chung-nhan-bo-y-te-ha-ap-khang-768x1059.jpg 768w\" sizes=\"100vw\" width=\"960\" height=\"1324\"></p><p><i>Thực phẩm bảo vệ sức khỏe Hạ Áp Khang đã được Bộ Y Tế (Cục An Toàn Thực Phẩm) cấp phép lưu hành sản phẩm trên toàn quốc. Số: 6761/2018/ĐKSP.</i></p><p><img src=\"https://showroomhangviet.com/wp-content/uploads/2020/10/Phieu-kiem-nghiem-thanh-phan-ha-ap-khang.jpg\" alt=\"Phiếu công bố Bộ Y Tế\" srcset=\"https://showroomhangviet.com/wp-content/uploads/2020/10/Phieu-kiem-nghiem-thanh-phan-ha-ap-khang.jpg 960w, https://showroomhangviet.com/wp-content/uploads/2020/10/Phieu-kiem-nghiem-thanh-phan-ha-ap-khang-450x621.jpg 450w, https://showroomhangviet.com/wp-content/uploads/2020/10/Phieu-kiem-nghiem-thanh-phan-ha-ap-khang-595x821.jpg 595w, https://showroomhangviet.com/wp-content/uploads/2020/10/Phieu-kiem-nghiem-thanh-phan-ha-ap-khang-218x300.jpg 218w, https://showroomhangviet.com/wp-content/uploads/2020/10/Phieu-kiem-nghiem-thanh-phan-ha-ap-khang-742x1024.jpg 742w, https://showroomhangviet.com/wp-content/uploads/2020/10/Phieu-kiem-nghiem-thanh-phan-ha-ap-khang-768x1059.jpg 768w\" sizes=\"100vw\" width=\"960\" height=\"1324\"></p><p><i>Thực phẩm bảo vệ sức khỏe Hạ Áp Khang đã được Bộ Y Tế (Cục An Toàn Thực Phẩm) cấp phép lưu hành sản phẩm trên toàn quốc. Số: 6761/2018/ĐKSP.</i></p><h2><strong>Tác dụng của đông trùng hạ thảo</strong></h2><p>Tác dụng của Hạ Áp Khang không chỉ dừng lại ở việc hỗ trợ điều trị bệnh cao huyết áp. Với thành phần có chứa Đông trùng hạ thảo là một loại đông dược quý có bản chất là dạng ký sinh của loài nấm. Nó được sử dụng từ lâu trong y học cổ truyền Trung Hoa và y học cổ truyền Tây Tạng.</p><figure class=\"image\"><img style=\"aspect-ratio:610/409;\" src=\"https://showroomhangviet.com/wp-content/uploads/2020/10/Capture1.jpg\" alt=\"đông trùng hạ thảo\" srcset=\"https://showroomhangviet.com/wp-content/uploads/2020/10/Capture1.jpg 610w, https://showroomhangviet.com/wp-content/uploads/2020/10/Capture1-450x302.jpg 450w, https://showroomhangviet.com/wp-content/uploads/2020/10/Capture1-595x399.jpg 595w, https://showroomhangviet.com/wp-content/uploads/2020/10/Capture1-300x201.jpg 300w\" sizes=\"100vw\" width=\"610\" height=\"409\"></figure><p>Các phân tích hoá học cho thấy trong sinh khối của đông trùng hạ thảo có 17 axít amin và nhiều loại vitamin khác nhau. Dược liệu chứa hàm lượng cao cordycepin và adenosine.</p><ul><li><strong>Adenosine</strong> và <strong>cordycepin</strong> đã được khoa học chứng minh hiệu quả trong việc giúp ổn định huyết áp, điều hòa thành mạch, giải tỏa căng thẳng, giảm bớt tình trạng đau đầu, chóng mặt, hỗ trợ hoạt động của hệ thần kinh và mang lại giấc ngủ ngon.</li><li>Ngoài ra Adenosine còn giúp cơ thể tăng hấp thu các dược chất khác từ khổ qua, hoa hòe… giúp tăng tác dụng của sản phẩm.</li></ul><h2><strong>Tác dụng của hoa hòe</strong></h2><p>Hoa hòe chứa hàm lượng <strong>Rutin</strong> cao có tác dụng giúp nâng cao độ đàn hồi của mạch máu và giảm tính thấm của mao mạch, giảm trương lực cơ trơn và chống co thắt, giảm tác dụng của adrenalin trong cơ thể. Do vậy, người ta thường dùng Hòe hoa để giảm huyết áp và phòng các biến chứng của huyết áp cao như: xơ vữa động mạch, tai biến mạch máu não.</p><figure class=\"image\"><img style=\"aspect-ratio:675/400;\" src=\"https://showroomhangviet.com/wp-content/uploads/2020/10/hoa-hoe-duoi-mua-thumbnail.jpg\" alt=\"hoa hòe\" srcset=\"https://showroomhangviet.com/wp-content/uploads/2020/10/hoa-hoe-duoi-mua-thumbnail.jpg 675w, https://showroomhangviet.com/wp-content/uploads/2020/10/hoa-hoe-duoi-mua-thumbnail-450x267.jpg 450w, https://showroomhangviet.com/wp-content/uploads/2020/10/hoa-hoe-duoi-mua-thumbnail-595x353.jpg 595w, https://showroomhangviet.com/wp-content/uploads/2020/10/hoa-hoe-duoi-mua-thumbnail-300x178.jpg 300w\" sizes=\"100vw\" width=\"675\" height=\"400\"></figure><h2><strong>Tác dụng của khổ qua (mướp đắng)</strong></h2><p>Khổ qua (còn gọi là mướp đắng) có tác dụng hỗ trợ điều trị bệnh cao huyết áp hiệu quả, giúp thư giãn thành mạch, ổn định, điều hòa huyết áp.</p><p>Ngoài ra, khổ qua còn có tác dụng an thần, giúp giấc ngủ sâu cho những ai gặp tình trạng mất ngủ do cao huyết áp.</p><figure class=\"image\"><img style=\"aspect-ratio:2560/1920;\" src=\"https://showroomhangviet.com/wp-content/uploads/2020/10/kho-qua-scaled.jpg\" alt=\"khổ qua (mướp đắng)\" srcset=\"https://showroomhangviet.com/wp-content/uploads/2020/10/kho-qua-scaled.jpg 2560w, https://showroomhangviet.com/wp-content/uploads/2020/10/kho-qua-scaled-450x338.jpg 450w, https://showroomhangviet.com/wp-content/uploads/2020/10/kho-qua-scaled-595x446.jpg 595w, https://showroomhangviet.com/wp-content/uploads/2020/10/kho-qua-300x225.jpg 300w, https://showroomhangviet.com/wp-content/uploads/2020/10/kho-qua-1024x768.jpg 1024w, https://showroomhangviet.com/wp-content/uploads/2020/10/kho-qua-768x576.jpg 768w, https://showroomhangviet.com/wp-content/uploads/2020/10/kho-qua-1536x1152.jpg 1536w, https://showroomhangviet.com/wp-content/uploads/2020/10/kho-qua-2048x1536.jpg 2048w\" sizes=\"100vw\" width=\"2560\" height=\"1920\"></figure><p><i><strong>Khách hàng có thể đặt mua online tại đây và được giao hàng trên toàn quốc.</strong></i></p>', 'Hạ Áp Khang với công thức Đông Y mang tính đột phá hỗ trợ điều trị bệnh cao huyết áp, giảm các biến chứng do bệnh gây ra, tăng độ bền thành mạch và giảm huyết áp. 100% chiết xuất tự nhiên với 3 thành phần chính là Hoa hòe, Khổ qua rừng và Đông trùng hạ thảo.', 198000.00, NULL, NULL, NULL, 100, 2, 'active', 'public', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0.00, 0, 0, 0, 1, 0, 0, NULL, 1, NULL, NULL, NULL, 0, NULL, NULL, '2025-07-31 10:00:13', '2025-08-01 03:44:57', 0, NULL, NULL, NULL, 'simple', 'Buy Now', NULL, 0, NULL, 1, 1, 'in_stock', 'no', NULL, 0),
(8, 1, 'Dầu massage Trái nhàu', 'dau-massage-trai-nhau', NULL, NULL, '<p>Dầu massage Trái nhàu hoàn toàn từ thiên nhiên, được sử dụng rất nhiều trong làm đẹp.</p><p>Được biết đến với lợi ích cho làn da như: Tẩy trang giúp lấy đi bụi bẩn trên da rất tốt; Massage thường xuyên giúp làn da mịn màng, mềm mại, làm chậm quá trình lão hóa da. Đồng thời, dầu Trái nhàu còn giúp kháng khuẩn rất tốt, làm mờ các vết sẹo và vết rạn ở phụ nữ sau sinh.</p><h2><strong>I. Dầu massage Trái nhàu</strong></h2><p>Thành phần: Dầu hạt nhàu, dầu hướng dương, dầu cám gạo</p><p>Đóng gói: Trong hộp nhựa, bên ngoài là hộp giấy đã được bọc plastic đảm bảo</p><p>Dung tích: 100 ml</p><figure class=\"image\"><img style=\"aspect-ratio:720/1280;\" src=\"https://showroomhangviet.com/wp-content/uploads/2020/10/da%CC%82%CC%80u-massage-tra%CC%81i-nha%CC%80u-5.jpg\" alt=\"\" srcset=\"https://showroomhangviet.com/wp-content/uploads/2020/10/dầu-massage-trái-nhàu-5.jpg 720w, https://showroomhangviet.com/wp-content/uploads/2020/10/dầu-massage-trái-nhàu-5-450x800.jpg 450w, https://showroomhangviet.com/wp-content/uploads/2020/10/dầu-massage-trái-nhàu-5-595x1058.jpg 595w, https://showroomhangviet.com/wp-content/uploads/2020/10/dầu-massage-trái-nhàu-5-169x300.jpg 169w, https://showroomhangviet.com/wp-content/uploads/2020/10/dầu-massage-trái-nhàu-5-576x1024.jpg 576w\" sizes=\"100vw\" width=\"720\" height=\"1280\"></figure><h2><strong>II. CÁCH SỬ DỤNG DẦU MASSAGE TRÁI NHÀU</strong></h2><h3><strong>1. Massage dưỡng da mịn màng</strong></h3><p>1 chén bã cà phê và 4 thìa dầu massage Trái nhàu</p><ul><li>Bước 1: Trộn bã cà phê với dầu nhàu</li><li>Bước 2: Thoa lên toàn thân và massage nhẹ nhàng trong 15 phút cho dưỡng chất ngấm hết vào da.</li><li>Bước 3: Tắm lại thật sạch với nước ấm</li></ul><figure class=\"image\"><img style=\"aspect-ratio:600/800;\" src=\"https://showroomhangviet.com/wp-content/uploads/2020/10/Da%CC%82%CC%80u-nha%CC%80u-4-600x800-1.jpg\" alt=\"\" srcset=\"https://showroomhangviet.com/wp-content/uploads/2020/10/Dầu-nhàu-4-600x800-1.jpg 600w, https://showroomhangviet.com/wp-content/uploads/2020/10/Dầu-nhàu-4-600x800-1-450x600.jpg 450w, https://showroomhangviet.com/wp-content/uploads/2020/10/Dầu-nhàu-4-600x800-1-595x793.jpg 595w, https://showroomhangviet.com/wp-content/uploads/2020/10/Dầu-nhàu-4-600x800-1-225x300.jpg 225w\" sizes=\"100vw\" width=\"600\" height=\"800\"></figure><p>Nên thực hiện 2-3 tuần/ 1 lần, sau vài tuần sẽ thấy sự cải thiện rõ rệt.</p><h3><strong>2. Tẩy trang</strong></h3><p>Rửa mặt nhẹ nhàng với nước sạch. Sau đó dùng khăn mềm và lau khô da. Cho dầu ra lòng bàn tay (tầm 2- 3 giọt) sau đó xoa đều lên toàn bộ gương mặt. Massage theo chuyển động tròn từ trong ra ngoài, giúp lấy đi bụi bẩn và tế bào chết trên da.</p><figure class=\"image\"><img style=\"aspect-ratio:300/400;\" src=\"https://showroomhangviet.com/wp-content/uploads/2020/10/da%CC%82%CC%80u-nonic-300x400-1.jpg\" alt=\"\" srcset=\"https://showroomhangviet.com/wp-content/uploads/2020/10/dầu-nonic-300x400-1.jpg 300w, https://showroomhangviet.com/wp-content/uploads/2020/10/dầu-nonic-300x400-1-225x300.jpg 225w\" sizes=\"100vw\" width=\"300\" height=\"400\"></figure><p>Người Hàn Quốc rất thích sử dụng Dầu Trái nhàu và các sản phẩm từ Trái nhàu vì những dưỡng chất tuyệt vời có trong Nhàu. Thử trải nghiệm dầu massage Trái nhàu và tận hưởng lợi ích từ nó nhé!</p><p>Sản phẩm của Adeva Noni</p><p><i><strong>Khách hàng có thể đặt mua online tại đây và được giao hàng trên toàn quốc.</strong></i></p>', 'Được biết đến với lợi ích cho làn da như: Tẩy trang giúp lấy đi bụi bẩn trên da rất tốt; Massage thường xuyên giúp làn da mịn màng, mềm mại, làm chậm quá trình lão hóa da. Đồng thời, dầu Trái nhàu còn giúp kháng khuẩn rất tốt, làm mờ các vết sẹo và vết rạn ở phụ nữ sau sinh.', 160000.00, NULL, NULL, NULL, 50, 3, 'active', 'public', NULL, NULL, 'uploads/images/main_image-1753956753046-137987469.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0.00, 0, 0, 0, 1, 0, 0, NULL, 1, NULL, NULL, NULL, 0, NULL, NULL, '2025-07-31 10:12:33', '2025-07-31 14:38:29', 0, NULL, NULL, NULL, 'simple', 'Buy Now', NULL, 0, NULL, 1, 1, 'in_stock', 'no', NULL, 0),
(9, 1, 'Hector sâm – tăng sức khoẻ, đề kháng, sinh lực', 'hector-sam-tang-suc-khoe-dje-khang-sinh-luc', '1234567', '1234567', '<p>Nước đông trùng hạ thảo Hector Sâm giúp đàn ông mạnh mẽ, người lớn tuổi mạnh khoẻ. Hector Sâm giúp vận động viên tăng sức, người lao lực mau phục hồi. Hector Sâm giúp phụ nữ sau sinh tăng tiết sữa, phụ nữ tràn năng lượng. Hector Sâm giúp mọi người mau giải rượu, bảo vệ gan thận tuyệt vời.</p><figure class=\"image\"><img style=\"aspect-ratio:720/625;\" src=\"https://showroomhangviet.com/wp-content/uploads/2020/10/103114214_2896602403770615_2289744161536587639_n.jpg\" alt=\"\" srcset=\"https://showroomhangviet.com/wp-content/uploads/2020/10/103114214_2896602403770615_2289744161536587639_n.jpg 720w, https://showroomhangviet.com/wp-content/uploads/2020/10/103114214_2896602403770615_2289744161536587639_n-450x391.jpg 450w, https://showroomhangviet.com/wp-content/uploads/2020/10/103114214_2896602403770615_2289744161536587639_n-595x516.jpg 595w, https://showroomhangviet.com/wp-content/uploads/2020/10/103114214_2896602403770615_2289744161536587639_n-300x260.jpg 300w\" sizes=\"100vw\" width=\"720\" height=\"625\"></figure><p>Đặc biệt, trong mùa đại dịch Covid-19, đây là sản phẩm hiệu quả, là tuyến cuối giúp hệ miễn dịch của cơ thể chống lại virus mà không gây quá mẫn. Cực an toàn và hiệu quả cho phổi của bạn.</p><p>Hector Sâm là sản phẩm được tin dùng trong cộng đồng những người quan tâm và kỹ tính về sức khoẻ. Hector sâm còn được mua dùng bởi các Bác sĩ, Dược sĩ, giới Khoa học, Doanh nhân, Văn nghệ sĩ, Vận động viên…</p><h2><strong>Đối tượng nên sử dụng nước đông trùng hạ thảo Hector Sâm:</strong></h2><p>Tất cả mọi người sau tuổi dậy thì đều có thể sử dụng hàng ngày nhằm tăng cường sức đề kháng, tăng cường sức khoẻ.</p><h2><strong>Sản phẩm đặc biệt cần thiết cho:</strong></h2><ul><li>Người đang làm việc dưới cường độ cao (người kinh doanh, nhà quản lý, những người đang là dự án, người đi công tác thường xuyên…)</li><li>Người thường xuyên tiếp khách, hay dùng bia rượu.</li><li>Vận động viên (tham khảo bài viết Lợi ích của đông trùng hạ thảo với giới thể thao)</li><li>Người cần phục hồi nhanh sau bệnh.</li></ul><h2><strong>Thành phần:</strong></h2><p>Đông trùng hạ thảo (500 mg), sâm đinh lăng, sâm dây, chùm ngây, vitamin C, đường mía, chiết xuất cỏ ngọt, màu nghệ tự nhiên, hương sâm tự nhiên.</p><h2><strong>Đông trùng hạ thảo:</strong></h2><p>Đông trùng hạ thảo là loài nấm dược liệu chứa nhiều hợp chất quan trọng với sức khỏe con người. Các lợi ích của Đông Trùng Hạ Thảo, dựa vào bằng chứng khoa học.</p><p>Tăng cường sinh lực. Đông trùng hạ thảo giúp cơ thể sản xuất nhiều ATP. ATP lại chính là nguồn năng lượng cho cơ thể chúng ta, do đó, tăng cường đông trùng hạ thảo sẽ giúp tăng sinh lực cho người dùng.</p><p>Tăng sinh lý cho cả nam và nữ. Tăng khả năng thụ thai do tăng nội tiết và tăng chất lượng tinh trùng. Chính công dụng này mà các vị hoàng đế trung hoa thời xưa thường xuyên sử dụng đông trùng hạ thảo.</p><p>Chống lão hoá, giảm hoạt động các gốc tự do trong tế bào, trẻ hoá tế bào, tăng sản sinh collagen.</p><p>Có nhiều bằng chứng khoa học cho thấy đông trùng hạ thảo có tác dụng ức chế sự tăng sinh các tế bào ung thư, giúp hỗ trợ điều trị ung thư hiệu quả.</p><p>Kiểm soát được đường huyết ở bệnh nhân đái tháo đường. Đông Trùng Hạ Thảo giúp insulin hoạt động hiệu quả hơn.</p><p>Tăng chức năng phổi, tăng hấp thu oxy phổi. Từ sau dịch SARS ở Hongkong năm 2003, giới khoa học nhận thấy, những bệnh nhân SARS có chế độ thường xuyên sử dụng đông trùng hạ thảo khi nhiễm SARS nhanh phục hồi và phổi được bảo vệ tốt hơn những bệnh nhân khác không dùng đông trùng hạ thảo.</p><p>Có thể tốt cho hệ tim mạch. Đông trùng hạ thảo hỗ trợ thêm điều trị nhịp nhanh quá hay chậm quá.</p><p>Tăng đề kháng cho cơ thể trong khi chống lại tính quá mẫn của hệ miễn dịch và kháng viêm hiệu quả. Tham khảo thêm khả năng kháng virus của đông trùng hạ thảo trong bài: Cơ chế kháng virus của đông trùng hạ thảo</p><h2><strong>Nam dương sâm (đinh lăng) và đảng sâm (sâm dây):</strong></h2><p>Đinh lăng và sâm dây có chứa hàm lượng cao Saponin, giúp cơ thể ta tăng hấp thu những dược chất khác, tăng công dụng lên gấp bội.</p><p>Saponin trong 02 dược liệu này còn giúp tăng sinh lý, giải độc gan hiệu quả.</p><p>Đinh lăng có tác dụng tăng cường sinh lực, bồi bổ sức khoẻ, giúp ngủ ngon, giảm đau xương khớp.</p><h2><strong>Chùm ngây:</strong></h2><p>Chùm ngây chứa hàm lượng cao các loại axit amin thiết yếu cho cơ thể, cung cấp nguồn dinh dưỡng, khoáng chất, vitamin cao, giúp bồi bổ sức khoẻ. (tham khảo bài viết Chùm Ngây – Những lợi ích bất ngờ)</p><h2><strong>Công dụng nổi bật</strong></h2><p>Bên cạnh công dụng tăng đề kháng, tăng sức khoẻ nói chung, nước đông trùng hạ thảo Hector sâm còn có các công dụng dễ nhớ như sau:</p><h2><strong>Hướng dẫn sử dụng:</strong></h2><ul><li>Sử dụng từ 1-2 chai/ ngày vào mỗi sáng và trưa để tăng cường sinh lực.</li><li>Dùng 1-2 chai trước hoặc ngay sau khi dùng rượu bia.</li><li>Nước ngon hơn khi uống lạnh;</li><li>Sử dụng trong vòng 1h khi mở nắp.</li><li>Khuyên dùng cho cả nam lẫn nữ.</li></ul><h2><strong>Đóng gói, giá và nơi bán:</strong></h2><ul><li>Hộp 10 chai thủy tinh x 50ml</li><li>Giá bán: 450,000/hộp.</li></ul><figure class=\"image\"><img style=\"aspect-ratio:138/138;\" src=\"https://showroomhangviet.com/wp-content/uploads/2020/10/117391801_2732254993541679_1636559479749323924_n-1-150x150.jpg\" width=\"138\" height=\"138\"></figure><p><br>?Trở thành khách hàng VIP* của HECTOR với chỉ 3 triệu đồng và có cơ hội nhận được những ƯU ĐÃI cực HOT!</p><p>Khách hàng có thể đặt mua online tại đây và được giao hàng trên toàn quốc.</p>', 'Nước đông trùng hạ thảo Hector Sâm giúp đàn ông mạnh mẽ, người lớn tuổi mạnh khoẻ. Hector Sâm giúp vận động viên tăng sức, người lao lực mau phục hồi. Hector Sâm giúp phụ nữ sau sinh tăng tiết sữa, phụ nữ tràn năng lượng. Hector Sâm giúp mọi người mau giải rượu, bảo vệ gan thận tuyệt vời.', 450000.00, 40000.00, NULL, NULL, 1000, 2, 'active', 'public', NULL, NULL, 'uploads/images/main_image-1753978848970-327671701.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0.00, 0, 0, 0, 0, 0, 0, NULL, 1, NULL, NULL, NULL, 0, NULL, NULL, '2025-07-31 16:20:48', '2025-08-01 03:44:18', 0, NULL, NULL, NULL, 'simple', 'Buy Now', NULL, 0, NULL, 1, 1, 'in_stock', 'no', NULL, 0),
(10, 2, 'Kem chống nắng dưỡng da Trái nhàu ADEVA NONI', 'kem-chong-nang-duong-da-trai-nhau-adeva-noni', '123456', NULL, '<p>Kem chống nắng dưỡng da Trái nhàu ADEVA NONI là sản phẩm làm đẹp bởi nhà ADEVA Naturals. Cây Nhàu là một loài cây gỗ nhỏ với sức sống mãnh liệt và có thể sống sót trong những điều kiện tự nhiên khắc nghiệt nhất và cho quả quanh năm. Chính vì thế mà trái nhàu chứa những tinh chất quý báu của tự nhiên. Trái nhàu được sử dụng rất nhiều trong y học để chữa bệnh và còn được ứng dụng trong mỹ phẩm để làm đẹp.</p><figure class=\"image\"><img style=\"aspect-ratio:1920/1920;\" src=\"https://showroomhangviet.com/wp-content/uploads/2020/10/118632401_1175949459444780_6590888700823184286_o.jpg\" alt=\"\" srcset=\"https://showroomhangviet.com/wp-content/uploads/2020/10/118632401_1175949459444780_6590888700823184286_o.jpg 1920w, https://showroomhangviet.com/wp-content/uploads/2020/10/118632401_1175949459444780_6590888700823184286_o-450x450.jpg 450w, https://showroomhangviet.com/wp-content/uploads/2020/10/118632401_1175949459444780_6590888700823184286_o-150x150.jpg 150w, https://showroomhangviet.com/wp-content/uploads/2020/10/118632401_1175949459444780_6590888700823184286_o-595x595.jpg 595w, https://showroomhangviet.com/wp-content/uploads/2020/10/118632401_1175949459444780_6590888700823184286_o-300x300.jpg 300w, https://showroomhangviet.com/wp-content/uploads/2020/10/118632401_1175949459444780_6590888700823184286_o-1024x1024.jpg 1024w, https://showroomhangviet.com/wp-content/uploads/2020/10/118632401_1175949459444780_6590888700823184286_o-768x768.jpg 768w, https://showroomhangviet.com/wp-content/uploads/2020/10/118632401_1175949459444780_6590888700823184286_o-1536x1536.jpg 1536w, https://showroomhangviet.com/wp-content/uploads/2020/10/118632401_1175949459444780_6590888700823184286_o-1200x1200.jpg 1200w\" sizes=\"100vw\" width=\"1920\" height=\"1920\"></figure><h2><i><strong>1. Kem chống nắng trái nhàu ADEVA NONI</strong></i></h2><p>Kem chống nắng dưỡng da Trái nhàu ADEVA NONI với thành phần: Chiết xuất Trái nhàu, Dầu hạt Nhàu, Bơ shea, Suncat, Nestdry, Vitamin B5, PE9010, Essential Oil. Với những thành phần thiên nhiên vô cùng an toàn cho làn da.</p><p>Kem chống nắng dạng sữa, chất kem mỏng nhẹ. Lên tone da nhẹ, da mềm mượt và căng mịn. Ít để lại vệt trắng trên da.</p><figure class=\"image\"><img style=\"aspect-ratio:960/960;\" src=\"https://showroomhangviet.com/wp-content/uploads/2020/10/110791667_3344427098951055_5798569622268648380_n.jpg\" alt=\"\" srcset=\"https://showroomhangviet.com/wp-content/uploads/2020/10/110791667_3344427098951055_5798569622268648380_n.jpg 960w, https://showroomhangviet.com/wp-content/uploads/2020/10/110791667_3344427098951055_5798569622268648380_n-450x450.jpg 450w, https://showroomhangviet.com/wp-content/uploads/2020/10/110791667_3344427098951055_5798569622268648380_n-150x150.jpg 150w, https://showroomhangviet.com/wp-content/uploads/2020/10/110791667_3344427098951055_5798569622268648380_n-595x595.jpg 595w, https://showroomhangviet.com/wp-content/uploads/2020/10/110791667_3344427098951055_5798569622268648380_n-300x300.jpg 300w, https://showroomhangviet.com/wp-content/uploads/2020/10/110791667_3344427098951055_5798569622268648380_n-768x768.jpg 768w\" sizes=\"100vw\" width=\"960\" height=\"960\"></figure><h2><i><strong>2. Công dụng kem chống nắng nhàu</strong></i></h2><p>– Kem chống nắng dưỡng da với SPF 50 PA +++ giúp bảo vệ da khỏi tia UVB trong khoảng 500 phút. Giúp chống lại 98% UVB và 90% UVA.</p><p>– Kem chống nắng có thành phần chiết xuất Trái nhàu giúp da mềm mại, cung cấp độ ẩm cần thiết cho làn da.</p><p>– Là sự kết hợp giữa 50% Vật lý, 50% Hóa học an toàn và bảo vệ da tốt.</p><p>– Thành phần Vitamin B5 trong kem chống nắng tốt cho cả da nhạy cảm và da dễ kích ứng.</p><p>– Mùi tinh dầu dịu nhẹ, không sử dụng hương tổng hợp gây khô da và kích ứng.</p><h2><i><strong>3. Đối tượng sử dụng:</strong></i></h2><p>Kem chống nắng dưỡng da trái nhàu phù hợp tất cả loại da. Da nhờn, mụn nám nhẹ, da dễ bị kích ứng vẫn dùng tốt.</p><h2><i><strong>4. Cách dùng:</strong></i></h2><p>Lấy một lượng kem vừa đủ thoa đều lên vùng da mặt và cổ, sau đó massage nhẹ nhàng cho tinh chất thẩm thấu đều vào da.</p><p>Nên dùng mỗi ngày, dù trời mưa hay râm mát</p><h2><i><strong>5. Bảo quản:</strong></i></h2><p>Bảo quản nơi khô ráo, thoáng mát Tránh ánh nắng trực tiếp</p><h2><i><strong>6. Xuất xứ:</strong></i></h2><p>Đà Nẵng, Việt Nam</p><h2><i><strong>7. Hạn sử dụng:</strong></i></h2><p>2 năm kể từ NSX</p><p>Sản phẩm của Adeva Noni</p><p><i><strong>Khách hàng có thể đặt mua online tại đây và được giao hàng trên toàn quốc.</strong></i></p>', 'Kem chống nắng dưỡng da Trái nhàu ADEVA NONI với thành phần: Chiết xuất Trái nhàu, Dầu hạt Nhàu, Bơ shea, Suncat, Nestdry, Vitamin B5, PE9010, Essential Oil. Với những thành phần thiên nhiên vô cùng an toàn cho làn da.\n\nKem chống nắng dạng sữa, chất kem mỏng nhẹ. Lên tone da nhẹ, da mềm mượt và căng mịn. Ít để lại vệt trắng trên da.', 300000.00, 225000.00, NULL, NULL, 0, 3, 'active', 'public', NULL, NULL, 'uploads/images/main_image-1754019504989-291911904.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0.00, 0, 0, 0, 0, 0, 0, NULL, 1, NULL, NULL, NULL, 0, NULL, NULL, '2025-08-01 03:38:24', '2025-08-01 03:42:35', 0, NULL, NULL, NULL, 'simple', 'Buy Now', NULL, 0, NULL, 1, 1, 'in_stock', 'no', NULL, 0),
(11, 1, 'Mặt nạ dưỡng da Trái nhàu – Noni Mask', 'mat-na-duong-da-trai-nhau-noni-mask', '', '', '<p>Sau một ngày dài mệt mỏi với đống công việc hay bài tập chất chồng, chắc hẳn bạn sẽ cần những phút giây nghỉ ngơi thả lõng đầu óc! Và đừng quên làn da của bạn cũng cần được relax nhé!</p><figure class=\"image\"><img style=\"aspect-ratio:1536/2048;\" src=\"https://showroomhangviet.com/wp-content/uploads/2020/10/118154612_3416540028406428_2798047418019890635_o.jpg\" alt=\"\" srcset=\"https://showroomhangviet.com/wp-content/uploads/2020/10/118154612_3416540028406428_2798047418019890635_o.jpg 1536w, https://showroomhangviet.com/wp-content/uploads/2020/10/118154612_3416540028406428_2798047418019890635_o-450x600.jpg 450w, https://showroomhangviet.com/wp-content/uploads/2020/10/118154612_3416540028406428_2798047418019890635_o-595x793.jpg 595w, https://showroomhangviet.com/wp-content/uploads/2020/10/118154612_3416540028406428_2798047418019890635_o-225x300.jpg 225w, https://showroomhangviet.com/wp-content/uploads/2020/10/118154612_3416540028406428_2798047418019890635_o-768x1024.jpg 768w, https://showroomhangviet.com/wp-content/uploads/2020/10/118154612_3416540028406428_2798047418019890635_o-1152x1536.jpg 1152w\" sizes=\"100vw\" width=\"1536\" height=\"2048\"></figure><p>Mặt nạ dưỡng da từ trái nhàu sẽ là sự lựa chọn tuyệt vời cho bạn</p><p>I. THÀNH PHẦN CHÍNH MẶT NẠ DƯỠNG DA NONI<br>Mặt nạ thiên nhiên trái nhàu với những thành phần chính là: Chiết xuất trái nhàu (nước cất nhàu), mật ong, bột trái nhàu, enzym trái nhàu, vitamin B5, Vitamin E, Vitamin C, tinh dầu. Chỉ toàn là những dưỡng chất siêu xịn cho làn da. Và NONI Mask ra đời với 3 tiêu chí:</p><p>KHÔNG CỒN – KHÔNG HƯƠNG LIỆU – KHÔNG PARABEN<br>Vì vậy, bạn hoàn toàn có thể yên tâm khi sử dụng mặt nạ thiên nhiên từ trái nhàu của ADEVA.</p><figure class=\"image\"><img style=\"aspect-ratio:400/400;\" src=\"https://showroomhangviet.com/wp-content/uploads/2020/10/z1994889932518_39caee7e2d9c7978c4e309056f768cdc-400x400-1.jpg\" alt=\"\" srcset=\"https://showroomhangviet.com/wp-content/uploads/2020/10/z1994889932518_39caee7e2d9c7978c4e309056f768cdc-400x400-1.jpg 400w, https://showroomhangviet.com/wp-content/uploads/2020/10/z1994889932518_39caee7e2d9c7978c4e309056f768cdc-400x400-1-150x150.jpg 150w, https://showroomhangviet.com/wp-content/uploads/2020/10/z1994889932518_39caee7e2d9c7978c4e309056f768cdc-400x400-1-300x300.jpg 300w\" sizes=\"100vw\" width=\"400\" height=\"400\"></figure><p>II. CÔNG DỤNG MẶT NẠ DƯỠNG DA NONI<br>Với những dưỡng chất tuyệt vời nhất trong bột trái nhàu và những thành phần khác, Noni Mask sẽ giúp làn da bạn:</p><p>Mềm mịn, trắng sáng<br>Giảm nếp nhăn, thâm nám<br>Ngừa mụn, chống viêm<br>Phục hồi và tái tạo làn da<br>III. Cách dùng<br>Sau khi rửa sạch mặt với sửa rửa mặt, thoa mặt nạ lên da đồng thời massage nhẹ nhàng.</p><p>mặt nạ trái nhàu</p><p>Thư giãn tầm 15-20′ rồi rửa mặt lại với nước lạnh, sau đó dùng Noni toner và kem dưỡng da NONI.</p><figure class=\"image\"><img style=\"aspect-ratio:206/206;\" src=\"https://showroomhangviet.com/wp-content/uploads/2020/10/118475173_3407461715980926_6573042121628966038_o.jpg\" alt=\"\" srcset=\"https://showroomhangviet.com/wp-content/uploads/2020/10/118475173_3407461715980926_6573042121628966038_o.jpg 206w, https://showroomhangviet.com/wp-content/uploads/2020/10/118475173_3407461715980926_6573042121628966038_o-150x150.jpg 150w\" sizes=\"100vw\" width=\"206\" height=\"206\"></figure><p>IV. CẦN TRÁNH<br>1) Không thoa lên vết thương, vùng da viêm nhiễm, lở loét<br>2) Ngưng sử dụng mỹ phẩm khi gặp phải các triệu chứng sau. Nếu tiếp tục sử dụng có thể khiến tình trạng trở nên trầm trọng, cần tư vấn với chuyên gia về da liễu</p><p>– Thường xuyên bị nổi đốm đỏ, sưng phù, mẩn ngứa khi sử dụng v.v.</p><p>– Khi tiếp xúc với ánh sáng trực tiếp thi vùng da thoa mỹ phẩm bị các triệu chứng nêu trên.</p><p>3) Chú ý khi bảo quản và sử dụng:<br>– Cẩn thận đóng chặt nắp sau khi dùng<br>– Để nơi ngoài tầm với của trẻ em<br>– Tránh ánh nắng trực tiếp.</p><p>Adeva Noni đang có sẵn nhiều sản phẩm từ Trái nhàu khác như: Bột nhàu, Viên nhàu, Nước cốt nhàu, Trái nhàu sấy khô, Trà nhàu, Xà bông nhàu, Son dưỡng môi…</p><p><i><strong>Khách hàng có thể đặt mua online tại đây và được giao hàng trên toàn quốc.</strong></i></p>', '♥ Mặt nạ dưỡng da thiên nhiên từ trái nhàu ♥\n\nCho bạn làn da mềm mịn trắng sáng và trẻ hơn mỗi ngày', 200000.00, 175000.00, '2025-08-05 17:00:00', '2025-08-29 17:00:00', 0, 3, 'active', 'public', NULL, NULL, 'uploads/images/main_image-1754023418521-516880818.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0.00, 0, 0, 0, 0, 0, 0, NULL, 1, NULL, NULL, NULL, 0, NULL, NULL, '2025-08-01 04:43:38', '2025-08-01 04:43:38', 0, NULL, NULL, NULL, 'simple', 'Buy Now', NULL, 0, NULL, 1, 1, 'in_stock', 'no', NULL, 0),
(13, 1, 'Son dưỡng Handmade dâu tây – ADEVA lipbalm', 'son-duong-handmade-dau-tay-adeva-lipbalm', '1', '', '<p>Cả nhà đã dùng thử Son dưỡng handmade nhà Adeva Naturals chưa???</p><p>Cái răng cái tóc là góc con người. Còn cái môi cái miệng thì là gì??? Là điểm mấu chốt của gương mặt đấy cả nhà!!!</p><p>Miệng xinh duyên dáng ai mà hông yêu! Chăm sóc đôi môi cũng cần cẩn thận, tỉ mỉ như chăm sóc làn da bé bỏng của mình vậy. Adeva biết điều này, biết rằng cả nhà cần dòng son dưỡng môi an toàn cơ thể, không chì, không hóa chất độc hại. Son dưỡng handmade Adeva Lipbalm được ấp ủ, thai nghén qua thời gian và đã ra đời dòng son chất lượng cho cả nhà trải nghiệm.</p><figure class=\"image\"><img style=\"aspect-ratio:225/300;\" src=\"https://showroomhangviet.com/wp-content/uploads/2020/10/son-duong-moi-dua-adeva-lipbalm-1-300x400-1-225x300.jpg\" alt=\"\" srcset=\"https://showroomhangviet.com/wp-content/uploads/2020/10/son-duong-moi-dua-adeva-lipbalm-1-300x400-1-225x300.jpg 225w, https://showroomhangviet.com/wp-content/uploads/2020/10/son-duong-moi-dua-adeva-lipbalm-1-300x400-1.jpg 300w\" sizes=\"100vw\" width=\"225\" height=\"300\"></figure><p>Son dưỡng môi Adeva Naturals được làm thủ công từ các nguyên liệu thiên nhiên cho cả nhà đôi môi ẩm mềm, tránh bong tróc.</p><p><strong>I. Son dưỡng handmade</strong><br>Thành phần chính: Dầu dừa, Sáp ong, Vitamin E, Hương dâu tây</p><p>Son dưỡng handmade Adeva lipbalm chứa Dầu dừa. Đây là loại dầu chứa nhiều acid lauric, vitamin E giúp dưỡng môi mềm mịn, giảm thâm môi, bảo vệ môi không bị bong tróc, nứt nẻ (1 trong những nguyên nhân chính gây thâm môi)</p><figure class=\"image\"><img style=\"aspect-ratio:300/300;\" src=\"https://showroomhangviet.com/wp-content/uploads/2020/10/e97a490b702d8973d03c-600x601-1-300x300.jpg\" alt=\"\" srcset=\"https://showroomhangviet.com/wp-content/uploads/2020/10/e97a490b702d8973d03c-600x601-1-300x300.jpg 300w, https://showroomhangviet.com/wp-content/uploads/2020/10/e97a490b702d8973d03c-600x601-1-450x451.jpg 450w, https://showroomhangviet.com/wp-content/uploads/2020/10/e97a490b702d8973d03c-600x601-1-150x150.jpg 150w, https://showroomhangviet.com/wp-content/uploads/2020/10/e97a490b702d8973d03c-600x601-1-595x596.jpg 595w, https://showroomhangviet.com/wp-content/uploads/2020/10/e97a490b702d8973d03c-600x601-1.jpg 600w\" sizes=\"100vw\" width=\"300\" height=\"300\"></figure><p><strong>II. Công dụng son dưỡng Adeva Lipbalm</strong></p><p>Thành phần Dầu dừa: Dầu dừa nổi tiếng trong công cuộc làm đẹp của chị em nhờ vào những tác dụng thần kỳ của nó.</p><p>Một trong những công dụng của dầu dừa là dưỡng môi rất tốt, giúp môi không bị bong tróc. Bên cạnh đó, nó còn giúp hạn chế thâm môi do nhiễm chì, hóa chất độc hại. Khi sử dụng son màu, nên dùng son dưỡng dừa trước để môi được lên màu tự nhiên và đẹp hơn.</p><p>Thành phần sáp ong: Mình tìm hiểu thì biết được sáp ong có chứa các axit amin. Thành phần này thúc đẩy sự phát triển và hồi phục của tế bào, Ngoài ra, các chuỗi axit béo trung bình trong sáp ong còn có công dụng kháng khuẩn và giúp nhanh lành vết thương. Các nhóm vitamin và khoáng chất giúp dưỡng cho đôi môi mềm, ẩm mịn, chống lão hóa tốt.</p><figure class=\"image\"><img style=\"aspect-ratio:300/300;\" src=\"https://showroomhangviet.com/wp-content/uploads/2020/10/62a2ea1bf2670b395276-1-600x600-1-300x300.jpg\" alt=\"\" srcset=\"https://showroomhangviet.com/wp-content/uploads/2020/10/62a2ea1bf2670b395276-1-600x600-1-300x300.jpg 300w, https://showroomhangviet.com/wp-content/uploads/2020/10/62a2ea1bf2670b395276-1-600x600-1-450x450.jpg 450w, https://showroomhangviet.com/wp-content/uploads/2020/10/62a2ea1bf2670b395276-1-600x600-1-150x150.jpg 150w, https://showroomhangviet.com/wp-content/uploads/2020/10/62a2ea1bf2670b395276-1-600x600-1-595x595.jpg 595w, https://showroomhangviet.com/wp-content/uploads/2020/10/62a2ea1bf2670b395276-1-600x600-1.jpg 600w\" sizes=\"100vw\" width=\"300\" height=\"300\"></figure><p><strong>3. Đối tượng sử dụng:</strong> Tất cả mọi người đều sử dụng được. Ăn nuốt đều an toàn, nên cả mẹ bầu và trẻ nhỏ đều có thể sử dụng được.</p><p><strong>4. Sản xuất tại:</strong> Đà Nẵng, Việt Nam</p><p>Son dưỡng Adeva Lipbalm được chính Adeva làm và sử dụng, nên cả nhà yên tâm về độ an toàn và chất lượng sản phẩm nhé!</p><p><strong>5. Hạn sử dụng:</strong> 2 năm</p><p><strong>6. Sản xuất tại:</strong> Adeva Naturals Co., Ltd</p><p><i><strong>Khách hàng có thể đặt mua online tại đây và được giao hàng trên toàn quốc.</strong></i></p>', '- Thành phần chính từ Dầu dừa ép lạnh, Sáp ong thiên nhiên, Vitamin E, Hương dâu tây\n- An toàn cho cả mẹ bầu\n- Giảm tình trạng thâm môi', 100000.00, 60000.00, NULL, NULL, 0, 3, 'inactive', 'public', NULL, NULL, 'uploads/images/main_image-1754038269923-983217541.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0.00, 0, 0, 0, 0, 0, 0, NULL, 1, NULL, NULL, NULL, 0, NULL, NULL, '2025-08-01 08:51:09', '2025-08-01 08:51:09', 0, NULL, NULL, NULL, 'simple', 'Buy Now', NULL, 0, NULL, 1, 0, 'in_stock', 'no', NULL, 0),
(14, 1, 'Son dưỡng handmade Dừa', 'son-duong-handmade-dua', '2', '', '<p>Cả nhà đã dùng thử Son dưỡng handmade nhà Adeva Naturals chưa???</p><p>Cái răng cái tóc là góc con người. Còn cái môi cái miệng thì là gì??? Là điểm mấu chốt của gương mặt đấy cả nhà!!!</p><p>Miệng xinh duyên dáng ai mà hông yêu! Chăm sóc đôi môi cũng cần cẩn thận, tỉ mỉ như chăm sóc làn da bé bỏng của mình vậy. Adeva biết điều này, biết rằng cả nhà cần dòng son dưỡng môi an toàn cơ thể, không chì, không hóa chất độc hại. Son dưỡng handmade Adeva Lipbalm được ấp ủ, thai nghén qua thời gian và đã ra đời dòng son chất lượng cho cả nhà trải nghiệm.</p><figure class=\"image\"><img style=\"aspect-ratio:600/603;\" src=\"https://showroomhangviet.com/wp-content/uploads/2020/10/son-duong-moi-dua-adeva-lipbalm-4-600x603-1.jpg\" alt=\"\" srcset=\"https://showroomhangviet.com/wp-content/uploads/2020/10/son-duong-moi-dua-adeva-lipbalm-4-600x603-1.jpg 600w, https://showroomhangviet.com/wp-content/uploads/2020/10/son-duong-moi-dua-adeva-lipbalm-4-600x603-1-450x452.jpg 450w, https://showroomhangviet.com/wp-content/uploads/2020/10/son-duong-moi-dua-adeva-lipbalm-4-600x603-1-150x150.jpg 150w, https://showroomhangviet.com/wp-content/uploads/2020/10/son-duong-moi-dua-adeva-lipbalm-4-600x603-1-595x598.jpg 595w\" sizes=\"100vw\" width=\"600\" height=\"603\"></figure><p>Son dưỡng môi Adeva Naturals được làm thủ công từ các nguyên liệu thiên nhiên cho cả nhà đôi môi ẩm mềm, tránh bong tróc.</p><h2><strong>I. Son dưỡng handmade</strong></h2><p>Thành phần chính: Dầu dừa, Sáp ong, Vitamin E, Hương dừa</p><p>Son dưỡng handmade Adeva lipbalm chứa Dầu dừa. Đây là loại dầu chứa nhiều acid lauric, vitamin E giúp dưỡng môi mềm mịn, giảm thâm môi, bảo vệ môi không bị bong tróc, nứt nẻ (1 trong những nguyên nhân chính gây thâm môi)</p><figure class=\"image\"><img style=\"aspect-ratio:607/960;\" src=\"https://showroomhangviet.com/wp-content/uploads/2020/10/son-duong-moi-dua-adeva-lipbalm-2.jpg\" alt=\"\" srcset=\"https://showroomhangviet.com/wp-content/uploads/2020/10/son-duong-moi-dua-adeva-lipbalm-2.jpg 607w, https://showroomhangviet.com/wp-content/uploads/2020/10/son-duong-moi-dua-adeva-lipbalm-2-450x712.jpg 450w, https://showroomhangviet.com/wp-content/uploads/2020/10/son-duong-moi-dua-adeva-lipbalm-2-595x941.jpg 595w, https://showroomhangviet.com/wp-content/uploads/2020/10/son-duong-moi-dua-adeva-lipbalm-2-190x300.jpg 190w\" sizes=\"100vw\" width=\"607\" height=\"960\"></figure><h2><strong>II. Công dụng son dưỡng Adeva Lipbalm</strong></h2><p>Thành phần Dầu dừa: Dầu dừa nổi tiếng trong công cuộc làm đẹp của chị em nhờ vào những tác dụng thần kỳ của nó.</p><p>Một trong những công dụng của dầu dừa là dưỡng môi rất tốt, giúp môi không bị bong tróc. Bên cạnh đó, nó còn giúp hạn chế thâm môi do nhiễm chì, hóa chất độc hại. Khi sử dụng son màu, nên dùng son dưỡng dừa trước để môi được lên màu tự nhiên và đẹp hơn.</p><p>Thành phần sáp ong: Mình tìm hiểu thì biết được sáp ong có chứa các axit amin. Thành phần này thúc đẩy sự phát triển và hồi phục của tế bào, Ngoài ra, các chuỗi axit béo trung bình trong sáp ong còn có công dụng kháng khuẩn và giúp nhanh lành vết thương. Các nhóm vitamin và khoáng chất giúp dưỡng cho đôi môi mềm, ẩm mịn, chống lão hóa tốt.</p><figure class=\"image\"><img style=\"aspect-ratio:600/800;\" src=\"https://showroomhangviet.com/wp-content/uploads/2020/10/son-duong-moi-dua-adeva-lipbalm-3-600x800-1.jpg\" alt=\"\" srcset=\"https://showroomhangviet.com/wp-content/uploads/2020/10/son-duong-moi-dua-adeva-lipbalm-3-600x800-1.jpg 600w, https://showroomhangviet.com/wp-content/uploads/2020/10/son-duong-moi-dua-adeva-lipbalm-3-600x800-1-450x600.jpg 450w, https://showroomhangviet.com/wp-content/uploads/2020/10/son-duong-moi-dua-adeva-lipbalm-3-600x800-1-595x793.jpg 595w, https://showroomhangviet.com/wp-content/uploads/2020/10/son-duong-moi-dua-adeva-lipbalm-3-600x800-1-225x300.jpg 225w\" sizes=\"100vw\" width=\"600\" height=\"800\"></figure><p>3. Đối tượng sử dụng: Tất cả mọi người đều sử dụng được. Ăn nuốt đều an toàn, nên cả mẹ bầu và trẻ nhỏ đều có thể sử dụng được.</p><p>4. Sản xuất tại: Đà Nẵng, Việt Nam</p><p>Son dưỡng Adeva Lipbalm được chính Adeva làm và sử dụng, nên cả nhà yên tâm về độ an toàn và chất lượng sản phẩm nhé!</p><p>5. Hạn sử dụng: 2 năm</p><p>6. Sản xuất tại: Adeva Naturals Co., Ltd</p><p><i><strong>Khách hàng có thể đặt mua online tại đây và được giao hàng trên toàn quốc.</strong></i></p>', '- Thành phần chính từ Dầu dừa ép lạnh, Sáp ong thiên nhiên, Vitamin E, Hương dừa\n- An toàn cho cả mẹ bầu\n- Giảm tình trạng thâm môi', 50000.00, 40000.00, NULL, NULL, 10, 3, 'active', 'public', NULL, NULL, 'uploads/images/main_image-1754038560717-93273606.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0.00, 0, 0, 0, 1, 0, 0, NULL, 1, NULL, NULL, NULL, 0, NULL, NULL, '2025-08-01 08:56:00', '2025-08-01 08:56:22', 0, NULL, NULL, NULL, 'simple', 'Buy Now', NULL, 0, NULL, 1, 1, 'in_stock', 'no', NULL, 0),
(15, 1, 'Cà Phê Sữa Đá Hòa Tan Sài Gòn - UFO Coffee', 'ca-phe-sua-dja-hoa-tan-sai-gon-ufo-coffee', '100020010871', '100020010873', '<figure class=\"image\"><img style=\"aspect-ratio:900/506;\" src=\"https://insight-production-dthkezetfscvdsdt.z02.azurefd.net/insight-production/uploads/1_1751371788075.jpg\" width=\"900\" height=\"506\"></figure><figure class=\"image\"><img style=\"aspect-ratio:900/506;\" src=\"https://insight-production-dthkezetfscvdsdt.z02.azurefd.net/insight-production/uploads/2_1751371788163.jpg\" width=\"900\" height=\"506\"></figure><figure class=\"image\"><img style=\"aspect-ratio:900/506;\" src=\"https://insight-production-dthkezetfscvdsdt.z02.azurefd.net/insight-production/uploads/3_1751371788246.jpg\" width=\"900\" height=\"506\"></figure><figure class=\"image\"><img style=\"aspect-ratio:900/506;\" src=\"https://insight-production-dthkezetfscvdsdt.z02.azurefd.net/insight-production/uploads/4_1751371788243.jpg\" width=\"900\" height=\"506\"></figure><figure class=\"image\"><img style=\"aspect-ratio:900/506;\" src=\"https://insight-production-dthkezetfscvdsdt.z02.azurefd.net/insight-production/uploads/5_1751371788143.jpg\" width=\"900\" height=\"506\"></figure><figure class=\"image\"><img style=\"aspect-ratio:900/506;\" src=\"https://insight-production-dthkezetfscvdsdt.z02.azurefd.net/insight-production/uploads/6_1751371788083.jpg\" width=\"900\" height=\"506\"></figure><figure class=\"image\"><img style=\"aspect-ratio:900/506;\" src=\"https://insight-production-dthkezetfscvdsdt.z02.azurefd.net/insight-production/uploads/7_1751371788698.jpg\" width=\"900\" height=\"506\"></figure><figure class=\"image\"><img style=\"aspect-ratio:900/506;\" src=\"https://insight-production-dthkezetfscvdsdt.z02.azurefd.net/insight-production/uploads/8_1751371788820.jpg\" width=\"900\" height=\"506\"></figure><figure class=\"image\"><img style=\"aspect-ratio:900/506;\" src=\"https://insight-production-dthkezetfscvdsdt.z02.azurefd.net/insight-production/uploads/9_1751371788921.jpg\" width=\"900\" height=\"506\"></figure><figure class=\"image\"><img style=\"aspect-ratio:900/506;\" src=\"https://insight-production-dthkezetfscvdsdt.z02.azurefd.net/insight-production/uploads/10_1751371788721.jpg\" width=\"900\" height=\"506\"></figure><figure class=\"image\"><img style=\"aspect-ratio:1929/1200;\" src=\"https://insight-production-dthkezetfscvdsdt.z02.azurefd.net/insight-production/uploads/11_1751371788756.jpg\" width=\"1929\" height=\"1200\"></figure><figure class=\"image\"><img style=\"aspect-ratio:1815/1200;\" src=\"https://insight-production-dthkezetfscvdsdt.z02.azurefd.net/insight-production/uploads/12_1751371788801.jpg\" width=\"1815\" height=\"1200\"></figure>', '', 75000.00, 49000.00, '2025-08-07 17:00:00', '2025-08-22 17:00:00', 0, 4, 'active', 'public', NULL, NULL, NULL, 128.00, 10.00, 19.00, 10.00, '14,9,8', '13,8,10', NULL, NULL, 0.00, 0, 0, 0, 1, 0, 0, NULL, 1, NULL, NULL, NULL, 0, NULL, NULL, '2025-08-02 15:22:39', '2025-08-02 15:22:39', 0, NULL, NULL, NULL, 'simple', 'Buy Now', NULL, 0, NULL, 1, 0, 'in_stock', 'no', NULL, 0);
INSERT INTO `products` (`id`, `seller_id`, `name`, `slug`, `sku`, `barcode`, `description`, `short_description`, `price`, `sale_price`, `sale_start`, `sale_end`, `stock`, `brand_id`, `status`, `visibility`, `meta_title`, `meta_description`, `main_image`, `weight`, `length`, `width`, `height`, `up_sell_ids`, `cross_sell_ids`, `external_url`, `video_url`, `rating_avg`, `rating_count`, `sold_count`, `view_count`, `is_featured`, `is_new`, `is_best_seller`, `shipping_class_id`, `min_order_quantity`, `max_order_quantity`, `tax_class`, `barcode_type`, `draft_status`, `available_from`, `available_to`, `created_at`, `updated_at`, `is_deleted`, `deleted_at`, `scheduled_public_at`, `scheduled_status`, `product_type`, `button_text`, `purchase_note`, `menu_order`, `default_variation_id`, `enable_reviews`, `manage_stock`, `stock_status`, `allow_backorders`, `low_stock_threshold`, `sold_individually`) VALUES
(20, 1, 'Cà Phê Sữa Đá Hòa Tan Sài Gòn - UFO Coffee 123', 'ca-phe-sua-dja-hoa-tan-sai-gon-ufo-coffee-123', '1000200108711', '1000200108731', '<figure class=\"image\"><img style=\"aspect-ratio:900/506;\" src=\"https://insight-production-dthkezetfscvdsdt.z02.azurefd.net/insight-production/uploads/1_1751371788075.jpg\" width=\"900\" height=\"506\"></figure>', 'sdsdsdsd sdsds sd sdfsd', 75000.00, 49000.00, '2025-08-07 17:00:00', '2025-08-22 17:00:00', 0, 4, 'active', 'public', NULL, NULL, 'uploads/images/main_image-1754149276183-241609548.jpg', 128.00, 10.00, 19.00, 10.00, '14,9,8', '13,8,10', NULL, NULL, 0.00, 0, 0, 0, 0, 0, 0, NULL, 1, NULL, NULL, NULL, 0, NULL, NULL, '2025-08-02 15:26:45', '2025-08-04 08:43:53', 0, NULL, NULL, NULL, 'variable', 'Buy Now', NULL, 0, 79, 1, 0, 'in_stock', 'no', NULL, 0),
(23, 1, 'Cà Phê Sữa Đá Hòa Tan Sài Gòn - UFO Coffee 1', 'ca-phe-sua-dja-hoa-tan-sai-gon-ufo-coffee-1', '10002001087', '10002001087', '<figure class=\"image\"><img style=\"aspect-ratio:900/506;\" src=\"https://insight-production-dthkezetfscvdsdt.z02.azurefd.net/insight-production/uploads/1_1751371788075.jpg\" width=\"900\" height=\"506\"></figure><figure class=\"image\"><img style=\"aspect-ratio:900/506;\" src=\"https://insight-production-dthkezetfscvdsdt.z02.azurefd.net/insight-production/uploads/2_1751371788163.jpg\" width=\"900\" height=\"506\"></figure><figure class=\"image\"><img style=\"aspect-ratio:900/506;\" src=\"https://insight-production-dthkezetfscvdsdt.z02.azurefd.net/insight-production/uploads/3_1751371788246.jpg\" width=\"900\" height=\"506\"></figure><figure class=\"image\"><img style=\"aspect-ratio:900/506;\" src=\"https://insight-production-dthkezetfscvdsdt.z02.azurefd.net/insight-production/uploads/4_1751371788243.jpg\" width=\"900\" height=\"506\"></figure><figure class=\"image\"><img style=\"aspect-ratio:900/506;\" src=\"https://insight-production-dthkezetfscvdsdt.z02.azurefd.net/insight-production/uploads/5_1751371788143.jpg\" width=\"900\" height=\"506\"></figure><figure class=\"image\"><img style=\"aspect-ratio:900/506;\" src=\"https://insight-production-dthkezetfscvdsdt.z02.azurefd.net/insight-production/uploads/6_1751371788083.jpg\" width=\"900\" height=\"506\"></figure><figure class=\"image\"><img style=\"aspect-ratio:900/506;\" src=\"https://insight-production-dthkezetfscvdsdt.z02.azurefd.net/insight-production/uploads/7_1751371788698.jpg\" width=\"900\" height=\"506\"></figure><figure class=\"image\"><img style=\"aspect-ratio:900/506;\" src=\"https://insight-production-dthkezetfscvdsdt.z02.azurefd.net/insight-production/uploads/8_1751371788820.jpg\" width=\"900\" height=\"506\"></figure><figure class=\"image\"><img style=\"aspect-ratio:900/506;\" src=\"https://insight-production-dthkezetfscvdsdt.z02.azurefd.net/insight-production/uploads/9_1751371788921.jpg\" width=\"900\" height=\"506\"></figure><figure class=\"image\"><img style=\"aspect-ratio:900/506;\" src=\"https://insight-production-dthkezetfscvdsdt.z02.azurefd.net/insight-production/uploads/10_1751371788721.jpg\" width=\"900\" height=\"506\"></figure><figure class=\"image\"><img style=\"aspect-ratio:1929/1200;\" src=\"https://insight-production-dthkezetfscvdsdt.z02.azurefd.net/insight-production/uploads/11_1751371788756.jpg\" width=\"1929\" height=\"1200\"></figure><figure class=\"image\"><img style=\"aspect-ratio:1815/1200;\" src=\"https://insight-production-dthkezetfscvdsdt.z02.azurefd.net/insight-production/uploads/12_1751371788801.jpg\" width=\"1815\" height=\"1200\"></figure>', 'sdsdsdsd', 75000.00, 49000.00, '2025-08-07 17:00:00', '2025-08-22 17:00:00', 0, 4, 'active', 'public', NULL, NULL, 'uploads/images/main_image-1754148465789-443166334.jpg', 128.00, 10.00, 19.00, 10.00, '14,9,8', '13,8,10', NULL, NULL, 0.00, 0, 0, 0, 1, 0, 0, NULL, 1, NULL, NULL, NULL, 0, NULL, NULL, '2025-08-02 15:27:45', '2025-08-02 15:27:45', 0, NULL, NULL, NULL, 'simple', 'Buy Now', NULL, 0, NULL, 1, 0, 'in_stock', 'no', NULL, 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_attributes`
--

CREATE TABLE `product_attributes` (
  `id` bigint NOT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` enum('select','text') COLLATE utf8mb4_unicode_ci DEFAULT 'select',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `enable_archives` tinyint(1) NOT NULL DEFAULT '1',
  `default_sort_order` enum('custom','name','name_numeric','id') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'custom',
  `swatch_size` enum('default','large','extra_large') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'default',
  `show_label` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `product_attributes`
--

INSERT INTO `product_attributes` (`id`, `name`, `slug`, `type`, `created_at`, `enable_archives`, `default_sort_order`, `swatch_size`, `show_label`) VALUES
(1, 'Xuất xứ', 'xuat-xu', 'select', '2025-08-01 11:34:31', 1, 'custom', 'default', 1),
(2, 'Thương hiệu', 'thuong-hieu', 'select', '2025-08-01 11:34:41', 1, 'custom', 'default', 1),
(3, 'Hạn sử dụng', 'han-su-dung', 'select', '2025-08-01 16:12:47', 0, 'custom', 'default', 0),
(4, 'Ngày sản xuất', 'ngay-san-xuat', 'select', '2025-08-02 03:18:18', 0, 'custom', 'default', 0),
(8, 'Hộp 8 Gói', 'hop-8-goi', 'select', '2025-08-03 08:26:00', 1, 'custom', 'default', 1),
(9, 'Túi 40 Gói', 'tui-40-goi', 'select', '2025-08-03 08:26:00', 1, 'custom', 'default', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_attribute_map`
--

CREATE TABLE `product_attribute_map` (
  `id` bigint NOT NULL,
  `product_id` bigint NOT NULL,
  `attribute_id` bigint NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_attribute_values`
--

CREATE TABLE `product_attribute_values` (
  `id` bigint NOT NULL,
  `attribute_id` bigint NOT NULL,
  `value` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `product_attribute_values`
--

INSERT INTO `product_attribute_values` (`id`, `attribute_id`, `value`, `slug`, `description`, `created_at`) VALUES
(1, 1, 'Việt Nam', NULL, NULL, '2025-08-02 04:12:49'),
(3, 3, '3 tháng', '3-thang', '', '2025-08-02 04:13:14'),
(4, 3, '6 tháng', '6-thang', '', '2025-08-02 04:13:18'),
(6, 3, '12 tháng', '12-thang', '', '2025-08-02 06:11:01'),
(10, 4, 'In trên bao bì', 'in-tren-bao-bi', NULL, '2025-08-02 15:57:39'),
(11, 8, 'Hộp 8 Gói x 16g', 'hop-8-goi-x-16g', NULL, '2025-08-03 08:26:00'),
(12, 9, 'Túi 40 Gói x 16g', 'tui-40-goi-x-16g', NULL, '2025-08-03 08:26:00'),
(13, 2, 'UFO', 'ufo', NULL, '2025-08-03 16:11:28');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_attribute_value_map`
--

CREATE TABLE `product_attribute_value_map` (
  `product_id` bigint NOT NULL,
  `value_id` bigint NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `product_attribute_value_map`
--

INSERT INTO `product_attribute_value_map` (`product_id`, `value_id`, `created_at`, `updated_at`) VALUES
(15, 6, '2025-08-02 15:56:55', '2025-08-02 15:56:55'),
(20, 6, '2025-08-03 08:34:42', '2025-08-03 08:34:42'),
(20, 10, '2025-08-03 08:34:42', '2025-08-03 08:34:42'),
(20, 13, '2025-08-03 16:11:28', '2025-08-03 16:11:28'),
(23, 1, '2025-08-02 15:57:39', '2025-08-02 15:57:39'),
(23, 6, '2025-08-02 15:57:39', '2025-08-02 15:57:39'),
(23, 10, '2025-08-02 15:57:39', '2025-08-02 15:57:39'),
(23, 11, '2025-08-03 08:26:00', '2025-08-03 08:26:00'),
(23, 12, '2025-08-03 08:26:00', '2025-08-03 08:26:00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_audit_logs`
--

CREATE TABLE `product_audit_logs` (
  `id` bigint NOT NULL,
  `product_id` bigint DEFAULT NULL,
  `action` enum('create','update','delete','restore','soft_delete','bulk_edit','import') COLLATE utf8mb4_unicode_ci NOT NULL,
  `old_data` json DEFAULT NULL,
  `new_data` json DEFAULT NULL,
  `changed_fields` json DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `user_role` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `note` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_brand`
--

CREATE TABLE `product_brand` (
  `id` bigint NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `parent_id` bigint DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `logo_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('active','inactive') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'active',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updateAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `product_brand`
--

INSERT INTO `product_brand` (`id`, `name`, `slug`, `parent_id`, `description`, `logo_url`, `status`, `createdAt`, `updateAt`, `deletedAt`) VALUES
(1, 'FPT', 'fpt', NULL, '', 'uploads/images/logo-1753934738515-19397593.png', 'active', '2025-07-31 04:05:38', '2025-07-31 04:10:01', '2025-07-31 04:10:01'),
(2, 'Hector', 'hector', NULL, '', '', 'active', '2025-07-31 04:09:56', '2025-07-31 10:05:44', NULL),
(3, 'Adeva Naturals', 'adeva-naturals', NULL, '', '', 'active', '2025-07-31 04:10:23', '2025-07-31 10:13:03', NULL),
(4, 'Mobifone', 'mobifone', NULL, '', 'uploads/images/logo-1753935068439-651055953.png', 'active', '2025-07-31 04:11:08', '2025-07-31 04:11:08', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_categories`
--

CREATE TABLE `product_categories` (
  `id` bigint NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `parent_id` bigint DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `sort_order` int DEFAULT '0',
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `icon` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('active','inactive') COLLATE utf8mb4_unicode_ci DEFAULT 'active',
  `is_featured` tinyint(1) DEFAULT '0',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `product_categories`
--

INSERT INTO `product_categories` (`id`, `name`, `slug`, `parent_id`, `description`, `sort_order`, `image`, `icon`, `status`, `is_featured`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'Chăm sóc sắc đẹp', 'cham-soc-sac-dep', NULL, 'Sản phẩm chăm sóc sắc đẹp từ thiên nhiên', 0, '', '', 'active', 1, '2025-07-30 08:52:27', '2025-07-30 09:00:58', NULL),
(2, 'Dầu massage', 'dau-massage', 1, '', 0, '', '', 'active', 0, '2025-07-30 08:52:45', '2025-07-30 08:52:45', NULL),
(3, 'Kem chống nắng Trái nhàu', 'kem-chong-nang-trai-nhau', 1, '', 0, '', '', 'active', 0, '2025-07-30 09:07:08', '2025-07-30 09:07:08', NULL),
(4, 'Kem dưỡng da', 'kem-duong-da', NULL, '', 0, '', '', 'active', 0, '2025-07-30 09:07:19', '2025-07-30 17:49:32', NULL),
(5, 'Mặt nạ dưỡng da Trái nhàu', 'mat-na-duong-da-trai-nhau', 1, '', 0, '', '', 'active', 0, '2025-07-30 09:07:32', '2025-07-30 09:07:32', NULL),
(6, 'Serum dưỡng da Trái nhàu', 'serum-duong-da-trai-nhau', NULL, '', 0, '', '', 'active', 1, '2025-07-30 09:07:45', '2025-07-30 17:51:15', NULL),
(7, 'Chăm sóc cá nhân', 'cham-soc-ca-nhan', NULL, '', 0, '', '', 'active', 0, '2025-07-30 09:07:55', '2025-07-30 09:07:55', NULL),
(8, 'Chăm sóc sức khỏe', 'cham-soc-suc-khoe', NULL, '', 0, 'uploads/images/image-1753867098109-667240911.png', '', 'active', 0, '2025-07-30 09:18:18', '2025-07-30 09:18:18', NULL),
(9, 'Đông trùng hạ thảo', 'dong-trung-ha-thao', NULL, '', 0, '', '', 'active', 1, '2025-07-30 09:31:43', '2025-08-07 17:38:31', NULL),
(11, 'Viên Nhàu Cao Cấp', 'vien-nhau-cao-cap', 8, '', 0, '', '', 'active', 0, '2025-07-30 09:33:48', '2025-07-30 09:33:48', NULL),
(12, 'Bột ngũ cốc Trái nhàu', 'bot-ngu-coc-trai-nhau', 8, '', 0, '', '', 'active', 0, '2025-07-30 09:34:17', '2025-07-30 09:37:24', NULL),
(13, 'Bột Nhàu Cao Cấp', 'bot-nhau-cao-cap', 8, '', 0, 'uploads/images/image-1753868162205-672296032.png', '', 'active', 0, '2025-07-30 09:36:02', '2025-07-30 09:36:02', NULL),
(14, 'Son dưỡng môi', 'son-duong-moi', 2, '', 0, '', '', 'active', 0, '2025-07-30 17:10:46', '2025-07-30 17:10:46', NULL),
(15, 'Xà Bông Thiên Nhiên', 'xa-bong-thien-nhien', 6, '', 0, '', '', 'active', 0, '2025-07-30 17:52:22', '2025-07-30 17:52:22', NULL),
(16, 'Combo', 'combo', 9, NULL, 0, NULL, NULL, 'active', 0, '2025-07-31 16:08:01', '2025-07-31 16:08:01', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_category_map`
--

CREATE TABLE `product_category_map` (
  `product_id` bigint NOT NULL,
  `category_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `product_category_map`
--

INSERT INTO `product_category_map` (`product_id`, `category_id`) VALUES
(10, 1),
(11, 5),
(10, 7),
(6, 9),
(7, 9),
(8, 11),
(8, 13),
(13, 14),
(14, 14),
(7, 16),
(15, 16),
(20, 16),
(23, 16);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_comments`
--

CREATE TABLE `product_comments` (
  `id` bigint NOT NULL,
  `user_id` bigint DEFAULT NULL,
  `product_id` bigint DEFAULT NULL,
  `content` text COLLATE utf8mb4_unicode_ci,
  `parent_id` bigint DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_images`
--

CREATE TABLE `product_images` (
  `id` bigint NOT NULL,
  `product_id` bigint DEFAULT NULL,
  `type` enum('image','video') COLLATE utf8mb4_unicode_ci DEFAULT 'image',
  `url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `position` int DEFAULT '0',
  `is_main` tinyint(1) DEFAULT '0',
  `caption` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `file_size` int DEFAULT NULL,
  `width_px` int DEFAULT NULL,
  `height_px` int DEFAULT NULL,
  `video_thumb` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  `moderation_status` enum('pending','approved','rejected') COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `moderation_note` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `moderated_by` bigint DEFAULT NULL,
  `moderated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `product_images`
--

INSERT INTO `product_images` (`id`, `product_id`, `type`, `url`, `position`, `is_main`, `caption`, `file_size`, `width_px`, `height_px`, `video_thumb`, `created_at`, `updated_at`, `moderation_status`, `moderation_note`, `moderated_by`, `moderated_at`) VALUES
(4, 9, 'image', 'uploads/images/album_images-1753981642841-102006606.jpg', 0, 0, NULL, NULL, NULL, NULL, NULL, '2025-07-31 17:07:22', '2025-07-31 17:07:22', 'approved', NULL, NULL, NULL),
(5, 9, 'image', 'uploads/images/album_images-1753981642844-798045856.jpg', 0, 0, NULL, NULL, NULL, NULL, NULL, '2025-07-31 17:07:22', '2025-07-31 17:07:22', 'approved', NULL, NULL, NULL),
(7, 8, 'image', 'uploads/images/album_images-1753981720678-625925314.jpg', 0, 0, NULL, NULL, NULL, NULL, NULL, '2025-07-31 17:08:40', '2025-07-31 17:08:40', 'approved', NULL, NULL, NULL),
(9, 8, 'image', 'uploads/images/album_images-1753981720687-713041903.jpg', 0, 0, NULL, NULL, NULL, NULL, NULL, '2025-07-31 17:08:40', '2025-07-31 17:08:40', 'approved', NULL, NULL, NULL),
(10, 8, 'image', 'uploads/images/album_images-1753981720689-58552704.jpg', 0, 0, NULL, NULL, NULL, NULL, NULL, '2025-07-31 17:08:40', '2025-07-31 17:08:40', 'approved', NULL, NULL, NULL),
(11, 10, 'image', 'uploads/images/album_images-1754019505017-142439591.jpg', 0, 0, NULL, NULL, NULL, NULL, NULL, '2025-08-01 03:38:25', '2025-08-01 03:38:25', 'approved', NULL, NULL, NULL),
(12, 10, 'image', 'uploads/images/album_images-1754019505018-22886445.jpg', 0, 0, NULL, NULL, NULL, NULL, NULL, '2025-08-01 03:38:25', '2025-08-01 03:38:25', 'approved', NULL, NULL, NULL),
(13, 10, 'image', 'uploads/images/album_images-1754019505021-305650167.jpg', 0, 0, NULL, NULL, NULL, NULL, NULL, '2025-08-01 03:38:25', '2025-08-01 03:38:25', 'approved', NULL, NULL, NULL),
(14, 10, 'image', 'uploads/images/album_images-1754019505026-983974777.jpg', 0, 0, NULL, NULL, NULL, NULL, NULL, '2025-08-01 03:38:25', '2025-08-01 03:38:25', 'approved', NULL, NULL, NULL),
(15, 10, 'image', 'uploads/images/album_images-1754019505027-55731861.jpg', 0, 0, NULL, NULL, NULL, NULL, NULL, '2025-08-01 03:38:25', '2025-08-01 03:38:25', 'approved', NULL, NULL, NULL),
(16, 11, 'image', 'uploads/images/album_images-1754023418541-914929261.jpg', 0, 0, NULL, NULL, NULL, NULL, NULL, '2025-08-01 04:43:38', '2025-08-01 04:43:38', 'approved', NULL, NULL, NULL),
(17, 11, 'image', 'uploads/images/album_images-1754023418542-30469348.jpg', 0, 0, NULL, NULL, NULL, NULL, NULL, '2025-08-01 04:43:38', '2025-08-01 04:43:38', 'approved', NULL, NULL, NULL),
(18, 11, 'image', 'uploads/images/album_images-1754023418563-479940246.jpg', 0, 0, NULL, NULL, NULL, NULL, NULL, '2025-08-01 04:43:38', '2025-08-01 04:43:38', 'approved', NULL, NULL, NULL),
(19, 11, 'image', 'uploads/images/album_images-1754023418566-535306329.jpg', 0, 0, NULL, NULL, NULL, NULL, NULL, '2025-08-01 04:43:38', '2025-08-01 04:43:38', 'approved', NULL, NULL, NULL),
(20, 11, 'image', 'uploads/images/album_images-1754023418570-784162072.jpg', 0, 0, NULL, NULL, NULL, NULL, NULL, '2025-08-01 04:43:38', '2025-08-01 04:43:38', 'approved', NULL, NULL, NULL),
(21, 13, 'image', 'uploads/images/album_images-1754038269957-722357570.jpg', 0, 0, NULL, NULL, NULL, NULL, NULL, '2025-08-01 08:51:09', '2025-08-01 08:51:09', 'approved', NULL, NULL, NULL),
(22, 13, 'image', 'uploads/images/album_images-1754038269957-301262266.jpg', 0, 0, NULL, NULL, NULL, NULL, NULL, '2025-08-01 08:51:09', '2025-08-01 08:51:09', 'approved', NULL, NULL, NULL),
(23, 13, 'image', 'uploads/images/album_images-1754038269961-366128881.jpg', 0, 0, NULL, NULL, NULL, NULL, NULL, '2025-08-01 08:51:09', '2025-08-01 08:51:09', 'approved', NULL, NULL, NULL),
(24, 13, 'image', 'uploads/images/album_images-1754038269964-770635704.jpg', 0, 0, NULL, NULL, NULL, NULL, NULL, '2025-08-01 08:51:09', '2025-08-01 08:51:09', 'approved', NULL, NULL, NULL),
(25, 13, 'image', 'uploads/images/album_images-1754038269966-312296729.jpg', 0, 0, NULL, NULL, NULL, NULL, NULL, '2025-08-01 08:51:09', '2025-08-01 08:51:09', 'approved', NULL, NULL, NULL),
(26, 14, 'image', 'uploads/images/album_images-1754038560742-344958764.jpg', 0, 0, NULL, NULL, NULL, NULL, NULL, '2025-08-01 08:56:00', '2025-08-01 08:56:00', 'approved', NULL, NULL, NULL),
(27, 14, 'image', 'uploads/images/album_images-1754038560743-125760846.jpg', 0, 0, NULL, NULL, NULL, NULL, NULL, '2025-08-01 08:56:00', '2025-08-01 08:56:00', 'approved', NULL, NULL, NULL),
(28, 14, 'image', 'uploads/images/album_images-1754038560747-37248545.jpg', 0, 0, NULL, NULL, NULL, NULL, NULL, '2025-08-01 08:56:00', '2025-08-01 08:56:00', 'approved', NULL, NULL, NULL),
(29, 14, 'image', 'uploads/images/album_images-1754038560750-873105045.jpg', 0, 0, NULL, NULL, NULL, NULL, NULL, '2025-08-01 08:56:00', '2025-08-01 08:56:00', 'approved', NULL, NULL, NULL),
(30, 23, 'image', 'uploads/images/album_images-1754148465817-981069680.jpg', 0, 0, NULL, NULL, NULL, NULL, NULL, '2025-08-02 15:27:45', '2025-08-02 15:27:45', 'approved', NULL, NULL, NULL),
(31, 23, 'image', 'uploads/images/album_images-1754148465817-375197401.jpg', 0, 0, NULL, NULL, NULL, NULL, NULL, '2025-08-02 15:27:45', '2025-08-02 15:27:45', 'approved', NULL, NULL, NULL),
(32, 23, 'image', 'uploads/images/album_images-1754148465821-950363089.jpg', 0, 0, NULL, NULL, NULL, NULL, NULL, '2025-08-02 15:27:45', '2025-08-02 15:27:45', 'approved', NULL, NULL, NULL),
(33, 23, 'image', 'uploads/images/album_images-1754148465824-750534931.jpg', 0, 0, NULL, NULL, NULL, NULL, NULL, '2025-08-02 15:27:45', '2025-08-02 15:27:45', 'approved', NULL, NULL, NULL),
(34, 20, 'image', 'uploads/images/album_images-1754149276208-773410406.jpg', 0, 0, NULL, NULL, NULL, NULL, NULL, '2025-08-02 15:41:16', '2025-08-02 15:41:16', 'approved', NULL, NULL, NULL),
(35, 20, 'image', 'uploads/images/album_images-1754149276209-763774423.jpg', 0, 0, NULL, NULL, NULL, NULL, NULL, '2025-08-02 15:41:16', '2025-08-02 15:41:16', 'approved', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_questions`
--

CREATE TABLE `product_questions` (
  `id` bigint NOT NULL,
  `product_id` bigint NOT NULL,
  `user_id` bigint DEFAULT NULL,
  `question` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `answer` text COLLATE utf8mb4_unicode_ci,
  `answer_by` bigint DEFAULT NULL,
  `answered_at` datetime DEFAULT NULL,
  `is_public` tinyint(1) DEFAULT '1',
  `status` enum('pending','answered','hidden') COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_reviews`
--

CREATE TABLE `product_reviews` (
  `id` bigint NOT NULL,
  `product_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `order_id` bigint DEFAULT NULL,
  `rating` int NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` text COLLATE utf8mb4_unicode_ci,
  `images` text COLLATE utf8mb4_unicode_ci,
  `video_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_verified` tinyint(1) DEFAULT '0',
  `is_approved` tinyint(1) DEFAULT '1',
  `reply_at` datetime DEFAULT NULL,
  `reply` text COLLATE utf8mb4_unicode_ci,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `product_reviews`
--

INSERT INTO `product_reviews` (`id`, `product_id`, `user_id`, `order_id`, `rating`, `title`, `content`, `images`, `video_url`, `is_verified`, `is_approved`, `reply_at`, `reply`, `created_at`, `updated_at`) VALUES
(1, 14, 1, NULL, 5, NULL, 'Sản phẩm có chất lượng rất tốt', NULL, NULL, 0, 1, NULL, NULL, '2025-08-16 06:15:55', '2025-08-16 06:15:55'),
(2, 23, 1, NULL, 5, NULL, 'Sản phẩm tốt', NULL, NULL, 0, 1, NULL, NULL, '2025-08-16 09:42:11', '2025-08-16 09:42:11'),
(3, 6, 1, NULL, 1, '', 'Sản phẩm rất chất lượng', NULL, NULL, 0, 1, NULL, NULL, '2025-08-19 03:55:27', '2025-08-19 03:55:27'),
(4, 6, 1, NULL, 1, '', 'ản phẩm rất chất lượng', NULL, NULL, 0, 1, NULL, NULL, '2025-08-19 03:55:39', '2025-08-19 03:55:39'),
(5, 6, 1, NULL, 5, '', 'Chất lượng sản phẩm rất tốt', NULL, NULL, 0, 1, NULL, NULL, '2025-08-19 12:53:36', '2025-08-19 12:53:36'),
(6, 6, 1, NULL, 4, '', '- Sử dụng 1-2 gói / ngày pha với nước ấm 60-70 độ hoặc pha với ca phê,.... mỗi ngày giúp mang lại hiệu quả tốt nhất Tốt nhất vào sáng sớm khi ngủ dậy và trước khi đi ngủ 30 phút\r\n\r\n- Dùng trực tiếp hoặc pha với nước ấm vừa khẩu v\r\n\r\nBẢO QUẢN\r\n\r\n- Bảo quản nơi khô ráo, thoáng mát, tránh ánh nắng mặt trời\r\n\r\nLƯU Ý\r\n\r\n- Thực phẩm này không phải là thuốc. Không có tác dụng thay thế thuốc chữa bệnh\r\n\r\n- Trẻ em dùng ½ liều lượng và không dùng liên tục quá 3 tuần\r\n\r\n- Phụ nữ mang thai: hỏi ý kiến bác sĩ trước khi sử dụng\r\n\r\n- Chống chỉ định cho người có tiền sử dị ứng với mật ong hay đông trùng hạ thảo, trẻ em dưới 1 tuổi', NULL, NULL, 0, 1, NULL, NULL, '2025-08-19 12:54:27', '2025-08-19 12:54:27');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_tags`
--

CREATE TABLE `product_tags` (
  `id` bigint NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('active','inactive') COLLATE utf8mb4_unicode_ci DEFAULT 'active',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `product_tags`
--

INSERT INTO `product_tags` (`id`, `name`, `slug`, `description`, `status`, `created_at`) VALUES
(1, 'chùm ngây', 'chum-ngay', NULL, 'active', '2025-07-31 16:20:48'),
(2, 'đinh lăng', 'dinh-lang', NULL, 'active', '2025-07-31 16:20:48'),
(3, 'Đông trùng hạ thảo', 'dong-trung-ha-thao', NULL, 'active', '2025-07-31 16:20:48'),
(4, 'Nước đông trùng hạ thảo', 'nuoc-djong-trung-ha-thao', NULL, 'active', '2025-07-31 16:20:48'),
(5, 'Đông trùng hạ thảo sâm', 'djong-trung-ha-thao-sam', NULL, 'active', '2025-07-31 16:20:48'),
(6, 'noni', 'noni', NULL, 'active', '2025-07-31 17:14:53'),
(7, 'Dầu massage', 'dau-massage', NULL, 'active', '2025-07-31 17:14:53'),
(8, 'trái nhàu', 'trai-nhau', NULL, 'active', '2025-07-31 17:14:53'),
(9, 'son dưỡng', 'son-duong', NULL, 'active', '2025-08-01 08:51:09'),
(10, 'Cà Phê Sữa Đá', 'ca-phe-sua-da', NULL, 'active', '2025-08-02 15:22:39');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_tag_map`
--

CREATE TABLE `product_tag_map` (
  `id` bigint NOT NULL,
  `product_id` bigint NOT NULL,
  `tag_id` bigint NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `product_tag_map`
--

INSERT INTO `product_tag_map` (`id`, `product_id`, `tag_id`, `created_at`) VALUES
(1, 9, 1, '2025-07-31 16:20:48'),
(2, 9, 2, '2025-07-31 16:20:48'),
(3, 9, 3, '2025-07-31 16:20:48'),
(4, 9, 5, '2025-07-31 16:20:48'),
(5, 9, 4, '2025-07-31 16:20:48'),
(6, 6, 1, '2025-07-31 16:28:36'),
(7, 8, 6, '2025-07-31 17:14:53'),
(8, 8, 7, '2025-07-31 17:14:53'),
(9, 8, 8, '2025-07-31 17:14:53'),
(10, 10, 8, '2025-08-01 03:38:24'),
(11, 11, 6, '2025-08-01 04:43:38'),
(12, 11, 8, '2025-08-01 04:43:38'),
(13, 13, 9, '2025-08-01 08:51:09'),
(14, 14, 9, '2025-08-01 08:56:00'),
(15, 15, 10, '2025-08-02 15:22:39'),
(16, 20, 10, '2025-08-02 15:26:46'),
(17, 23, 10, '2025-08-02 15:27:45');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_translations`
--

CREATE TABLE `product_translations` (
  `id` bigint NOT NULL,
  `product_id` bigint NOT NULL,
  `lang` char(5) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `short_description` text COLLATE utf8mb4_unicode_ci,
  `description` text COLLATE utf8mb4_unicode_ci,
  `meta_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_variations`
--

CREATE TABLE `product_variations` (
  `id` bigint NOT NULL,
  `product_id` bigint NOT NULL,
  `attribute_description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `attribute_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sku` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `barcode` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` decimal(12,2) DEFAULT NULL,
  `sale_price` decimal(12,2) DEFAULT NULL,
  `stock` int DEFAULT '0',
  `image_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `attribute_values` text COLLATE utf8mb4_unicode_ci,
  `status` enum('active','inactive') COLLATE utf8mb4_unicode_ci DEFAULT 'active',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `description` text COLLATE utf8mb4_unicode_ci,
  `sale_start` datetime DEFAULT NULL,
  `sale_end` datetime DEFAULT NULL,
  `manage_stock` tinyint(1) NOT NULL DEFAULT '1',
  `stock_status` enum('in_stock','out_of_stock','on_backorder') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'in_stock',
  `allow_backorders` enum('no','notify','yes') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'no',
  `low_stock_threshold` int DEFAULT NULL,
  `weight` decimal(8,2) DEFAULT NULL,
  `length` decimal(8,2) DEFAULT NULL,
  `width` decimal(8,2) DEFAULT NULL,
  `height` decimal(8,2) DEFAULT NULL,
  `shipping_class_id` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `product_variations`
--

INSERT INTO `product_variations` (`id`, `product_id`, `attribute_description`, `attribute_title`, `sku`, `barcode`, `price`, `sale_price`, `stock`, `image_url`, `attribute_values`, `status`, `created_at`, `updated_at`, `description`, `sale_start`, `sale_end`, `manage_stock`, `stock_status`, `allow_backorders`, `low_stock_threshold`, `weight`, `length`, `width`, `height`, `shipping_class_id`) VALUES
(13, 23, NULL, 'Biến thể 1', NULL, NULL, NULL, NULL, 0, NULL, NULL, 'active', '2025-08-03 08:26:19', '2025-08-04 15:24:53', NULL, NULL, NULL, 1, 'in_stock', 'no', NULL, NULL, NULL, NULL, NULL, NULL),
(79, 20, 'Biến thể 1', 'Hộp 8 Gói x 16g', 'ZN-123456', '1234567', 75000.00, 49000.00, 10, 'uploads/images/image-1754271484621-453566841.jpg', NULL, 'active', '2025-08-03 18:49:53', '2025-08-04 08:43:53', NULL, NULL, NULL, 1, 'out_of_stock', 'yes', 2, 20.00, 190.00, 10.00, 19.00, NULL),
(80, 20, 'Biến thể 2', 'Túi 40 Gói x 16g', 'ZN-123457', 'ZN-123458', 200000.00, 175000.00, NULL, 'uploads/images/image-1754271564033-274562780.jpg', NULL, 'active', '2025-08-04 01:38:32', '2025-08-04 08:43:53', NULL, NULL, NULL, 1, 'in_stock', 'no', NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `recommendations`
--

CREATE TABLE `recommendations` (
  `id` bigint NOT NULL,
  `product_id` bigint DEFAULT NULL,
  `reason` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `reports`
--

CREATE TABLE `reports` (
  `id` bigint NOT NULL,
  `user_id` bigint DEFAULT NULL,
  `target_type` enum('product','seller','order') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `target_id` bigint DEFAULT NULL,
  `reason` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('pending','resolved','rejected') COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `reviews`
--

CREATE TABLE `reviews` (
  `id` bigint NOT NULL,
  `user_id` bigint DEFAULT NULL,
  `product_id` bigint DEFAULT NULL,
  `rating` int DEFAULT NULL,
  `comment` text COLLATE utf8mb4_unicode_ci,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `review_images`
--

CREATE TABLE `review_images` (
  `id` bigint NOT NULL,
  `review_id` bigint NOT NULL,
  `image_url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `review_images`
--

INSERT INTO `review_images` (`id`, `review_id`, `image_url`) VALUES
(1, 4, 'uploads/images/images-1755575739546-424114583.jpg'),
(2, 4, 'uploads/images/images-1755575739555-134798715.jpg'),
(3, 4, 'uploads/images/images-1755575739564-886255345.jpg'),
(4, 5, 'uploads/images/images-1755608016108-335032462.jpg'),
(5, 5, 'uploads/images/images-1755608016116-214515219.jpg'),
(6, 5, 'uploads/images/images-1755608016119-543560255.jpg');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sellers`
--

CREATE TABLE `sellers` (
  `id` bigint NOT NULL,
  `user_id` bigint DEFAULT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `logo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cover` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` text COLLATE utf8mb4_unicode_ci,
  `status` enum('pending','active','suspended','closed') COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `suspended_reason` text COLLATE utf8mb4_unicode_ci,
  `suspended_at` datetime DEFAULT NULL,
  `is_verified` tinyint(1) DEFAULT '0',
  `verified_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `sellers`
--

INSERT INTO `sellers` (`id`, `user_id`, `name`, `slug`, `logo`, `cover`, `description`, `phone`, `email`, `address`, `status`, `suspended_reason`, `suspended_at`, `is_verified`, `verified_at`, `created_at`, `updated_at`) VALUES
(1, NULL, 'P HUYNH THANH TUYEN', 'p-huynh-thanh-tuyen', NULL, NULL, 'P HUYNH THANH TUYEN', '0373707024', 'pthanhtuyen2411@gmail.com', '145 Vu Lang', 'active', NULL, NULL, 0, NULL, '2025-07-29 15:48:10', '2025-07-29 15:48:10'),
(2, NULL, 'Xô Ni', 'xo-ni', NULL, NULL, 'Xô Ni Shop', '0373707024', 'pthanhtuyen2411@gmail.com', 'Ilıca Mahahallesi Güldeste Sokak No:37 Sahilevleri', 'active', NULL, NULL, 0, NULL, '2025-07-29 15:48:47', '2025-07-29 15:48:47');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `seller_bank_accounts`
--

CREATE TABLE `seller_bank_accounts` (
  `id` bigint NOT NULL,
  `seller_id` bigint DEFAULT NULL,
  `bank_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `account_number` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `account_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `branch` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `note` text COLLATE utf8mb4_unicode_ci,
  `status` enum('pending','active','rejected') COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `approved_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `seller_employees`
--

CREATE TABLE `seller_employees` (
  `id` bigint NOT NULL,
  `seller_id` bigint DEFAULT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `permissions` json DEFAULT NULL,
  `status` enum('active','inactive') COLLATE utf8mb4_unicode_ci DEFAULT 'active',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `seller_legal_docs`
--

CREATE TABLE `seller_legal_docs` (
  `id` bigint NOT NULL,
  `seller_id` bigint DEFAULT NULL,
  `doc_type` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `doc_number` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `doc_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('pending','approved','rejected') COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `note` text COLLATE utf8mb4_unicode_ci,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `approved_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `seller_logs`
--

CREATE TABLE `seller_logs` (
  `id` bigint NOT NULL,
  `seller_id` bigint DEFAULT NULL,
  `action` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `detail` text COLLATE utf8mb4_unicode_ci,
  `user_id` bigint DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `shipping_classes`
--

CREATE TABLE `shipping_classes` (
  `id` bigint NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `shop_banners`
--

CREATE TABLE `shop_banners` (
  `id` bigint NOT NULL,
  `seller_id` bigint DEFAULT NULL,
  `image_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `link_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `position` enum('main','side','custom') COLLATE utf8mb4_unicode_ci DEFAULT 'main',
  `status` enum('active','inactive') COLLATE utf8mb4_unicode_ci DEFAULT 'active',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `shop_reviews`
--

CREATE TABLE `shop_reviews` (
  `id` bigint NOT NULL,
  `shop_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `order_id` bigint DEFAULT NULL,
  `rating` int DEFAULT NULL,
  `content` text COLLATE utf8mb4_unicode_ci,
  `comment` text COLLATE utf8mb4_unicode_ci,
  `status` enum('pending','approved','rejected') COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `reply` text COLLATE utf8mb4_unicode_ci,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `approved_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `static_pages`
--

CREATE TABLE `static_pages` (
  `id` bigint NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` text COLLATE utf8mb4_unicode_ci,
  `meta_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_description` text COLLATE utf8mb4_unicode_ci,
  `status` enum('draft','published','hidden') COLLATE utf8mb4_unicode_ci DEFAULT 'published',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `subscribers`
--

CREATE TABLE `subscribers` (
  `id` bigint NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('subscribed','unsubscribed') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'subscribed',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `subscribers`
--

INSERT INTO `subscribers` (`id`, `email`, `status`, `created_at`) VALUES
(1, 'pthanhtuyen2411@gmail.com', 'subscribed', '2025-08-08 05:33:25'),
(2, 'thanhtuyen0801@gmail.com', 'subscribed', '2025-08-08 05:35:11'),
(3, 'trieutulong241190@gmail.com', 'subscribed', '2025-08-08 05:35:30');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `support_tickets`
--

CREATE TABLE `support_tickets` (
  `id` bigint NOT NULL,
  `user_id` bigint DEFAULT NULL,
  `order_id` bigint DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` text COLLATE utf8mb4_unicode_ci,
  `status` enum('open','in_progress','closed') COLLATE utf8mb4_unicode_ci DEFAULT 'open',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` bigint NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `username` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT 'user',
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_seller` tinyint(1) DEFAULT '0',
  `type` enum('personal','business') COLLATE utf8mb4_unicode_ci DEFAULT 'personal',
  `is_verified` tinyint(1) DEFAULT '0',
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gender` enum('male','female','other') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `status` enum('active','inactive','banned') COLLATE utf8mb4_unicode_ci DEFAULT 'active',
  `last_login` datetime DEFAULT NULL,
  `verify_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reset_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `points` int DEFAULT '0',
  `reset_token_expires` datetime DEFAULT NULL,
  `is_deleted` tinyint DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `name`, `username`, `email`, `password`, `role`, `phone`, `is_seller`, `type`, `is_verified`, `avatar`, `gender`, `birthday`, `status`, `last_login`, `verify_token`, `reset_token`, `points`, `reset_token_expires`, `is_deleted`, `created_at`, `updated_at`) VALUES
(1, 'Admin CP', NULL, 'pthanhtuyen2411@gmail.com', '$2b$10$qFZ8VlvyZyWO4.VOKEvebOBTwHJjv2CG05DTTLYr3ZAPX7poYLEWm', 'admin', '0373707024', 0, 'personal', 0, 'uploads/images/avatar-1755247226564-980832810.jpg', 'male', '2025-08-14', 'active', '2025-08-19 03:41:05', NULL, NULL, 0, NULL, 0, '2025-08-04 22:19:53', '2025-08-19 03:41:05'),
(2, 'Nguyen Van B', NULL, 'a@example.com', '$2b$10$y2L8lgYluiqi5RT6mlC.4.kK3Q/wSAjkZj4QmmuzaH/KgEnZk5AMe', 'user', '0999888777', 0, 'personal', 1, 'https://placehold.co/600x400/png', 'female', '1997-05-01', 'inactive', '2025-07-26 00:38:23', '885769d8227c4b85c9cc986735da5a2fda4b6451a5b741d552fa933c9cfe8518', NULL, 0, NULL, 1, '2025-08-04 22:19:53', '2025-08-04 22:19:53'),
(3, 'Admin', NULL, 'admin@example.com', '$2a$10$6Yhq602aKIRq0mM87f0xEe0elvepAGf9pG4zPfa7VLa3S67u8SmW6', 'admin', '0123456789', 0, 'personal', 1, 'https://placehold.co/600x400/png', NULL, NULL, 'active', '2025-07-29 10:13:28', NULL, NULL, 0, NULL, 0, '2025-08-04 22:19:53', '2025-08-04 22:19:53'),
(4, 'Tuyen Pham', NULL, 'thanhtuyen0801@gmail.com', '$2b$10$H7bISWsMZ9tr6Ye0wxTl8eu5HPOuJz7iff44m/2g2eQv6wgRBNfhG', 'user', '0373707024', 0, 'personal', 0, NULL, NULL, NULL, 'active', NULL, '9aedebc0bf321a05eb2d8282dbc8e6cb4489d09a761cc33bab1ec0abc4f2fc99', NULL, 0, NULL, 0, '2025-08-04 22:19:53', '2025-08-04 22:19:53'),
(5, 'Hạ Mơ', NULL, 'nguyenthimo1008@gmail.com', '$2b$10$hqNVFXuz9gNha.3JPm3OY.iuCRXPc7mEA1/Eu407m8otjzhqDYNbC', 'user', '0964101061', 0, 'personal', 0, NULL, NULL, NULL, 'active', NULL, '7ee21956b8d3f38a977e99e34ced617faa0ac109bc6efb087c57a7f05e8570ee', NULL, 0, NULL, 0, '2025-08-04 22:19:53', '2025-08-04 22:19:53'),
(6, 'Long Pham', NULL, 'longpham@gmail.com', '$2b$10$z4HPNJ7HWVJZxYWCnf7fA.EzCbQs/bO39gIwmsfy3JfgoOWEWyBQK', 'user', NULL, 0, 'personal', 0, NULL, NULL, NULL, 'active', NULL, '5d14c9e93017743e3c460602517ad2fa9f8801c9b969002e263769537603f48f', NULL, 0, NULL, 0, '2025-08-04 22:19:53', '2025-08-04 22:19:53'),
(7, 'Giang Pham', NULL, 'giangpham@gmail.com', '$2b$10$HfG5bNhiXuZAlyWOnpOspupBCBPvvcxiNKkQYp.ZdVgSk5vzeeoWm', 'user', NULL, 0, 'personal', 0, NULL, NULL, NULL, 'active', NULL, 'b2b4e52940482c49eb49a354f541b5b9e8d391c5b32458b7d3162d053245bb37', NULL, 0, NULL, 0, '2025-08-04 22:19:53', '2025-08-04 22:19:53'),
(10, 'Thiện Phạm', NULL, 'thienpham@gmail.com', '$2b$10$o6y1d58oALMsfkY75JLZS.FVqpaDlGG3smbF15MutVxcI1hHZymkO', 'user', NULL, 0, 'personal', 0, NULL, NULL, NULL, 'active', NULL, NULL, NULL, 0, NULL, 0, '2025-08-04 22:19:53', '2025-08-04 22:19:53'),
(11, 'Quang Lê', NULL, 'quangle@gmail.com', '$2b$10$pfZdX.8QxoTXr4iJMIOVq.jIjqP/OBikWnky8nn1HoHVZXd.XP6H.', 'user', NULL, 0, 'personal', 0, NULL, NULL, NULL, 'active', NULL, NULL, NULL, 0, NULL, 0, '2025-08-04 22:19:53', '2025-08-04 22:19:53'),
(12, 'Lệ Quyên', NULL, 'lequyen@gmail.com', '$2b$10$Gwr0QXlbwlxyXu9QubkMbOybaWUQXla.JjWHywMrolZDt07CnOL4u', 'user', NULL, 0, 'personal', 0, NULL, NULL, NULL, 'active', NULL, NULL, NULL, 0, NULL, 0, '2025-08-04 22:19:53', '2025-08-04 22:19:53'),
(15, 'Ken VBX', NULL, 'trieutulong241190@gmail.com', '$2b$10$1YERbWDMD38t0dUTFA.h3OwxibSbpv7FXn/rKuQGdmeVflZdUlQEu', 'admin', NULL, 0, 'personal', 0, NULL, NULL, NULL, 'active', NULL, NULL, NULL, 0, NULL, 0, '2025-08-04 22:19:53', '2025-08-04 22:19:53'),
(16, 'Long Pham', NULL, 'longpham1234@gmail.com', '$2b$10$LkraXkjMuCdIKPIlIUgNnuheS2XWA7gaNMnwtwJ3pOn5HYKRsJ/1W', 'user', NULL, 0, 'personal', 0, NULL, NULL, NULL, 'active', '2025-08-06 11:35:45', NULL, NULL, 0, NULL, 0, '2025-08-06 11:35:16', '2025-08-06 11:35:45'),
(17, 'Thanh Trang', NULL, 'nguyenhunghai24@gmail.com', '$2b$10$5/BbMeAHdG8HyUSk5gUEt.n1GXg2c9Tw7AZOnT6p5Hk6wi3HG0WCK', 'user', NULL, 0, 'personal', 0, NULL, NULL, NULL, 'active', NULL, NULL, NULL, 0, NULL, 0, '2025-08-06 17:10:54', '2025-08-06 17:10:54'),
(19, 'Lê Ánh Minh', NULL, NULL, '$2b$10$nyUhX/XwVG6T5NVCgQtNd.xSRV7XcnSDU36mLXFq6tI41Hr3hqXwy', 'user', '0909000000', 0, 'personal', 0, NULL, NULL, NULL, 'active', '2025-08-07 09:10:55', NULL, NULL, 0, NULL, 0, '2025-08-06 17:14:24', '2025-08-07 09:10:55'),
(20, 'Tú Oanh', NULL, 'tuoanh@gmail.com', '$2b$10$GhWQJjxPjQE.oCT0eNRtbeeW25bR9OIlUZfaI0QXcnqsoRatOaiMG', 'user', '', 0, 'personal', 1, 'uploads/images/avatar-1755251815060-483387588.jpg', 'female', '1992-08-14', 'active', '2025-08-15 14:37:47', NULL, NULL, 0, NULL, 0, '2025-08-15 03:30:03', '2025-08-15 21:40:37');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user_addresses`
--

CREATE TABLE `user_addresses` (
  `id` bigint NOT NULL,
  `user_id` bigint DEFAULT NULL,
  `recipient_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `district` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ward` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_default` tinyint(1) DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `user_addresses`
--

INSERT INTO `user_addresses` (`id`, `user_id`, `recipient_name`, `phone`, `address`, `city`, `district`, `ward`, `is_default`, `created_at`) VALUES
(1, 2, 'Nguyen Van A', '0912345678', '123 Đường A, Phường B', 'Hà Nội', 'Hoàn Kiếm', 'Tràng Tiền', 1, '2025-07-26 09:19:57'),
(2, 1, 'Tuyen Pham', '0373707024', '59 Hoàng Văn Thụ', 'Đà Nẵng', 'Hải Châu', 'Phước Ninh', 1, '2025-08-15 10:23:45'),
(3, 1, 'Tuyen Pham', '0373707024', 'Thôn Khánh Đức', 'Quảng Nam', 'Quế Sơn', 'Quế Châu', 0, '2025-08-15 10:24:32');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user_vouchers`
--

CREATE TABLE `user_vouchers` (
  `id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `voucher_id` bigint NOT NULL,
  `status` enum('unused','used','expired') COLLATE utf8mb4_unicode_ci DEFAULT 'unused',
  `used_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `variation_images`
--

CREATE TABLE `variation_images` (
  `id` bigint NOT NULL,
  `variation_id` bigint NOT NULL,
  `url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `position` int DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `variation_images`
--

INSERT INTO `variation_images` (`id`, `variation_id`, `url`, `position`, `created_at`, `updated_at`) VALUES
(36, 79, 'uploads/images/gallery_images-1754273715404-210691294.jpg', 0, '2025-08-04 02:15:15', '2025-08-04 02:15:15'),
(37, 79, 'uploads/images/gallery_images-1754273715407-990275864.jpg', 0, '2025-08-04 02:15:15', '2025-08-04 02:15:15'),
(38, 79, 'uploads/images/gallery_images-1754273715412-443411437.jpg', 0, '2025-08-04 02:15:15', '2025-08-04 02:15:15'),
(39, 79, 'uploads/images/gallery_images-1754273715419-44194404.jpg', 0, '2025-08-04 02:15:15', '2025-08-04 02:15:15'),
(40, 79, 'uploads/images/gallery_images-1754273715421-134222310.jpg', 0, '2025-08-04 02:15:15', '2025-08-04 02:15:15'),
(41, 80, 'uploads/images/gallery_images-1754273726205-214317575.jpg', 0, '2025-08-04 02:15:26', '2025-08-04 02:15:26'),
(42, 80, 'uploads/images/gallery_images-1754273726205-115759735.jpg', 0, '2025-08-04 02:15:26', '2025-08-04 02:15:26'),
(43, 80, 'uploads/images/gallery_images-1754273726209-254164984.jpg', 0, '2025-08-04 02:15:26', '2025-08-04 02:15:26'),
(44, 80, 'uploads/images/gallery_images-1754273726214-433021927.jpg', 0, '2025-08-04 02:15:26', '2025-08-04 02:15:26'),
(45, 80, 'uploads/images/gallery_images-1754273726220-917753192.jpg', 0, '2025-08-04 02:15:26', '2025-08-04 02:15:26');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `vouchers`
--

CREATE TABLE `vouchers` (
  `id` bigint NOT NULL,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` enum('global','shop','user','product') COLLATE utf8mb4_unicode_ci DEFAULT 'global',
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `discount_type` enum('percent','amount') COLLATE utf8mb4_unicode_ci DEFAULT 'amount',
  `discount_value` decimal(12,2) DEFAULT NULL,
  `max_discount` decimal(12,2) DEFAULT NULL,
  `min_order_value` decimal(12,2) DEFAULT NULL,
  `shop_id` bigint DEFAULT NULL,
  `product_id` bigint DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `usage_limit` int DEFAULT NULL,
  `per_user_limit` int DEFAULT '1',
  `used_count` int DEFAULT '0',
  `status` enum('active','inactive') COLLATE utf8mb4_unicode_ci DEFAULT 'active',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `warehouses`
--

CREATE TABLE `warehouses` (
  `id` bigint NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `region` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` text COLLATE utf8mb4_unicode_ci,
  `type` enum('fulfillment','pickup','store') COLLATE utf8mb4_unicode_ci DEFAULT 'fulfillment',
  `manager_id` bigint DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `wishlists`
--

CREATE TABLE `wishlists` (
  `id` bigint NOT NULL,
  `user_id` bigint DEFAULT NULL,
  `product_id` bigint DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `wishlists`
--

INSERT INTO `wishlists` (`id`, `user_id`, `product_id`, `created_at`) VALUES
(9, 1, 23, '2025-08-14 14:08:45'),
(11, 1, 8, '2025-08-14 14:18:00'),
(15, 1, 20, '2025-08-16 15:12:23'),
(17, 1, 15, '2025-08-17 01:08:03'),
(19, 1, 5, '2025-08-19 14:51:39'),
(20, 1, 10, '2025-08-20 01:52:58');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `banners`
--
ALTER TABLE `banners`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `idx_blog_slug` (`slug`);

--
-- Chỉ mục cho bảng `campaigns`
--
ALTER TABLE `campaigns`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_cart_user_id` (`user_id`);

--
-- Chỉ mục cho bảng `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cart_id` (`cart_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Chỉ mục cho bảng `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `discounts`
--
ALTER TABLE `discounts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_discounts_product` (`product_id`);

--
-- Chỉ mục cho bảng `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `idx_favorite_user_id` (`user_id`);

--
-- Chỉ mục cho bảng `flash_sales`
--
ALTER TABLE `flash_sales`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `flash_sale_items`
--
ALTER TABLE `flash_sale_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `flash_sale_id` (`flash_sale_id`),
  ADD KEY `idx_flash_items_product` (`product_id`);

--
-- Chỉ mục cho bảng `inventories`
--
ALTER TABLE `inventories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_inventory_product` (`product_id`),
  ADD KEY `idx_inventory_warehouse` (`warehouse_id`);

--
-- Chỉ mục cho bảng `inventory_logs`
--
ALTER TABLE `inventory_logs`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `options`
--
ALTER TABLE `options`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `option_name` (`option_name`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `address_id` (`address_id`),
  ADD KEY `idx_orders_user_id` (`user_id`);

--
-- Chỉ mục cho bảng `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_order_items_order_id` (`order_id`),
  ADD KEY `idx_order_items_product_id` (`product_id`);

--
-- Chỉ mục cho bảng `order_logs`
--
ALTER TABLE `order_logs`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `order_payments`
--
ALTER TABLE `order_payments`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `order_returns`
--
ALTER TABLE `order_returns`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `order_shipments`
--
ALTER TABLE `order_shipments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`);

--
-- Chỉ mục cho bảng `order_shipping_logs`
--
ALTER TABLE `order_shipping_logs`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`);

--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD UNIQUE KEY `sku` (`sku`),
  ADD KEY `seller_id` (`seller_id`),
  ADD KEY `brand_id` (`brand_id`),
  ADD KEY `idx_products_name` (`name`),
  ADD KEY `fk_shipping_class` (`shipping_class_id`),
  ADD KEY `fk_default_variation` (`default_variation_id`);

--
-- Chỉ mục cho bảng `product_attributes`
--
ALTER TABLE `product_attributes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Chỉ mục cho bảng `product_attribute_map`
--
ALTER TABLE `product_attribute_map`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `attribute_id` (`attribute_id`);

--
-- Chỉ mục cho bảng `product_attribute_values`
--
ALTER TABLE `product_attribute_values`
  ADD PRIMARY KEY (`id`),
  ADD KEY `attribute_id` (`attribute_id`);

--
-- Chỉ mục cho bảng `product_attribute_value_map`
--
ALTER TABLE `product_attribute_value_map`
  ADD PRIMARY KEY (`product_id`,`value_id`),
  ADD KEY `value_id` (`value_id`);

--
-- Chỉ mục cho bảng `product_audit_logs`
--
ALTER TABLE `product_audit_logs`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `product_brand`
--
ALTER TABLE `product_brand`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `product_categories`
--
ALTER TABLE `product_categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Chỉ mục cho bảng `product_category_map`
--
ALTER TABLE `product_category_map`
  ADD PRIMARY KEY (`product_id`,`category_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Chỉ mục cho bảng `product_comments`
--
ALTER TABLE `product_comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `parent_id` (`parent_id`),
  ADD KEY `idx_comments_product_id` (`product_id`);

--
-- Chỉ mục cho bảng `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_product_images_product` (`product_id`);

--
-- Chỉ mục cho bảng `product_questions`
--
ALTER TABLE `product_questions`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `product_reviews`
--
ALTER TABLE `product_reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_reviews_product` (`product_id`),
  ADD KEY `idx_reviews_user` (`user_id`);

--
-- Chỉ mục cho bảng `product_tags`
--
ALTER TABLE `product_tags`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Chỉ mục cho bảng `product_tag_map`
--
ALTER TABLE `product_tag_map`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_product_tag_map_product` (`product_id`),
  ADD KEY `idx_product_tag_map_tag` (`tag_id`);

--
-- Chỉ mục cho bảng `product_translations`
--
ALTER TABLE `product_translations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idx_product_lang` (`product_id`,`lang`);

--
-- Chỉ mục cho bảng `product_variations`
--
ALTER TABLE `product_variations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_product_variations_product` (`product_id`);

--
-- Chỉ mục cho bảng `recommendations`
--
ALTER TABLE `recommendations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Chỉ mục cho bảng `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `idx_reviews_product_id` (`product_id`);

--
-- Chỉ mục cho bảng `review_images`
--
ALTER TABLE `review_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `review_id` (`review_id`);

--
-- Chỉ mục cho bảng `sellers`
--
ALTER TABLE `sellers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `seller_bank_accounts`
--
ALTER TABLE `seller_bank_accounts`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `seller_employees`
--
ALTER TABLE `seller_employees`
  ADD PRIMARY KEY (`id`),
  ADD KEY `seller_id` (`seller_id`);

--
-- Chỉ mục cho bảng `seller_legal_docs`
--
ALTER TABLE `seller_legal_docs`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `seller_logs`
--
ALTER TABLE `seller_logs`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `shipping_classes`
--
ALTER TABLE `shipping_classes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Chỉ mục cho bảng `shop_banners`
--
ALTER TABLE `shop_banners`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `shop_reviews`
--
ALTER TABLE `shop_reviews`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `static_pages`
--
ALTER TABLE `static_pages`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Chỉ mục cho bảng `subscribers`
--
ALTER TABLE `subscribers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Chỉ mục cho bảng `support_tickets`
--
ALTER TABLE `support_tickets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `order_id` (`order_id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `idx_users_email` (`email`);

--
-- Chỉ mục cho bảng `user_addresses`
--
ALTER TABLE `user_addresses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `user_vouchers`
--
ALTER TABLE `user_vouchers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_user_voucher` (`user_id`,`voucher_id`),
  ADD KEY `idx_user_voucher_user` (`user_id`);

--
-- Chỉ mục cho bảng `variation_images`
--
ALTER TABLE `variation_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `variation_id` (`variation_id`);

--
-- Chỉ mục cho bảng `vouchers`
--
ALTER TABLE `vouchers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`);

--
-- Chỉ mục cho bảng `warehouses`
--
ALTER TABLE `warehouses`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `wishlists`
--
ALTER TABLE `wishlists`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_wishlist_user_id` (`user_id`),
  ADD KEY `idx_wishlist_product` (`product_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `banners`
--
ALTER TABLE `banners`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `blogs`
--
ALTER TABLE `blogs`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `campaigns`
--
ALTER TABLE `campaigns`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `carts`
--
ALTER TABLE `carts`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT cho bảng `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `discounts`
--
ALTER TABLE `discounts`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `favorites`
--
ALTER TABLE `favorites`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `flash_sales`
--
ALTER TABLE `flash_sales`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `flash_sale_items`
--
ALTER TABLE `flash_sale_items`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `inventories`
--
ALTER TABLE `inventories`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `inventory_logs`
--
ALTER TABLE `inventory_logs`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `options`
--
ALTER TABLE `options`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT cho bảng `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT cho bảng `order_logs`
--
ALTER TABLE `order_logs`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `order_payments`
--
ALTER TABLE `order_payments`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `order_returns`
--
ALTER TABLE `order_returns`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `order_shipments`
--
ALTER TABLE `order_shipments`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `order_shipping_logs`
--
ALTER TABLE `order_shipping_logs`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `payments`
--
ALTER TABLE `payments`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT cho bảng `product_attributes`
--
ALTER TABLE `product_attributes`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT cho bảng `product_attribute_map`
--
ALTER TABLE `product_attribute_map`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `product_attribute_values`
--
ALTER TABLE `product_attribute_values`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT cho bảng `product_audit_logs`
--
ALTER TABLE `product_audit_logs`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `product_brand`
--
ALTER TABLE `product_brand`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `product_categories`
--
ALTER TABLE `product_categories`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT cho bảng `product_comments`
--
ALTER TABLE `product_comments`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `product_images`
--
ALTER TABLE `product_images`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT cho bảng `product_questions`
--
ALTER TABLE `product_questions`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `product_reviews`
--
ALTER TABLE `product_reviews`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `product_tags`
--
ALTER TABLE `product_tags`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `product_tag_map`
--
ALTER TABLE `product_tag_map`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT cho bảng `product_translations`
--
ALTER TABLE `product_translations`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `product_variations`
--
ALTER TABLE `product_variations`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT cho bảng `recommendations`
--
ALTER TABLE `recommendations`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `reports`
--
ALTER TABLE `reports`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `review_images`
--
ALTER TABLE `review_images`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `sellers`
--
ALTER TABLE `sellers`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `seller_bank_accounts`
--
ALTER TABLE `seller_bank_accounts`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `seller_employees`
--
ALTER TABLE `seller_employees`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `seller_legal_docs`
--
ALTER TABLE `seller_legal_docs`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `seller_logs`
--
ALTER TABLE `seller_logs`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `shipping_classes`
--
ALTER TABLE `shipping_classes`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `shop_banners`
--
ALTER TABLE `shop_banners`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `shop_reviews`
--
ALTER TABLE `shop_reviews`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `static_pages`
--
ALTER TABLE `static_pages`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `subscribers`
--
ALTER TABLE `subscribers`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `support_tickets`
--
ALTER TABLE `support_tickets`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT cho bảng `user_addresses`
--
ALTER TABLE `user_addresses`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `user_vouchers`
--
ALTER TABLE `user_vouchers`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `variation_images`
--
ALTER TABLE `variation_images`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT cho bảng `vouchers`
--
ALTER TABLE `vouchers`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `warehouses`
--
ALTER TABLE `warehouses`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `wishlists`
--
ALTER TABLE `wishlists`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`),
  ADD CONSTRAINT `cart_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Các ràng buộc cho bảng `discounts`
--
ALTER TABLE `discounts`
  ADD CONSTRAINT `discounts_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Các ràng buộc cho bảng `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `favorites_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `favorites_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Các ràng buộc cho bảng `flash_sale_items`
--
ALTER TABLE `flash_sale_items`
  ADD CONSTRAINT `flash_sale_items_ibfk_1` FOREIGN KEY (`flash_sale_id`) REFERENCES `flash_sales` (`id`),
  ADD CONSTRAINT `flash_sale_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Các ràng buộc cho bảng `inventories`
--
ALTER TABLE `inventories`
  ADD CONSTRAINT `inventories_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `inventories_ibfk_2` FOREIGN KEY (`warehouse_id`) REFERENCES `warehouses` (`id`);

--
-- Các ràng buộc cho bảng `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`address_id`) REFERENCES `user_addresses` (`id`);

--
-- Các ràng buộc cho bảng `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Các ràng buộc cho bảng `order_returns`
--
ALTER TABLE `order_returns`
  ADD CONSTRAINT `order_returns_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `order_returns_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `order_shipments`
--
ALTER TABLE `order_shipments`
  ADD CONSTRAINT `order_shipments_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);

--
-- Các ràng buộc cho bảng `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);

--
-- Các ràng buộc cho bảng `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `fk_default_variation` FOREIGN KEY (`default_variation_id`) REFERENCES `product_variations` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_shipping_class` FOREIGN KEY (`shipping_class_id`) REFERENCES `shipping_classes` (`id`),
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`seller_id`) REFERENCES `sellers` (`id`),
  ADD CONSTRAINT `products_ibfk_3` FOREIGN KEY (`brand_id`) REFERENCES `product_brand` (`id`);

--
-- Các ràng buộc cho bảng `product_attribute_map`
--
ALTER TABLE `product_attribute_map`
  ADD CONSTRAINT `product_attribute_map_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `product_attribute_map_ibfk_2` FOREIGN KEY (`attribute_id`) REFERENCES `product_attributes` (`id`);

--
-- Các ràng buộc cho bảng `product_attribute_values`
--
ALTER TABLE `product_attribute_values`
  ADD CONSTRAINT `product_attribute_values_ibfk_1` FOREIGN KEY (`attribute_id`) REFERENCES `product_attributes` (`id`);

--
-- Các ràng buộc cho bảng `product_attribute_value_map`
--
ALTER TABLE `product_attribute_value_map`
  ADD CONSTRAINT `product_attribute_value_map_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_attribute_value_map_ibfk_2` FOREIGN KEY (`value_id`) REFERENCES `product_attribute_values` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `product_category_map`
--
ALTER TABLE `product_category_map`
  ADD CONSTRAINT `product_category_map_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_category_map_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `product_categories` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `product_comments`
--
ALTER TABLE `product_comments`
  ADD CONSTRAINT `product_comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `product_comments_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `product_comments_ibfk_3` FOREIGN KEY (`parent_id`) REFERENCES `product_comments` (`id`);

--
-- Các ràng buộc cho bảng `product_images`
--
ALTER TABLE `product_images`
  ADD CONSTRAINT `product_images_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Các ràng buộc cho bảng `product_reviews`
--
ALTER TABLE `product_reviews`
  ADD CONSTRAINT `product_reviews_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `product_reviews_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `product_tag_map`
--
ALTER TABLE `product_tag_map`
  ADD CONSTRAINT `product_tag_map_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `product_tag_map_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `product_tags` (`id`);

--
-- Các ràng buộc cho bảng `product_translations`
--
ALTER TABLE `product_translations`
  ADD CONSTRAINT `product_translations_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Các ràng buộc cho bảng `product_variations`
--
ALTER TABLE `product_variations`
  ADD CONSTRAINT `product_variations_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Các ràng buộc cho bảng `recommendations`
--
ALTER TABLE `recommendations`
  ADD CONSTRAINT `recommendations_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Các ràng buộc cho bảng `reports`
--
ALTER TABLE `reports`
  ADD CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Các ràng buộc cho bảng `review_images`
--
ALTER TABLE `review_images`
  ADD CONSTRAINT `review_images_ibfk_1` FOREIGN KEY (`review_id`) REFERENCES `product_reviews` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `sellers`
--
ALTER TABLE `sellers`
  ADD CONSTRAINT `sellers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `seller_employees`
--
ALTER TABLE `seller_employees`
  ADD CONSTRAINT `seller_employees_ibfk_1` FOREIGN KEY (`seller_id`) REFERENCES `sellers` (`id`);

--
-- Các ràng buộc cho bảng `support_tickets`
--
ALTER TABLE `support_tickets`
  ADD CONSTRAINT `support_tickets_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `support_tickets_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);

--
-- Các ràng buộc cho bảng `user_addresses`
--
ALTER TABLE `user_addresses`
  ADD CONSTRAINT `user_addresses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `variation_images`
--
ALTER TABLE `variation_images`
  ADD CONSTRAINT `variation_images_ibfk_1` FOREIGN KEY (`variation_id`) REFERENCES `product_variations` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `wishlists`
--
ALTER TABLE `wishlists`
  ADD CONSTRAINT `wishlists_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `wishlists_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
