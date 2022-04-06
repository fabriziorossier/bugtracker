CREATE DATABASE bugtracker;

CREATE TABLE rol (
    ID_rol SERIAL,
    descripcion VARCHAR(32) NOT NULL,
    PRIMARY KEY (ID_rol)
);

CREATE TABLE usuario (
    ID_usuario SERIAL,
    nombre VARCHAR(64) NOT NULL,
    email VARCHAR(32) NOT NULL,
    password VARCHAR(64) NOT NULL,
    rol INTEGER NOT NULL,
    PRIMARY KEY (ID_usuario),
    FOREIGN KEY (rol) REFERENCES rol (ID_rol)
);

CREATE TABLE bug (
    ID_bug SERIAL,
    nombre VARCHAR(32) NOT NULL,
    descripcion VARCHAR(512) NOT NULL,
    usuario INTEGER NOT NULL,
    PRIMARY KEY (ID_bug),
    FOREIGN KEY (usuario) REFERENCES usuario (ID_usuario)
);

INSERT INTO rol(descripcion) VALUES 
('administrator'),
('developer');

-- Datos de prueba
INSERT INTO usuario(nombre, email, password, rol) VALUES
('Fabrizio Rossier', 'fabrizio@desafiolatam.com', '123456', 1),
('Alexandra Larenas', 'alexandra@desafiolatam.com', '123', 2),
('Eugenio Lopez', 'eugenio@desafiolatam.com', '123', 2);

-- Datos de prueba
INSERT INTO bug(nombre, descripcion, usuario) VALUES
('Registro de usuarios', 'El registro de usuarios no funciona', 2),
('Visualizacion bugs generales', 'No se visualizan los bugs generales', 2),
('Visualizacion bugs por usuario', 'No se visualizan los bugs por usuario', 3);