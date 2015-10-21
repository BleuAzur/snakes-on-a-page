var MOD_SCREEN_HEIGHT = 432;
var MOD_SCREEN_LENGTH = 1072;

var CIRCLE_RADIUS = 8;
var BASE_SNAKE_LENGTH = 8;

function point(x,y) {
	this.x = x;
	this.y = y;
	this.add = function (v) {
		this.x = this.x + v.x;
		this.y = this.y + v.y;
	};
}
	
function vecteur(p1,p2) {
	this.x = p2.x - p1.x;
	this.y = p2.y - p1.y;
	this.length = Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2)); 
	
	this.normalize = function() {
		this.x = this.x / this.length;
		this.y = this.y / this.length;
	}
}

function circle(p) {
	this.center = p;
	this.update = function (v) {
		this.center.add(v)
	}
}

function snake() {
	console.log("BONJOUR JE CREE UN NOUVEAU SNAKE COUCOU LA FAMILLE");
	this.body = [];
	
	this.randomPoint = function () {
		return new point(100+Math.random()*MOD_SCREEN_LENGTH,100+Math.random()*MOD_SCREEN_HEIGHT);
	}
		
	this.direction = new vecteur(this.randomPoint(),this.randomPoint()).normalize();
	
	this.generateBody = function () {
		this.body[0] = new circle(this.randomPoint(),CIRCLE_RADIUS);
		console.log("BONJOUR JE GENERE LE BODY COUCOU LA FAMILLE");
		for(var i = 1;i < BASE_SNAKE_LENGTH;i++)
		{
			// Devrait créer un serpent dont les cercles sont décalés par rapport à la tête
			this.body[i] = this.body[i-1].center - this.direction;
		}
	}
		
		
	this.update = function (newPoint) {
		this.body[0].update(vecteur(this.body[i],newPoint));
		this.body.pop();
		this.body.unshift(this.body[0]);
	}
}

function allSnakes () {
	this.snakes = [];
	this.directions = [];
	
	this.update = function () {
		for(var i = 0;i < snakes.length;i++)
		{
			if(snakes[i].direction != directions[i])
			{
				snakes[i].update(directions[i]);
			}
		}
	}
	
	this.addSnake = function (id) {
		console.log("BONJOUR JE SUIS DANS LA FONCTION ADDSNAKE COUCOU LA FAMILLE");
		this.snakes[id] = new snake();
		this.snakes[id].generateBody();
		console.log("BONJOUR J'AI CREE UN NOUVEAU SNAKE COUCOU LA FAMILLE " + this.snakes[id]);
	}
}

if(typeof exports != 'undefined')
{	
	var exports = module.exports = {}
    module.exports.point = point;
	module.exports.vecteur=vecteur;
	module.exports.circle=circle;
	module.exports.snake=snake;
	module.exports.allSnakes=allSnakes;
}

