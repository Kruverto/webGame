/*
+час 
+зменшуєься 
+ресетається кожних n поїнтів 

+хп 
+- від бомб (+ хард коли випали за екран)

+бомби

+прогресбар часу

+рестарт

виведення статистики і рекорду  

режими
*/
function start(){
	createStartBlock();
	createTimerBlock();

	startButton.onclick = play;

}

function play(){
	status = "play";
	deleteStarBlock();

	createProgressbar();

	createScore();

	createLifes();

	createBall();

	createBomb();
	
	gameTimer();


}

start();


function restart(){
	deleteEnd();
	clearInfoblock();

	console.log(nLifes);
	console.log(lifes);
	console.log(diff);
	console.log(status);
	console.log(points);
	console.log(lvlprogres);
	console.log(score);


//setTimeout(function(){
nLifes = 3;
lifes = null;
diff = 3;
//status = "strar";
points = 0;
lvlprogres = null;

//}, 1000);

start();
	//createStartBlock();
	//createTimerBlock();

	//startButton.onclick = start;


}




function finish(){

	var gameScore = points;
	recordHS();
	//switchGameMode();
	status = "finish";
	//clearInterval(time);
	deleteScore();
	deleteLifes();
	deleteProgressbar();
	cleangameField();
	createEnd();

	restartButton.onclick = restart;

}

function gameTimer(){

	var time = setInterval(function() {
		//switchGameMode2();
		if (status != "finish") {

	timerBlock.innerText = timerBlock.innerText - 1;

	console.log(diff);
		
		if (lvlprogres >= nextlvl ){
			timerBlock.innerText = "30";
			lvlprogres -= nextlvl;
			diff ++;
			//console.log(diff);
			nextlvl = Math.floor(nextlvl *= 1.5);
			//console.log(nextlvl);
		}
		
		if(timerBlock.innerText == 0){
			
			//clearInterval(time);
			
			finish();
		}
		
		//if (status == "finish"){
			//clearInterval(time);
		//}
	}
	else if(status == "finish"){
			clearInterval(time)
	}


	},1000);
	//clearInterval(time);
}

//gameTimer