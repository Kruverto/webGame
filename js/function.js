function random(max){
	var rand = 1 + Math.random() * (max + 1);
	rand = Math.floor(rand);
	return rand;
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
			 	 		var nBall = random(diff);
			 			var nNowBall = 0;
			 			while(nNowBall < nBall){
							createBall();
							nNowBall =nNowBall + 1;
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
				nLifes --;
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

//function createBall() {



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
	var div = document.createElement("div");
		div.id = "kinec";
	
	//<h2>кінець гри!</h2>
	var h2 = document.createElement("h2");
		h2.innerText = "кінець гри!";
	
	//<h3>ви набрали 100 очків</h3>
	var h3 = document.createElement("h3");		
		h3.innerText = "Bи набрали " + points + " очків";

	div.appendChild(h2);

	div.appendChild(h3);

	gameField.appendChild(div);

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