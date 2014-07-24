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

var map = new Map();
