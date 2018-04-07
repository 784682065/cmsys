/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50720
Source Host           : localhost:3306
Source Database       : huzp

Target Server Type    : MYSQL
Target Server Version : 50720
File Encoding         : 65001

Date: 2018-04-07 22:30:16
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for cmapply
-- ----------------------------
DROP TABLE IF EXISTS `cmapply`;
CREATE TABLE `cmapply` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) DEFAULT NULL COMMENT '申请类型',
  `cmname` varchar(255) DEFAULT NULL COMMENT '社团名字',
  `applyreason` varchar(255) DEFAULT NULL COMMENT '申请理由',
  `cmdirection` varchar(255) DEFAULT NULL COMMENT '申请社团为社团方向,申请加入为奋斗目标',
  `applicant` int(10) DEFAULT NULL COMMENT '申请人',
  `createtime` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `status` int(2) DEFAULT NULL COMMENT '审查状态',
  `sign` varchar(255) DEFAULT NULL COMMENT '是否通过标记SUCCESS,FAILURE,NOTDECIDE',
  `receiever` int(11) DEFAULT NULL COMMENT '接收人',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cmapply
-- ----------------------------
INSERT INTO `cmapply` VALUES ('10', '申请个人社团', 'java', '测试                                        ', '开发                                        ', '2014014508', '2018-03-26 13:26:17', '0', 'SUCCESS', '2014014597');
INSERT INTO `cmapply` VALUES ('13', '申请个人社团', 'java11', '12313                                        ', '13123                                        ', '2014014508', '2018-03-26 13:26:20', '0', 'NOTDECIDE', '2014014597');
INSERT INTO `cmapply` VALUES ('14', '申请个人社团', '彭爸爸社团', '1                                        ', '1                                        ', '2014014508', '2018-03-26 13:26:24', '0', 'SUCCESS', '2014014597');
INSERT INTO `cmapply` VALUES ('15', '申请个人社团', 'java', '1                                        ', '1                                        ', '2014014597', '2018-04-07 19:06:19', '0', 'NOTDECIDE', '2014014597');
INSERT INTO `cmapply` VALUES ('16', '申请个人社团', '1', '                                        1', '                      1                  ', '2014014597', '2018-03-26 13:26:31', '1', 'NOTDECIDE', '2014014597');
INSERT INTO `cmapply` VALUES ('17', '申请个人社团', '6', '                                        6', '                                        6', '2014014597', '2018-03-26 13:26:35', '1', 'NOTDECIDE', '2014014597');
INSERT INTO `cmapply` VALUES ('18', '申请个人社团', '7', '                                        7', '                                        7', '2014014597', '2018-04-07 19:07:30', '0', 'NOTDECIDE', '2014014597');
INSERT INTO `cmapply` VALUES ('23', '申请加入社团', 'java', '很想加入', '1                                        ', '2014014567', '2018-03-27 10:17:52', '0', 'SUCCESS', '2014014508');
INSERT INTO `cmapply` VALUES ('25', '申请个人社团', 'javap', '刚狗是够                                        ', '1                                        ', '2014014534', '2018-03-26 14:44:55', '0', 'SUCCESS', '2014014597');
INSERT INTO `cmapply` VALUES ('26', '申请加入社团', 'javaplus', '加入老刘社团', '1                                        ', '2014014533', '2018-03-26 15:04:37', '0', 'FAILUR', '2014014534');
INSERT INTO `cmapply` VALUES ('27', '申请加入社团', 'javaplus', '这次加入', '加入成功                                        ', '2014014533', '2018-03-26 15:18:48', '0', 'SUCCESS', '2014014534');
INSERT INTO `cmapply` VALUES ('28', '申请加入社团', 'javaplus', '报错', '不抱错                                        ', '2014014533', '2018-03-26 15:22:00', '0', 'SUCCESS', '2014014534');
INSERT INTO `cmapply` VALUES ('31', '申请加入社团', 'javaplus', '                                        1', '                                        1', '2014014508', '2018-03-27 10:47:09', '0', 'SUCCESS', '2014014534');
INSERT INTO `cmapply` VALUES ('34', '申请加入社团', 'java', '                               453         ', '463435                                        ', '2014014534', '2018-04-07 19:09:25', '0', 'NOTDECIDE', '2014014508');

