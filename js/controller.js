'use strict';

function Controller(camera){
	this.camera = camera;
	this.rotateDir = 0;

	this.states = {
		left: false,
		right: false,
		up: false,
		down: false,
		strafe_left: false,
		strafe_right: false
	}
	
	var controller = this;
	document.addEventListener('keydown', function(event){
		switch(event.keyCode){
			case 39:
				controller.states.right = true
				break;
			case 37:
				controller.states.left = true
				break;
			case 38:
			case 87:
				controller.states.up = true;
				break;
			case 40:
			case 83:
				controller.states.down = true;
				break;
			case 65:
				controller.states.strafe_left = true;
				break;
			case 68:
				controller.states.strafe_right = true;
				break
			case 77:
				canvas.requestPointerLock();
				document.addEventListener('mousemove', function(event){
					var movementX = (
						event.movementX ||
						event.mozMovementX ||
						event.webkitMovementX ||
						0
					)

					controller.camera.rotate((-movementX/3000) * 2*Math.PI);

				}, false);
				break;
		}
	});
	document.addEventListener('keyup', function(event){
		switch(event.keyCode){
			case 39:
				controller.states.right = false;
				break;
			case 37:
				controller.states.left = false;
				break;
			case 38:
			case 87:
				controller.states.up = false;
				break;
			case 40:
			case 83:
				controller.states.down = false;
				break;
			case 65:
				controller.states.strafe_left = false;
				break;
			case 68:
				controller.states.strafe_right = false;
				break;
		}
	});
}

Controller.prototype.ROTATE_SPEED = 2*Math.PI/3/1000;
Controller.prototype.MOVE_SPEED = 7/1000;
Controller.prototype.STRAFE_SPEED = 3/1000;

Controller.prototype.update = function(delta){
	var camera = this.camera;
	var map = camera.map;
	
	if(this.states.right){
		camera.rotate(-this.ROTATE_SPEED * delta);
	}
	if(this.states.left){
		camera.rotate(this.ROTATE_SPEED * delta);
	}
	if(this.states.up){
		if(!map.at(Math.floor(camera.pos.x + camera.dir.x*this.MOVE_SPEED*delta), Math.floor(camera.pos.y))){
			camera.pos.x += camera.dir.x * this.MOVE_SPEED * delta;
		}
		if(!map.at(Math.floor(camera.pos.x), Math.floor(camera.pos.y + camera.dir.y*this.MOVE_SPEED*delta))){
			camera.pos.y += camera.dir.y * this.MOVE_SPEED * delta;
		}
	}
	if(this.states.down){
		if(!map.at(Math.floor(camera.pos.x - camera.dir.x*this.MOVE_SPEED*delta), Math.floor(camera.pos.y))){
			camera.pos.x -= camera.dir.x * this.MOVE_SPEED * delta;
		}
		if(!map.at(Math.floor(camera.pos.x), Math.floor(camera.pos.y - camera.dir.y*this.MOVE_SPEED*delta))){
			camera.pos.y -= camera.dir.y * this.MOVE_SPEED * delta;
		}
	}
	// TODO: this strafing code could be cleaned up
	if(this.states.strafe_left){
		camera.rotate(Math.PI/2);
		if(!map.at(Math.floor(camera.pos.x + camera.dir.x*this.MOVE_SPEED*delta), Math.floor(camera.pos.y))){
			camera.pos.x += camera.dir.x * this.STRAFE_SPEED * delta;
		}
		if(!map.at(Math.floor(camera.pos.x), Math.floor(camera.pos.y + camera.dir.y*this.MOVE_SPEED*delta))){
			camera.pos.y += camera.dir.y * this.STRAFE_SPEED * delta;
		}
		camera.rotate(-Math.PI/2);
	}
	if(this.states.strafe_right){
		camera.rotate(-Math.PI/2);
		if(!map.at(Math.floor(camera.pos.x + camera.dir.x*this.MOVE_SPEED*delta), Math.floor(camera.pos.y))){
			camera.pos.x += camera.dir.x * this.STRAFE_SPEED * delta;
		}
		if(!map.at(Math.floor(camera.pos.x), Math.floor(camera.pos.y + camera.dir.y*this.MOVE_SPEED*delta))){
			camera.pos.y += camera.dir.y * this.STRAFE_SPEED * delta;
		}
		camera.rotate(Math.PI/2);
	}
}
