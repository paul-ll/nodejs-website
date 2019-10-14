-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 14, 2019 at 11:06 AM
-- Server version: 5.7.26
-- PHP Version: 7.0.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `qinqiyun`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `nickname` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `username` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `nickname`, `username`, `password`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'wanzikun', 'eoen', '$2a$10$PAjR03w5.xFhAlKYTjmd0O7/krSWKky0vBw2v2nrsDNL/2RWYMh7y', '2019-10-05 20:15:45', '2019-10-05 20:15:45', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `advantage`
--

CREATE TABLE `advantage` (
  `id` int(11) NOT NULL,
  `type` varchar(255) DEFAULT NULL COMMENT '板块ID',
  `title` varchar(255) DEFAULT NULL COMMENT '板块标题',
  `intro` varchar(255) DEFAULT NULL COMMENT '板块介绍',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `advantage`
--

INSERT INTO `advantage` (`id`, `type`, `title`, `intro`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'advantage', '使用知晓云开发小程序，门槛低，花费少，效率高', '免服务器搭建、免域名备案、免接口开发、免线上运维。通过 BaaS（Backend As A Service）、FaaS（Function As A Service）组合而成的 Serverless 无服务架构，集成最新的工具、组件、第三方服务 ，满足各类场景需求。', '2019-10-08 23:04:54', '2019-10-09 21:27:11', NULL),
(2, 'powerful', '不断更新的开发工具，带来肉眼可见的效率提升', '', '2019-10-09 11:45:11', '2019-10-09 11:45:11', NULL),
(3, 'ecology', '从开发入门到推广定制，服务遍及整个生态', 'http://cdn.aogonew.com/FoFmnUFqyyrMIYReK9due6sRFLNS', '2019-10-10 09:55:51', '2019-10-10 09:55:51', NULL),
(4, 'case', '海量品牌案例，打造行业标杆', 'http://cdn.aogonew.com/FmaqR2F8kI-_WReGU8gzOGN1fFLl', '2019-10-10 10:38:34', '2019-10-10 10:38:34', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '菜单名称',
  `links` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '跳转链接',
  `target` tinyint(1) DEFAULT '0' COMMENT '新标签页打开',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `title`, `links`, `target`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '产品服务', '#advantage', 0, '2019-10-09 22:22:20', '2019-10-09 22:22:20', NULL),
(2, '解决方案', '#ability', 0, '2019-10-09 22:22:43', '2019-10-09 22:22:43', NULL),
(3, '品牌案例', '#case', 0, '2019-10-09 22:23:16', '2019-10-09 22:23:16', NULL),
(4, '开发文档', 'https://doc.minapp.com/', 1, '2019-10-09 22:23:47', '2019-10-09 22:23:47', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `swiper`
--

CREATE TABLE `swiper` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL COMMENT '广告标题',
  `intro` varchar(255) DEFAULT NULL COMMENT '简介文字',
  `button` varchar(255) DEFAULT NULL COMMENT '按钮文字',
  `links` varchar(255) DEFAULT NULL COMMENT '跳转链接',
  `hover` tinyint(1) NOT NULL DEFAULT '0' COMMENT '背景蒙版',
  `target` tinyint(1) NOT NULL DEFAULT '0' COMMENT '新标签页打开',
  `bgimg` varchar(255) DEFAULT NULL COMMENT '背景图片',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `swiper`
--

INSERT INTO `swiper` (`id`, `title`, `intro`, `button`, `links`, `hover`, `target`, `bgimg`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '简单易用的小程序 serverLess 云服务', '5 万开发者都在用的后端云', '免费试用', 'https://cloud.minapp.com/dashboard/?utm_source=mincloud&utm_medium=pc_banner&utm_term=banner1', 1, 1, 'http://cdn.aogonew.com/FuVfxWZSYlghNYurWIF_bL8kq6tJ', '2019-10-09 23:03:38', '2019-10-09 23:03:38', NULL),
(2, '小程序开发，包年套餐限时5折起', '5 万开发者都在用的后端云服务', '立即购买', 'https://cloud.minapp.com/dashboard/#/billing/overview/topup/#annual-plan', 0, 1, 'http://cdn.aogonew.com/FgTc3oV1CgOroEBeP8RIO3t5CRQV', '2019-10-09 23:04:40', '2019-10-09 23:04:40', NULL),
(3, '邀请大礼包，邀得多，送的多', '每成功邀请一名新用户你都可以获得 30 元代金券', '立即邀请', 'https://cloud.minapp.com/dashboard/#/invite/', 0, 1, 'http://cdn.aogonew.com/Fkgm1DDOtDHRXi7G0KqMRWL4e1h-', '2019-10-09 23:05:18', '2019-10-09 23:05:18', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `swipermenu`
--

CREATE TABLE `swipermenu` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL COMMENT '菜单标题',
  `intro` varchar(255) DEFAULT NULL COMMENT '菜单介绍',
  `links` varchar(255) DEFAULT NULL COMMENT '跳转链接',
  `target` tinyint(1) NOT NULL DEFAULT '0' COMMENT '新标签页打开',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `swipermenu`
--

INSERT INTO `swipermenu` (`id`, `title`, `intro`, `links`, `target`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '包年套餐，限时 5 折起', '立即参与', 'https://cloud.minapp.com/dashboard/#/billing/overview/topup/#annual-plan', 1, '2019-10-09 23:07:51', '2019-10-09 23:07:51', NULL),
(2, 'QQ 小程序', '立即接入', 'https://cloud.minapp.com/dashboard/#/app/settings/qq/', 1, '2019-10-09 23:08:15', '2019-10-09 23:08:15', NULL),
(3, '知晓推送', '小程序粉丝转化神器', 'https://cloud.minapp.com/dashboard/#/app/wechat-template-message/message', 1, '2019-10-09 23:08:33', '2019-10-09 23:08:33', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tedianlist`
--

CREATE TABLE `tedianlist` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL COMMENT '特点标题',
  `type` varchar(20) DEFAULT NULL COMMENT '特点类型',
  `intro` varchar(255) DEFAULT NULL COMMENT '特点说明',
  `icon` varchar(255) DEFAULT NULL COMMENT 'icon图标',
  `image` varchar(255) DEFAULT NULL COMMENT '特点图片',
  `json_ext` json DEFAULT NULL COMMENT 'json备注',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tedianlist`
--

INSERT INTO `tedianlist` (`id`, `title`, `type`, `intro`, `icon`, `image`, `json_ext`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '上手容易', 'tedian', '轻量级 SDK，一键式部署', 'http://cdn.aogonew.com/Ftc3wT_E26NX8dvMkPNiTbmqRnbC', 'http://cdn.aogonew.com/Fk1s6QfuMkPPhyH8Acnajaj-EupB', NULL, '2019-10-10 08:51:36', '2019-10-10 08:51:36', NULL),
(2, '使用简单', 'tedian', '可视化操作后台，数据、文件、订单轻松管理', 'http://cdn.aogonew.com/FjDb77UtZJHkF1mYu1qKgLL6u-qo', 'http://cdn.aogonew.com/Fl4Qds38yeVnxdUv-0z4BiQJAhk3', NULL, '2019-10-10 08:52:08', '2019-10-10 08:52:08', NULL),
(3, '功能强大', 'tedian', '持续更新的 API，能力覆盖全链路业务场景', 'http://cdn.aogonew.com/FozfVQCbCnKN-C-uU_P-SRHkgsyN', 'http://cdn.aogonew.com/FkkojCbs85xAmSlPUDbfDEHHB3B0', NULL, '2019-10-10 08:52:35', '2019-10-10 08:52:35', NULL),
(4, '收费灵活', 'tedian', '按日结算、按量收费，直接降低 60% 的开发成本', 'http://cdn.aogonew.com/Fj5txWmfLWqq5pZgkHEHqJ3T1Z8q', 'http://cdn.aogonew.com/Fm36DPoVZgY84fAeTZEIMx_yD24_', NULL, '2019-10-10 08:52:59', '2019-10-10 08:52:59', NULL),
(5, '弹性数据库', 'gonnen', '自动扩容，权限可控', 'icon-danxingshujukuicon', '', NULL, '2019-10-10 09:26:00', '2019-10-10 10:47:23', NULL),
(6, '云函数', 'gonnen', '运维成本低，扩展能力强', 'icon-yunhanshuicon', NULL, NULL, '2019-10-10 09:28:52', '2019-10-10 09:28:52', NULL),
(7, '触发器', 'gonnen', '串起业务流的自动化引擎', 'icon-dabaogongjuicon', '', NULL, '2019-10-10 09:29:38', '2019-10-10 09:29:38', NULL),
(8, '微信、支付宝支付', 'gonnen', '一行代码即可完成接入', 'icon-weixinzhifuicon', NULL, NULL, '2019-10-10 09:30:40', '2019-10-10 09:30:40', NULL),
(9, '模板消息推送', 'gonnen', '无缝托管，支持在线批量发送', 'icon-mobanxiaoxiicon', '', NULL, '2019-10-10 09:31:05', '2019-10-10 09:31:05', NULL),
(10, '运营后台', 'gonnen', '智能扩展，自动部署', 'icon-yunyinghoutaiicon', NULL, NULL, '2019-10-10 09:32:42', '2019-10-10 09:32:42', NULL),
(11, '知晓云', 'shentai', 'http://cdn.aogonew.com/FpyVN3MEu2FIe-8mutEja97kET0V', 'http://cdn.aogonew.com/FqjgbRcpTEDHsS5yMhbT3CQwH7ei', NULL, NULL, '2019-10-10 10:20:40', '2019-10-10 10:20:40', NULL),
(12, '知晓市场', 'shentai', 'http://cdn.aogonew.com/Fgbg1ewxMBq8GaveYypjS6-GXeqE', 'http://cdn.aogonew.com/FmCxcVmUrazfkTBE_CQTHMgSE5t3', '', NULL, '2019-10-10 10:21:27', '2019-10-10 10:21:27', NULL),
(13, '知晓程序', 'shentai', 'http://cdn.aogonew.com/FvomsMafJGmmTKDjB4WWOzUnLWds', 'http://cdn.aogonew.com/FnAv1zxDVZC77ZBQE6HpdFayOST9', '', NULL, '2019-10-10 10:21:49', '2019-10-10 10:21:49', NULL),
(14, '知晓课堂', 'shentai', 'http://cdn.aogonew.com/FpQEAVvAbcO3BiOmARBlKmDnknj2', 'http://cdn.aogonew.com/Ft53O2pbgkqQVs928n2cmPzt4LBr', '', NULL, '2019-10-10 10:22:09', '2019-10-10 10:22:09', NULL),
(15, '曼谷海洋乐园', 'anli', 'http://cdn.aogonew.com/FvL8HKAzyrLNPEgHFpsupNXfjW76', 'http://cdn.aogonew.com/FmWrPd8w5LantHe-7HstTcBAW0oL', 'http://cdn.aogonew.com/Fub6Vl1-E18Fj57M85LUyUXIQzt9', '\"[\\\"与默林集团合作的室内导览小程序\\\",\\\"参与答题小游戏，生成特定海洋生物明信片与朋友分享\\\",\\\"使用 100% 手绘地图定位精度 2m 以内，远超 3m 国际标准\\\"]\"', '2019-10-10 12:01:31', '2019-10-10 12:01:31', NULL),
(16, '曼谷海洋世界商店', 'anli', 'http://cdn.aogonew.com/FlurjK59It6p8_v5wtFswpWK-gGF', 'http://cdn.aogonew.com/FoxB23AjkYZYePqeEeNq9N642swI', 'http://cdn.aogonew.com/FqPZIofdd1NhTjzdIqZRwNC_XZ_l', '\"[\\\"与默林集团合作商店购物小程序\\\",\\\"支持园区不同类型票务购买\\\",\\\"通过玩游戏换取丰富礼品\\\"]\"', '2019-10-10 13:25:43', '2019-10-10 13:25:43', NULL),
(17, '未来实验室', 'anli', 'http://cdn.aogonew.com/Fh_JxrqhTcbtuK2WsbbFZ0DT80lx', 'http://cdn.aogonew.com/Fv_XDyAgTooBW-C7Nezj9kTZVlza', 'http://cdn.aogonew.com/Frbn8pQ4pb7RssvF3GU-O8WsEN0V', '\"[\\\"参与不同前沿科技话题的思维碰撞\\\",\\\"接收爱范儿发布的未来任务，成为未来研究员\\\"]\"', '2019-10-10 13:29:43', '2019-10-10 13:29:43', NULL),
(18, '好物好买', 'anli', 'http://cdn.aogonew.com/FjfYOx3xbYbMQg_b3ZgHc_wfSIYA', 'http://cdn.aogonew.com/Fs5jDaUikgNM4nm6Ca9uDhlbSMJw', 'http://cdn.aogonew.com/FuhRckpnRaWjx9kfOGzdcNjgyQ5Y', '\"[\\\"每日精选推送，让你发现心仪好物\\\",\\\"拼团购等多种购物福利等你来体验\\\",\\\"多类别丰富好物，满足您的不同需要\\\"]\"', '2019-10-10 13:30:58', '2019-10-10 13:30:58', NULL),
(19, '微言教育', 'anli', 'http://cdn.aogonew.com/FgShNhlqrbdEMounm6X9Bbq0w-VY', 'http://cdn.aogonew.com/Fs7V-YCATXVP_Yak8n8mOSt8FKcJ', 'http://cdn.aogonew.com/FopFP4WISiSd6WfdmcNJC70-M7BN', '\"[\\\"与教育部合作的教育资讯小程序\\\",\\\"尽数掌握教育部发布各项活动及最新教育资讯\\\",\\\"全国各大高校分布地图，支持跳转进相应导览小程序\\\"]\"', '2019-10-10 13:32:13', '2019-10-10 13:32:13', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `website`
--

CREATE TABLE `website` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL COMMENT '网站标题',
  `keywords` varchar(500) DEFAULT NULL COMMENT '网站关键字',
  `description` varchar(500) DEFAULT NULL COMMENT '网站说明',
  `logo1` varchar(300) DEFAULT NULL COMMENT '默认Logo',
  `logo2` varchar(300) DEFAULT NULL COMMENT '浮动Logo',
  `jiajie` varchar(500) DEFAULT NULL COMMENT '网站简介',
  `copys` varchar(200) DEFAULT NULL COMMENT '版权说明',
  `icps` varchar(100) DEFAULT NULL COMMENT '备案信息',
  `weibo` varchar(100) DEFAULT NULL COMMENT '新浪微博',
  `mail` varchar(100) DEFAULT NULL COMMENT '电子邮箱',
  `foo_logo` varchar(200) DEFAULT NULL COMMENT '底部Logo',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `website`
--

INSERT INTO `website` (`id`, `name`, `keywords`, `description`, `logo1`, `logo2`, `jiajie`, `copys`, `icps`, `weibo`, `mail`, `foo_logo`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '知晓云', '云服务, 后端, BaaS,开发定制, 小程序, 微信, 云函数, FaaS, 无服务, 小程序云, 开发', '知晓云是个好用、顺手的小程序开发工具。它免去了小程序开发中服务器搭建、域名备案、数据接口实现等繁琐流程。让您专注于业务逻辑的实现，使用知晓云开发小程序，门槛更低，效率更高。', 'http://cdn.aogonew.com/FrdX-LoVZeJYPt6kUANZ1oSQA8tn', 'http://cdn.aogonew.com/FhHeLM5T4TOvyeZQ8fP76TUF3x0R', '爱范儿倾力打造的后端服务平台。\\n旨在为您解决小程序后端那些麻烦事儿。', '版权所有 ©广州爱范儿科技股份有限公司 2008 - 2019', '粤 ICP 备 10211557 号 ', 'https://weibo.com/u/6331111256', 'mincloud@ifanr.com', 'http://cdn.aogonew.com/FrdX-LoVZeJYPt6kUANZ1oSQA8tn', '2019-10-31 00:00:00', '2019-10-11 09:07:35', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`username`);

--
-- Indexes for table `advantage`
--
ALTER TABLE `advantage`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `swiper`
--
ALTER TABLE `swiper`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `swipermenu`
--
ALTER TABLE `swipermenu`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tedianlist`
--
ALTER TABLE `tedianlist`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `website`
--
ALTER TABLE `website`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `advantage`
--
ALTER TABLE `advantage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `swiper`
--
ALTER TABLE `swiper`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `swipermenu`
--
ALTER TABLE `swipermenu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tedianlist`
--
ALTER TABLE `tedianlist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `website`
--
ALTER TABLE `website`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
