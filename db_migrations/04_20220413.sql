ALTER TABLE usuario ADD estado BOOLEAN;

-- Datos de prueba
UPDATE usuario SET estado = true WHERE ID_usuario = 1;
UPDATE usuario SET estado = true WHERE ID_usuario = 2;
UPDATE usuario SET estado = true WHERE ID_usuario = 3;
UPDATE usuario SET estado = true WHERE ID_usuario = 4;
UPDATE usuario SET estado = true WHERE ID_usuario = 5;