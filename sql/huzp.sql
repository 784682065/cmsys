/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50718
Source Host           : localhost:3306
Source Database       : huzp

Target Server Type    : MYSQL
Target Server Version : 50718
File Encoding         : 65001

Date: 2018-04-11 14:28:51
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cmapply
-- ----------------------------
INSERT INTO `cmapply` VALUES ('1', '申请个人社团', 'C语言', '我是本校计算机学院院的一名学生，因为热爱大学生活，热爱学生活动，希望通过组织社团为我校的学生社团活动发展贡献自己一份微薄之力，也想更好的为在校喜欢吉他的同学服务并在此过程中锻炼自己的综合素质。于是向校学生递交此社团申请书。', 'C语言是一门通用计算机编程语言，应用广泛。C语言的设计目标是提供一种能以简易的方式编译、处理低级存储器、产生少量的机器码以及不需要任何运行环境支持便能运行的编程语言。\r\n尽管C语言提供了许多低级处理的功能，但仍然保持着良好跨平台的特性，以一个标准规格写出的C语言程序可在许多电脑平台上进行编译，甚至包含一些嵌入式处理器（单片机或称MCU）以及超级电脑等作业平台。', '2014014567', '2018-04-09 14:13:55', '1', 'NOTDECIDE', null);

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
INSERT INTO `community` VALUES ('5', 'javaplus', '比刚哥的社团好                                        ', '2014014534', '2018-04-08 14:27:08', '比他会开发');

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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of file
-- ----------------------------
INSERT INTO `file` VALUES ('1', '浙公院宁波分院_2018-3-23_胡泽鹏_工作周报.doc', 'E://test//2014014597//', '69.50KB', '2018-04-10 18:27:42', '2014014597');
INSERT INTO `file` VALUES ('2', '短信系统接口文档v1.2.docx', 'E://test//2014014597//', '19.84KB', '2018-04-10 18:27:54', '2014014597');

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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of inform
-- ----------------------------
INSERT INTO `inform` VALUES ('1', '1', '浙江万里学院“一带一路”人才培养创新平台揭牌仪式与中德设计与传播学院成立仪式成功举行', '宁波市外事办副主任徐平元，宁波市教育局副局长胡赤弟，宁波市鄞州区常委、组织部长陈杰农，鄞州区人才办副主任赵永，浙江省万里教育集团董事长应雄、副总裁林良富、吕洁，德国汉堡设计与传播应用科学大学校长单凡，北师大珠海校区德方教学主管Stefan Waller先生，浙江万里学院校长应敏、副校长钱国英以及相关学院、部门负责人等参加了成立仪式。', '0', '2014014597', '2018-04-09 14:16:15');
INSERT INTO `inform` VALUES ('2', '2', 'java社团第一次活动', 'java 编程大赛活动第一次', '3', '2014014508', '2018-04-10 09:42:46');
INSERT INTO `inform` VALUES ('3', '2', '关于开展与动漫社联谊', '请全体社团成员无比到场！', '3', '2014014508', '2018-04-10 18:15:52');
INSERT INTO `inform` VALUES ('4', '2', '与XX大学java社团交流技术', '希望大家都到场学习高端技术，体验大神如何写代码！', '3', '2014014508', '2018-04-10 18:16:57');
INSERT INTO `inform` VALUES ('5', '2', 'java编程第二次大赛', '上一届胡泽鹏同学获得胜利，这一次希望大家加油！', '3', '2014014508', '2018-04-10 18:17:41');
INSERT INTO `inform` VALUES ('6', '2', 'javaPlus招新活动开始了', '希望观望的同学踊跃报名！', '5', '2014014534', '2018-04-10 18:20:07');
INSERT INTO `inform` VALUES ('7', '1', '浙江万里学院校友会成立大会暨第一次校友代表大会成功举行', '昔日共赴甬城之畔头顶万里蓝天，今朝重逢巍巍学府再续手足情深。3月31日下午，浙江万里学院校友会成立大会暨第一次校友会在浙江万里学院钱湖校区成功举行。\n来自杭州、宁波、温州、绍兴、湖州、嘉兴、金华、衢州、台州、丽水、舟山等地的近200位校友相聚万里，一起回首、一起展望、一起畅想，共同见证母校建设发展的新篇章。', '0', '2014014597', '2018-04-10 18:21:09');
INSERT INTO `inform` VALUES ('8', '1', '我校继续深入学习党的十九大精神暨新一期党校培训班开班', '简短而隆重的开班仪式后，蒋建军以《新时代、新气象、新作为——学习党的十九大精神》为题做了培训第一课，蒋建军以中国共产党人的初心和使命为切入点，为广大党校学员深刻阐释了中国特色社会主义进入新时代的历史依据和重大意义，新时代中国共产党的历史使命、指导思想和战略安排，以及新时代中国特色社会主义发展经济、政治、文化、社会等九个方面的工作部署。', '0', '2014014597', '2018-04-10 18:21:54');
INSERT INTO `inform` VALUES ('9', '2', '近日将于java社团比赛', '一起举办一场编程大赛。', '5', '2014014534', '2018-04-10 18:23:48');
INSERT INTO `inform` VALUES ('10', '1', '《甬派》中德设计与传播学院宁波成立 每年招270名本科生', '记者还了解到，这个新成立的“一带一路”人才培养创新平台下设中东欧文化与传播中心、经贸教育国际中心、工业设计与大数据技术中心，在语言文化、经贸金融、设计与传播、大数据应用与创新等领域，与中东欧国家高校和多部门协同共建人才培养机制，优化国际化应用型人才培养路径，打造订单式、项目式等多模态、多形式培养模式，通过开展短期交流、双学位、升硕等多层次合作项目，培养一大批既懂得对方语言又了解对方文化的国际化复合型应用人才。', '0', '2014014597', '2018-04-10 18:24:56');
INSERT INTO `inform` VALUES ('11', '1', '2018年“创青春—挑战杯”大学生创业计划竞赛校内决赛成功举行', '近日，由校团委主办，校学生会承办的2018年“创青春—挑战杯”大学生创业计划竞赛校内决赛成功举行。来自上海、杭州、宁波三地的六位嘉宾担任本次决赛的评委。经决赛评审，共评选出特等奖1项，一等奖3项，二等奖6项，三等奖8项，优胜奖25项，特别贡献奖2项，优秀组织奖2项，鼓励奖1项。学校将三等奖及以上共18件作品推选进入省级竞赛。', '0', '2014014597', '2018-04-10 18:26:27');
INSERT INTO `inform` VALUES ('12', '1', 'javaPlus社团创建了，大家踊跃参加', 'javaPlus社团据说比java社团更好哦', '0', '2014014597', '2018-04-10 18:27:09');

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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of mail
-- ----------------------------
INSERT INTO `mail` VALUES ('1', '申请', '我想申请java社团！！！', '0', '2018-04-11 14:20:16', '2014014534', '2014014597');
INSERT INTO `mail` VALUES ('2', '关于活动开展你怎么看', '我觉得还行', '1', '2018-04-11 14:20:43', '2014014534', '2014014597');
INSERT INTO `mail` VALUES ('3', '审核还未通过', '务必请快速审核', '1', '2018-04-11 14:21:19', '2014014567', '2014014597');
INSERT INTO `mail` VALUES ('4', '正在商讨', '商量讨论ing', '1', '2018-04-11 14:23:28', '2014014597', '2014014534');
INSERT INTO `mail` VALUES ('5', '审核给与通过', '请尽快完善信息', '1', '2018-04-11 14:23:51', '2014014597', '2014014537');
INSERT INTO `mail` VALUES ('6', '仍在讨论', '稍安勿躁', '1', '2018-04-11 14:24:14', '2014014597', '2014014567');
INSERT INTO `mail` VALUES ('7', '社团活动开展的非常不错', '请继续加油！', '1', '2018-04-11 14:24:47', '2014014597', '2014014508');
INSERT INTO `mail` VALUES ('8', '记得开展活动', '活动才是维持一个社团的根本！', '1', '2018-04-11 14:25:24', '2014014597', '2014014534');
INSERT INTO `mail` VALUES ('9', '在修改下材料', '你提交的材料不够完整，修改完在来申请', '1', '2018-04-11 14:25:53', '2014014597', '2014014567');
INSERT INTO `mail` VALUES ('10', '有事情想请教', '有些社员根本不愿意听我的言论怎么办', '1', '2018-04-11 14:26:34', '2014014508', '2014014597');
INSERT INTO `mail` VALUES ('11', '春天来了', '春暖花开的清明时分。在这个时节里结队出游，在凭吊先人的同时，感受春天气息。在郊野中荡秋千、放风筝、拔河、斗鸡、戴柳、斗草、打球等，心情被放飞得不想回转，快乐也渐渐从脸上溢满内心。', '1', '2018-04-11 14:27:18', '2014014508', '2014014597');
INSERT INTO `mail` VALUES ('12', '踏青', '　掬一泓清泉，清醒神经，融化心灵，准备旅行；摘一片云彩，抹亮心灵，装点心灵，开始旅行；捡一片红叶，快乐心情，燃烧心灵，享受旅行。抹去冬季的沧桑，换来春季的开放。像白色的天使，挥挥翅膀，抖落点点尘埃，这就是春天的足迹。', '1', '2018-04-11 14:27:39', '2014014508', '2014014597');

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
  `phone` varchar(13) DEFAULT NULL COMMENT '用户电话',
  `birth` date DEFAULT NULL COMMENT '用户生日',
  `createtime` datetime DEFAULT NULL COMMENT '用户创建时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', '2014014597', '1', '胡泽鹏', '1', '', '计算机143', '10086', 'admin@163.com', '13676520623', '1996-07-27', '2018-01-29 14:15:33');
INSERT INTO `user` VALUES ('2', '2014014567', '1', '徐世杰', '1', null, '计算机143', '10000', 'test@163.com', '13676520624', '2018-01-29', '2018-01-29 14:15:58');
INSERT INTO `user` VALUES ('3', '2014014508', '1', '何志钢', '1', null, '计算机143', '10001', 'test@163.com', '13676520627', '2018-03-07', '2018-03-07 14:08:08');
INSERT INTO `user` VALUES ('4', '2014014534', '1', '刘天承', '1', null, '计算机143', '10001', 'test@123.com', '13676520626', '2018-02-26', '2018-03-26 14:29:55');
INSERT INTO `user` VALUES ('5', '2014014533', '1', '老刘的妹妹', '2', null, '计算机143', '10000', 'test@qq.com', '13676520627', '2018-03-26', '2018-03-26 14:53:10');
