-- crear tabla a la base de datos postgre
﻿create table bicing
(
id serial primary key,
id_station int,
lat double,
lon double,
slots int,
bikes int,
hora timestamp,
hmin char(10),
bikesdifference int
);

-- Función que permite añadir la hora despues de cada insert en la tabla
CREATE OR REPLACE FUNCTION insert_time() RETURNS trigger AS $$
DECLARE
numBikesAnt integer;
numBikesAct integer;
horaAct char(40);
BEGIN
SELECT bikes into numBikesAnt FROM bicing where id_station = NEW.id_station and hmin = (to_char(now(), 'HH:MI'));
SELECT bikes into numBikesAct FROM bicing where id_station = NEW.id_station AND id = NEW.id;
UPDATE bicing SET bikesdifference = numBikesAct-numBikesAnt WHERE id = NEW.id;

UPDATE bicing SET hora = NOW() WHERE id = NEW.id;
UPDATE bicing SET hmin = (to_char(now()+INTERVAL '1 min', 'HH:MI')) where id = NEW.id;
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- trigger que permite ejecutar la funcion anterior despues de cada insert en la tabla
DROP TRIGGER insert_time on bicing;
CREATE TRIGGER insert_time
AFTER INSERT ON bicing
FOR EACH ROW EXECUTE PROCEDURE insert_time();
