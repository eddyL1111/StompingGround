
/** Box stuff. */
// var box;
// var divBox;
/** Game stuff.*/
var grid;
var gameWon = false;

function createGrid(x,y) {
	return new Grid(x,y);
}

/** Main function.*/
function moveGame(grid) {
	//Function to check when the player clicks on a block
	$(".divBoxes").click(function() {
	 //We call the move function in the BoxClass.js
		move($(this).css('left'), $(this).css('top'), grid.array, this, grid);
	});
		$(".divBoxes2").click(function() {
	 //We call the move function in the BoxClass.js
		move($(this).css('left'), $(this).css('top'), grid.array, this, grid);
	});
	
}
/*Method to return the number of moves made by the player*/
function scoreGetter() {
	return grid.count;
}
/** Functions......................................................................*/

/** Draws Level 1. */
/*
	Creates a level based on the size of the grid and number of times an active block should be drawn
*/

function buildLvl(id, rep, size) {

		//alert("Created a level");
		grid = createGrid(size,size);
		drawLevel(grid, id, rep); // Assuming this is level one, the grid is 3x3.
		moveGame(grid);
		gameActive = true;

	/** main.js */
}
/** Resets the level when out of level
Used: in each level# page when the navigation(home, level select)
	buttons are pressed
Files: index.html
*/
function getOutOfLevel() {
	location.reload();

}
function registerScore() {
	var tab = "&nbsp&nbsp&nbsp";
	var $playerBoard = $('#playerBoard');
	var $scoreBoard = $('#scoreBoard');
	var $score = scoreGetter();
	var sortByScore = 's={"score": -1}';
	var person = prompt(
		"Score: " + scoreGetter() +
		"\nAdd your score to the leaderboard"
	, "");
	
	if (person != null) {
		$(function() {
			/* Loads all of the player's score from the database. */
			$.ajax({url:
				"https://api.mongolab.com/api/1/databases/leaderboard2910/collections/score?" + sortByScore + "&apiKey=fTiXLEw9ATAVGyGiE8DPBI0XXnYInSCS",
				type: "GET",
				contentType: "application/json",
				success: function(boards) {
					$.each(boards, function(i, boards) {	// for each element the leader board array, loads it to the page
						$playerBoard.append('<li>'+ boards.player + tab + '</li>');
						$scoreBoard.append('<li>'+ boards.score + tab + '</li>');
					});
				},
				error: function() {
					alert('Problems loading the ScoreBoards');
				}
			});
			/* Adds the player's score to the database when the button is pressed. */
				$.ajax({url:
					"https://api.mongolab.com/api/1/databases/leaderboard2910/collections/score?apiKey=fTiXLEw9ATAVGyGiE8DPBI0XXnYInSCS",
					data: JSON.stringify({
						"player" :person,
						"score" : $score,
					}),
					type: "POST",
					contentType: "application/json",
					success: function(newBoard) { // after POST, append the new scoreboard to the list.
						$playerBoard.append('<li>' + newBoard.player + tab + '</li>');
						$scoreBoard.append('<li>' + newBoard.score + tab + '</li>');
					},
					error: function() {
						alert('Problems saving the score');
					}
				});	
		});
		
  }
	// goToLevelSelect();
}