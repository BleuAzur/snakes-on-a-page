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

//Tableau contenant tous les joueurs
var clients = [];
var count = 0;
var nextOpenID = 0;

// Broadcast global
var delay = 75; // 2000 = 2s - Debug value

// Envoi de allSnakes tous les 'delay' secondes
setInterval(broadcast, delay);

// NEW - Require du modèle.	
var model = require("./public/js/snake");
var Point = model.point;
var Vecteur = model.vecteur;
var Snake = model.snake;
var allSnakes = new model.allSnakes();
	
var message = [];
var highestActiveID;
var cLength;

// Envoie un message à tous les clients
function broadcast() {
	
	cLength = clients.length;
	if(cLength != 0)
	{
		// On calcule les ID les plus bas et plus hauts
		calcHighID();
		
		// Update du tableau des snakes
		allSnakes.update();
		
		// Pour chaque client
		for (var i = 0;i < cLength;i++)
		{
			
			// Si le socket client n'est pas ouvert
			if(clients[i] === null)
			{
			}
			else if(clients[i].readyState != 1)
			{/* Do nothing*/}
			else 
			{
				message[0] = "game";
				message[1] = allSnakes.snakes;
				message[2] = highestActiveID;
				
				// On envoie data à chaque client
				clients[i].send(JSON.stringify(message));
			}
		}
		
	}
}
function calcHighID(){
	
	for (var i = 0;i < cLength;i++)
		{
			if(clients[i] !== null)
			highestActiveID = i;
		}
}
function init(client,id) {
	message[0] = "init";
	message[1] = id;
	client.send(JSON.stringify(message));
}

wss.on('connection', function(ws) {
	
	// On récupère le premier ID non utilisé en cas de "trou" suite à une déconnexion
	for(var i = 0;i < clients.length;i++)
	{
		if(clients[i] === null)
		{
			nextOpenID = i;
			break;
		}
		else
		{
			nextOpenID = count;
		}
	}
	
	console.log(nextOpenID);
	var id = nextOpenID;
	var msg;
	var savedWs = ws;
	clients[id] = ws;
	count++;
	nextOpenID = count;
	
	init(ws,id);
	
	allSnakes.addSnake(id);
	
				
	ws.on('message', function(message) {
		msg = JSON.parse(message);
		if(msg[0] >= 0) {
			allSnakes.directions[msg[0]] = msg[1];
		}
		else {
			console.error("DEBUG error : ID not set : " + msg[0]);
		}
			
	});
	
	// Fonction déconnexion - Imparfaite
	ws.on('close', function() {
		
		var indexDC = clients.indexOf(savedWs);
		count--;
		
		// On le retire des tableaux
		clients[indexDC] = null;
		allSnakes.snakes[indexDC] = null;
		
		console.log('Disconnection : Player ' + (indexDC+1) + ' left');
	});
	
	ws.on('error', function() {
        console.log('ERROR');
	});
 
});
