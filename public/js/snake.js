module.exports.point=point;
module.exports.vecteur=vecteur;
module.exports.circle=circle;
module.exports.snake=snake;
module.exports.allSnakes=allSnakes;

var MODSCREENHEIGHT = 432;
var MODSCREENLENGTH = 1072;

var CIRCLERADIUS = 8;
var BASESNAKELENGTH = 8;

function point(x,y) {
	this.x = x;
	this.y = y;
	this.add = function (v) {
		this.x = this.x + v.x;
		this.y = this.y + v.y;
	};
}

function vecteur(x,y) {
	this.x = x;
	this.y = y;
}

function circle(p,r) {
	this.center = p;
	this.radius = r;
	this.update = function (v) {
		this.center.add(v)
	}
}

function snake (id) {
	this.body = [];
	this.direction = randomPoint;
	this.id = id;
	
	this.randomLength = function () {
		return 100+Math.random()*MODSCREENLENGTH;
	}
	this.randomHeight = function () {
		return 100+Math.random()*MODSCREENHEIGHT;
	}
	// Trouver comment faire fonctionner ce système de vecteur pour déplacer des points
	this.randomPoint = function () {
		return point(randomLength,randomHeight);
	}
	
	this.generateBody = function () {
		this.body[0] = circle(randomPoint,CIRCLERADIUS);
		for(var i = 1;i < BASESNAKELENGTH;i++)
		{
			// Devrait créer un serpent dont les cercles sont décalés par rapport à la tête
			this.body[i] = this.body[i-1].center - this.direction;
		}
	}
	this.update = function (v) {
		//TODO
	}
}

function allSnakes () {
	this.snakes = [];
	
	this.update = function () {
		
	}
	
	this.addSnake = function (id) {
		this.snakes[id] = snake(id);
		thi
	}
}