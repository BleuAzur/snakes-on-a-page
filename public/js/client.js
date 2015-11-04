
	// Ouverture du WebSocket client
	var ws = new WebSocket('wss://' + window.location.host);
	var allSnakesClient = new allSnakes();
	var colors = ['#ff2020','#000000','#20ffff','#2020ff','#20ff20','#ffff20','#ff20ff','#d8f8a8','d8d820','ff3898','4020e8'];
	
	function playerColor(id) {
		return colors[id%11];
	}
	
	var myID = null;
	var tMess;
	var vector;
	var mousePoint;
	var currentPoint;
	var tab =[];
	
	function onMouseDown(event) {
		
		mousePoint = new point(event.point.x,event.point.y);
		// Génération d'un vecteur entre la pos. actuelle et la pos. désirée
		currentPoint = new point(allSnakesClient.snakes[myID].body[0].center.x,allSnakesClient.snakes[myID].body[0].center.y);
		vector = new vecteur(currentPoint, mousePoint);
		vector.normalize();
		tab[0] = myID;
		tab[1] = vector;
		ws.send(JSON.stringify(tab));
	}
	
	var i,j;
	var circle;
	var currentSnake;
	var message;
	var players = [];
	var highestActiveID;
	
	// Ici, on reçoit le broadcast du serveur
	ws.onmessage = function(msg) {
		
			message = JSON.parse(msg.data);
			
			tMess = message[0];
			// Reception de son id depuis le serveur
			if(tMess === "init")
			{
				myID = message[1];
				players[message[1]] = 0;
			}
			// Error case
			else if(myID === null )
			{
				console.error("ID not set : Error");
			}
			// Heartbeat du jeu
			else if(tMess === "game")
			{				
				allSnakesClient.snakes = message[1];
				highestActiveID = message[2];
				project.activeLayer.removeChildren();
				
				if(allSnakesClient.snakes.length != 0)
				{
					for(var i = 0;i < allSnakesClient.snakes.length;i++)
					{
						if(allSnakesClient.snakes[i] !== null)
						{
							currentSnake = allSnakesClient.snakes[i];
							players[i] = currentSnake.deaths;
							
							for(j = 0; j < currentSnake.body.length;j++) {
								
								circle = new Path.Circle({
									center : [currentSnake.body[j].center.x,currentSnake.body[j].center.y],
									radius : CIRCLE_RADIUS,
									fillColor : playerColor(i)
								});
							}
						}
					}
					
					htmlUpdate();
					view.update();
				}
			}	
	}
	
	function htmlUpdate() {
		var count = 0;
		var content = "";
		for(var i = 0; i < players.length;i++) 
		{
			if(allSnakesClient.snakes[i] === null)
			{
			}
			else
			{
				var line = "Player " + (i+1) + " : " + players[i] + " deaths </br>";
				content += line;
				count++;
			}
		}
		document.getElementById('playerNumber').innerHTML = '<p>Number of online players : ' + count + '</p>';
		document.getElementById('deathTab').innerHTML = content
	}