/*
Navicat MySQL Data Transfer

Source Server         : 本地
Source Server Version : 50549
Source Host           : localhost:3306
Source Database       : ev_users

Target Server Type    : MYSQL
Target Server Version : 50549
File Encoding         : 65001

Date: 2024-05-11 14:48:31
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` int(11) DEFAULT NULL,
  `password` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('1', '123456', '123456');
INSERT INTO `admin` VALUES ('2', '123', '112');

-- ----------------------------
-- Table structure for ev_users
-- ----------------------------
DROP TABLE IF EXISTS `ev_users`;
CREATE TABLE `ev_users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `studentid` bigint(20) DEFAULT NULL,
  `major` varchar(255) DEFAULT NULL,
  `class` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of ev_users
-- ----------------------------
INSERT INTO `ev_users` VALUES ('1', '25801', '$2a$10$B3HuDds8PvdhEzG9mir/iO2kA4Yc8JY2.cRtVbTlb9oFkqf0MFGq.', '16860@qq.com', '曹锦媛', '47905', '软件工程', '20软工6班');
INSERT INTO `ev_users` VALUES ('2', '2580', '$2a$10$x2JmX/QLmblVov4IZ/sY9.gMNUC7qH19Nb2yU2EBIj3Zj6tTzXM0q', '16860@qq.com', '喜羊羊', '2020060500', '计算机', '18软工6班');
INSERT INTO `ev_users` VALUES ('3', '12333', '$2a$10$PYOnAl6nMJlc9rhH1OHsheKF85W9ePvVSBBMyIfDTnAJHxNCeCkfi', '16860@qq.com', '美羊羊', '20240601', '法学18', '18法学3班');
INSERT INTO `ev_users` VALUES ('4', '110', '$2a$10$3sj2bdSAyZDu1Irb8P.ykOahDQKp1IqfN8BhVcvR.aXNP6EQBjP62', '16860@qq.com', '灰太狼', '2002102606', '电商', '20电商5班');
INSERT INTO `ev_users` VALUES ('7', '1201', '$2a$10$wVaS0QcrudhytkrnrB3KCe..TAahA8gpsD6EyYTCx9zWUv1IQty3W', '16860@qq.com', '小灰灰', '2020021026', '国贸', '20国贸11班');
INSERT INTO `ev_users` VALUES ('8', '1203', '$2a$10$8hzxhIyScYcs3cIruzKf8./PINf4A42kAIcLyT66gQzpOge0dy9SO', '16860@qq.com', '红太狼', '20230981', '体育', '20体育10班');
INSERT INTO `ev_users` VALUES ('9', '1204', '$2a$10$2aCpVVd4FxMbIKiw2ikVpOg7q1wnRioKfLe.Mc.489G5j3tqDLFPm', '16860@qq.com', '沸羊羊', '2001434311', '电子商务', '20电子商务');
INSERT INTO `ev_users` VALUES ('10', '1209', '$2a$10$QKoL0aVbKfQxbcrEt2er1uEPK/i.CBiMuS8NVTRNVywSsMp/fcXoy', '1686@qq.com', '懒洋洋', '2020021026', '美食家', '20美食13班');
INSERT INTO `ev_users` VALUES ('11', '1231121', '$2a$10$6hhIiMiGtqxiN0SVrLxWPObWBj3uQ2V1ubaz0ZRx7Vk6RVhzwxQnq', '16860@qq.com', 'cc', '2510', 'run', '20软工1班');
INSERT INTO `ev_users` VALUES ('62', '120112', '$2a$10$DfTgjaCRDLjP2EekIIkPY.hLJBO3OQBtowB6ai25CxOO9fCVD/AqO', '1686@qq.com', '小草', '20200210', '法学', '20法学1班');
INSERT INTO `ev_users` VALUES ('63', '1201121', '$2a$10$xxUz83fFqn.RcAH69HemK.t0eNDXkeeOmvKyHL/GXaznI8uZ73Ru6', '1686@qq.com', '小草', '20200210', '法学', '20法学1班');
INSERT INTO `ev_users` VALUES ('64', '10086', '$2a$10$y9j77Ot0yJvZ5cQLd3GDOuBTIZY/LCHA0HaTC3Rkqjf0Jdi4vPSqa', '168@qq.com', '张飞', '2020021026', '会计', '20会计3班');
INSERT INTO `ev_users` VALUES ('65', '1901', '$2a$10$Ck5n55Jk5rcstNtvo1DXSO7CgTrdscFe3A41lQ2lBc33erdD9lLAO', '1345@qq.com', 'cas', '202002102', '软件工程', '20软工6班');

-- ----------------------------
-- Table structure for reservations
-- ----------------------------
DROP TABLE IF EXISTS `reservations`;
CREATE TABLE `reservations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `seat_id` int(11) DEFAULT '1' COMMENT '座位号',
  `user_id` int(11) NOT NULL,
  `reservation_date` datetime DEFAULT NULL COMMENT '预约日期',
  `reservation_time` int(11) DEFAULT NULL COMMENT '预约时长',
  `reservation_status` int(11) NOT NULL DEFAULT '1' COMMENT '管理员设置预约状态（1、2、3）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of reservations
-- ----------------------------
INSERT INTO `reservations` VALUES ('3', '5', '9', '2024-05-11 15:27:00', '1', '1');
INSERT INTO `reservations` VALUES ('4', '6', '9', '2024-05-12 14:40:29', '2', '2');
INSERT INTO `reservations` VALUES ('5', '10', '9', '2024-05-12 16:41:50', '1', '3');
INSERT INTO `reservations` VALUES ('6', '8', '9', '2024-05-12 19:43:00', '1', '1');

-- ----------------------------
-- Table structure for seats
-- ----------------------------
DROP TABLE IF EXISTS `seats`;
CREATE TABLE `seats` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `status` int(11) DEFAULT '0' COMMENT '1：已预约；2：已占用',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=185 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of seats
-- ----------------------------
INSERT INTO `seats` VALUES ('2', '0');
INSERT INTO `seats` VALUES ('3', '0');
INSERT INTO `seats` VALUES ('4', '0');
INSERT INTO `seats` VALUES ('5', '0');
INSERT INTO `seats` VALUES ('6', '0');
INSERT INTO `seats` VALUES ('7', '0');
INSERT INTO `seats` VALUES ('8', '0');
INSERT INTO `seats` VALUES ('9', '0');
INSERT INTO `seats` VALUES ('10', '0');
INSERT INTO `seats` VALUES ('11', '0');
INSERT INTO `seats` VALUES ('12', '0');
INSERT INTO `seats` VALUES ('13', '0');
INSERT INTO `seats` VALUES ('14', '0');
INSERT INTO `seats` VALUES ('15', '0');
INSERT INTO `seats` VALUES ('16', '0');
INSERT INTO `seats` VALUES ('17', '0');
INSERT INTO `seats` VALUES ('18', '0');
INSERT INTO `seats` VALUES ('19', '0');
INSERT INTO `seats` VALUES ('20', '0');
INSERT INTO `seats` VALUES ('21', '0');
INSERT INTO `seats` VALUES ('22', '0');
INSERT INTO `seats` VALUES ('23', '0');
INSERT INTO `seats` VALUES ('24', '0');
INSERT INTO `seats` VALUES ('25', '0');
INSERT INTO `seats` VALUES ('26', '0');
INSERT INTO `seats` VALUES ('27', '0');
INSERT INTO `seats` VALUES ('28', '0');
INSERT INTO `seats` VALUES ('29', '0');
INSERT INTO `seats` VALUES ('30', '0');
INSERT INTO `seats` VALUES ('31', '0');
INSERT INTO `seats` VALUES ('32', '0');
INSERT INTO `seats` VALUES ('33', '0');
INSERT INTO `seats` VALUES ('34', '0');
INSERT INTO `seats` VALUES ('35', '0');
INSERT INTO `seats` VALUES ('36', '0');
INSERT INTO `seats` VALUES ('37', '0');
INSERT INTO `seats` VALUES ('38', '0');
INSERT INTO `seats` VALUES ('39', '0');
INSERT INTO `seats` VALUES ('40', '0');
INSERT INTO `seats` VALUES ('41', '0');
INSERT INTO `seats` VALUES ('42', '0');
INSERT INTO `seats` VALUES ('43', '0');
INSERT INTO `seats` VALUES ('44', '0');
INSERT INTO `seats` VALUES ('45', '0');
INSERT INTO `seats` VALUES ('46', '0');
INSERT INTO `seats` VALUES ('47', '0');
INSERT INTO `seats` VALUES ('48', '0');
INSERT INTO `seats` VALUES ('49', '0');
INSERT INTO `seats` VALUES ('50', '0');
INSERT INTO `seats` VALUES ('51', '0');
INSERT INTO `seats` VALUES ('52', '0');
INSERT INTO `seats` VALUES ('53', '0');
INSERT INTO `seats` VALUES ('54', '0');
INSERT INTO `seats` VALUES ('55', '0');
INSERT INTO `seats` VALUES ('56', '0');
INSERT INTO `seats` VALUES ('57', '0');
INSERT INTO `seats` VALUES ('58', '0');
INSERT INTO `seats` VALUES ('59', '0');
INSERT INTO `seats` VALUES ('60', '0');
INSERT INTO `seats` VALUES ('61', '0');
INSERT INTO `seats` VALUES ('62', '0');
INSERT INTO `seats` VALUES ('63', '0');
INSERT INTO `seats` VALUES ('64', '0');
INSERT INTO `seats` VALUES ('65', '0');
INSERT INTO `seats` VALUES ('66', '0');
INSERT INTO `seats` VALUES ('67', '0');
INSERT INTO `seats` VALUES ('68', '0');
INSERT INTO `seats` VALUES ('69', '0');
INSERT INTO `seats` VALUES ('70', '0');
INSERT INTO `seats` VALUES ('71', '0');
INSERT INTO `seats` VALUES ('72', '0');
INSERT INTO `seats` VALUES ('73', '0');
INSERT INTO `seats` VALUES ('74', '0');
INSERT INTO `seats` VALUES ('75', '0');
INSERT INTO `seats` VALUES ('76', '0');
INSERT INTO `seats` VALUES ('77', '0');
INSERT INTO `seats` VALUES ('78', '0');
INSERT INTO `seats` VALUES ('79', '0');
INSERT INTO `seats` VALUES ('80', '0');
INSERT INTO `seats` VALUES ('81', '0');
INSERT INTO `seats` VALUES ('82', '0');
INSERT INTO `seats` VALUES ('83', '0');
INSERT INTO `seats` VALUES ('84', '0');
INSERT INTO `seats` VALUES ('85', '0');
INSERT INTO `seats` VALUES ('86', '0');
INSERT INTO `seats` VALUES ('87', '0');
INSERT INTO `seats` VALUES ('88', '0');
INSERT INTO `seats` VALUES ('89', '0');
INSERT INTO `seats` VALUES ('90', '0');
INSERT INTO `seats` VALUES ('91', '0');
INSERT INTO `seats` VALUES ('92', '0');
INSERT INTO `seats` VALUES ('93', '0');
INSERT INTO `seats` VALUES ('94', '0');
INSERT INTO `seats` VALUES ('95', '0');
INSERT INTO `seats` VALUES ('96', '0');
INSERT INTO `seats` VALUES ('97', '0');
INSERT INTO `seats` VALUES ('98', '0');
INSERT INTO `seats` VALUES ('99', '0');
INSERT INTO `seats` VALUES ('100', '0');
INSERT INTO `seats` VALUES ('101', '0');
INSERT INTO `seats` VALUES ('102', '0');
INSERT INTO `seats` VALUES ('103', '0');
INSERT INTO `seats` VALUES ('104', '0');
INSERT INTO `seats` VALUES ('105', '0');
INSERT INTO `seats` VALUES ('106', '0');
INSERT INTO `seats` VALUES ('107', '0');
INSERT INTO `seats` VALUES ('108', '0');
INSERT INTO `seats` VALUES ('109', '0');
INSERT INTO `seats` VALUES ('110', '0');
INSERT INTO `seats` VALUES ('111', '0');
INSERT INTO `seats` VALUES ('112', '0');
INSERT INTO `seats` VALUES ('113', '0');
INSERT INTO `seats` VALUES ('114', '0');
INSERT INTO `seats` VALUES ('115', '0');
INSERT INTO `seats` VALUES ('116', '0');
INSERT INTO `seats` VALUES ('117', '0');
INSERT INTO `seats` VALUES ('118', '0');
INSERT INTO `seats` VALUES ('119', '0');
INSERT INTO `seats` VALUES ('120', '0');
INSERT INTO `seats` VALUES ('121', '0');
INSERT INTO `seats` VALUES ('122', '0');
INSERT INTO `seats` VALUES ('123', '0');
INSERT INTO `seats` VALUES ('124', '0');
INSERT INTO `seats` VALUES ('125', '0');
INSERT INTO `seats` VALUES ('126', '0');
INSERT INTO `seats` VALUES ('127', '0');
INSERT INTO `seats` VALUES ('128', '0');
INSERT INTO `seats` VALUES ('129', '0');
INSERT INTO `seats` VALUES ('130', '0');
INSERT INTO `seats` VALUES ('131', '0');
INSERT INTO `seats` VALUES ('132', '0');
INSERT INTO `seats` VALUES ('133', '0');
INSERT INTO `seats` VALUES ('134', '0');
INSERT INTO `seats` VALUES ('135', '0');
INSERT INTO `seats` VALUES ('136', '0');
INSERT INTO `seats` VALUES ('137', '0');
INSERT INTO `seats` VALUES ('138', '0');
INSERT INTO `seats` VALUES ('139', '0');
INSERT INTO `seats` VALUES ('140', '0');
INSERT INTO `seats` VALUES ('141', '0');
INSERT INTO `seats` VALUES ('142', '0');
INSERT INTO `seats` VALUES ('143', '0');
INSERT INTO `seats` VALUES ('144', '0');
INSERT INTO `seats` VALUES ('145', '0');
INSERT INTO `seats` VALUES ('146', '0');
INSERT INTO `seats` VALUES ('147', '0');
INSERT INTO `seats` VALUES ('148', '0');
INSERT INTO `seats` VALUES ('149', '0');
INSERT INTO `seats` VALUES ('150', '0');
INSERT INTO `seats` VALUES ('151', '0');
INSERT INTO `seats` VALUES ('152', '0');
INSERT INTO `seats` VALUES ('153', '0');
INSERT INTO `seats` VALUES ('154', '0');
INSERT INTO `seats` VALUES ('155', '0');
INSERT INTO `seats` VALUES ('156', '0');
INSERT INTO `seats` VALUES ('157', '0');
INSERT INTO `seats` VALUES ('158', '0');
INSERT INTO `seats` VALUES ('159', '0');
INSERT INTO `seats` VALUES ('160', '0');
INSERT INTO `seats` VALUES ('161', '0');
INSERT INTO `seats` VALUES ('162', '0');
INSERT INTO `seats` VALUES ('163', '0');
INSERT INTO `seats` VALUES ('164', '0');
INSERT INTO `seats` VALUES ('165', '0');
INSERT INTO `seats` VALUES ('166', '0');
INSERT INTO `seats` VALUES ('167', '0');
INSERT INTO `seats` VALUES ('168', '0');
INSERT INTO `seats` VALUES ('169', '0');
INSERT INTO `seats` VALUES ('170', '0');
INSERT INTO `seats` VALUES ('171', '0');
INSERT INTO `seats` VALUES ('172', '0');
INSERT INTO `seats` VALUES ('173', '0');
INSERT INTO `seats` VALUES ('175', '0');
INSERT INTO `seats` VALUES ('177', '0');
INSERT INTO `seats` VALUES ('179', '0');
INSERT INTO `seats` VALUES ('182', '0');
INSERT INTO `seats` VALUES ('183', '0');
INSERT INTO `seats` VALUES ('184', '0');
