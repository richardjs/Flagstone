'use strict';

HTMLCanvasElement.prototype.requestPointerLock = (
	HTMLCanvasElement.prototype.requestPointerLock ||
	HTMLCanvasElement.prototype.mozRequestPointerLock ||
	HTMLCanvasElement.prototype.webkitRequestPointerLock
);
