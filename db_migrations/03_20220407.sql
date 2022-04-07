ALTER TABLE bug DROP CONSTRAINT bug_usuario_fkey;
ALTER TABLE bug ALTER COLUMN usuario SET DATA TYPE VARCHAR(64);
ALTER TABLE usuario ADD CONSTRAINT unique_nombre UNIQUE (nombre);
TRUNCATE TABLE bug;
ALTER TABLE bug ADD CONSTRAINT bug_usuario_fkey FOREIGN KEY (usuario) REFERENCES usuario (nombre);

-- Datos de prueba
INSERT INTO bug(nombre, descripcion, usuario, estado) VALUES
('Registro de usuarios', 'El registro de usuarios no funciona', 'Alexandra Larenas', 'Finalizado'),
('Visualizacion bugs generales', 'No se visualizan los bugs generales', 'Alexandra Larenas', 'Pendiente'),
('Visualizacion bugs por usuario', 'No se visualizan los bugs por usuario', 'Alexandra Larenas', 'En corrección');