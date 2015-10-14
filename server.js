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
setInterval(broadcast, delay, allSnakes);

// NEW - Require du modèle.
var snake = require("./snake");
var point = snake.point;
var vecteur = snake.vecteur;
var snake = snake.snake;
var allSnakes = snake.allSnakes;

// Envoie un message à tous les clients
function broadcast(data) {
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
				
				console.log("Socket ouvert : " + clients[i].readyState)
				// On envoie data à chaque client
				clients[i].send(JSON.stringify(data));
			}
		}
	}
}

wss.on('connection', function(ws) {
	
	var id = count;
	var msg;
	
	// DEBUG
	console.log("Nouvelle connection : " + ws);
	
	clients[count] = ws;
	count++;
	
	ws.on('message', function(message) {
		console.log('Received message from client:');
		// On parse un message et on l'ajoute au tableau allSnakes - Obsolète
		msg = JSON.parse(message);
		allSnakes[id] = msg;
			
	});
	
	// Fonction déconnexion - Imparfaite
	ws.on('close', function close(ws) {
		
		console.log("Déconnexion de " + ws);
		// On récupère l'index du déconnecté
		var indexDC = clients.indexOf(ws);
		
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
