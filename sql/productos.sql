CREATE TABLE `productos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) NOT NULL,
  `categoria` varchar(30) NOT NULL,
  `marca` varchar(40) NOT NULL,
  `precio` decimal(7,2) NOT NULL,
  `stock` int NOT NULL,
  `proveedor_email` varchar(120) DEFAULT NULL,
  `rating` decimal(2,1) NOT NULL,
  `creado_es` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `descuento` decimal(4,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `proveedor_email` (`proveedor_email`),
  CONSTRAINT `productos_chk_1` CHECK ((`precio` > -(0))),
  CONSTRAINT `productos_chk_2` CHECK ((`precio` >= 0)),
  CONSTRAINT `productos_chk_3` CHECK ((`stock` >= 0)),
  CONSTRAINT `productos_chk_4` CHECK ((`descuento` between 0 and 0.80))
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;