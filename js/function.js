function random(max){
	var rand = 1 + Math.random() * (max + 1);
	rand = Math.floor(rand);
	return rand;
}

function myFunction() {
	// Get the checkbox

	var checkBox = document.getElementById("myCheck");
	// Get the output text
	//var text = document.getElementById("text");
  
	// If the checkbox is checked, display the output text
	if (checkBox.checked == true){
		gameMode = 1;
	} else {
		gameMode = 0;
	}
	console.log(gameMode);
	
  }


function createProgressbar(){
	progressbar = document.createElement("div");
	progressbar.id = "progressbar1";
	progressbar2 = document.createElement("div");
	progressbar2.id = "progressbar2";

	infoBlock.appendChild(progressbar);
	infoBlock.appendChild(progressbar2);

	setInterval(function() {

		var koef = (timerBlock.innerText/30) * 100;
		//var koef = (lvlprogres/nextlvl) * 100;

		progressbar.style.width = koef  + "%";
		if (koef > 50){
		progressbar.style.background = "#fcfecd"
		}if (koef <= 50 && koef >= 20){
			progressbar.style.background = "#CC9D86"
		}if (koef < 20){
			progressbar.style.background = "#CC6156"
		}

		var koef2 = (lvlprogres/nextlvl) * 100;
		progressbar2.style.width = koef2 + "%";

	},10)
}


function createStartBlock(){
	//<div id="start-block">
 	startBlock = document.createElement("div"); 
 	startBlock.id = "start-block";
 	//<button id="start-knopka"> start</button>
 	startButton = document.createElement("button");
 	//startButton.id = "start-knopka";
 	startButton.innerText = "Розпочати гру";

	gameName = document.createElement("p");
	gameName.id = "gameName";
	gameName.innerText = "СВІТЛОЛОВ";

	rules2 = document.createElement("p");
	rules2.innerText = "Ціль гри зловити якнайбільше очок.";

	startBlock.appendChild(gameName);
	startBlock.appendChild(rules2);

 	startBlock.appendChild(startButton);
	
 	gameField.appendChild(startBlock);
}

function createTimerBlock(){
	var h2 = document.createElement("h2");
		h2.innerText = "Час: ";

	timerBlock = document.createElement("span");
		timerBlock.id = "timer";
		timerBlock.innerText = "30";

	h2.appendChild(timerBlock);	

	infoBlock.appendChild(h2);
}



function createBall() {
	//new block div 
	var ball = document.createElement("div");

	ball.className = "ball";

	var direction = random(2);

		if(direction == 1) {
			ball.className = "ball left";
		}else{
			ball.className = "ball right";
		}

	//функція кліка 
	ball.onmousemove = function(){
	

		if (ball.className != "ball waitToDelete"){
			//	сам процес счетчика
			var scoreIncr = random(5);
			points += scoreIncr ;
			lvlprogres += scoreIncr;
			//перевод в очки
			score.innerText = points;
			//зе енд
		
			ball.style.opacity = "0";
		
			setTimeout(function(){
		 		ball.remove();

		 		var isExist = document.querySelector(".ball");
		 		if(isExist == null){
					//bomb.remove();

		 	 		var nBall = random(diff);
					var nBomb = random(Math.floor(diff/3));

		 			var nNowBall = 0;
					var nNowBomb = 0;

		 			while(nNowBall < nBall){
						createBall();
						nNowBall ++;
		 			}

					 while(nNowBomb < nBomb){
						createBomb();
						nNowBomb ++;
		 			}
		 		}
		 	},200);
			
		}
		ball.className = "ball waitToDelete";
	}

	setTimeout(function() {
		ball.style.top = random(h - (h * 0.125)) + "px";
		ball.style.left = random(w - (w * 0.125)) + "px";
	},200)

	setTimeout(function() {
		ball.style.transition = "all 0s";
		var timerBall = setInterval(function() {
			ball.style.top = ball.offsetTop + 1 + "px";
			if (ball.offsetTop > h) {
				ball.remove();
				createBall();
				//createBomb();
				if (gameMode != 0){
					nLifes --;
				}
				if (nLifes == 0) {
					finish();
				}
				deleteLifes();
				createLifes();
				clearInterval(timerBall);
			}
		},10)
	}, 1000);

	if (status != "finish") {
		gameField.appendChild(ball);
	}

	
}



