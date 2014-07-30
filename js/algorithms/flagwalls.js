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

var makeFlagTexture(){
	var canvas = document.createElement('canvas');
	canvas.width = stoneWallTexture.width;
	canvas.height = stoneWallTexture.height;
	var ctx = canvas.getContext('2d');

	ctx.drawImage(stoneWallTexture, 0, 0);
	drawFlag(canvas, ctx);

	return canvas.toDataURL('img/png');
}

function flagWalls(map){
	
}
