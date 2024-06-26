-- Insertar algunos usuarios de ejemplo
INSERT INTO usuario (username, password, dni, nombre, direccion, email, telefono, latitude, longitude)
VALUES
('usuario1', '$2a$10$Zqc/JEplbYoFRmpqs1XIKOBbp7Q8nDNzlO.LlP6U3IdtyCFD1zWWS', '12345678A', 'Usuario 1', 'Calle 123, Ciudad', 'usuario1@example.com', '123456789', 40.4168, -3.7038), /*pass: usuario1*/
('usuario2', '$2a$10$.EG2bksmD3Jf03xSy7CwXeGvoVCHY91IwO5y51qRGUCbdA63M3xYy', '23456789B', 'Usuario 2', 'Carrera 456, Pueblo', 'usuario2@example.com', '987654321', 41.3851, 2.1734), /*pass: usuario2*/
('usuario3', '$2a$10$SD.z0Rfyg1/k0OWT3XKkvO6Q3kfLjdG.J8R35sLOROUI4FVAHNu9O', '34567890C', 'Usuario 3', 'Avenida 789, Pueblo', 'usuario3@example.com', '555123456', 39.4699, -0.3763), /*pass: usuario3*/
('usuario4', '$2a$10$/x33uIkA8Q1BLpC/lJRWZumI25IQX095cLRwn1FEFW6RiLdYdwBTy', '45678901D', 'Usuario 4', 'Plaza 456, Ciudad', 'usuario4@example.com', '333987654', 37.3891, -5.9845); /*pass: usuario4*/


-- Insertar algunas herramientas de ejemplo
INSERT INTO herramienta (usuario_id, disponibilidad, tipo, descripcion, precio_diario, estado_fisico, foto)
VALUES
(1, TRUE, 'Taladro', 'Taladro de mano eléctrico, ideal para perforaciones en madera y metal.', 15.00, 'Bueno', 'Herramienta1.png'),
(1, TRUE, 'Martillo', 'Martillo de mano con función de percusión, ideal para trabajos de demolición.', 10.00, 'Regular', 'Herramienta2.png'),
(2, TRUE, 'Sierra', 'Sierra circular portátil, perfecta para cortes precisos en madera y plástico.', 20.00, 'Excelente', 'Herramienta3.png'),
(2, TRUE, 'Destornillador', 'Destornillador eléctrico recargable con múltiples puntas intercambiables.', 8.00, 'Bueno', 'Herramienta4.png'),
(3, TRUE, 'Llave inglesa', 'Llave inglesa ajustable de 10 pulgadas, ideal para trabajos mecánicos.', 12.00, 'Regular', 'Herramienta5.png'),
(3, TRUE, 'Cinta métrica', 'Cinta métrica de 5 metros, esencial para mediciones precisas en construcción.', 5.00, 'Excelente', 'Herramienta6.png'),
(4, TRUE, 'Nivel de burbuja', 'Nivel de burbuja magnético de alta precisión, perfecto para trabajos de albañilería.', 9.00, 'Bueno', 'Herramienta7.png');

-- Insertar algunas reservas de ejemplo
INSERT INTO reserva (usuario_id, herramienta_id, año_recogida, mes_recogida, dia_recogida, año_devolucion, mes_devolucion, dia_devolucion, importe, estado)
VALUES
(1, 3, 2024,6,1, 2024,6,3, 30.00, 'Pendiente'),
(2, 5, 2024,6,2, 2024,6,4, 20.00, 'Pendiente'),
(3, 7, 2024,6,3, 2024,6,5, 40.00, 'Pendiente'),
(4, 1, 2024,6,4, 2024,6,6, 16.00, 'Pendiente');
