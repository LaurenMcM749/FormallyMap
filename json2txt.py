from geojson import Point, Feature, FeatureCollection, dump
import json
import numpy as np
from collections import OrderedDict
from geopy import geocoders
from geopy.geocoders import Nominatim
import jsonpickle
from json import JSONEncoder

filename = 'data_text.txt'

with open(filename) as my_file:

    # newfile = json.dumps(my_file)
    for line in my_file:
        newline= str(line)
        # newline1 = newline.replace('"properties": "{','"properties": {').replace('}"}','}}').replace("'",'"')
        newline1 = newline.replace('"id",','"id":')
        print(newline1)
        