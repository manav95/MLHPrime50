import SocketServer
import SimpleHTTPServer
from flask import Flask, request
import json, io
import PIL
from PIL import Image, ImageOps,ImageEnhance, ImageFilter, ImageChops
import pytesseract, os
from werkzeug import MultiDict

app = Flask(__name__)
@app.route('/process', methods=['POST'])
def getData():
    if request.method == 'POST':
       data = request.files
       fernanDict = data.to_dict(False)
       theFile = fernanDict['imgFile'][0]
       image = Image.open(theFile.stream)
       image = image.filter(ImageFilter.DETAIL)
       enhancer = ImageEnhance.Sharpness(image)
       image = enhancer.enhance(2.0)
       enhancer = ImageEnhance.Contrast(image)
       image = enhancer.enhance(2.0)
       #dpi = image.info["dpi"]
       #if (dpi < 300):
       #  image.info["dpi"] = 300
       string = pytesseract.image_to_string(image)
       return string


if __name__ == "__main__":
    app.run()
