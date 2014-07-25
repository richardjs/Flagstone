'use strict';

var stoneWallTexture = new Image();
stoneWallTexture.src = 'img/william_wall.png';

var ballImage = new Image();
ballImage.src = 'img/ball.png';

var WALL_TYPES = {
	1: {
		texture: stoneWallTexture,
	},
}

function Sprite(x, y, image){
	this.x = x;
	this.y = y;
	this.image = image;
}

function Map(){
	this.size = 512;
	this.sprites = [];
	
	do{
		console.log('Generating map...');
		this.data = generateMap(this.size);	
		var flagCoord = placeFlag(this, {x: 0, y: this.size/2});
	}while(flagCoord === null);

	this.flag = new Sprite(flagCoord.x + .5, flagCoord.y + .5, ballImage);
	this.addSprite(this.flag);
}
Map.prototype.at = function(x, y){
	// Either pass two arguments or a point object (i.e. {x: 0, y: 0})
	if(y == undefined){
		y = x.y;
		x = x.x;
	}

	if(x < 0 || x >= this.size || y < 0 || y >= this.size){
		return undefined;
	}

	return WALL_TYPES[this.data[x][y]];
}
Map.prototype.addSprite = function(sprite){
	this.sprites.push(sprite);
}
Map.prototype.drawMap = function(){
	/* create a canvas and draw a map on it--mainly for dev work */
	var canvas = document.createElement('canvas');
	canvas.width = this.size;
	canvas.height = this.size;
	document.body.appendChild(canvas);

	var ctx = canvas.getContext('2d');
	ctx.fillStyle = '#fff';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	ctx.fillStyle = '#222';
	for(var x = 0; x < this.size; x++){
		for(var y = 0; y < this.size; y++){
			if(this.data[x][y]){
				ctx.fillRect(x, canvas.height-y-1, 1, 1);
			}
		}
	}

	ctx.fillStyle = '#f00';
	ctx.fillRect(this.flag.x-1, canvas.height - this.flag.y-1 - 1, 3, 3);
}

var map = new Map();
