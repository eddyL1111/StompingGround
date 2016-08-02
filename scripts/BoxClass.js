/** Box <button> constructor for the level grid. */
function DivBox(startX, startY, width, height, row, col,array,counter, rX, rY) {

	var $name = "divBox_" + row + "_" + col;
	var $div = $("<button>", {
		id: $name,
		posX: row,
		posY: col,
		gapX: rX, //Used to determine that you are moving exactly by 1 block in the X axis
		gapY: rY, //This is for Y axis
		grid:array, //Used to refer back to the array to change surrounding blocks.
		class: "divBoxes ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only",
		type: "button",
		style:  
			'position:absolute; z-index:1' + // z-index defaul is 1
			';opacity: 1'+
			';background-image: url(images/InActiveTile.png)' +
			';background-size: ' + width + 'px ' + height + 'px' +
			'; top:' + startY + 'px' +
			'; left:' + startX + 'px' +
			'; width:' + width + 'px' +
			';height:' + height + 'px'
	});
	return $div;
}
/*Added a secondary divbox method to draw active tiles*/
function DivBox2(startX, startY, width, height, row, col,array,counter, rX, rY) {

	var $name = "divBox_" + row + "_" + col;
	var $div = $("<button>", {
		id: $name,
		posX: row,
		posY: col,
		gapX: rX, //Used to determine that you are moving exactly by 1 block in the X axis
		gapY: rY, //This is for Y axis
		grid:array, //Used to refer back to the array to change surrounding blocks.
		class: "divBoxes2 ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only",
		type: "button",
		style:  
			'position:absolute; z-index:1' + // z-index defaul is 1
			';opacity: 1'+
			';background-image: url(images/ActiveTile.png)' +
			';background-size: ' + width + 'px ' + height + 'px' +
			'; top:' + startY + 'px' +
			'; left:' + startX + 'px' +
			'; width:' + width + 'px' +
			';height:' + height + 'px'
	});
	return $div;
}
/** Function to create the player. */
function createPlayer(row, col, grid, width, height) {
	var currBox = grid.array[row][col];
	if(currBox == undefined) {
		document.write("Not working");
	}
	var posX = parseInt($(currBox).css('left')) ;
	var posY = parseInt($(currBox).css('top'));
	var x = $(currBox).css('posX');
	var y = $(currBox).css('posY');
	var $name = "Player";
	var imgPosX = posX;
	var $player = $("<img>", {
		id: $name,
		draggable: false,
		posX: x,
		posY: y,
		src: "images/Char.png",
		style:
			'position:absolute; z-index:1' + 
			'; top:' + posY  + 'px'+
			'; left:' + (posX) + 'px' +
			'; width:' + (width) + 'px' +
			'; height:' + (height*0.8) + 'px'
	});
	
	return $player;
}

