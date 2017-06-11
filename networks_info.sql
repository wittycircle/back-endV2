-- MySQL dump 10.13  Distrib 5.6.35, for macos10.12 (x86_64)
--
-- Host: localhost    Database: newdb
-- ------------------------------------------------------
-- Server version	5.6.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `networks_info`
--

DROP TABLE IF EXISTS `networks_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `networks_info` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `loc_id` int(10) unsigned NOT NULL,
  `network_id` int(10) unsigned NOT NULL,
  `logo` varchar(128) DEFAULT NULL,
  `cover_picture` varchar(128) DEFAULT NULL,
  `story` text,
  `creation_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `networks_info_loc_id_foreign` (`loc_id`),
  KEY `networks_info_network_id_foreign` (`network_id`),
  CONSTRAINT `networks_info_loc_id_foreign` FOREIGN KEY (`loc_id`) REFERENCES `location` (`id`) ON DELETE CASCADE,
  CONSTRAINT `networks_info_network_id_foreign` FOREIGN KEY (`network_id`) REFERENCES `networks_list` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `networks_info`
--

LOCK TABLES `networks_info` WRITE;
/*!40000 ALTER TABLE `networks_info` DISABLE KEYS */;
INSERT INTO `networks_info` VALUES (1,6,2,'https://res.cloudinary.com/dqpkpmrgk/image/upload/v1492384512/42_Logo_lpleuf.png','https://res.cloudinary.com/dqpkpmrgk/image/upload/v1492384520/42_Banner_nj0san.jpg','42 is a private, nonprofit and tuition-free computer programming school created and funded by French billionaire Xavier Niel (Founder of the telecommunication company Illiad) with several partners including Nicolas Sadirac (previous director-general of the Epitech school in France), Kwame Yamgnane and Florian Bucher (former executives of Epitech). The school was first opened in Paris in 2013.<br /><br />\n\nOut of more than 70,000 candidates in France, 3,000 were selected to complete a four-week intensive computer programming bootcamp called piscine (swimming-pool). Any person between 18 and 30 can be registered for piscine after completing the logical reasoning tests on the website.<br /><br />\n\nThe school does not have any professors, does not issue any diploma or degree, and is open 24/7. The training is inspired by new modern ways to teach which include peer-to-peer pedagogy and project-based learning. The School has been endorsed by many high-profile people in Silicon Valley including Evan Spiegel the co-founder and CEO of Snapchat, Keyvon Beykpour the co-founder and CEO of Periscope, David Marcus a vice-president of Facebook, Stewart Butterfield the co-founder and CEO of Slack, Brian Chesky the co-founder and CEO of Airbnb, Tony Fadell the founder and CEO of Nest Labs, Jack Dorsey the co-Founder and CEO of Twitter.','2017-04-12 21:36:54'),(2,6,99,'https://res.cloudinary.com/dqpkpmrgk/image/upload/v1492384382/ESCP_Logo_llfm3x.png','https://res.cloudinary.com/dqpkpmrgk/image/upload/v1492384379/ESCP_Banner_e3yu8e.jpg','Established in 1819, ESCP Europe is the world\'s first business school and has educated generations of leaders and forefront thinkers. With its five urban campuses in Paris, London, Berlin, Madrid, and Torino, ESCP Europe has a true European identity which enables the provision of a unique style of business education and a global perspective on management issues.<br /><br />\n\nTriple-crown accredited (EQUIS, AMBA, AACSB), ESCP Europe welcomes 4,000 students and 5,000 executives from 90 different nations every year, offering them a wide range of general management and specialised programmes. The School\'s alumni network counts 50,000 members in 150 countries and from 200 nationalities. Together with its long-standing relationships with national and multinational companies, this network allows ESCP Europe to provide unique career opportunities on an international scale.<br /><br />\n\nThrough a combination of innovative pedagogy, cross-campus programmes with integrated curricula, and a research-active faculty, ESCP Europe is an essential contributor to the development of a European, cross-national management culture. The aspiration of ESCP Europe is the credo of Europe: to remain faithful to its humanistic values while at the same time anticipating the new ways of the world.','2017-04-16 23:34:31'),(3,6,222,'https://res.cloudinary.com/dqpkpmrgk/image/upload/v1492384740/Dauphine_logo_a8l3el.png','https://res.cloudinary.com/dqpkpmrgk/image/upload/v1492384739/Dauphine_Banner_cdpfvs.jpg','Dauphine is unique in the world of French universities.<br />\nDauphine is specialized in the Organization and Decision Sciences. Our mission is to educate future generations of executives, entrepreneurs, leaders and scholars to be both experts in their fields and socially responsible, cultured, open-minded members of the community.<br /><br />\n\nWe choose only the best candidates and they choose Dauphine.<br /><br />\n\nOur faculty is internationally esteemed and award-winning.<br /><br />\n\nWe are respected for our academic excellence and recognized for the quality of our research in the organization and decision sciences.<br /><br />\n\nOur close ties to the business world ensure that Dauphine students are prepared for their professional future and that our programs and curriculum keep pace with an ever-evolving economic landscape.<br />\nDauphine is international and socially responsible<br /><br />\n\nIn 2009, Dauphine became the first French university to obtain the EQUIS accreditation from the European Foundation for Management Development, in recognition of our academic excellence and committed global perspective.\n\nEqual opportunity and diversity are a top priority for recruiting students, faculty and staff.<br />\nWe distinguish ourselves through our:<br /><br />\n\nDemanding admissions standards<br />\nProven and innovative teaching methods<br />\nRich and diversified curriculum<br />\nBroad and coherent range of academic disciplines<br />\nClose ties between teaching and research<br />\nPrograms designed with the real-world in mind<br />\nFaculty that includes both academics and practicing professionals','2017-04-16 23:38:17'),(4,429,21,'https://res.cloudinary.com/dqpkpmrgk/image/upload/v1493755520/logo-TheRefiners-01_s1j0jw.png','https://res.cloudinary.com/dqpkpmrgk/image/upload/v1492385012/The_Refiners_Banner_ktlprd.jpg','Founded by entrepreneurs The Refiners is a San Francisco-based accelerator devoted to helping foreign startups thrive in the bountiful yet complicated environment of Silicon Valley. We are passionate about the needs of foreign startups, and believe they are different enough to warrant a program specifically for them. Over a three-month period, you will receive unparalleled access to funding, networking and mentorship opportunities in Silicon Valley.<br /><br />\n\nThe Refiners aim is to equip you with the tools necessary to expand your startups vision and scale globally. We are committed to providing you with unparalleled support, guidance and expertise.','2017-04-16 23:40:34');
/*!40000 ALTER TABLE `networks_info` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-06-11 22:21:05
