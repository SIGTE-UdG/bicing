#!/usr/bin/env python
# -*- coding: UTF-8 -*-
from flask import Flask, request
from flask_restful import Resource, Api
from sqlalchemy import create_engine
from json import dumps
from flask.ext.jsonpify import jsonify
from geojson import Feature, Point, FeatureCollection
from shapely.geometry  import  Point,mapping
import json
import requests
import psycopg2
from time import gmtime, strftime
import sys


print "Content-Type: text/plain;charset=utf-8"
print


app = Flask(__name__)
api = Api(app)

class Bicing(Resource):
    def get(self,minuts):
        conn = psycopg2.connect("dbname='dbname' user='username' host='localhost' password='yourpassword'")
        cursor = conn.cursor()
        query = cursor.execute("select lat,lon, extract(epoch from date_trunc('minute', hora))*1000,ABS(bikesdifference) from bicing where ABS(bikesdifference) !=0 AND extract(epoch from date_trunc('minute', hora))='%s'"%minuts )
        rows = cursor.fetchall()
        gjson_dict = {}
        gjson_dict["type"] = "FeatureCollection"
        feat_list = []
        for row in rows:
            type_dict = {}
            pt_dict = {}
            prop_dict = {}
            type_dict["type"] = "Feature"
            pt_dict["type"] = "Point"
            type_dict["geometry"] = mapping(Point(row[1],row[0]))
            prop_dict["hora"] = row[2]
            prop_dict["bikes"] = row[3]
            #prop_dict["minuts"] = row[4]
            type_dict["properties"] = prop_dict
            feat_list.append(type_dict)
        gjson_dict["features"] = feat_list
        result = {'data':[i for i in rows]}
        return jsonify(gjson_dict)


api.add_resource(Bicing, '/bicing/<string:minuts>')
if __name__ == '__main__':
     app.run(port='5002')
