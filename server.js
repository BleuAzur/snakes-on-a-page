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

// Broadcast global
var delay = 2000; // 2000 = 2s - Debug value

// Envoi de allSnakes tous les 'delay' secondes
setInterval(broadcast, delay);

// NEW - Require du modèle.	
var model = require("./public/js/snake");
var Point = model.point;
var Vecteur = model.vecteur;
var Snake = model.snake;
var allSnakes = new model.allSnakes();
	
var message = [];

// Envoie un message à tous les clients
function broadcast() {
	if(clients.length != 0)
	{
		console.log("Broadcasting to " + count + " player(s)");
		// Pour chaque client
		for (var i = 0;i < count;i++)
		{
			// Si le socket client n'est pas ouvert
			if(clients[i].readyState != 1)
			{
				console.log("Socket non ouvert : " + clients[i].readyState)
			}
			else 
			{
				console.log("Socket ouvert : " + clients[i].readyState);
				
				message[0] = "game";
				
				console.log(JSON.stringify(allSnakes.snakes[0]));
				
				message[1] = allSnakes.snakes;
				
				console.log(JSON.stringify(message[1]));
				
				// On envoie data à chaque client
				clients[i].send(JSON.stringify(message));
			}
		}
	}
}

function init(client,id) {
	
	message[0] = "init";
	message[1] = id;
	client.send(JSON.stringify(message));
}

wss.on('connection', function(ws) {
	
	var id = count;
	var msg;
	
	// DEBUG
	console.log("Nouvelle connection");
	
	clients[count] = ws;
	count++;
	
	init(ws,id);
	
	allSnakes.addSnake(id);
	
	ws.on('message', function(message) {
		console.log('Received message from client:');
		if(msg[0] >= 0) {
			allSnakes.directions[msg[0]] = msg[1];
			console.log("Direction updated");
		}
		else {
			console.error("DEBUG error : ID not set")
		}
			
	});
	
	// Fonction déconnexion - Imparfaite
	ws.on('close', function close(ws) {
		
		console.log("Déconnexion de " + ws);
		
		
		// On récupère l'index du déconnecté
		// NOT WORKING var indexDC = clients.indexOf(ws);
		
		//Hardcoded 4 debugging
		var indexDC = 0;
		
		console.log("Index removed : " + indexDC);
		
		// On le retire du tableau
		clients.splice(indexDC,1);
		// On décrémente le nombre de clients
		count--;
		
		console.log('Disconnection : ' + count + ' players left');
	});
	
	ws.on('error', function() {
        console.log('ERROR');
	});
 
});
