var music = document.createElement('audio');

/** Sets up the volume and music for the volume slider. **/
$(document).ready(function() {
    /** Defines minimum and maximum volume for the volume slider. **/
	$("#volume").slider({
		min: 0,
		max: 100,
		value: 35,
		range: "min",
		animate: true,
		slide: function(event, ui) {
			setVolume((ui.value) / 100);
		}
	});
    /** The source location of the music. **/
	$('#volPlayer').append(music);
	music.id = "music";
	playAudio('audio/bgm1', 0);
});

/** Function that plays and loop audio. **/
function playAudio(fileName) {
	var mediaExt = (music.canPlayType('audio/mp3')) ? '.mp3' : '';
	if (mediaExt) {
		music.src = fileName + mediaExt;
		music.setAttribute('loop', 'loop');
		setVolume(1);
		music.play();
	}
}

/** Setter for the music**/
function setVolume(myVolume) {
		music = document.getElementById('music');
		music.volume = myVolume;
}
	
function muteButtonIsClicked() {
	var vol = $('#muteButton').text();
	if(vol == 'Off') {
		$('#muteButton').text('On');
		setVolume(0);
	}else if(vol == 'On') {
		$('#muteButton').text('Off');
		setVolume(1);
	}
	selectionSFX(); // SFX sound
}
