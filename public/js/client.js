	// Ouverture du WebSocket client
	var ws = new WebSocket('wss://localhost:3250');
	
	// Variables du jeu
	var speed = 200;
	var radius = 6;
	var colors = ['#ff0000','#ffffff','#00ffff','#0000ff','#00ff00','#ffff00','#ff00ff'];

	// Tableaux de communication client/serveur
	var onScreenSnakes = [];
	var allSnakes = [];
	
	// On initialise les données à envoyer au serveur ( départ aléatoire )
	var color = colors[Math.round(Math.random() * 8)];
	var circle = [];
	circle[0] = 100+Math.random()*1072; // Pour ne pas start trop près d'un bord
	circle[1] = 100+Math.random()*432;
	circle[2] = color;
	circle[3] = 0;
	
	console.log(color);
	
	function onMouseUp(event) {
		// Génération d'un vecteur entre la pos. actuelle et la pos. désirée
		var vector = event.point - circle.position;
		vector.length = speed;
		
		circle[3] = vector;
	}
	
	function onFrame() {
		ws.send(JSON.stringify(circle)); // On envoie les données à chaque appel de onFrame.
	}
	
	// Ici, on reçoit le broadcast du serveur
	ws.onmessage = function(msg) {
			
			// On veut update le déplacement de tous les snakes
			allSnakes = JSON.parse(msg.data);
			console.log("Message reçu");
			
			var i;
			
			for(i = 0;i < allSnakes.length;i++)
			{ // On utilise les valeurs pour créer les snakes.
			
				//TODO (Voir algo papier ?)
			}
	}