-- ----------------------------
-- Table structure for community
-- ----------------------------
DROP TABLE IF EXISTS `community`;
CREATE TABLE `community` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cmname` varchar(255) DEFAULT NULL COMMENT '社团名字',
  `cmdirection` varchar(255) DEFAULT NULL COMMENT '社团方向',
  `createuser` int(11) DEFAULT NULL COMMENT '创建者',
  `createtime` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `applyreason` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of community
-- ----------------------------
INSERT INTO `community` VALUES ('3', 'java', '开发                                        ', '2014014508', '2018-03-27 13:01:34', '开发                                        ');
INSERT INTO `community` VALUES ('5', 'javaplus', '比刚狗的社团好                                        ', '2014014534', '2018-03-27 11:06:51', '刚狗是条狗');

-- ----------------------------
-- Table structure for communitymember
-- ----------------------------
DROP TABLE IF EXISTS `communitymember`;
CREATE TABLE `communitymember` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` int(11) DEFAULT NULL,
  `communityid` int(11) DEFAULT NULL,
  `communityposition` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of communitymember
-- ----------------------------
INSERT INTO `communitymember` VALUES ('1', '2014014508', '3', '1');
INSERT INTO `communitymember` VALUES ('6', '2014014533', '5', '2');
INSERT INTO `communitymember` VALUES ('13', '2014014534', '5', '1');

