from Tkinter import *
import json, io
import PIL
from tkFileDialog import askopenfilename
from PIL import Image, ImageOps,ImageEnhance, ImageFilter, ImageChops
import pytesseract, os
class Application(Frame):
    def say_hi(self):
        print "hi there, everyone!"
    def open_file_handler(self):
        filePath = askopenfilename()
        print filePath
        return filePath

    def upload(self):
        filePath = self.open_file_handler()
        image = Image.open(filePath)
        image = image.filter(ImageFilter.DETAIL)
        enhancer = ImageEnhance.Sharpness(image)
        image = enhancer.enhance(2.0)
        enhancer = ImageEnhance.Contrast(image)
        image = enhancer.enhance(2.0)
        #dpi = image.info["dpi"]
        #if (dpi < 300):
        #  image.info["dpi"] = 300
        string = pytesseract.image_to_string(image)
        print (string + "\n")
        print ("\n\n\n\n\n")

    def createWidgets(self):
        self.QUIT = Button(self)
        self.QUIT["text"] = "QUIT"
        self.QUIT["fg"]   = "red"
        self.QUIT["command"] =  self.quit

        self.QUIT.pack({"side": "left"})

        self.hi_there = Button(self)
        self.hi_there["text"] = "Upload"
        self.hi_there["command"] = self.upload

        self.hi_there.pack({"side": "left"})

    def __init__(self, master=None):
        Frame.__init__(self, master)
        self.pack()
        self.createWidgets()

root = Tk()
app = Application(master=root)
app.mainloop()
root.destroy()
