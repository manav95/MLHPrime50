from flask import Flask, request
import json, io, base64
import cPickle
import StringIO
import PIL
import requests
from PIL import Image, ImageOps,ImageEnhance, ImageFilter, ImageChops
import pytesseract, os

image = Image.open("daev.png")
my_file = StringIO.StringIO()
image.save(my_file, "PNG")
my_file.seek(0)
r = requests.post('http://127.0.0.1:5000/process',files={'imgFile':my_file})
theText = r.text.encode('utf-8')
theFil = open('myFile.txt', 'w')
theFil.write(theText)
theFil.close()
os.system('open ' + theFil.name)
