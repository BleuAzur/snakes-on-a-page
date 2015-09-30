var https = require('https'),      // module for https
fs =    require('fs');         // required to read certs and keys
var express = require('express');
var app = express();

var port = 3250;

app.use(express.static('public'));

var options = {
    key:    fs.readFileSync('private/server.key'),
    cert:   fs.readFileSync('private/server.crt'),
};

var server = https.createServer(options, app).listen(port, function () {
	console.log("Server running")
});

var WebSocketServer = require('ws').Server,
	wss = new WebSocketServer({server: server});
	
wss.broadcast = function(data) {
  for (var i in this.clients)
    this.clients[i].send(data);
};

wss.on('connection', function(ws) {
  ws.on('message', function(message) {
    wss.broadcast(message);
  });
});