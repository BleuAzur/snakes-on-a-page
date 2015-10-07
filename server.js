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
var allSnakes = []	;
//Tableau contenant tous les joueurs
var clients = [];
var count = 0;

// Broadcast global
var delay = 2000;
// Envoi de allSnakes tous les 'delay' secondes
setInterval(broadcast, delay, allSnakes);


// Envoie un message à tous les clients
function broadcast(data) {
	if(clients.length != 0)
	{
		console.log("Broadcasting to " + count + " player(s)");
		for (var i = 0;i < count;i++)
		{
			if(clients[i].readyState != 1)
			{
				console.log("Socket non ouvert : " + clients[i].readyState)
			}
			else 
			{
				
				console.log("Socket ouvert : " + clients[i].readyState)
				// On envoie allSnakes à chaque client
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
		msg = JSON.parse(message);
		allSnakes[id] = msg;
			
	});
	
	// Fonction déconnexion
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
