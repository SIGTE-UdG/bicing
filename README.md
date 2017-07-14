# bicing
aplicación para visualizar los datos del bicing de barcelona

#Crear tabla 
#Creamos una tabla en PostgreSQL en la que almacenar los datos de cada estación de bicing

create table bicing
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


