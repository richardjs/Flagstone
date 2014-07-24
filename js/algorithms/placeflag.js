function placeFlag(map, start){
	// If there's a wall at the start, return null
	if(map.data[start.x][start.y]){
		return null;
	}

	var distances = [];
	for(var i = 0; i < map.size; i++){
		distances[i] = [];
	}

	var distance = 0;
	var coords = [start];
	var farthestCoord;
	do{
		var next_coords = [];
		distance += 1;

		for(var i = 0; i < coords.length; i++){
			var coord = coords[i];
			var neighbors = [
				{x: coord.x - 1, y: coord.y},
				{x: coord.x + 1, y: coord.y},
				{x: coord.x, y: coord.y - 1},
				{x: coord.x, y: coord.y + 1}
			];
			for(var j = 0; j < neighbors.length; j++){
				var neighbor = neighbors[j];
				if(neighbor.x < 0 || neighbor.x >= map.size
						|| neighbor.y < 0 || neighbor.y >= map.size){
					continue;
				}
				if(map.data[neighbor.x][neighbor.y]){
					continue;
				}
				if(distances[neighbor.x][neighbor.y]){
					continue;
				}

				distances[neighbor.x][neighbor.y] = distance;
				next_coords.push(neighbor);
				farthestCoord = neighbor;
			}
		}
		window.distances = distances;
		coords = next_coords;
	}while(coords.length);

	if(distance < map.size * 2){
		return null;
	}

	console.log("Distance to flag: " + distance);
	return farthestCoord;
}
