'use strict';

var stoneWallTexture = new Image();
stoneWallTexture.src = 'img/william_wall.png';

var WALL_TYPES = {
	1: {
		texture: stoneWallTexture,
	},
}

function Map(){
	this.size = 100;
	
	this.data = [];
	for(var y = 0; y < this.size; y++){
		var row = [];
		if(y === 0 || y === this.size - 1){
			for(var x = 0; x < this.size; x++){
				if(x === Math.floor(this.size/2) && y === 0){
					row.push(undefined);
				}
				row.push(1);
			}
		}else{
			row[0] = 1;
			row[this.size - 1] = 1;
		}
		this.data.push(row);
	}

	this.sprites = [];
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

function Sprite(x, y, image){
	this.x = x;
	this.y = y;
	this.image = image;
}

var map = new Map();
