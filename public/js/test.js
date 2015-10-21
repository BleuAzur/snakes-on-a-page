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

//test1();


function test3() {
	var p1 = new point(50,50);
	var p2 = new point(100,99);
	var v1 = new vecteur(p1,p2);
	console.log(v1);
	v1.normalize();
	console.log(v1);
	p1.add(v1);
	console.error("Attendu [51,50] , recu " + JSON.stringify(p1));
}

test3();
// TODO Ajouter des nouveaux tests une fois le modèle fini