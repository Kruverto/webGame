function random(max){
	var rand = 1 + Math.random() * (max + 1);
	rand = Math.floor(rand);
	return rand;
}


function createProgressbar(){
	progressbar = document.createElement("div");
	progressbar.id = "progressbar";

	infoBlock.appendChild(progressbar);

	setInterval(function() {
		var koef = (timerBlock.innerText/30) * 100;
		progressbar.style.width = koef  + "%";
		if (koef <= 50 && koef >= 20){
			progressbar.style.background = "#dfed19"
		}if (koef < 20){
			progressbar.style.background = "#ed2e19"
		}

	},10)



}

function createStartBlock(){
	//<div id="start-block">
 	startBlock = document.createElement("div"); 
 	startBlock.id = "start-block";
 	//<button id="start-knopka"> start</button>
 	startButton = document.createElement("button");
 	//startButton.id = "start-knopka";
 	startButton.innerText = "start game";

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
		ball.style.top = random(350) + 	"px";
		ball.style.left = random(550) + "px";
	},200)

	setTimeout(function() {
		ball.style.transition = "all 0s";
		var timerBall = setInterval(function() {
			ball.style.top = ball.offsetTop + 1 + "px"
			if (ball.offsetTop > 400) {
				ball.remove();
				createBall();
				//createBomb();
				//nLifes --;
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
		bomb.style.top = random(350) + 	"px";
		bomb.style.left = random(550) + "px";
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
			bomb.style.top = bomb.offsetTop + 1 + "px"
			if (bomb.offsetTop > 400) {
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
		h3.innerText = "Bи набрали " + points + " очків";

	restartButton = document.createElement("button");
	//startButton.id = "start-knopka";
	restartButton.innerText = "restart game";
   

	end.appendChild(h2);

	end.appendChild(h3);

	end.appendChild(restartButton);

	gameField.appendChild(end);

}


function deleteProgressbar(){
	progressbar.remove();
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