function createBomb() {
	var bomb = document.createElement("div");

	bomb.className = "bomb";

	var triger = 0; 

	var direction = random(2);

	if(direction == 1) {
		bomb.className = "bomb left";
	}else{
		bomb.className = "bomb right";
	}

	setTimeout(function() {
		bomb.style.top = random(h - (h * 0.125)) + 	"px";
		bomb.style.left = random(w - (w * 0.125)) + "px";
	},200)

	bomb.onmousemove = function(){

		triger = 1;
		bomb.style.transition = "all 0s";
		bomb.remove();
			
	}

	var trigerBomb = setInterval(function() {
			if ( triger != 0){
				nLifes --;
				triger = 0
				if (nLifes == 0) {
					finish();
				}
				deleteLifes();
				createLifes();
				clearInterval(trigerBomb);
				//console.log(nLifes);
			}
	},10)

	setTimeout(function() {
		bomb.style.transition = "all 0s";
		var timerBomb = setInterval(function() {
			bomb.style.top = bomb.offsetTop + 1 + "px";
			if (bomb.offsetTop > h) {
				bomb.remove();
				//createBomb();
				//nLifes --;
				if (nLifes == 0) {
					finish();
				}
				deleteLifes();
				createLifes();
				clearInterval(timerBomb);
			}
		},10)
	}, 1000);
	
	if (status != "finish") {
		gameField.appendChild(bomb);
	}

}

function recordHS(){	

//var prevScore;
//var tempscore;
//note1.innerText = 0;

//prevScore = note1.innerText;



if (points > record1){
	record5 = record4;
	record4 = record3;
	record3 = record2;
	record2 = record1;
	record1 = points;
}if (points > record2 && points < record1){
	record5 = record4;
	record4 = record3;
	record3 = record2;
	record2 = points;
}if (points > record3 && points < record2){
	record5 = record4;
	record4 = record3;
	record3 = points;
}if (points > record4 && points < record3){
	record5 = record4;
	record4 = points;
}if (points > record5 && points < record4){
	record5 = points;
}

note1.innerText = record1;
note2.innerText = record2;
note3.innerText = record3;
note4.innerText = record4;
note5.innerText = record5;






}








function createScore(){
	score = document.createElement("div");
	score.id = "score";
	score.innerText = "0";
	
	gameField.appendChild(score);
}

function createLifes(){
	lifes = document.createElement("div");
	lifes.id = "lifes";

		var nNowLifes = 0;
	while(nNowLifes< nLifes){
		var span = document.createElement("span");
			lifes.appendChild(span);
			nNowLifes = nNowLifes + 1;
	}

	gameField.appendChild(lifes);
}

/*<div id="konec">
			<h2>кінець гри!</h2>
			
			<h3>ви набрали 100 очків</h3>
		</div>
		*/
function createEnd(){
	//<div id="konec">
	var end = document.createElement("div");
		end.id = "end";
	
	//<h2>кінець гри!</h2>
	var h2 = document.createElement("h2");
		h2.innerText = "кінець гри!";
	
	//<h3>ви набрали 100 очків</h3>
	var h3 = document.createElement("h3");		
		h3.innerText = "Bи набрали " + points + " очок";

	restartButton = document.createElement("button");
	//startButton.id = "start-knopka";
	restartButton.innerText = "Грати заново";
   

	end.appendChild(h2);

	end.appendChild(h3);

	end.appendChild(restartButton);

	gameField.appendChild(end);

}


function deleteProgressbar(){
	progressbar.remove();
	progressbar2.remove();
}

function deleteStarBlock(){
	startBlock.remove();
}

function deleteLifes(){
	lifes.remove();
}

function deleteScore(){
	score.remove();
}

function deleteTimerBlock(){
	h2.remove();
	timerBlock.remove();
}

function cleangameField(){
	gameField.innerText = "";
}

function clearInfoblock(){
	infoBlock.innerText = "";
}


function deleteEnd(){
	end.remove();

	//score = null;
	//хп
	//lifes = null;

	//diff = 3;

	//nextlvl = 30;

	//lvlprogres = null;

	//nLifes = 3;

	//points = 0;

	//status = "open";

	//timerBlock = null;
}