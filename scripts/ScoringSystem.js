var scoreLvl;

var threeStars = $('<img>', {
	id: 'threeStars', 
	src: 'images/Stars3.png',
	style: 
		'position:absolute; z-index: 2' + 
		'; top: 0' +
		'; left: -150px' +
		'; width: 600px' +
		'; height: 80%px'
});
var twoStars = $('<img>', {
	id: 'twoStars', 
	src: 'images/Stars2.png',
	style: 
		'position:absolute; z-index: 2' + 
		'; top: 0' +
		'; left: -150px' +
		'; width: 600px' +
		'; height: 80%px'
});
var oneStar = $('<img>', {
	id: 'oneStar', 
	src: 'images/Stars1.png',
	style: 
		'position:absolute; z-index: 2' + 
		'; top: 0' +
		'; left: -150px' +
		'; width: 600px' +
		'; height: 80%px'
});



function ScoreCalc(high,avg) {
	this.high = high;
	this.avg = avg;
}
// function createScore(high,avg) {
	// return new ScoreCalc(high,avg);
// }
function setScore(high, avg) {
	scoreLvl = new ScoreCalc(high, avg);
}

/** Calculates the scoring system according the stage level
	Parameter: { 
		getTurnCounter: Function that gets the total turns taken in the level
		avgScore: Specific average score from the level
		highScore: Specific high score from the level
	Returns:
		The appropriate score image
*/ 
function getNumScore(getTurnCounter, highScore, avgScore) {
	/* We need to get the score from highest and average score in each level.
	This function is going to be called in drawProgressBar, level completion, and stage select
	Convert the turn counter into stars
	The less counter the better the score
	if getTurnCounterFunc <= highScore then 3-stars
	if getCounter <= avgScore and getCounter > highScore then  2-stars
	if getcOUNTER > avgScore then 1-star
	*/
	
	// var turns = getTurnCounter;
	var imageNumber;
	// alert('turns ' +getTurnCounter);
	// alert('high ' +highScore);
	// alert('avg ' +avgScore);
	
	if(getTurnCounter <= highScore) {
		threeStars.appendTo('.levelFrame');
	}else if(getTurnCounter <= avgScore) {
		twoStars.appendTo('.levelFrame');
	}else if(getTurnCounter > avgScore) {
		oneStar.appendTo('.levelFrame');
	}
	
	// return 0; // the image
}
/** Shows the Score(Stars) in the progress bar. 
	Parameter:
		numStars: Calls getNumScore(), which will be used to identify the number of stars in the image
*/
function showScoreInProBar(numStars) { // used in main.js
	var scoreImg = new Image();
	var imgNumber = parseInt(numStars);
	scoreImg.src = "images/Stars" + imgNumber + ".png"; 
}
