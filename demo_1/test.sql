# Host: localhost  (Version: 5.5.53)
# Date: 2020-08-28 22:00:14
# Generator: MySQL-Front 5.3  (Build 4.234)

/*!40101 SET NAMES gb2312 */;

#
# Structure for table "user"
#

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT 'zwh',
  `password` varchar(11) DEFAULT '123456',
  `tel` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

#
# Data for table "user"
#

/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (10,'rr','1111','745236665'),(11,'1233','7:627363)','63626:737282'),(12,'zwh','999','15626866041'),(13,'12306','111111','123646797');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
