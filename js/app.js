// Enemies our player must avoid
var Enemy = function(row, speed) {
	// Variables applied to each of our instances go here,
	// we've provided one for you to get started
	this.x = -170;
	this.y = 55 + (80 * row);
	this.speed = speed;

	// The image/sprite for our enemies, this uses
	// a helper we've provided to easily load images
	this.sprite = 'images/car-enemy.gif';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	// You should multiply any movement by the dt parameter
	// which will ensure the game runs at the same speed for
	// all computers.
	this.x = this.x + this.speed * dt;
	if (this.x > 500)
		this.x = -100;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
	this.x = 210;
	this.y = 440;
	this.score = 0;

	this.sprite = 'images/chicken.png';
};

Player.prototype.handleInput = function(key) {

	if (key === 'left') {
		if (this.x > 100) {
			this.x = this.x - 100;
		}
	} else if (key === 'right') {
		if (this.x < 400) {
			this.x = this.x + 100;
		}
	} else if (key === 'up') {
		if (this.y > 0) {
			this.y = this.y - 80;
		}
	} else if (key === 'down') {
		if (this.y < 380) {
			this.y = this.y + 80;
		}
	}
};

Player.prototype.reset = function() {
	this.x = 210;
	this.y = 440;
};

Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function(dt) {
	allEnemies.forEach(function(enemy) {
		enemy.update(dt);
	});

	if (Math.round(player.y / 160) === 0) {
		player.reset();
		var allAnswers = [
			'To get to the other side.',
			'He thought it was egg-citing!',
			'To teach the other chickens how to play squash!',
			'To go boldly where no chicken has gone before...',
			'Just because ¯\\_(ツ)_/¯',
			'To show that my code for this project is working!!'
		];

		var joke = randomNumber(1, 7) - 1;
		var div = document.createElement('div');
		div.innerHTML = '<h2>' + allAnswers[joke] + "</h2>";
		document.body.appendChild(div);

		setTimeout(function() {
			document.body.removeChild(div);
		}, 3000);
	}
};

//Check Collisions with Enemy
Player.prototype.checkCollisions = function(allEnemies) {
	allEnemies.forEach(function(enemy) {
		if (Math.floor((enemy.x + 100) / 100) === Math.floor(player.x / 100) &&
			Math.floor(enemy.y / 80) === Math.floor(player.y / 80)) {
			player.reset();
		}
	});
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];

for (var s = 1; s < 6; s++) {
	var randomSpeed = randomNumber(5, 25) * 10;
	var randomRow = randomNumber(1, 4);
	allEnemies[s] = new Enemy(randomRow, randomSpeed);
}

var player = new Player();

function randomNumber(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};

	player.handleInput(allowedKeys[e.keyCode]);
});
