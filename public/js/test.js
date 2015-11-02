var model = require("./snake");
var point = model.point;
var vecteur = model.vecteur;
var Snake = model.snake;

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

//test3();
// TODO Ajouter des nouveaux tests une fois le modèle fini

function test4() {
	var p1 = new point(1,0);
	var p2 = new point(2,0);
	var v1 = new vecteur(p1,p2);

		console.log(v1.x);
		console.log(v1.y);
	var snake = new Snake();
	snake.generateBody();
	console.log(snake.body[0].center.x + " + " + snake.body[0].center.y);
	var tempx = snake.body[0].center.x;
	snake.update(v1);
	if(snake.body[0].center.x !== tempx)
	{
		console.error(snake.body[0].center.x + " + " + snake.body[0].center.y);
	}
}

//test4();

function test5() {
	var p1 = new point(1,0);
	var p2 = new point(2,0);
	var v1 = new vecteur(p1,p2);

	console.log(v1.x);
	console.log(v1.y);
		
	var snake = new Snake();
	snake.generateBody();
	
	var x0 = snake.body[0].center.x;
	
	console.log(snake.body[0].center.x + " + " + snake.body[0].center.y);
	//console.log(snake.body[1].center.x + " + " + snake.body[1].center.y);
	console.log("UPDATE");
	snake.update(v1);

	
	console.log(snake.body[0].center.x + " + " + snake.body[0].center.y);
	//console.log(snake.body[1].center.x + " + " + snake.body[1].center.y);
	
	if(snake.body[0].center.x != x0 + 10)
	{
		console.error("Attendu ["+ (x0+10) +"], recu " + snake.body[0].center.x);
	}
	else {console.log("passed");}
	
	if(snake.body[1].center.x != x0) {
			console.error("Attendu ["+ (x0) +"], recu " + snake.body[1].center.x);
	}
	else {console.log("passed");}
}

//test5();