/** Box's features. */
var boxEnum = {
	width: 90,
	height: 100,
}
function move(newX, newY, grid, newBox, countKeeper) {
	
	var currX = parseInt($("#Player").css('left'));
	var currY = parseInt($("#Player").css('top'));
	var gapX = $(newBox).attr('gapX');
	var gapY = $(newBox).attr('gapY');
	
	newX = parseInt(newX);
	newY = parseInt(newY);
	//Checks if you click in your current position then we don't count it as a move
	if(((newX-currX) ==0) && ((newY-currY)==0)) {
		alert("Not a valid move");
	}
	//Checks that player is attempting to move by 1 block right or left
	else if((Math.abs(newX-currX) == gapX) && (newY-currY) == 0) {
		//alert("A valid move");
		
		/* Player's movement animation. */
		if(currX < newX) { // Moving right
			movement('right', newX, newY, newBox, grid, countKeeper); /** ArtStyle.js */
		}else {	// Moving left
			movement('left', newX, newY, newBox, grid, countKeeper); /** ArtStyle.js */
		}
		
		/* !!! This stuff was moved in movement function(ArtStyle.js )
			// $("#Player").css('left',newX);
			// colorSwap(newBox, grid, countKeeper);
		*/
	}
	//Checks that a player is attempting to move by 1 block up or down
	else if((Math.abs(newY-currY) == gapY) && (newX-currX) == 0) {
		//alert("A valid move");
			
		/* Player's movement animation. */
		if(currY > newY) { // Moving up
			movement('up', newX, newY, newBox, grid, countKeeper); /** ArtStyle.js */
		}else {	// Moving down
			movement('down', newX, newY, newBox, grid, countKeeper); /** ArtStyle.js */
		}
		
		/* !!! This stuff was moved in movement function(ArtStyle.js )
			$("#Player").css('top',newY);
			colorSwap(newBox, grid, countKeeper);
		*/
	}
	//Checks that a player is moving diagonally
	else if((Math.abs(newY-currY) == gapY) && (Math.abs(newX-currX) == gapX)) {	
		/* Player's movement animation. */
		if(currY > newY && currX < newX) {  // Moving top-right
			movement('topRight', newX, newY, newBox, grid, countKeeper);
		}else if(currY > newY && currX > newX) { // Moving top-left
			movement('topLeft', newX, newY, newBox, grid, countKeeper);
		}else if(currY < newY && currX < newX) {	// Moving bot-right
			movement('botRight', newX, newY, newBox, grid, countKeeper);
		}else if(currY < newY && currX > newX) {	// Moving bot-left
			movement('botLeft', newX, newY, newBox, grid, countKeeper);
		}
		
		/* !!! This stuff was moved in movement function(ArtStyle.js )
			$("#Player").css('top',newY);
			$("#Player").css('left',newX);
			colorSwap(newBox, grid, countKeeper);
		*/
	}
	//If they click too far from the player current position then its not valid
	else{
		alert("Too far to move");
	}

}
/**
	Determines which blocks will need to swap color.
*/
function colorSwap(newBox,grid, countKeeper) {
	
	var row = parseInt($(newBox).attr('posX'));
	var col = parseInt($(newBox).attr('posY'));
	//Just to check the turn counter.
	
	/*Top left corner*/
	if(row==0 && col ==0) {
		//swap(grid[row][col]);
		swap(grid[row+1][col]);
		swap(grid[row][col+1]);
		countKeeper.count = countKeeper.count+1;
	}
	/*Top right corner*/
	else if(row == 0 && (col == (grid.length-1))) {
		//swap(grid[row][col]);
		swap(grid[row+1][col]);
		swap(grid[row][col-1]);
		countKeeper.count = countKeeper.count+1;
	}
	/*Top middle*/
	else if(row ==0 && (col < (grid.length-1))) {
		//swap(grid[row][col]);
		swap(grid[row][col+1]);
		swap(grid[row][col-1]);
		swap(grid[row+1][col]);
		countKeeper.count = countKeeper.count+1;
	}
	/*Left corner, middle*/
	else if( (row < (grid.length-1)) && col == 0 ) {
		//swap(grid[row][col]);
		swap(grid[row+1][col]);
		swap(grid[row-1][col]);
		swap(grid[row][col+1]);
		countKeeper.count = countKeeper.count+1;
	}
	/*Bottom left corner*/
	else if((row == (grid.length-1)) && (col == 0)) {
		//swap(grid[row][col]);
		swap(grid[row][col+1]);
		swap(grid[row-1][col]);
		countKeeper.count = countKeeper.count+1;
	}
	/*Bottom right corner*/
	else if((row == (grid.length-1)) && (col == (grid.length-1))) {
		//swap(grid[row][col]);
		swap(grid[row][col-1]);
		swap(grid[row-1][col]);
		countKeeper.count = countKeeper.count+1;
	}
	/*Bottom mid*/
	else if((row == (grid.length-1)) && (col < (grid.length-1))) {
		//swap(grid[row][col]);
		swap(grid[row][col-1]);
		swap(grid[row][col+1]);
		swap(grid[row-1][col]);
		countKeeper.count = countKeeper.count+1;
	}
	/*Right corner mid*/
	else if((row < (grid.length -1)) && (col == (grid.length-1))) {
		//swap(grid[row][col]);
		swap(grid[row-1][col]);
		swap(grid[row+1][col]);
		swap(grid[row][col-1]);
		countKeeper.count = countKeeper.count+1;
	}
	/*Middle*/
	else if((row <(grid.length -1)) && (col < (grid.length-1))) {
		//swap(grid[row][col]);
		swap(grid[row-1][col]);
		swap(grid[row+1][col]);
		swap(grid[row][col-1]);
		swap(grid[row][col+1]);
		countKeeper.count = countKeeper.count+1;
	}
	scoreKeeper(grid, countKeeper);

}
/*Checks to see if all blocks are blue which is the winning condition*/
/*Known bug: Needs refresh*/
function scoreKeeper(array, countKeeper	) {
	/*Added code to debug the refresh bug*/
	//alert("This is being run");
	var blocks = 1;
	for(var i= 0; i < array.length; i++) {
		for(var j= 0; j < array[0].length; j++) {
			//alert($(array[i][j]).attr('class'));

			if($(array[i][j]).attr('class') == "divBoxes2 ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only") {
				blocks++;
				//alert($(array[i][j]).attr('id'));
			}
		}
	}
  // alert(blocks);

	var total = array.length * array[0].length;
	if(blocks == total) {
		/**Changed*/
		/*Debug: Tells you how many turns you took.*/
		// alert(scoreGetter());
		// alert ("You win!");
		winSFX();
		getNumScore(scoreGetter(), scoreLvl.high, scoreLvl.avg);
		registerScore();
		gameWon = true;
	}
	//alert(countKeeper.count);
}
/*Checks the current class of the block and swaps it along with its current color.*/
function swap(currBox) {
	if( $(currBox).attr('class') == "divBoxes ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only") {
		$(currBox).css('background-image', 'url(images/ActiveTile.png)');
		$(currBox).attr('class', "divBoxes2 ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only");
	}
	else {
		$(currBox).css('background-image', 'url(images/InActiveTile.png)');
		$(currBox).attr('class', "divBoxes ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only");
	}
}
