
	// Ouverture du WebSocket client
	var ws = new WebSocket('wss://localhost:3250');
	var allSnakesClient = new allSnakes();
	var colors = ['#ff2020','#000000','#20ffff','#2020ff','#20ff20','#ffff20','#ff20ff','#d8f8a8'];
	
	function playerColor(id) {
		return colors[id%7];
	}
	
	var myID = null;
	var tMess;
	var vector;
	var mousePoint;
	var currentPoint;
	var tab =[];
	
	function onMouseDown(event) {
		
		mousePoint = new point(event.point.x,event.point.y);
		// G�n�ration d'un vecteur entre la pos. actuelle et la pos. d�sir�e
		currentPoint = new point(allSnakesClient.snakes[myID].body[0].center.x,allSnakesClient.snakes[myID].body[0].center.y);
		console.log(currentPoint);
		console.log(mousePoint);
		vector = new vecteur(currentPoint, mousePoint);
		vector.normalize();
		console.log(vector);
		tab[0] = myID;
		tab[1] = vector;
		ws.send(JSON.stringify(tab));
	}
	
	var i,j;
	var circle;
	var currentSnake;
	var message;
	var previousCircles = [];
	
	// Ici, on re�oit le broadcast du serveur
	ws.onmessage = function(msg) {
		
			message = JSON.parse(msg.data);
			console.log("Message re�u");
			
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
				
				project.activeLayer.removeChildren();
				
				if(allSnakesClient.snakes.length != 0)
				{
					for(i = 0;i < allSnakesClient.snakes.length;i++)
					{
						currentSnake = allSnakesClient.snakes[i];
						
						for(j = 0; j < currentSnake.body.length;j++) {
							
							circle = new Path.Circle({
								center : [currentSnake.body[j].center.x,currentSnake.body[j].center.y],
								radius : CIRCLE_RADIUS,
								fillColor : playerColor(i)
							});
						}
					}
				}
				else { console.log("allSnakesClient est vide");}
				
				view.update();
		}
			
	}