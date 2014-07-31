function randomColor(){
	var red = Math.floor(Math.random() * 256);
	var green = Math.floor(Math.random() * 256);
	var blue = Math.floor(Math.random() * 256);
	return 'rgb('+red+','+green+','+blue+')';
}

function solid(canvas, ctx){
	ctx.fillStyle = randomColor();
	ctx.fillRect(15, 5, 34, 54);
}

function horizontalStripes(canvas, ctx){
	var stripes = Math.floor(Math.random()*3 + 2);
	var stripeHeight = 54/stripes;
	for(var i = 0; i < stripes; i++){
		ctx.fillStyle = randomColor();
		ctx.fillRect(15, 5 + stripeHeight*i, 34, stripeHeight);
	}
}

function verticalStripes(canvas, ctx){
	var stripes = Math.floor(Math.random()*3 + 2);
	var stripeWidth = 34/stripes;
	for(var i = 0; i < stripes; i++){
		ctx.fillStyle = randomColor();
		ctx.fillRect(15 + stripeWidth*i, 5, stripeWidth, 54);
	}
}

function drawFlag(canvas, ctx){
	flags = [
		solid,
		horizontalStripes,
		verticalStripes
	]

	return flags[Math.floor(Math.random() * flags.length)](canvas, ctx);
}

function makeFlagTexture(){
	var canvas = document.createElement('canvas');
	canvas.width = stoneWallTexture.width;
	canvas.height = stoneWallTexture.height;
	var ctx = canvas.getContext('2d');

	ctx.drawImage(stoneWallTexture, 0, 0);
	drawFlag(canvas, ctx);

	var image = new Image();
	image.src = canvas.toDataURL('img/png');
	return image;
}

function flagWalls(map){
	var flagAreas = Math.floor(map.size/32);
	var areas = [];
	for(var i = 0; i < map.size; i++){
		areas[i] = [];
	}
	for(var area = 2; area < flagAreas + 2; area++){
		var wallTexture = makeFlagTexture();
		map.wallTypes[area] = {
			texture: wallTexture
		}

		var start = {};
		do{
			start.x = Math.floor(Math.random() * map.size);
			start.y = Math.floor(Math.random() * map.size);
		}while(map.data[start.x][start.y] && areas[start.x][start.y]);

		var totalArea = Math.floor(Math.random() * (Math.pow(map.size, 2) / flagAreas))
		var remainingArea = totalArea;
		var coords = [start]
		while(remainingArea && coords.length){
			next = [];
			for(var i = 0; i < coords.length; i++){
				var coord = coords[i];
				var neighbors = [
					{x: coord.x - 1, y: coord.y},
					{x: coord.x + 1, y: coord.y},
					{x: coord.x, y: coord.y - 1},
					{x: coord.x, y: coord.y + 1}
				]
				for(var j = 0; j < neighbors.length; j++){
					var neighbor = neighbors[j];
					if(neighbor.x < 0 || neighbor.x >= map.size
							|| neighbor.y < 0 || neighbor.y >= map.size){
						continue;
					}
					if(areas[neighbor.x][neighbor.y]){
						continue;
					}
					if(map.data[neighbor.x][neighbor.y]){
						if(Math.random() < .1){
							map.data[neighbor.x][neighbor.y] = area;
						}
						continue;
					}
					
					if(remainingArea){
						areas[neighbor.x][neighbor.y] = area;
						remainingArea--;
					}
					next.push(neighbor);
				}
			}
			coords = next;
		}
		if(remainingArea){
			console.log('area '+area+' ran out of room with '+Math.floor(100*remainingArea/totalArea)+'% remaining');
		}
	}
	map.areas = areas;
}
