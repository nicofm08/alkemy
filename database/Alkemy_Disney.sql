-- --------------------------------------------------------
-- Host:                         localhost
-- Versión del servidor:         10.4.24-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.0.0.6503
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para alkemy_disney
CREATE DATABASE IF NOT EXISTS `alkemy_disney` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_spanish_ci */;
USE `alkemy_disney`;

-- Volcando estructura para tabla alkemy_disney.character
CREATE TABLE IF NOT EXISTS `character` (
  `id_character` int(255) NOT NULL AUTO_INCREMENT,
  `date_creation` datetime DEFAULT NULL,
  `image` varchar(500) COLLATE latin1_spanish_ci DEFAULT NULL,
  `name` varchar(500) COLLATE latin1_spanish_ci DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `history` varchar(5000) COLLATE latin1_spanish_ci DEFAULT NULL,
  `date_deleted` datetime DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id_character`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

-- Volcando datos para la tabla alkemy_disney.character: ~2 rows (aproximadamente)
INSERT INTO `character` (`id_character`, `date_creation`, `image`, `name`, `age`, `history`, `date_deleted`, `active`) VALUES
	(1, '2022-07-19 12:39:28', 'https://www.guioteca.com/cine/files/2022/07/mickey-mouse-560.jpg', 'Mickey Mouse', 92, 'Mickey Mouse (también conocido como Ratón Mickey, Ratón Miguelito, o Miki) es un personaje ficticio estadounidense de la serie del mismo nombre, emblema de la compañía Disney. Creado el 18 de noviembre de 1928', NULL, 1),
	(2, '2022-07-22 02:30:21', 'http://pm1.narvii.com/6354/c0e962477d0d3449d745e50c03d0be8d9bb9bb66_00.jpg', 'Goofy', 90, 'Goofy (también conocido como Tribilín), o Goofy Goof, es un personaje de ficción creado por Walt Disney. Es uno de los mejores amigos de Mickey Mouse.', NULL, 1);

-- Volcando estructura para tabla alkemy_disney.gender
CREATE TABLE IF NOT EXISTS `gender` (
  `id_gender` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(500) COLLATE latin1_spanish_ci NOT NULL DEFAULT '0',
  `image` varchar(500) COLLATE latin1_spanish_ci NOT NULL DEFAULT '0',
  `active` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id_gender`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

-- Volcando datos para la tabla alkemy_disney.gender: ~1 rows (aproximadamente)
INSERT INTO `gender` (`id_gender`, `name`, `image`, `active`) VALUES
	(1, 'Animacion', 'https://images.yodibujo.es/_uploads/_tiny_galerie/20150105/vign-vign-disney-s82-lua-ec3_x3c.jpg', 1),
	(2, 'Infantil 2', 'https://img.freepik.com/vector-gratis/diseno-banner-colorido-zona-infantil_1017-33748.jpg 2', 0);

-- Volcando estructura para tabla alkemy_disney.movies_series
CREATE TABLE IF NOT EXISTS `movies_series` (
  `id_movie_series` int(11) NOT NULL AUTO_INCREMENT,
  `date_creation` datetime DEFAULT NULL,
  `type` enum('MOVIE','SERIE') COLLATE latin1_spanish_ci DEFAULT NULL,
  `id_gender` int(11) DEFAULT NULL,
  `image` varchar(500) COLLATE latin1_spanish_ci NOT NULL DEFAULT '0',
  `title` varchar(500) COLLATE latin1_spanish_ci NOT NULL DEFAULT '0',
  `calification` tinyint(1) NOT NULL DEFAULT 0,
  `date_deleted` datetime DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id_movie_series`),
  UNIQUE KEY `title` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

-- Volcando datos para la tabla alkemy_disney.movies_series: ~2 rows (aproximadamente)
INSERT INTO `movies_series` (`id_movie_series`, `date_creation`, `type`, `id_gender`, `image`, `title`, `calification`, `date_deleted`, `active`) VALUES
	(1, '2022-07-19 12:43:25', 'MOVIE', 1, 'https://www.imer.mx/wp-content/uploads/sites/36/13_nov20_disney_fantasia.jpg', 'Disney Fantasia', 5, NULL, 1),
	(2, '2022-07-24 19:11:03', 'MOVIE', 1, 'https://lumiere-a.akamaihd.net/v1/images/image_8b5ca578.jpeg', 'Toy Story', 5, NULL, 1);

-- Volcando estructura para tabla alkemy_disney.union_movies_characters
CREATE TABLE IF NOT EXISTS `union_movies_characters` (
  `id_union` int(11) NOT NULL AUTO_INCREMENT,
  `id_movie` int(11) NOT NULL,
  `id_character` int(11) NOT NULL,
  `active` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id_union`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

-- Volcando datos para la tabla alkemy_disney.union_movies_characters: ~3 rows (aproximadamente)
INSERT INTO `union_movies_characters` (`id_union`, `id_movie`, `id_character`, `active`) VALUES
	(1, 1, 1, 1),
	(2, 8, 9, 0),
	(3, 7, 5, 1);

-- Volcando estructura para tabla alkemy_disney.users
CREATE TABLE IF NOT EXISTS `users` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `date_creation` datetime DEFAULT NULL,
  `fullname` varchar(500) COLLATE latin1_spanish_ci NOT NULL DEFAULT '0',
  `email` varchar(500) COLLATE latin1_spanish_ci NOT NULL DEFAULT '0',
  `pass` varchar(500) COLLATE latin1_spanish_ci NOT NULL DEFAULT '0',
  `token` varchar(500) COLLATE latin1_spanish_ci NOT NULL DEFAULT '0',
  `date_deleted` datetime DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

-- Volcando datos para la tabla alkemy_disney.users: ~3 rows (aproximadamente)
INSERT INTO `users` (`id_user`, `date_creation`, `fullname`, `email`, `pass`, `token`, `date_deleted`, `active`) VALUES
	(1, '2022-07-22 02:15:55', 'Nicolas Flores Mitar', 'nflores@api.com', '$2b$10$olD7yuNrYfml.NZ6dohPcum2s/980vDpViOF7XXTPz9/TiQHinvcq', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoxLCJmdWxsbmFtZSI6Ik5pY29sYXMgRmxvcmVzIE1pdGFyIiwiZW1haWwiOiJuZmxvcmVzQGFwaS5jb20iLCJpYXQiOjE2NTg2OTI4MjJ9.ylDtczHS9_XrocyHg2M-GAgQ77E_3c-bIIO42GK9asc', NULL, 1),
	(2, '2022-07-24 23:29:28', 'Nicolas Flores Mitar', 'nflores2@api.com', '$2b$10$WQu/LXuirGKkoL8RkBTYfuc.71.14zOKCxeEGD8A2tpRer37OKPIK', '0', NULL, 1),
	(5, '2022-07-24 23:32:01', 'Nicolas Flores Mitar', 'nflores3@api.com', '$2b$10$xKuZoZNswhAhMl9R20rpLu6wbkefIt2QimlKd3PI17V5wxahAbkTq', '0', NULL, 1);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
