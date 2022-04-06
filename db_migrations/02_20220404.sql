ALTER TABLE bug ADD estado VARCHAR(32);

-- Datos de prueba
UPDATE bug SET estado = 'Finalizado' WHERE ID_bug = 1;
UPDATE bug SET estado = 'Pendiente' WHERE ID_bug = 2;
UPDATE bug SET estado = 'En correccion' WHERE ID_bug = 3;