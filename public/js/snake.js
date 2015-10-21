var MOD_SCREEN_HEIGHT = 432;
var MOD_SCREEN_LENGTH = 1072;

var CIRCLE_RADIUS = 8;
var BASE_SNAKE_LENGTH = 8;
var SPEED = 10;

function point(x,y) {
	this.x = x;
	this.y = y;
	
	this.add = function (v) {
		this.x = this.x + (v.x*SPEED);
		this.y = this.y + (v.y*SPEED);
	};
}
	
function vecteur(p1,p2) {
	this.x = p2.x - p1.x;
	this.y = p2.y - p1.y;
	this.length = Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2)); 
	
	this.normalize = function() {
		this.x = this.x / this.length;
		this.y = this.y / this.length;
		this.length = 1;
	}
}

function circle(p) {
	this.center = p;
	this.update = function (v) {
		this.center.add(v)
	}
}

function snake() {
	this.body = [];
	
	this.randomPoint = function () {
		return new point(100+Math.random()*MOD_SCREEN_LENGTH,100+Math.random()*MOD_SCREEN_HEIGHT);
	}
		
	this.direction = new vecteur(this.randomPoint(),this.randomPoint()).normalize();
	
	this.generateBody = function () {
		this.body[0] = new circle(this.randomPoint(),CIRCLE_RADIUS);
		for(var i = 1;i < BASE_SNAKE_LENGTH;i++)
		{
			var p = new point(this.body[i-1].center.x + 1,this.body[i-1].center.y + 1);
			this.body[i] = new circle(p);
		}
	}
		
		
	this.update = function (vecteur) {
		
		for(var i = this.body.length - 1 ;i > 0;i--)
		{
			this.body[i].center.x = this.body[i-1].center.x;
			this.body[i].center.y = this.body[i-1].center.y;
		}
		this.body[0].update(vecteur);
	}
}

function allSnakes () {
	this.snakes = [];
	this.directions = [];
	
	this.update = function () {
		for(var i = 0;i < this.snakes.length;i++)
		{
			if(this.snakes[i].direction != this.directions[i])
			{
				this.snakes[i].update(this.directions[i]);
				
			}
		}
	}
	
	this.addSnake = function (id) {
		this.snakes[id] = new snake();
		this.snakes[id].generateBody();
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

