CREATE TABLE `usuarios` (
  `id` int primary key auto_increment,
  `nombre` varchar(60) NOT NULL,
  `correo` varchar(100) NOT NULL unique,
  `contrasena` varchar(100) NOT NULL,
  `admin` boolean NOT NULL
 
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;