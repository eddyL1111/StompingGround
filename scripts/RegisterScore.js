/** Loads all of the player's score from the database and
and saves the score in the leader board when add button is pressed.
*/
$(function() {
	var tab = "&nbsp&nbsp&nbsp";
	var $playerBoard = $('#playerBoard');
	var $scoreBoard = $('#scoreBoard');
	var $player = $('#playerInput');
	var $score = $('#scoreInput');
	var sortByScore = 's={"score": -1}';
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
	$('#addPlayerScore').click(function() {
		$.ajax({url:
			"https://api.mongolab.com/api/1/databases/leaderboard2910/collections/score?apiKey=fTiXLEw9ATAVGyGiE8DPBI0XXnYInSCS",
			data: JSON.stringify({
				"player" : $player.val(),
				"score" : $score.val(),
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
});
