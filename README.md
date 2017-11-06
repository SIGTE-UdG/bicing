# Actividad del servicio de bicing de Barcelona

Aplicación para visualizar de forma dinámica el movimiento de bicis en las estaciones de bicing de Barcelona. 

## Introducción

La aplicación permite cartografiar la actividad (número de bicis recogidas) en las estaciones del Bicing de Barcelona cada cierto intervalo de tiempo. 

En primer lugar se consolidan los datos en una base de datos, para posteriormente visualizarlos de forma dinámica a través de la aplicación webmap. 

## Base de datos

Se ha utilizado una base de datos PostGis para consolidar los datos. 
En el archivo bicing.sql se muestran las sentencias sql para crear la tabla y las funciones para incluir la hora y calcular el número de bicis recogidas en cada estación. 

## Recogida de datos

Los datos de han obtenido a través de la API abierta del servicio de Bicing de Barcelona.
Se ha utilizado un script en python (bicing.py) para ir recogiendo los datos y almacenarlos en la base de datos.


## Visualización de los datos

Se ha creado una aplicación web map utilitzando la libreria [leaflet](http://leafletjs.com/) para visualizar dinámicamente los datos de uso del bicing. 


## Mas información

Blog UNIGIS Girona:

- [Cómo consolidar datos de una API en una base de datos](http://www.unigis.es/como-consolidar-datos-de-una-api-en-una-base-de-datos/)

## Autor

Josep Sitjar (@JosepSitjar) - [UNIGIS Girona](http://www.unigis.es) 

