# Vide Frame Server

This project consists of many images.  You can use the stream of images to create a video.

To get it up and running, run:
```
npm install
node app.js
```

### localhost:3000/image

Returns the current/live image.

### localhost:3000

Returns an HTML page, which is an example of how to use this service.

The source of the image points to the **/image** route, and continuously refreshes *(looks like a video)*.
