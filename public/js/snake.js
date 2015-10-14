module.exports.point=point;
module.exports.vecteur=vecteur;
module.exports.circle=circle;
module.exports.snake=snake;
module.exports.allSnakes=allSnakes;

var MOD_SCREEN_HEIGHT = 432;
var MOD_SCREEN_LENGTH = 1072;

var CIRCLE_RADIUS = 8;
var BASE_SNAKE_LENGTH = 8;
var SPEED = 10; // Untested value

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
		return 100+Math.random()*MOD_SCREEN_LENGTH;
	}
	this.randomHeight = function () {
		return 100+Math.random()*MOD_SCREEN_HEIGHT;
	}
	// Trouver comment faire fonctionner ce système de vecteur pour déplacer des points
	this.randomPoint = function () {
		return point(randomLength,randomHeight);
	}
	
	this.generateBody = function () {
		this.body[0] = circle(randomPoint,CIRCLE_RADIUS);
		for(var i = 1;i < BASE_SNAKE_LENGTH;i++)
		{
			// Devrait créer un serpent dont les cercles sont décalés par rapport à la tête
			this.body[i] = this.body[i-1].center - this.direction;
		}
	}
	this.update = function () {
		//TODO
	}
}

function allSnakes () {
	this.snakes = [];
	
	this.update = function () {
		for(var i = 0;i < snakes.length;i++)
		{
			snakes[i].update();
		}
	}
	
	// Unfinished
	this.addSnake = function (id) {
		this.snakes[id] = snake(id);
	}
}