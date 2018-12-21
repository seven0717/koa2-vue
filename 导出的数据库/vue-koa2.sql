/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50723
 Source Host           : localhost:3306
 Source Schema         : vue-koa2

 Target Server Type    : MySQL
 Target Server Version : 50723
 File Encoding         : 65001

 Date: 21/12/2018 19:23:23
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for hchar
-- ----------------------------
DROP TABLE IF EXISTS `hchar`;
CREATE TABLE `hchar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nian` text NOT NULL,
  `yue` varchar(255) NOT NULL,
  `ri` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of hchar
-- ----------------------------
BEGIN;
INSERT INTO `hchar` VALUES (1, '一月', '3', '1');
INSERT INTO `hchar` VALUES (2, '二月', '1', '23');
INSERT INTO `hchar` VALUES (3, '三月', '12', '11');
INSERT INTO `hchar` VALUES (4, '四月', '1', '0');
INSERT INTO `hchar` VALUES (5, '五月', '43', '12');
INSERT INTO `hchar` VALUES (6, '六月', '22', '121');
INSERT INTO `hchar` VALUES (7, '七月', '43', '2');
INSERT INTO `hchar` VALUES (8, '八月', '22', '1');
INSERT INTO `hchar` VALUES (9, '九月', '5', '8');
INSERT INTO `hchar` VALUES (10, '十月', '5', '12');
INSERT INTO `hchar` VALUES (11, '十一月', '76', '43');
INSERT INTO `hchar` VALUES (12, '十二月', '4', '2');
COMMIT;

-- ----------------------------
-- Table structure for lists
-- ----------------------------
DROP TABLE IF EXISTS `lists`;
CREATE TABLE `lists` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `address` varchar(255) NOT NULL,
  `tel` varchar(20) DEFAULT NULL,
  `date` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of lists
-- ----------------------------
BEGIN;
INSERT INTO `lists` VALUES (1, '王一虎', '上海市普陀区金沙江路 001', '13543425312', '2018-12-21 15:41:54');
INSERT INTO `lists` VALUES (2, '王二虎', '上海市普陀区金沙江路 002', '13888888888', '2018-12-21 15:36:08');
INSERT INTO `lists` VALUES (3, '王三虎', '上海市普陀区金沙江路 003', '13232453432', '2018-12-21 16:02:05');
INSERT INTO `lists` VALUES (6, '王流虎', '上海市普陀区金沙江路 006', '13232456743', '2018-12-21 16:10:43');
INSERT INTO `lists` VALUES (8, '王九虎', '上海市普陀区金沙江路 008', '13999999999', '2018-12-21 16:20:10');
INSERT INTO `lists` VALUES (9, '王9虎', '上海市普陀区金沙江路 009', '13456234321', '2018-12-15 20:18:52');
INSERT INTO `lists` VALUES (10, '王10虎', '上海市普陀区金沙江路 010', '13234323453', '2018-12-15 12:12:12');
INSERT INTO `lists` VALUES (42, '王新虎', '上海摊', '13000000000', '2018-12-21 19:18:42');
INSERT INTO `lists` VALUES (43, '王胡子', '天津卫', '13131313131', '2018-12-21 19:20:56');
COMMIT;

-- ----------------------------
-- Table structure for login
-- ----------------------------
DROP TABLE IF EXISTS `login`;
CREATE TABLE `login` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(50) NOT NULL,
  `pass` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of login
-- ----------------------------
BEGIN;
INSERT INTO `login` VALUES (1, '111', '111');
INSERT INTO `login` VALUES (2, '222', '222');
COMMIT;

-- ----------------------------
-- Table structure for news
-- ----------------------------
DROP TABLE IF EXISTS `news`;
CREATE TABLE `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `jian` text NOT NULL,
  `cont` text NOT NULL,
  `lai` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of news
-- ----------------------------
BEGIN;
INSERT INTO `news` VALUES (1, '警告！这是新闻', '2018-12-12 12:12:12', '这就是新闻的简介', '这就是新闻的内容', '旧话网', 'http://www.baidu.com');
INSERT INTO `news` VALUES (2, '恭喜', '2018-12-12 13:13:13', '这是第二条新闻', '一起lola', '我的心里', 'http://www.aliyun.com');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
