import json
import requests
import psycopg2
from time import gmtime, strftime

#acceso al servicio web del bicing
r = requests.get('http://wservice.viabicing.cat/v2/stations')
bicingJson = r.json()

#conexión a la base de datos
try:
    conn = psycopg2.connect("dbname='bicing' user='tu_usuari' host='localhost' password='tu_pswd'")
except:
    print "I am unable to connect to the database"

cursor = conn.cursor()
cursor.executemany("INSERT into bicing(id_station,lat,lon,slots,bikes) VALUES (%(id)s, %(latitude)s,%(longitude)s,%(slots)s,%(bikes)s)",bicingJson['stations'])
conn.commit()
cursor.close()
