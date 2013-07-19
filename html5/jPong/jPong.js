var canvas = window.document.getElementById("canvas");
var game = canvas.getContext("2d");
var attribsArray = [];
var onThis = {x: canvas.width, y: canvas.height};
var ball = {x: 100, y: 100, xSpeed: 10, ySpeed: 0, xSize: 10, ySize: 10, moving: "down", defaultYSpeed: 10, defaultXSpeed: 10};
var paddles = { 'keyUp': '119', 'keyDown': '115', 'p1': {'score': 0, x: 20, y: 100,xSpeed: 0, ySpeed: 10, movingUp: false, xSize: 10, ySize: 40, lastMovement: 0}, 'p2': {'score': 0, x:670, y:100, xSpeed: 0, ySpeed: 10, movingUp: false, xSize: 10, ySize: 40, lastMovement: 0} };
var frames = 0;
var p1 = window.document.getElementById('player1');
var p2 = window.document.getElementById('player2');
resize_canvas();

initGame();

setInterval(mainGame, 28);

function resetBall(){
	ball.x = 100;
	ball.y = 100;
	ball.xSpeed = 10;
	ball.ySpeed = 0;
}
function initGame(){
	for (var i in paddles){
		paddles[i].y = (canvas.height/2) - paddles[i].ySize;
		paddles[i].movingUp = false;
		paddles[i].lastMovement = 0;
	}
	ball.y = (canvas.height/2) - ball.ySize*2;

}


function mainGame(){
	frames++;
	document.getElementById("frames").innerHTML = frames;
	game.clearRect(0,0,canvas.width, canvas.height);
	drawBall();
	drawPaddles();
	detectColission();
	aiPaddle("p1");
    aiPaddle("p2");
	drawScores();

	if(isOut()){
		frames = 0;
		checkScore();
		resetBall();
		initGame();
	}

}

function checkScore(){
	if(ball.x >= canvas.width){
		paddles["p1"].score += 1;
	}
	if(ball.x <= 0){
		paddles["p2"].score += 1;
	}
}
function drawScores(){
	p1.innerHTML = paddles["p1"].score;
	p2.innerHTML = paddles["p2"].score;
}
function drawBall(){
	game.fillStyle = "white";
	game.fillRect(ball.x, ball.y, 10, 10);
	ball.x = ball.x + ball.xSpeed;
	ball.y = ball.y + ball.ySpeed;
}

function drawPaddles(player){
	for(var i in paddles){
		game.fillStyle = "red";
		game.fillRect(paddles[i].x, paddles[i].y, paddles[i].xSize, paddles[i].ySize);
	}
}

function movePaddle(keyCode){
	if(keyCode.which == 119){
		movePaddleUp("p1");

	}
	if(keyCode.which == 115){
		movePaddleDown("p1");
	}

	if(keyCode.which == 111){
		movePaddleUp("p2");

	}
	if(keyCode.which == 108){
		movePaddleDown("p1");
	}
}

function detectColission(){
	//collision with paddles
	if(ball.x == paddles["p2"].x && isAHit("p2", ball.y)){
		ball.xSpeed = ball.xSpeed*(-1);
		checkYTrajectory("p2");
		return;
	}
	if(ball.x == paddles["p1"].x && isAHit("p1", ball.y)){
		ball.xSpeed = ball.xSpeed*(-1);
		checkYTrajectory("p1");
		return;
	}
	//collision with the borders y = 0 and y = canvas height
	if((ball.y) < 0 || (ball.y+20) > canvas.height){
		ball.ySpeed = ball.ySpeed*(-1);
	}
}

function checkYTrajectory(paddle){
	if(movementLastMoments(paddles[paddle].lastMovement)){
		if(paddles[paddle].movingUp){
			ball.ySpeed = 10;
		}
		else{ball.ySpeed = -10;}
	}
		else{
			ball.ySpeed = 0;
			paddles[paddle].lastMovement = 0;
		}

}
function isAHit(paddle, positionY){
	return positionY >= paddles[paddle].y && positionY <= paddles[paddle].y + paddles[paddle].ySize;
}

function isOut(){
	return (ball.x < 0 || ball.x > canvas.width);
}

function movementLastMoments(paddleFrames){
	var boardFrames = 57;
	if(paddleFrames === 0) return false;
	console.log(boardFrames,paddleFrames, paddleFrames%boardFrames);
	return 27 > paddleFrames%boardFrames;
}

function aiPaddle(paddle){
	/*console.log(ball.x, ball.y, ball.xSpeed, ball.ySpeed, ball.moving);*/
	//First attemp, follow the ball, without intelligence
	if(ball.ySpeed > 0) movePaddleDown(paddle);
	else if(ball.ySpeed == 0) {}
	else movePaddleUp(paddle);
}


function movePaddleUp(paddle){
	paddles[paddle].y =  paddles[paddle].y - paddles[paddle].ySpeed;
	paddles[paddle].movingUp = false;
	paddles[paddle].lastMovement = frames;
}

function movePaddleDown(paddle){
	paddles[paddle].y =  paddles[paddle].y + paddles[paddle].ySpeed;
	paddles[paddle].movingUp = true;
	paddles[paddle].lastMovement = frames;
}




document.onkeypress = function(e){
	console.log(e.which);
	movePaddle(e);
}
