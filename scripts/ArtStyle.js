/** Animation--------------------------------------------- */

/* Player's movement, plus swapping function, animation in the grid. */
function movement(moving, newX, newY, newBox, grid, countKeeper) {
	var moveTimer = null;
	var imageNumber = 0;
	var moveLeftRight = parseInt($('#Player').css("left"));
	var moveUpDown = parseInt($('#Player').css("top"));
	var move_fps = 20;
	var moveX_pixels = 11.7;
	var moveY_pixels = 18;
	jumpSFX(); /** ArtStyle.js */ 
	/* Player's animation for moving right. */
	if(moving == 'right') {
		if(moveTimer == null){
			$('#Player').prop('src', 'images/CharRight' + (++imageNumber) + '.png');
			moveTimer = setInterval(function() {
				moveLeftRight += moveX_pixels;
				$("#Player").css('left', moveLeftRight); // Moves Char image to right by pixels
				$('#Player').prop('src', 'images/CharRight' + (++imageNumber) + '.png');
				/* End of animation when it reaches next box*/
				if(moveLeftRight >= newX ) {
					$("#Player").css('left',newX);
					$('#Player').prop('src', 'images/Char.png');
					landingSFX(); /** ArtStyle.js */
					colorSwap(newBox, grid, countKeeper); /** BoxClass.js*/ // Swaps tiles colour after landing
					clearInterval(moveTimer);
					moveTimer = null;
				}
			}, 1000/move_fps);	
		}		
	}
	/* Player's animation for moving left. */
	if(moving == 'left') {
		if(moveTimer == null){
			$('#Player').prop('src', 'images/CharLeft' + (++imageNumber) + '.png');
			moveTimer = setInterval(function() {
				moveLeftRight -= moveX_pixels;
				$("#Player").css('left', moveLeftRight); // Moves Char image to left by pixels
				$('#Player').prop('src', 'images/CharLeft' + (++imageNumber) + '.png');
				/* End of animation when it reaches next box. */
				if(moveLeftRight <= newX) {
					$("#Player").css('left',newX);
					$('#Player').prop('src', 'images/Char.png');
					landingSFX(); /** ArtStyle.js */
					colorSwap(newBox, grid, countKeeper); /** BoxClass.js*/ // Swaps tiles colour after landing
					clearInterval(moveTimer);
					moveTimer = null;
				}
			}, 1000/move_fps);	
		}		
	}
	/* Player's animation for moving up. */
	if(moving == 'up') {
		if(moveTimer == null){
			$('#Player').prop('src', 'images/CharUp' + (++imageNumber) + '.png');
			moveTimer = setInterval(function() {
				moveUpDown -= moveY_pixels;
				$("#Player").css('top', moveUpDown); // Moves Char image to left by pixels
				$('#Player').prop('src', 'images/CharUp' + (++imageNumber) + '.png');
				/* End of animation when it reaches next box. */
				if(moveUpDown <= newY) {
					$("#Player").css('top',newY);
					$('#Player').prop('src', 'images/Char.png');
					landingSFX(); /** ArtStyle.js */
					colorSwap(newBox, grid, countKeeper); /** BoxClass.js*/ // Swaps tiles colour after landing
					clearInterval(moveTimer);
					moveTimer = null;
				}
			}, 1000/move_fps);	
		}		
	}
	/* Player's animation for moving down. */
	if(moving == 'down') {
		if(moveTimer == null){
			$('#Player').prop('src', 'images/CharDown' + (++imageNumber) + '.png');
			moveTimer = setInterval(function() {
				moveUpDown += moveY_pixels;
				$("#Player").css('top', moveUpDown); // Moves Char image to left by pixels
				$('#Player').prop('src', 'images/CharDown' + (++imageNumber) + '.png');
				/* End of animation when it reaches next box. */
				if(moveUpDown >= newY) {
					$("#Player").css('top',newY);
					$('#Player').prop('src', 'images/Char.png');
					landingSFX(); /** ArtStyle.js */
					colorSwap(newBox, grid, countKeeper); /** BoxClass.js*/ // Swaps tiles colour after landing
					clearInterval(moveTimer);
					moveTimer = null;
				}
			}, 1000/move_fps);	
		}		
	}
	/* Player's animation for moving top-right. */
	if(moving == 'topRight') {
		if(moveTimer == null){
			$('#Player').prop('src', 'images/CharRight' + (++imageNumber) + '.png');
			moveTimer = setInterval(function() {
				moveUpDown -= moveY_pixels;
				moveLeftRight += moveX_pixels;
				$("#Player").css('top', moveUpDown); // Moves Char image to left by pixels
				$("#Player").css('left', moveLeftRight); // Moves Char image to right by pixels
				$('#Player').prop('src', 'images/CharRight' + (++imageNumber) + '.png');
				/* End of animation when it reaches next box. */
				if(moveUpDown <= newY && moveLeftRight >= newX) {
					$("#Player").css('left',newX);
					$("#Player").css('top',newY);
					$('#Player').prop('src', 'images/Char.png');
					landingSFX(); /** ArtStyle.js */
					colorSwap(newBox, grid, countKeeper); /** BoxClass.js*/ // Swaps tiles colour after landing
					clearInterval(moveTimer);
					moveTimer = null;
				}
			}, 1000/move_fps);	
		}		
	}
	/* Player's animation for moving top-left. */
	if(moving == 'topLeft') {
		if(moveTimer == null){
			$('#Player').prop('src', 'images/CharLeft' + (++imageNumber) + '.png');
			moveTimer = setInterval(function() {
				moveUpDown -= moveY_pixels;
				moveLeftRight -= moveX_pixels;
				$("#Player").css('top', moveUpDown); // Moves Char image to left by pixels
				$("#Player").css('left', moveLeftRight); // Moves Char image to right by pixels
				$('#Player').prop('src', 'images/CharLeft' + (++imageNumber) + '.png');
				/* End of animation when it reaches next box. */
				if(moveUpDown <= newY && moveLeftRight <= newX) {
					$("#Player").css('left',newX);
					$("#Player").css('top',newY);
					$('#Player').prop('src', 'images/Char.png');
					landingSFX(); /** ArtStyle.js */
					colorSwap(newBox, grid, countKeeper); /** BoxClass.js*/ // Swaps tiles colour after landing
					clearInterval(moveTimer);
					moveTimer = null;
				}
			}, 1000/move_fps);	
		}		
	}
	/* Player's animation for moving top-right. */
	if(moving == 'botRight') {
		if(moveTimer == null){
		$('#Player').prop('src', 'images/CharRight' + (++imageNumber) + '.png');
			moveTimer = setInterval(function() {
				moveUpDown += moveY_pixels;
				moveLeftRight += moveX_pixels;
				$("#Player").css('top', moveUpDown); // Moves Char image to left by pixels
				$("#Player").css('left', moveLeftRight); // Moves Char image to right by pixels
				$('#Player').prop('src', 'images/CharRight' + (++imageNumber) + '.png');
				/* End of animation when it reaches next box. */
				if(moveUpDown >= newY && moveLeftRight >= newX) {
					$("#Player").css('left',newX);
					$("#Player").css('top',newY);
					$('#Player').prop('src', 'images/Char.png');
					landingSFX(); /** ArtStyle.js */
					colorSwap(newBox, grid, countKeeper); /** BoxClass.js*/ // Swaps tiles colour after landing
					clearInterval(moveTimer);
					moveTimer = null;
				}
			}, 1000/move_fps);	
		}		
	}
	/* Player's animation for moving top-right. */
	if(moving == 'botLeft') {
		if(moveTimer == null){
			$('#Player').prop('src', 'images/CharLeft' + (++imageNumber) + '.png');
			moveTimer = setInterval(function() {
				moveUpDown += moveY_pixels;
				moveLeftRight -= moveX_pixels;
				$("#Player").css('top', moveUpDown); // Moves Char image to left by pixels
				$("#Player").css('left', moveLeftRight); // Moves Char image to right by pixels
				$('#Player').prop('src', 'images/CharLeft' + (++imageNumber) + '.png');
				/* End of animation when it reaches next box. */
				if(moveUpDown >= newY && moveLeftRight <= newX) {
					$("#Player").css('left',newX);
					$("#Player").css('top',newY);
					$('#Player').prop('src', 'images/Char.png');
					landingSFX(); /** ArtStyle.js */
					colorSwap(newBox, grid, countKeeper); /** BoxClass.js*/ // Swaps tiles colour after landing
					clearInterval(moveTimer);
					moveTimer = null;
				}
			}, 1000/move_fps);	
		}		
	}
}
