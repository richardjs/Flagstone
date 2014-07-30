'use strict';

function Game(canvas){
	this.canvas = canvas;
	this.ctx = canvas.getContext('2d');
	this.lastTime = 0;
}
Game.prototype.start = function(){
	var gameloop = this;

	var camera = new Camera(map);
	window.camera = camera;

	var controller = new Controller(camera);

	function frame(time){
		var delta = time - gameloop.lastTime;
		gameloop.lastTime = time;

		camera.update(delta);
		controller.update(delta);

		if(map.flag
				&& Math.floor(camera.pos.x) == Math.floor(map.flag.x)
				&& Math.floor(camera.pos.y) == Math.floor(map.flag.y)){
			map.removeSprite(map.flag);
			map.flag = null;
		}
		if(!map.flag){
			var margin = 2;
			if(camera.pos.x < 0 - margin || camera.pos.x > map.size + margin
					&& camera.pos.y < 0 - margin || camera.pos.x > map.size + margin){
				window.setTimeout(function(){
					window.location = '/congratulations.html';
				}, 1000);
			}
		}

		camera.render(gameloop.canvas, gameloop.ctx);

		if(!map.flag){
			game.ctx.fillStyle = '#aaa';
			game.ctx.font = '8pt Courier';
			game.ctx.fillText('flag obtained', canvas.width - 90, 15);
		}

		window.requestAnimationFrame(frame);
	}
	window.requestAnimationFrame(frame);
}

window.addEventListener('load', function(){
	map = new Map();
	var game = new Game(document.getElementById('canvas'));
	game.start();
});
