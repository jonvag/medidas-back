-- Table structure for table `Agents`
CREATE TABLE `Agents` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `client_id` int unsigned NOT NULL,
  `codigo` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci DEFAULT '0',
  `chat_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci DEFAULT '0',
  `plataforma` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci DEFAULT '0',
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_clients_agents` (`client_id`),
  CONSTRAINT `FK_clients_agents` FOREIGN KEY (`client_id`) REFERENCES `Clients` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;
/* 
INSERT INTO `Plans` (`id`, `client_id`, `lacteos`, `vegetales`, `frutas`, `almidones`, `carnes_magra`, `carnes_semi`, `carnes_grasa`, `grasas`, `createdAt`, `updatedAt`) VALUES
(1, 36, '1', 'ss', 'ss', 'ss', 'ss', 'ss', 'ss', 'ss', '2025-11-23 23:14:14', '2025-11-24 10:52:41');
 */