CREATE DATABASE  IF NOT EXISTS `myblog` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `myblog`;
-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: myblog
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `aboutme`
--

DROP TABLE IF EXISTS `aboutme`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aboutme` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL COMMENT '标题',
  `content` text NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aboutme`
--

LOCK TABLES `aboutme` WRITE;
/*!40000 ALTER TABLE `aboutme` DISABLE KEYS */;
INSERT INTO `aboutme` VALUES (1,'关于我的自我介绍','<p style=\"text-align: left;\"><br></p><h3 style=\"text-align: left;\"><span style=\"font-size: 24px;\">目前可以公开的情报</span></h3><ul><li style=\"text-align: left;\"><span style=\"color: rgb(235, 144, 58);\">M E：已经是社畜了QAQ</span></li><li style=\"text-align: left;\">目标：做最酷的自己</li><li style=\"text-align: left;\">特征：兴趣至上</li><li style=\"text-align: left;\">爱好：写Bug、打游戏、看动漫</li><li style=\"text-align: left;\">性格：不喜约束、比较自私、偶尔emo</li></ul><h3 style=\"text-align: left;\"><span style=\"font-size: 24px;\">我 &amp; 博客</span></h3><p style=\"text-align: left;\"><br></p>',1);
/*!40000 ALTER TABLE `aboutme` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `article`
--

DROP TABLE IF EXISTS `article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `article` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '文章ID',
  `title` varchar(100) NOT NULL COMMENT '文章标题',
  `content` longtext NOT NULL COMMENT '文章正文',
  `is_published` int NOT NULL DEFAULT '0' COMMENT '公开或私密 1-代表公开  0-代表私密',
  `created_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间 ',
  `user_id` int NOT NULL COMMENT '文章作者',
  `category_id` int NOT NULL COMMENT '文章分类id',
  `picture` varchar(255) DEFAULT NULL COMMENT '图片',
  `introduce` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `category_id_idx` (`category_id`),
  CONSTRAINT `fk_category_id` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article`
--

LOCK TABLES `article` WRITE;
/*!40000 ALTER TABLE `article` DISABLE KEYS */;
INSERT INTO `article` VALUES (7,'文章4','<p>123456</p>',1,'2023-07-24 14:50:01','2023-07-31 17:39:15',1,1,'\\uploads\\d79223ac31f6219c8c69cb69559f0666','null'),(10,'文章5','<p>123456</p>',1,'2023-07-24 16:04:33','2023-07-24 16:04:33',1,1,'\\uploads\\2d532e40be6c469b6e19ce2a2be55ce5','null'),(11,'vue','<p>qwewdsadaswdsasdasdwd</p>',0,'2023-07-27 17:38:36','2023-07-27 17:38:36',1,1,'\\uploads\\0078ce30554869bb41f2bac2de891843','vue'),(12,'testt','<p>dasdasawdaqd</p>',0,'2023-07-27 17:41:22','2023-07-27 17:41:22',1,3,'\\uploads\\137f76995a113c5d43ac00433bf79df4','dawdad'),(15,'vyue','<p>sdsasdassdsadasd</p>',0,'2023-07-29 14:59:35','2023-07-29 15:51:07',1,1,'\\uploads\\a0d773d2d554d0b06abe3b2bb74ed86c','sdasdasd'),(16,'asdasd','<p>sdasdasd</p>',1,'2023-07-29 15:48:33','2023-07-31 17:36:37',1,2,'\\uploads\\75b27dd688302f14c5198caa61fc24f4','sadasdasd'),(17,'test','test',0,'2023-08-03 23:07:53','2023-08-03 23:07:53',1,1,NULL,NULL),(18,'test','test',0,'2023-08-03 23:44:40','2023-08-03 23:44:40',1,1,NULL,NULL),(19,'test','test',0,'2023-08-03 23:47:29','2023-08-03 23:47:29',1,1,NULL,NULL),(20,'test','test',0,'2023-08-03 23:47:50','2023-08-03 23:47:50',1,1,NULL,NULL),(21,'sadasd','<p>sad</p>',0,'2023-08-04 20:49:36','2023-08-04 20:49:36',1,2,NULL,'sadasd'),(22,'sadsad','<p>sadasd</p>',0,'2023-08-04 20:56:38','2023-08-04 20:56:38',1,2,NULL,'saadsad'),(23,'addasdas','<p><br></p>',0,'2023-08-04 20:57:28','2023-08-04 20:57:28',1,2,NULL,'dsadasd'),(24,'asdsadass','<p><br></p>',0,'2023-08-04 21:02:28','2023-08-04 21:02:28',1,1,'null','sadasdas');
/*!40000 ALTER TABLE `article` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `article_tag`
--

DROP TABLE IF EXISTS `article_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `article_tag` (
  `id` int NOT NULL AUTO_INCREMENT,
  `article_id` int NOT NULL,
  `tag_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_article_id_idx` (`article_id`),
  KEY `fk_tag_id_idx` (`tag_id`),
  CONSTRAINT `fk_article_id` FOREIGN KEY (`article_id`) REFERENCES `article` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_tag_id` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='文章标签关联表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article_tag`
--

LOCK TABLES `article_tag` WRITE;
/*!40000 ALTER TABLE `article_tag` DISABLE KEYS */;
INSERT INTO `article_tag` VALUES (25,16,7),(26,16,8),(27,10,7),(28,7,8);
/*!40000 ALTER TABLE `article_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '文章分类id',
  `category_name` varchar(255) NOT NULL COMMENT '文章分类名字',
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'前端知识点',1),(2,'数据结构',1),(3,'test1',1),(4,'test2',1),(7,'test3',1),(8,'tset10',1),(9,'tesst4',1),(10,'test5',1);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tag` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '标签id',
  `name` varchar(255) NOT NULL COMMENT '标签名字',
  `color` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag`
--

LOCK TABLES `tag` WRITE;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
INSERT INTO `tag` VALUES (7,'开心','#ee1111'),(8,'雨萌','#07ed8a');
/*!40000 ALTER TABLE `tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL COMMENT '用户名',
  `password` varchar(255) NOT NULL COMMENT '密码',
  `nickname` varchar(255) DEFAULT NULL COMMENT '昵称',
  `avatar` text COMMENT '个人头像',
  `email` varchar(255) NOT NULL COMMENT '电子邮箱',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `role` varchar(255) NOT NULL COMMENT '角色访问权限',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'rocky','$2b$10$41OIgseZquN1.6f1u4.XfO3yJ7g.4HjZHI9aCco4ghh39dO8ttUuK','Rocky','data:image/jpeg;base64,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','627650215@qq.com','2023-07-21 14:38:59','Super_Admin');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-11 14:19:30
