var snake = require("./snake");
var point = snake.point;
var vecteur = snake.vecteur;
console.log(snake);

function test1() {
	var p = new point(3,4);
	console.log(p);
	var v = new vecteur(1,0);
	console.log(v);
	p.add(v);
	if(p.x !== 4 || p.y !== 4) {
		console.error("Attendu [4,4] , recu " + JSON.stringify(p));
	}
}

test1();

var p2 = new point(3,4);
var v2 = new vecteur(0,1);
p2.add(v2);
if(p2.x !== 3 || p2.y !== 5) {
	console.error("Attendu [3.5,3.5] , recu " + JSON.stringify(p2));
}

// TODO Ajouter des nouveaux tests une fois le modèle fini