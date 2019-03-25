/*
Navicat MySQL Data Transfer

Source Server         : YChat2
Source Server Version : 50559
Source Host           : localhost:3306
Source Database       : db_mutual_platform

Target Server Type    : MYSQL
Target Server Version : 50559
File Encoding         : 65001

Date: 2019-03-25 19:49:58
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for mp_academy
-- ----------------------------
DROP TABLE IF EXISTS `mp_academy`;
CREATE TABLE `mp_academy` (
  `academy_id` int(255) NOT NULL COMMENT '学院ID',
  `status` tinyint(1) DEFAULT NULL COMMENT '状态',
  `academy_name` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '学院名字',
  `created_at` datetime DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`academy_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Table structure for mp_article
-- ----------------------------
DROP TABLE IF EXISTS `mp_article`;
CREATE TABLE `mp_article` (
  `article_id` varchar(64) COLLATE utf8_bin NOT NULL COMMENT '文章ID',
  `publisher_id` varchar(64) COLLATE utf8_bin NOT NULL COMMENT '发布者ID',
  `publisher_nick` varchar(50) COLLATE utf8_bin DEFAULT NULL COMMENT '发布者昵称',
  `publish_avatar` varchar(1024) COLLATE utf8_bin DEFAULT NULL COMMENT '发布者头像',
  `status` tinyint(1) NOT NULL COMMENT '发布者状态',
  `article_type` int(11) DEFAULT NULL COMMENT '发布类型',
  `title` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '标题',
  `content` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '内容',
  `accessory` varchar(2048) COLLATE utf8_bin DEFAULT NULL COMMENT '附件',
  `range` tinyint(1) DEFAULT NULL COMMENT '可视范围',
  `rank` int(10) DEFAULT NULL COMMENT '级别',
  `created_at` datetime DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`article_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Table structure for mp_article_comment
-- ----------------------------
DROP TABLE IF EXISTS `mp_article_comment`;
CREATE TABLE `mp_article_comment` (
  `comment_id` varchar(64) COLLATE utf8_bin NOT NULL COMMENT '评论ID',
  `parent_id` varchar(64) COLLATE utf8_bin NOT NULL COMMENT '父评论ID',
  `comment_user_id` varchar(64) COLLATE utf8_bin DEFAULT NULL COMMENT '评论者ID',
  `content` varchar(1024) COLLATE utf8_bin DEFAULT NULL COMMENT '评论内容',
  `depth` int(20) DEFAULT NULL COMMENT '深度',
  `thread` varchar(1024) COLLATE utf8_bin DEFAULT NULL COMMENT '评论路径',
  `status` tinyint(1) DEFAULT NULL COMMENT '状态',
  `created_at` datetime DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`comment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Table structure for mp_article_like
-- ----------------------------
DROP TABLE IF EXISTS `mp_article_like`;
CREATE TABLE `mp_article_like` (
  `like_id` varchar(64) COLLATE utf8_bin NOT NULL,
  `acircle_id` varchar(64) COLLATE utf8_bin NOT NULL,
  `like_user_id` int(64) NOT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`like_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Table structure for mp_article_type
-- ----------------------------
DROP TABLE IF EXISTS `mp_article_type`;
CREATE TABLE `mp_article_type` (
  `type_id` int(10) NOT NULL,
  `type_name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Table structure for mp_collect
-- ----------------------------
DROP TABLE IF EXISTS `mp_collect`;
CREATE TABLE `mp_collect` (
  `collect_id` varchar(64) COLLATE utf8_bin NOT NULL COMMENT '收藏ID',
  `article_id` varchar(64) COLLATE utf8_bin DEFAULT NULL COMMENT '文章ID',
  `user_id` int(64) DEFAULT NULL COMMENT '收藏者ID',
  `status` tinyint(1) DEFAULT NULL COMMENT '状态',
  `created_at` datetime DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`collect_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Table structure for mp_follow
-- ----------------------------
DROP TABLE IF EXISTS `mp_follow`;
CREATE TABLE `mp_follow` (
  `user_id` varchar(64) COLLATE utf8_bin NOT NULL COMMENT '关注者ID',
  `attention_id` varchar(64) COLLATE utf8_bin NOT NULL COMMENT '被关注者ID',
  `attention_nick` varchar(100) COLLATE utf8_bin DEFAULT NULL COMMENT '被关注者昵称',
  `attention_avatar` varchar(1024) COLLATE utf8_bin DEFAULT NULL COMMENT '被关注者头像',
  `user_nick` varchar(100) COLLATE utf8_bin DEFAULT NULL COMMENT '关注者昵称',
  `user_avatar` varchar(1024) COLLATE utf8_bin DEFAULT NULL COMMENT '关注者头像',
  `status` tinyint(1) DEFAULT NULL COMMENT '状态',
  `created_at` datetime DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`user_id`,`attention_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Table structure for mp_school
-- ----------------------------
DROP TABLE IF EXISTS `mp_school`;
CREATE TABLE `mp_school` (
  `school_id` int(255) NOT NULL COMMENT '学校ID',
  `school_name` varchar(1024) COLLATE utf8_bin DEFAULT NULL COMMENT '学校名称',
  `status` tinyint(1) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`school_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Table structure for mp_user
-- ----------------------------
DROP TABLE IF EXISTS `mp_user`;
CREATE TABLE `mp_user` (
  `user_id` varchar(32) COLLATE utf8_bin NOT NULL COMMENT '用户ID',
  `user_name` varchar(100) COLLATE utf8_bin NOT NULL COMMENT '用户名',
  `user_nick` varchar(100) COLLATE utf8_bin DEFAULT NULL COMMENT '用户昵称',
  `user_number` varchar(100) COLLATE utf8_bin DEFAULT NULL COMMENT '学号',
  `mobile` varchar(20) COLLATE utf8_bin DEFAULT NULL COMMENT '手机号',
  `status` tinyint(1) NOT NULL COMMENT '状态',
  `password` varchar(50) COLLATE utf8_bin DEFAULT NULL COMMENT '密码',
  `user_avatar` varchar(1024) COLLATE utf8_bin DEFAULT NULL COMMENT '头像',
  `range` tinyint(1) DEFAULT NULL COMMENT '可视范围',
  `school_id` int(255) DEFAULT NULL COMMENT '学校ID',
  `academy_id` int(255) DEFAULT NULL COMMENT '学院ID',
  `created_at` datetime DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
