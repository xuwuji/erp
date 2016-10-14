/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 50715
 Source Host           : localhost
 Source Database       : erp

 Target Server Type    : MySQL
 Target Server Version : 50715
 File Encoding         : utf-8

 Date: 10/13/2016 18:18:41 PM
*/

SET NAMES gbk;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `data`
-- ----------------------------
DROP TABLE IF EXISTS `data`;
CREATE TABLE `data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` varchar(255) DEFAULT NULL,
  `mId` varchar(255) DEFAULT NULL,
  `mCategory` varchar(255) DEFAULT NULL,
  `mName` varchar(255) DEFAULT NULL,
  `size` varchar(255) DEFAULT NULL,
  `param` varchar(255) DEFAULT NULL,
  `buyNum` int(11) DEFAULT NULL,
  `sentNum` varchar(255) DEFAULT NULL,
  `orderId` varchar(255) DEFAULT NULL,
  `nId` varchar(255) DEFAULT NULL,
  `priceNoTax` varchar(255) DEFAULT NULL,
  `amoutNoTax` varchar(255) DEFAULT NULL,
  `tax` varchar(255) DEFAULT NULL,
  `taxRate` varchar(255) DEFAULT NULL,
  `total` varchar(255) DEFAULT NULL,
  `factory` varchar(255) DEFAULT NULL,
  `requestDate` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=gbk;

SET FOREIGN_KEY_CHECKS = 1;
