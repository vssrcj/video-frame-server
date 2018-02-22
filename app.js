var path = require('path');
var express = require('express');
var app = express();
var fs = require('fs');

var dir = path.join(__dirname, 'public');

var mime = {
    html: 'text/html',
    txt: 'text/plain',
    css: 'text/css',
    gif: 'image/gif',
    jpg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
    js: 'application/javascript'
};

let timestamp = 0;

app.get('/image', function (req, res) {
   // console.log(req.path, req.path.replace(/\/$/, '/index.html'));
   var image = timestamp % 5;
    var file = path.join(dir, '/images/' + image + '.jpg');
   //  var file = 'background.jpg'
    if (file.indexOf(dir + path.sep) !== 0) {
        return res.status(403).end('Forbidden');
    }
    var type = mime[path.extname(file).slice(1)] || 'text/plain';
    var s = fs.createReadStream(file);
    s.on('open', function () {
        res.set('Content-Type', type);
        s.pipe(res);
    });
    s.on('error', function () {
        res.set('Content-Type', 'text/plain');
        res.status(404).end('Not found');
    });
});

app.get('/', function (req, res) {
   res.sendFile(path.join(dir + '/index.html'));
});

app.get('/timestamp', function (req, res) {
   res.send(timestamp.toString());
});

app.listen(3000, function () {
   setInterval(function() {
      timestamp += 1;
   }, 100);
    console.log('Listening on http://localhost:3000/');
});