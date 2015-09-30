var https = require('https'),      // module for https
fs =    require('fs');         // required to read certs and keys
var express = require('express');
var app = express();

var port = 3250;

app.use(express.static('public'));

// Importation clé et certificat
var options = {
    key:    fs.readFileSync('private/server.key'),
    cert:   fs.readFileSync('private/server.crt'),
};

// Création du serveur https
var server = https.createServer(options, app).listen(port, function () {
	console.log("Server running");
});

// Création du webSocket lié au serveur
var WebSocketServer = require('ws').Server,
	wss = new WebSocketServer({server: server});
	
// Envoie un message à tous les clients
wss.broadcast = function(data) {
  for (var i in this.clients)
  {
    this.clients[i].send(data);
	// DEBUG
	console.log("Broadcast sent");
  }
};
// Tableau contenant tous les joueurs - A revoir
var allSnakes = [];


wss.on('connection', function(ws) {
	console.log("Nouvelle connection");
  ws.on('message', function(message) {
	  // Process client message
  });
  // Send something to all clients every x time
  setInterval(wss.broadcast, 1000);
});