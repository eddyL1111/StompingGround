/** Grid Constructor. */
function Grid(rowSize, colSize) {
	this.id = "Board";
	this.rowSize = rowSize;
	this.colSize = colSize;
	this.W = 280;
	this.H = 380;
	this.array = [];
	this.count = 0;
	
}
/** Grid's features. */
var gridEnum = {
	posX: 20,	// Starting X position of the grid
	posY: 90,	
	gapX: 2,	// Gap width between boxes
	gapY: 2,
}


/** Draws the grid. 
		PARAM: grid object
		Changed the draw function to be more generic called in indexCompiled.html
*/

function drawLevel(grid, id, freq ) {
	freq = parseInt(freq);
	var width = Math.floor(grid.W / grid.rowSize);
	var height = Math.floor(grid.H / grid.colSize);
	var totalX = width + gridEnum.gapX;	// position of the next box in the same row
	var totalY = height + gridEnum.gapY;	// position of the next row	
	var rep = 0;
	

	
	if(id == '#level1') {
		score = createScore(3,8);
	} else if(id == '#level2') {
		score = createScore(4,8);
	} else if(id == '#level3') {
		score = createScore(4,8);
	}
	/* Creates the boxes depending on the number of rows. */
	for(var row=0, startY=gridEnum.posY; row < grid.rowSize; row++, startY += totalY) {
		grid.array[row] = [];	// Initializing the array
		/* Creates the boxes depending on the number of columns. */
		
		for(var col=0, startX=gridEnum.posX; col < grid.colSize; col++, startX += totalX) {
			if(rep < freq) {
				box =  DivBox2(startX, startY, width, height, row, col, grid.array,grid.count, totalX, totalY);
				rep++;
			}
			else {
				box =  DivBox(startX, startY, width, height, row, col, grid.array,grid.count, totalX, totalY);
				rep = 0;
			}
			grid.array[row][col] = box;
			$(id).append(box);
		}
		
	}
	//We create a player and start him on the 1,1 position.
	var player = createPlayer(1,1, grid, width, height);
	$(id).append(player);
}
