// Ajout des diverses librairies et modules utilisées pour mettre en place le serveur

var https = require('https'),
fs =    require('fs');
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
	

// Tableau contenant les données des joueurs
var allSnakes = [];
//Tableau contenant tous les joueurs
var clients = {};
var count = 0;

// Envoie un message à tous les clients


function broadcast(data) {
	  for (var i in clients)
	  {
		 //DEBUG
		  console.log(JSON.stringify(data));
		 // On envoie allSnakes à chaque client
		clients[i].send(JSON.stringify(data));
	  }
	}

wss.on('connection', function(ws) {
	
	// DEBUG
	console.log("Nouvelle connection");
	// On store la nouvelle connection dans un tableau de clients.
	clients[id] = ws;
	// Incrémentation du prochain ID joueur et du nombre de joueurs actuels
	var id = count++;
	
  ws.on('message', function(message) {
	  allSnakes.push(JSON.parse(message));
  });
  
  
  // Send something to all clients every x time
  setInterval(broadcast, 500, allSnakes);
});