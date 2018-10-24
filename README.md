# dup_img
##Find duplicate images

This electron program is intended to compare a directory tree containing images (the needle tree images) with another tree containing images (the hay tree images). For instance if you have a sd-card from your camera and you are not sure if all images are transferred to your hard disk, you can use this program to check.
Results are shown in the user interface HTML file.

Installation:

Install electron from https://github.com/electron/electron/releases. The program is developed with electron-v3.0.5-win32-ia32.
Download the files:
```
  package.json
  app.html
  app.js
  script.js
  worker.js
```
Make a sub directory with the name 'app' in the electron sub directory 'resources'. Copy the downloaded files to the 'app' directory. 
This will give the following directory structure:
```
electron-v3.0.5-win32-ia32
      |___ resources
      |        |___ app
      |               |___ package.json
      |               |___ app.html
      |               |___ script.js
      |               |___ worker.js
      |___ electron.exe
      |___ .....
```      

Usage:
To start the program, run electron.exe in the electron directory. 
