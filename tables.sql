-- Data exporting was unselected.

-- Dumping structure for table medidasbd.Usuarios
CREATE TABLE IF NOT EXISTS `Usuarios` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_spanish2_ci DEFAULT 'sin nombre',
  `email` varchar(50) COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `status` tinyint DEFAULT NULL,
  `pass` varchar(80) COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- Dumping structure for table medidasbd.Clients
CREATE TABLE IF NOT EXISTS `Clients` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `name` varchar(80) COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `email` varchar(80) COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `sexo` varchar(10) COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `estatura` float NOT NULL DEFAULT (0),
  `peso` float NOT NULL DEFAULT (0),
  `circunferencia` float NOT NULL DEFAULT (0),
  `age` varchar(20) COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `status` varchar(50) COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `address` varchar(80) COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_clients_usuarios` (`user_id`),
  CONSTRAINT `FK_clients_usuarios` FOREIGN KEY (`user_id`) REFERENCES `Usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- Data exporting was unselected.

-- Dumping structure for table medidasbd.Info
CREATE TABLE IF NOT EXISTS `Info` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_client` int unsigned NOT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `objetivo` varchar(100) DEFAULT NULL,
  `medicamentos` varchar(100) DEFAULT NULL,
  `enfermedades` varchar(100) DEFAULT NULL,
  `alergias` varchar(100) DEFAULT NULL,
  `ocupacion` varchar(100) DEFAULT NULL,
  `ejercicio_dia` varchar(50) DEFAULT NULL,
  `ejercicio_sema` varchar(50) DEFAULT NULL,
  `apetito` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK__Clients` (`id_client`),
  CONSTRAINT `FK__Clients` FOREIGN KEY (`id_client`) REFERENCES `Clients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- Data exporting was unselected.

-- Dumping structure for table medidasbd.Weights
CREATE TABLE IF NOT EXISTS `Weights` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `client_id` int unsigned NOT NULL,
  `peso` varchar(50) COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `estatura` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `cintura` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `muneca` varchar(50) COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `brazo` varchar(50) COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `abdominal` varchar(50) COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `cadera` varchar(50) COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `triceps` varchar(50) COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `subescapular` varchar(50) COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_peso_clients_clients` (`client_id`),
  CONSTRAINT `FK_peso_clients_clients` FOREIGN KEY (`client_id`) REFERENCES `Clients` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

CREATE TABLE `Goals` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `client_id` int unsigned NOT NULL,
  `motivo_consulta` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `obje_esperado` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `tabaco` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `alcohol` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `hora_dormir` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `hora_despertar` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `horas_sueno` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `info_adicional` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_clients_goals` (`client_id`),
  CONSTRAINT `FK_clients_goals` FOREIGN KEY (`client_id`) REFERENCES `Clients` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;