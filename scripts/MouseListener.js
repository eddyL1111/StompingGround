/** Sound Effects--------------------------------------------- */

var gameStart = document.createElement('audio');
gameStart.setAttribute('src', 'audio/gameStart.ogg');
var selection = document.createElement('audio');
selection.setAttribute('src', 'audio/menuSelect.mp3');
var pause = document.createElement('audio');
pause.setAttribute('src', 'audio/pause.mp3');
var jump = document.createElement('audio');
jump.setAttribute('src', 'audio/jump_01.mp3');
var win = document.createElement('audio');
win.setAttribute('src', 'audio/win.mp3');
var landing = document.createElement('audio');
landing.setAttribute('src', 'audio/jumpLand2.mp3');
var totalJump = 0;
var havehome = false;
var have50 = false;

/** Sets the sfx volume to high, med, low, off, when the sfx button is pressed in Options*/
function setSfxVolume() {
	var sfxVolume = 1;
	var volume = $('#sfxVolumeButton').text();
	if(volume == 'High') {
		$('#sfxVolumeButton').text('Medium');
		sfxVolume = .66;
	}else if(volume == 'Medium') {
		$('#sfxVolumeButton').text('Low');
		sfxVolume = .33;
	}else if(volume == 'Low') {
		$('#sfxVolumeButton').text('Off');
		sfxVolume = 0;
	}else if(volume == 'Off') {
		$('#sfxVolumeButton').text('High');
		sfxVolume = 1;
	}
	gameStart.volume = sfxVolume;
	selection.volume = sfxVolume;
	pause.volume = sfxVolume;
	jump.volume = sfxVolume;
	win.volume = sfxVolume;
	landing.volume = sfxVolume;
	selectionSFX(); // SFX sound
}
/** Achievements message**/
function showtipPop(message) {
	$("#showtip").text(message);
	$("#showtip").css({
		'top':'100px',
		'left':($(window).width()-$("#showtip").width()-10)/2+'px'
	});
	
	 $("#showtip").slideToggle(200);
	 setTimeout(function () {
		 $("#showtip").slideToggle(200);
	 }, 2000);
}

/** Jump sound when click on tile. **/
function jumpSFX() {
  jump.play(); // Used in BoxClass.js in animation
  totalJump++;//Counting the total jump for achievement
    if (totalJump>=50 && !have50) {
	  have50 = true;
	  showtipPop('You have not win the game out of 50 steps');	//More than 50 steps will show this achievement
  }
}
/** Jump landing sound when character lands on tile. **/
function landingSFX() {
  landing.play(); // Used in BoxClass.js in animation
}
/** GameStart SFX**/
function gameStartSFX() {
  totalJump=0;
  gameStart.play();  // Start button is clicked
}
/** Pause SFX. */
function pauseSFX() {
	pause.play();
}
/** Selection SFX. */
function selectionSFX() {
	/* Played in buttons for Back, Quit, Restart, Option, Stage Select */
  selection.play();
}
function winSFX() {
	win.play(); // play win sound.
    showtipPop('You win the game');//Show second achievement
	
	if (totalJump <= 10) {
		setTimeout(function(){
			showtipPop('Congratulation! You win the game within 10 steps');	
		},2400);
	}//Show third achievement if player finish game in 10 steps
}


/** Click functions--------------------------------------------- */


/** Pauses the game when the pause icon is pressed. */
function pauseIsClicked() {	
	/* The pause windows is created, when the level is created, 
	as an invisible layer and this function
	just brings that layer to the front and increases the opacity.
	Note: In order for this function to really pause, we need to stop the time 
	interval. 
	*/
	disableDivBoxes();	/** BoxClass.js */
	$('#pauseFrame').css('opacity', 1);
	$('#pauseFrame').css('z-index', 1);
	$('#Player').css('z-index', 0);
	$('#continueButton').prop('disabled', false); // Enables the button when the layer is invisible.
	$('#restartButton').prop('disabled', false);
	$('#quitButton').prop('disabled', false);
	$('#pauseButton').prop('disabled', true);
	pauseSFX(); // Pause SFX
}
/** Continues the game when the continue button is pressed. */
function continueIsClicked() {
	selectionSFX(); // Continue SFX

	/* Note: Need to set the time interval if it was paused. */
	enableDivBoxes(); /** BoxClass.js */
	$('#pauseFrame').css('opacity', 0);
	$('#pauseFrame').css('z-index', 0);
	$('#Player').css('z-index', 1);
	$('#continueButton').prop('disabled', true);	// Disables the button when the game is paused.
	$('#restartButton').prop('disabled', true);
	$('#quitButton').prop('disabled', true);
	$('#pauseButton').prop('disabled', false);
}
/** Restarts the level(reloads the page). */
function restartIsClicked() {
	var timer = null;
	var counter = 0;
	selectionSFX(); // Restart SFX
	/* Function below waits for the sound to be played before reloading. */
	timer = setInterval(function() {
		counter++;
		if(counter == 1) {
			location.reload();
			clearInterval(timer);
			timer = null;
		}
	}, 350);
}
function startButtonClicked() {
	if (!havehome) {
		havehome = true;
		showtipPop('You Have Unlocked An Achievement');//Unlock an achievement when the game start
	}
    	selectionSFX(); // Sound
	window.location.href='#levelSelect';
}
function leaderButtonClicked() {
	selectionSFX(); // Sound
	window.location.href='#page_leaderboard';
}
function optionButtonClicked() {
	selectionSFX(); // Sound
	window.location.href='#options';
}
function goToLevelSelect() {
	selectionSFX(); // Sound
	var timer = null;
	var counter = 0;
	selectionSFX(); // Restart SFX
	/* Function below waits for the sound to be played before reloading. */
	timer = setInterval(function() {
		counter++;
		if(counter == 1) {
			getOutOfLevel();
			clearInterval(timer);
			timer = null;
		}
	}, 350);
	window.location.href='#levelSelect';
}
