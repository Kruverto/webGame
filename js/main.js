/*час 
зменшуєься 
ресетається кожних n поїнтів 

хп 
- від бомб (+ хард коли випали за екран)

бомби

прогресбар часу

рестарт

*/
function start(){
	createStartBlock();
	createTimerBlock();

	startButton.onclick = play;


}

function play(){
	status = "play";

	deleteStarBlock();

	createScore();

	createLifes();

	createBall();
	
	gameTimer();
}

start();







function finish(){
	status = "finish";
	deleteScore();
	deleteLifes();
	cleangameField();
	createEnd();

}

function gameTimer(){

	var chasy = setInterval(function() {

	timerBlock.innerText = timerBlock.innerText - 1;
		
		if (lvlprogres >= nextlvl ){
			timerBlock.innerText = "30";
			lvlprogres -= nextlvl;
			diff ++;
			//console.log(diff);
			nextlvl = Math.floor(nextlvl *= 1.5);
			//console.log(nextlvl);
		}

		if(timerBlock.innerText == 0){
			
			clearInterval(chasy);
			
			finish();
		}

	},1000);
}