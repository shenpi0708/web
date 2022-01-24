const hostname = '163.13.164.169';
const port = 3000;

var path = require('path')
var express = require('express')
var app = require('express')();

// var http = require('http').Server(app);
// var io = require('socket.io')(http);
// var shutdown = require('shutdown');

app.get('/', function (req, res) {
  app.use(express.static(path.resolve('..', 'web/main')));
  res.sendFile(path.resolve('..', 'web/main/main.html'));
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
