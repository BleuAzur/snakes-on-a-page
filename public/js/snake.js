var SCREEN_HEIGHT = 632;
var SCREEN_LENGTH = 1272;
var OFFSET = 100;

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
	
	this.reverse = function() {
		this.x = 0 - this.x;
		this.y = 0 - this.y;
	}
}

function circle(p) {
	this.center = p;
	this.update = function (v) {
		
		// Check de collision avec les bords du canvas
		if(this.center.x > SCREEN_LENGTH)
		{
			//console.log("Collision RIGHT BORDER");
			this.center.x = 0;
		}
		else if(this.center.y > SCREEN_HEIGHT)
		{
			//console.log("Collision TOP BORDER");
			this.center.y = 0;
		}
		else if(this.center.x < 0)
		{
			//console.log("Collision LEFT BORDER");
			this.center.x = SCREEN_LENGTH;
		}
		else if(this.center.y < 0)
		{
			//console.log("Collision BOTTOM BORDER");
			this.center.y = SCREEN_HEIGHT;
		}
		
		this.center.add(v);
	}
}

function snake() {
	this.body = [];
	this.deaths = 0;
	
	this.randomPoint = function () {
		// On veut éviter de commencer un serpent trop près du bord du tableau
		return new point(100+Math.random()*(SCREEN_LENGTH-OFFSET),100+Math.random()*(SCREEN_HEIGHT-OFFSET));
	}
		
	this.generateDir = function () {
		var newDir = new vecteur(this.randomPoint(),this.randomPoint());
		newDir.normalize();
		return newDir;
	}
	
	var direction = this.generateDir();
	
	this.generateBody = function () {
		this.body[0] = new circle(this.randomPoint(),CIRCLE_RADIUS);
		direction = this.generateDir();
		direction.reverse();
		for(var i = 1;i < BASE_SNAKE_LENGTH;i++)
		{
			var p = new point(this.body[i-1].center.x,this.body[i-1].center.y);
			p.add(direction); 
			this.body[i] = new circle(p);
		}
		direction.reverse();
	}
		
		
	this.update = function (vecteur) {
		
		for(var i = this.body.length - 1 ;i > 0;i--)
		{
			this.body[i].center.x = this.body[i-1].center.x;
			this.body[i].center.y = this.body[i-1].center.y;
		}
		if(vecteur !== null)
		{
			this.body[0].update(vecteur);
			direction = vecteur;
		}
		else {
			this.body[0].update(direction);
		}
		
	}
	
	this.detectCollisions = function(snakes) {
		var l1 = snakes.length;
		var thisHead = this.body[0];
		var l2,distance;
		var collision = false;
		
		for(var i = 0;i < l1;i++)
		{
			var j = 0;
			if(snakes[i] === this)
			{
				// Pour ne pas calculer l'auto-collision des premiers cercles d'un snake (se chevauchant normalement)
				j = 2;
			}
		
			l2 = snakes[i].body.length;
			for(j;j < l2;j++)
			{
				// Calcul distance relative
				distance = Math.sqrt(
					((thisHead.center.x - snakes[i].body[j].center.x) * (thisHead.center.x - snakes[i].body[j].center.x))
					+ ((thisHead.center.y - snakes[i].body[j].center.y) * (thisHead.center.y - snakes[i].body[j].center.y))
					);
				if(distance < CIRCLE_RADIUS)
				{
					collision = true;
				}
			}
		}
		
		if(collision === true)
		{
			// On incrémente le nombre de morts et on réinitialise le serpent
			this.deaths++;
			this.generateBody();
		}
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
			else {this.snakes[i].update(null);}
		}
		// Collision check iteration (Synchronisation des updates avant le check)
		for(var i = 0;i < this.snakes.length;i++)
		{
			if(this.snakes[i].direction != this.directions[i])
			{
				this.snakes[i].detectCollisions(this.snakes);
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

