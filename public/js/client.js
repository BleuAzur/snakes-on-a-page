	// Ouverture du WebSocket client
	var ws = new WebSocket('wss://localhost:3250');
	
	// Tableaux de communication client/serveur
	var onScreenSnakes = [];
	var allSnakes = [];
	
	// old
	
	var colors = ['#ff0000','#ffffff','#00ffff','#0000ff','#00ff00','#ffff00','#ff00ff'];
	var color = colors[Math.round(Math.random() * 8)];

	
	function onMouseUp(event) {
		// Génération d'un vecteur entre la pos. actuelle et la pos. désirée
		var vector = event.point - circle.position;
		vector.length = speed;
	}
	
	function onFrame() {
		ws.send(/*données*/); // On envoie les données à chaque appel de onFrame.
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