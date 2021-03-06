'use strict';

var stoneWallTexture = document.getElementById('stoneWallTexture');
var ballImage = document.getElementById('ballImage');


function Sprite(x, y, image){
	this.x = x;
	this.y = y;
	this.image = image;
}


function Map(){
	this.size = 512;
	this.sprites = [];

	this.wallTypes = {
		1: {
			texture: stoneWallTexture,
		}
	}
	
	do{
		console.log('Generating map...');
		this.data = generateMap(this.size);	
		var flagCoord = placeFlag(this, {x: 0, y: this.size/2});
	}while(flagCoord === null);
	flagWalls(this);

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

	return this.wallTypes[this.data[x][y]];
}
Map.prototype.addSprite = function(sprite){
	this.sprites.push(sprite);
}
Map.prototype.removeSprite = function(sprite){
	this.sprites.splice(this.sprites.indexOf(sprite));
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

	var areaColors = []
	for(var x = 0; x < this.size; x++){
		for(var y = 0; y < this.size; y++){
			if(this.data[x][y]){
				ctx.fillStyle = '#222';
				ctx.fillRect(x, canvas.height-y-1, 1, 1);
			}
			else if(this.areas[x][y]){
				var area = this.areas[x][y];
				if(!areaColors[area]){
					areaColors[area] = randomColor();
				}
				ctx.fillStyle = areaColors[area];
				ctx.fillRect(x, canvas.height-y-1, 1, 1);
			}
		}
	}

	ctx.fillStyle = '#f00';
	ctx.fillRect(this.flag.x-1, canvas.height - this.flag.y-1 - 1, 3, 3);
}

var map;