-- ----------------------------
-- Table structure for dept
-- ----------------------------
DROP TABLE IF EXISTS `dept`;
CREATE TABLE `dept` (
  `id` int(5) NOT NULL COMMENT '部门号',
  `dept_name` varchar(255) NOT NULL COMMENT '部门名字',
  `bak1` varchar(255) DEFAULT NULL,
  `bak2` varchar(255) DEFAULT NULL,
  `bak3` varchar(255) DEFAULT NULL,
  `bak4` varchar(255) DEFAULT NULL,
  `bak5` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dept
-- ----------------------------
INSERT INTO `dept` VALUES ('10086', '电子游戏社', null, null, null, null, null);

-- ----------------------------
-- Table structure for file
-- ----------------------------
DROP TABLE IF EXISTS `file`;
CREATE TABLE `file` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '文件id',
  `filename` varchar(255) DEFAULT NULL COMMENT '文件名字',
  `filepath` varchar(255) DEFAULT NULL COMMENT '文件路径',
  `filecap` varchar(255) DEFAULT NULL COMMENT '文件大小',
  `createtime` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '文件创建时间',
  `username` int(15) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of file
-- ----------------------------
INSERT INTO `file` VALUES ('38', '新建文本文档1519802268849.txt', 'E://test//2014014567//', '0.10KB', '2018-02-28 15:17:49', '2014014567');
INSERT INTO `file` VALUES ('39', '新建文本文档.txt', 'E://test//2014014597//', '0.04KB', '2018-03-07 13:06:25', '2014014597');
INSERT INTO `file` VALUES ('40', '新建文本文档.txt', 'E://test//2014014508//', '0.04KB', '2018-03-07 17:13:52', '2014014508');
INSERT INTO `file` VALUES ('41', '电子与计算机学院毕业设计作品答辩报名表.docx', 'E://test//2014014567//', '12.91KB', '2018-04-07 16:57:46', '2014014567');
INSERT INTO `file` VALUES ('42', '电子与计算机学院毕业设计作品说明书格式模版.doc', 'E://test//2014014567//', '45.50KB', '2018-04-07 17:27:59', '2014014567');

-- ----------------------------
-- Table structure for inform
-- ----------------------------
DROP TABLE IF EXISTS `inform`;
CREATE TABLE `inform` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `informType` int(2) DEFAULT NULL,
  `informTitle` varchar(100) DEFAULT NULL,
  `informContent` varchar(255) DEFAULT NULL,
  `cmid` int(10) DEFAULT NULL,
  `createuser` int(11) DEFAULT NULL,
  `createtime` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of inform
-- ----------------------------
INSERT INTO `inform` VALUES ('2', '1', '通知', '通知1', '3', '2014014597', '2018-03-27 22:05:57');
INSERT INTO `inform` VALUES ('3', '2', '活动1', '活动1', '3', '2014014508', '2018-03-27 16:41:46');
INSERT INTO `inform` VALUES ('4', '2', '活动2', '活动2', '3', '2014014508', '2018-03-27 17:00:16');
INSERT INTO `inform` VALUES ('5', '2', '活动3', '3333', '3', '2014014508', '2018-03-27 17:03:03');
INSERT INTO `inform` VALUES ('6', '2', '活动4', '444444', '3', '2014014508', '2018-03-27 17:05:07');
INSERT INTO `inform` VALUES ('7', '2', '活动5', '5555', '3', '2014014508', '2018-03-27 17:06:34');
INSERT INTO `inform` VALUES ('8', '2', '6', '66666', '3', '2014014508', '2018-03-27 17:07:39');
INSERT INTO `inform` VALUES ('9', '2', '777777777777', '777777777777777', '3', '2014014508', '2018-03-27 17:10:02');
INSERT INTO `inform` VALUES ('10', '2', '8888888888', '888888888888888', '3', '2014014508', '2018-03-27 17:10:55');
INSERT INTO `inform` VALUES ('11', '2', '99999999999', '99999999999999', '3', '2014014508', '2018-03-27 17:12:28');
INSERT INTO `inform` VALUES ('12', '2', '101010101010', '101', '3', '2014014508', '2018-03-27 17:20:06');
INSERT INTO `inform` VALUES ('13', '2', '活动1111111111', '哦考虑市场的哈里斯客户端来看1111111111111111111111111111', '3', '2014014508', '2018-03-27 17:30:36');
INSERT INTO `inform` VALUES ('14', '2', '1312312312', '31231231231', '3', '2014014508', '2018-03-27 17:43:00');
INSERT INTO `inform` VALUES ('15', '2', '13123123', '123123123', '3', '2014014508', '2018-03-27 17:45:05');
INSERT INTO `inform` VALUES ('16', '1', '通知1', '通知111111111', '0', '2014014597', '2018-03-27 22:04:38');
INSERT INTO `inform` VALUES ('17', '1', '通知2', '222222222222222', '0', '2014014597', '2018-03-27 22:04:37');
INSERT INTO `inform` VALUES ('18', '1', '3', '3', '0', '2014014597', '2018-03-27 22:02:21');
INSERT INTO `inform` VALUES ('19', '1', '4', '4', '0', '2014014597', '2018-03-27 22:03:50');
INSERT INTO `inform` VALUES ('20', '1', '6', '6', '0', '2014014597', '2018-03-27 22:08:40');
INSERT INTO `inform` VALUES ('21', '1', '13123123131', '13123131313', '0', '2014014597', '2018-03-27 23:27:06');
INSERT INTO `inform` VALUES ('22', '2', '1', '1', '3', '2014014508', '2018-03-28 19:49:08');

-- ----------------------------
-- Table structure for mail
-- ----------------------------
DROP TABLE IF EXISTS `mail`;
CREATE TABLE `mail` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '邮件序号',
  `title` varchar(50) DEFAULT NULL COMMENT '邮件标题',
  `contents` varchar(255) DEFAULT NULL COMMENT '邮件内容',
  `status` int(2) DEFAULT NULL,
  `senddata` datetime DEFAULT NULL,
  `createuser` int(15) DEFAULT NULL COMMENT '邮件创建者',
  `sendee` int(15) DEFAULT NULL COMMENT '邮件接收人',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of mail
-- ----------------------------
INSERT INTO `mail` VALUES ('20', '1', '113', '0', '2018-03-07 16:35:47', '2014014508', '2014014597');
INSERT INTO `mail` VALUES ('22', '测试', '测试12111111111', '0', '2018-04-07 16:58:34', '2014014567', '2014014597');
INSERT INTO `mail` VALUES ('23', '1`1', '1', '0', '2018-04-07 17:24:25', '2014014597', '2014014567');
INSERT INTO `mail` VALUES ('24', '6546354', '465', '1', '2018-04-07 17:25:55', '2014014567', '2014014597');
INSERT INTO `mail` VALUES ('25', '1111', '12132132', '0', '2018-04-07 19:03:40', '2014014567', '2014014597');

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu` (
  `id` int(11) NOT NULL COMMENT '菜单id',
  `code` varchar(255) DEFAULT NULL COMMENT '菜单代码',
  `pcode` varchar(255) DEFAULT NULL COMMENT '菜单父代码',
  `pcodes` varchar(255) DEFAULT NULL COMMENT '当前菜单的所有父菜单编号',
  `name` varchar(255) DEFAULT NULL COMMENT '菜单名称',
  `icon` varchar(255) DEFAULT NULL COMMENT '菜单图标',
  `url` varchar(255) DEFAULT NULL COMMENT '菜单url',
  `num` decimal(32,0) DEFAULT NULL COMMENT '菜单排序号',
  `levels` decimal(32,0) DEFAULT NULL COMMENT '菜单层级',
  `ismenu` decimal(11,0) DEFAULT NULL COMMENT '是否是菜单（1：是  0：不是）',
  `tips` varchar(255) DEFAULT NULL COMMENT '备注',
  `status` varchar(255) DEFAULT NULL COMMENT '菜单状态 :  1:启用   0:不启用',
  `isopen` varchar(255) DEFAULT NULL COMMENT '是否打开:    1:打开   0:不打开',
  `bak1` varchar(255) DEFAULT NULL,
  `bak2` varchar(255) DEFAULT NULL,
  `bak3` varchar(255) DEFAULT NULL,
  `bak4` varchar(255) DEFAULT NULL,
  `bak5` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of menu
-- ----------------------------
INSERT INTO `menu` VALUES ('10001', 'admin', '0', '[0],', '管理员菜单', null, '/admin', '1', '1', '1', null, '1', '', null, null, null, null, null);
INSERT INTO `menu` VALUES ('10002', 'general', '0', '[0],', '社团管理菜单', null, '/general', '2', '1', '1', null, '1', null, null, null, null, null, null);
INSERT INTO `menu` VALUES ('10003', 'magapply', 'admin', '[0],[admin],', '管理社团申请', null, '/magapply', '1', '2', '1', null, '1', null, null, null, null, null, null);
INSERT INTO `menu` VALUES ('10004', 'createcm', 'general', '[0],[general],', '申请个人社团', null, '/createcm', '1', '2', '1', null, '1', null, null, null, null, null, null);
INSERT INTO `menu` VALUES ('10005', 'notices', 'admin', '[0],[admin],', '发布通知', null, '/notices', '2', '2', '1', null, '1', null, null, null, null, null, null);
INSERT INTO `menu` VALUES ('10006', 'mycm', 'general', '[0],[general],', '我的社团', null, '/mycm', '3', '2', '1', null, '1', null, null, null, null, null, null);
INSERT INTO `menu` VALUES ('10007', 'file', '0', '[0],', '文件管理菜单', null, '/file', '3', '1', '1', null, '1', null, null, null, null, null, null);
INSERT INTO `menu` VALUES ('10009', 'filedownload', 'file', '[0],[file]', '文件上传与下载', null, '/fileupanddownload', '1', '2', '1', null, '1', null, null, null, null, null, null);
INSERT INTO `menu` VALUES ('10010', 'mail', '0', '[0],', '邮件管理菜单', null, '/mail', '4', '1', '1', null, '1', null, null, null, null, null, null);
INSERT INTO `menu` VALUES ('10011', 'checkmail', 'mail', '[0],[mail]', '查看邮件', null, '/checkmail', '1', '2', '1', null, '1', null, null, null, null, null, null);
INSERT INTO `menu` VALUES ('10012', 'editmail', 'mail', '[0],[mail]', '写邮件', null, '/editmail', '2', '2', '1', '', '1', null, null, null, null, null, null);
INSERT INTO `menu` VALUES ('10013', 'outbox', 'mail', '[0],[mail]', '发件箱', null, '/outbox', '3', '2', '1', null, '1', null, null, null, null, null, null);
INSERT INTO `menu` VALUES ('10014', 'applyjoin', 'general', '[0],[general]', '申请加入社团', null, '/applyjoin', '2', '2', '1', null, '1', null, null, null, null, null, null);
INSERT INTO `menu` VALUES ('10015', 'magmy', 'general', '[0],[general],', '管理我的社团申请', null, '/magmy', '4', '2', '1', null, '1', null, null, null, null, null, null);
INSERT INTO `menu` VALUES ('10016', 'allinform', 'general', '[0],[general],', '活动与通知', null, '/allinform', '5', '2', '1', null, '1', null, null, null, null, null, null);

-- ----------------------------
-- Table structure for permissions
-- ----------------------------
DROP TABLE IF EXISTS `permissions`;
CREATE TABLE `permissions` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `permission` varchar(255) DEFAULT NULL COMMENT '权限',
  `roleid` int(255) DEFAULT NULL COMMENT '角色id',
  `permissionname` varchar(255) DEFAULT NULL COMMENT '权限中文名字',
  `BAK2` varchar(255) DEFAULT NULL,
  `BAK3` varchar(255) DEFAULT NULL,
  `BAK4` varchar(255) DEFAULT NULL,
  `BAK5` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of permissions
-- ----------------------------
INSERT INTO `permissions` VALUES ('1', 'add', '10086', '添加用户', null, null, null, null);
INSERT INTO `permissions` VALUES ('2', 'del', '10086', '删除用户', null, null, null, null);

-- ----------------------------
-- Table structure for position
-- ----------------------------
DROP TABLE IF EXISTS `position`;
CREATE TABLE `position` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `position` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of position
-- ----------------------------
INSERT INTO `position` VALUES ('1', '社长');
INSERT INTO `position` VALUES ('2', '普通社员');

-- ----------------------------
-- Table structure for relation
-- ----------------------------
DROP TABLE IF EXISTS `relation`;
CREATE TABLE `relation` (
  `id` int(5) NOT NULL COMMENT '关联id',
  `menuid` int(5) DEFAULT NULL COMMENT '菜单id',
  `roleid` int(5) DEFAULT NULL COMMENT '角色id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of relation
-- ----------------------------
INSERT INTO `relation` VALUES ('1', '10001', '10086');
INSERT INTO `relation` VALUES ('2', '10002', '10086');
INSERT INTO `relation` VALUES ('3', '10002', '10000');
INSERT INTO `relation` VALUES ('4', '10003', '10086');
INSERT INTO `relation` VALUES ('5', '10004', '10086');
INSERT INTO `relation` VALUES ('6', '10004', '10000');
INSERT INTO `relation` VALUES ('7', '10005', '10086');
INSERT INTO `relation` VALUES ('8', '10006', '10086');
INSERT INTO `relation` VALUES ('9', '10006', '10000');
INSERT INTO `relation` VALUES ('10', '10007', '10086');
INSERT INTO `relation` VALUES ('11', '10007', '10000');
INSERT INTO `relation` VALUES ('12', '10008', '10086');
INSERT INTO `relation` VALUES ('13', '10008', '10000');
INSERT INTO `relation` VALUES ('14', '10009', '10086');
INSERT INTO `relation` VALUES ('15', '10009', '10000');
INSERT INTO `relation` VALUES ('16', '10010', '10000');
INSERT INTO `relation` VALUES ('17', '10010', '10086');
INSERT INTO `relation` VALUES ('18', '10011', '10000');
INSERT INTO `relation` VALUES ('19', '10012', '10086');
INSERT INTO `relation` VALUES ('20', '10011', '10086');
INSERT INTO `relation` VALUES ('21', '10012', '10000');
INSERT INTO `relation` VALUES ('22', '10013', '10086');
INSERT INTO `relation` VALUES ('23', '10013', '10000');
INSERT INTO `relation` VALUES ('24', '10002', '10001');
INSERT INTO `relation` VALUES ('25', '10004', '10001');
INSERT INTO `relation` VALUES ('26', '10006', '10001');
INSERT INTO `relation` VALUES ('27', '10007', '10001');
INSERT INTO `relation` VALUES ('28', '10009', '10001');
INSERT INTO `relation` VALUES ('29', '10010', '10001');
INSERT INTO `relation` VALUES ('30', '10011', '10001');
INSERT INTO `relation` VALUES ('31', '10012', '10001');
INSERT INTO `relation` VALUES ('32', '10013', '10001');
INSERT INTO `relation` VALUES ('33', '10014', '10001');
INSERT INTO `relation` VALUES ('34', '10014', '10086');
INSERT INTO `relation` VALUES ('35', '10014', '10000');
INSERT INTO `relation` VALUES ('36', '10015', '10001');
INSERT INTO `relation` VALUES ('37', '10015', '10086');
INSERT INTO `relation` VALUES ('38', '10016', '10000');
INSERT INTO `relation` VALUES ('39', '10016', '10001');
INSERT INTO `relation` VALUES ('40', '10016', '10086');

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `roleid` int(5) NOT NULL COMMENT '角色id',
  `rolename` varchar(255) DEFAULT NULL COMMENT '角色名字',
  `deptid` int(5) DEFAULT NULL COMMENT '角色对应的部门id',
  `bak1` varchar(255) DEFAULT NULL,
  `bak2` varchar(255) DEFAULT NULL,
  `bak3` varchar(255) DEFAULT NULL,
  `bak4` varchar(255) DEFAULT NULL,
  `bak5` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`roleid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES ('10000', '普通成员', '10086', null, null, null, null, null);
INSERT INTO `role` VALUES ('10001', '社长', '10086', null, null, null, null, null);
INSERT INTO `role` VALUES ('10086', '超级管理员', '10086', null, null, null, null, null);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(15) NOT NULL AUTO_INCREMENT COMMENT '用户id自动生成',
  `username` int(15) NOT NULL COMMENT '登录账户',
  `password` varchar(16) NOT NULL COMMENT '用户密码',
  `personname` varchar(50) NOT NULL COMMENT '用户名字',
  `sex` int(2) NOT NULL COMMENT '用户性别',
  `salt` varchar(50) DEFAULT NULL COMMENT '密码加盐',
  `dept` varchar(255) DEFAULT NULL COMMENT '部门号',
  `role` varchar(50) DEFAULT NULL COMMENT '角色号',
  `email` varchar(50) DEFAULT NULL COMMENT '用户邮箱',
  `phone` int(13) DEFAULT NULL COMMENT '用户电话',
  `birth` date DEFAULT NULL COMMENT '用户生日',
  `createtime` datetime DEFAULT NULL COMMENT '用户创建时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', '2014014597', '1', '胡泽鹏', '1', '', '计算机143', '10086', 'admin@163.com', '1367652060', '1996-07-27', '2018-01-29 14:15:33');
INSERT INTO `user` VALUES ('2', '2014014567', '1', '徐世杰', '1', null, '计算机143', '10000', 'test@163.com', '1111111111', '2018-01-29', '2018-01-29 14:15:58');
INSERT INTO `user` VALUES ('3', '2014014508', '1', '何志钢', '1', null, '计算机143', '10001', 'test@163.com', '1367652062', '2018-03-07', '2018-03-07 14:08:08');
INSERT INTO `user` VALUES ('4', '2014014534', '1', '刘天承', '1', null, '计算机143', '10001', 'test@123.com', '1784512369', '2018-02-26', '2018-03-26 14:29:55');
INSERT INTO `user` VALUES ('5', '2014014533', '1', '老刘的妹妹', '2', null, '计算机143', '10000', 'test@qq.com', '1785555666', '2018-03-26', '2018-03-26 14:53:10');
