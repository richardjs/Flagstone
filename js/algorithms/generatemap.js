function generateMap(size){
	var data = [];
	for(var y = 0; y < size; y++){
		var row = [];
		if(y === 0 || y === size - 1){
			for(var x = 0; x < size; x++){
				if(x === Math.floor(size/2) && y === 0){
					row.push(undefined);
				}
				row.push(1);
			}
		}else{
			row[0] = 1;
			row[size - 1] = 1;
		}
		data.push(row);
	}

	// Fill with squares of walls
	for(var i = 0; i < size*7; i++){
		var x_pos = Math.floor(Math.random() * size);
		var y_pos = Math.floor(Math.random() * size);
		var width = Math.floor(Math.random() * size/32);
		var height = Math.floor(Math.random() * size/32);

		for(var x = x_pos; x < x_pos + width && x < size; x++){
			for(var y = y_pos; y < y_pos + height && y < size; y++){
				if(Math.random() < .05){
					continue;
				}
				data[y][x] = 1;
			}
		}
	}
		
	return data;
}
