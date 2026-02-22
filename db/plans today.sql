

CREATE TABLE `PlansToday` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `client_id` int unsigned NOT NULL,
  `lacteos` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci DEFAULT '0',
  `vegetales` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci DEFAULT '0',
  `frutas` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci DEFAULT '0',
  `almidones` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci DEFAULT '0',
  `carnes_magra` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci DEFAULT '0',
  `carnes_semi` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci DEFAULT '0',
  `carnes_grasa` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci DEFAULT '0',
  `grasas` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci DEFAULT '0',
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_clients_plans_today` (`client_id`),
  CONSTRAINT `FK_clients_plans_today` FOREIGN KEY (`client_id`) REFERENCES `Clients` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;
/* 
INSERT INTO `Plans` (`id`, `client_id`, `lacteos`, `vegetales`, `frutas`, `almidones`, `carnes_magra`, `carnes_semi`, `carnes_grasa`, `grasas`, `createdAt`, `updatedAt`) VALUES
(1, 36, '1', 'ss', 'ss', 'ss', 'ss', 'ss', 'ss', 'ss', '2025-11-23 23:14:14', '2025-11-24 10:52:41');
 */