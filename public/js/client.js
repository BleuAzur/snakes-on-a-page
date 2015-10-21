
	// Ouverture du WebSocket client
	var ws = new WebSocket('wss://localhost:3250');
	var allSnakesClient = new allSnakes();
	var colors = ['#ff2020','#ffffff','#20ffff','#2020ff','#20ff20','#ffff20','#ff20ff','#d8f8a8'];
	
	function randomColor(id) {
		return colors[id%7];
	}
	
	var myID = null;
	var tMess;
	var vector;
	var mousePoint;
	
	function onMouseUp(event) {
		
		mousePoint = new point(event.point.x,event.point.y);
		// Génération d'un vecteur entre la pos. actuelle et la pos. désirée
		vector = new vecteur(mousePoint - allSnakesClient.snakes[myID]);
		vector.normalize();
		
		ws.send(myID,vector);
	}
	
	var i,j;
	var circle, circleCenter;
	var onScreenCircles = [];
	var currentSnake;
	
	function onFrame()
	{
		if(allSnakesClient.snakes.length != 0)
		{
			for(i = 0;i < allSnakesClient.snakes.length;i++)
			{
				currentSnake = allSnakesClient.snakes[i];
				
				for(j = 0; j < currentSnake.body.length;j++) {
					circle = new Path.Circle( {
						center : [currentSnake.body[j].center.x,currentSnake.body[j].center.y],
						radius : CIRCLE_RADIUS,
						strokeColor : randomColor(myID)
					});
				}
			}
		}
		else { console.log("allSnakesClient est vide");}
		
	}
	
	var message;
	
	// Ici, on reçoit le broadcast du serveur
	ws.onmessage = function(msg) {
		
			message = JSON.parse(msg.data);
			console.log("Message reçu");
			
			tMess = message[0];
				
			if(tMess === "init")
			{
				myID = message[1];
				console.log("ID Assigned : " + myID);
			}
			else if(myID === null )
			{
				console.error("ID not set : Fatal error");
			}
			else if(tMess === "game")
			{
				allSnakesClient.snakes = message[1];
			}
			
			
			
	}