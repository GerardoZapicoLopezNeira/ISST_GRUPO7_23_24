drop table IF EXISTS reserva;
drop table IF EXISTS herramienta;
drop table IF EXISTS usuario;

CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    dni VARCHAR(20) NOT NULL UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    telefono VARCHAR(20) NOT NULL,
    latitude FLOAT,
    longitude FLOAT
);

CREATE TABLE herramienta (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id),
    disponibilidad BOOLEAN NOT NULL,
    tipo VARCHAR(100) NOT NULL,
    descripcion TEXT NOT NULL,
    precio_diario DECIMAL(10, 2),
    estado_fisico VARCHAR(100) NOT NULL,
    foto VARCHAR(255)
);

CREATE TABLE reserva (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id),
    herramienta_id INT NOT NULL,
    FOREIGN KEY (herramienta_id) REFERENCES herramienta(id),
    año_recogida INT NOT NULL,
    mes_recogida INT NOT NULL,
    dia_recogida INT NOT NULL,
    año_devolucion INT NOT NULL,
    mes_devolucion INT NOT NULL,
    dia_devolucion INT NOT NULL,
    importe DECIMAL(10, 2) NOT NULL,
    estado VARCHAR(100) NOT NULL

);