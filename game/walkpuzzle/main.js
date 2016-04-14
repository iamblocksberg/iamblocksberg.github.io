/* by iamblocksberg; */
var canvasBox = document.getElementById('box-canvas');
var canvasEle = document.getElementById('canvas');
var canvas = canvasEle.getContext('2d');
var btn_up = document.getElementById('btn-move-up');
var btn_down = document.getElementById('btn-move-down');
var btn_left = document.getElementById('btn-move-left');
var btn_right = document.getElementById('btn-move-right');


//Setting
var game = {};
	game.bgcolor = '#222222';
	game.width = canvasBox.offsetWidth;
	game.height = canvasBox.offsetHeight;
	game.fps = 1000 / 60;
	game.sprite1 = new Image();
	game.sprite1.src = 'image/sprite1.png';
	game.blockSize = 40;
	game.imgSize = 40; //Size of each Block in img


//-Floor
var floor = {};
	//floor.imgSize = 40; //Size of each floor block in img

var genFloor = [
					[0, 1, 2, 1, 0, 2, 1, 0, 0],
					[0, 2, 2, 0, 1, 2, 1, 0, 0],
					[0, 1, 2, 1, 0, 2, 0, 0, 0],
					[0, 1, 2, 1, 0, 1, 1, 0, 0],
					[0, 1, 0, 1, 2, 2, 1, 0, 0],
					[0, 1, 2, 1, 0, 2, 1, 0, 0],
					[0, 0, 2, 1, 1, 2, 0, 0, 0],
					[0, 1, 0, 1, 0, 1, 1, 2, 0],
					[0, 1, 2, 1, 2, 1, 1, 0, 0],
					[0, 0, 2, 1, 0, 2, 1, 0, 0]
				];


//-Props
var props = {};
	props.moving = 0;
	props.movingX = 0;
	props.movingY = 0;
	props.moveCol = 0;
	props.moveRow = 0;
	props.moveToCol = 0;
	props.moveToRow = 0;
	props.xMoveFinish = false;
	props.yMoveFinish = false;
	//props.imgSize = 40; //Size of each Props in img

//First Props start at index 1, 0 is null
//X, Y is position in img
//Width, Height is percent number from img block size, 1 is 100%
var allProps = [];	//Props each type
	allProps[1] = {'x': 0, 'y': 1, 'anchorX': 0, 'anchorY': 0, 'width': 1, 'height': 1, 'canMove': false};
	allProps[2] = {'x': 0, 'y': 2, 'anchorX': 0, 'anchorY': 1, 'width': 1, 'height': 2, 'canMove': true};

var genProps = [
					[0, 1, 0, 1, 0, 0, 1, 0, 0],
					[0, 0, 0, 0, 1, 0, 1, 0, 0],
					[2, 0, 0, 2, 0, 0, 0, 0, 0],
					[0, 1, 0, 1, 0, 1, 1, 0, 0],
					[0, 1, 0, 1, 0, 0, 1, 0, 0],
					[2, 1, 1, 1, 0, 1, 1, 0, 0],
					[0, 0, 1, 2, 2, 2, 0, 0, 0],
					[0, 1, 0, 1, 0, 1, 0, 2, 0],
					[2, 1, 1, 2, 1, 0, 0, 0, 0],
					[0, 0, 1, 1, 0, 1, 1, 0, 0]
				];


//-Player
var player = {};
	player.width = 40;
	player.height = 80;
	player.x = 40;
	player.y = 80;
	player.anchorX = 0;
	player.anchorY = 0.7;
	player.imgX = 0 * 40; //What's number X in img
	player.imgY = 4 * 40;
	player.imgWidth = player.width;
	player.imgHeight = player.height;
	player.blockX = 1;	//Index start 0
	player.blockY = 2;
	player.speedMove = 2;
	player.canMoveX = false;
	player.canMoveY = false;

//End


//Function
//-Move Oblect
function move_object(object, target, speed){
	var finished = false;

	if(object < target){
		object += speed;
		console.log(object+' += '+ speed);
	}else if(object > target){
		object -= speed;
		console.log(object+' -= '+ speed);
	}else{
		finished = true;
	}

	return finished;
}

//-Move Player
function player_canmove(move, checkOnly){
	var axisX = 0;	//-1 is Left, 1 is Right
	var axisY = 0;	//-1 is Up, 1 is Down
	var canMove = false;

	switch(move){
		case 'left':
			axisX = -1;
			break;

		case 'right':
			axisX = 1;
			break;

		case 'up':
			axisY = -1;
			break;

		case 'down':
			axisY = 1;
			break;
	}

	//if have direction and x, y not moving
	if((axisX != 0 || axisY != 0) && (checkOnly || player.canMoveX && player.canMoveY)){

		//Get Type of Next Props from GenProps
		var thisBoxX = player.blockX + axisX;
		var thisBoxY = player.blockY + axisY;
		var typeBox = null;

		//Check Exist X Y, if have set typebox
		if(thisBoxY >= 0 && thisBoxY < genProps.length){
			typeBox = genProps[thisBoxY][thisBoxX];
		}

		if(typeBox != null){
			
			if(typeBox == 0){
				//No Props, Can Move
				canMove = true;
			}else{

				//This Prop can move or not
				if(allProps[typeBox].canMove){
					//This Props can move

					//Next Props of this Props
					var nextBoxX = player.blockX + (axisX * 2);
					var nextBoxY = player.blockY + (axisY * 2);
					var typeNextBox = genProps[nextBoxY][nextBoxX];

					//Check Exist Next next props, if no can move
					if(typeNextBox == 0){

						//if check only, no create new prop for move
						if(!checkOnly){
							//Move This Props, set type and next x y
							props.moving = typeBox;
							props.movingX = thisBoxX * game.blockSize;
							props.movingY = thisBoxY * game.blockSize;
							props.moveCol = thisBoxX;
							props.moveRow = thisBoxY;
							props.moveToCol = nextBoxX;
							props.moveToRow = nextBoxY;
							//Remove this Props
							genProps[thisBoxY][thisBoxX] = 0;
						}
						
						canMove = true;
					}

				}

			}

		}

	}

	

	return canMove;
}

function player_move_left(){
	if(player_canmove('left')){
		player.canMoveX = false;
		player.blockX--;
	}
}

function player_move_right(){
	if(player_canmove('right')){
		player.canMoveX = false;
		player.blockX++;
	}
}

function player_move_up(){
	if(player_canmove('up')){
		player.canMoveY = false;
		player.blockY--;
	}
}

function player_move_down(){
	if(player_canmove('down')){
		player.canMoveY = false;
		player.blockY++;
	}
}

//-Keyboard
function input_keyboard(event){
	var key = event.which;

	switch(key){
		case 37: player_move_left();
			break;

		case 39: player_move_right();
			break;

		case 38: player_move_up();
			break;

		case 40: player_move_down();
			break;
	}

}

function start(){
	//Set Canvas
	canvasEle.width = game.width;
	canvasEle.height = game.height;

	//Set BG Color
	canvasEle.style.backgroundColor = game.bgcolor;

}

function draw(){
	//Clear Screen
	canvas.clearRect(0, 0, game.width, game.height);


	//Floor
	for(var i = 0; i < genFloor.length; i++){

		for(var ii = 0; ii < genFloor[i].length; ii++){

			canvas.drawImage(
				game.sprite1,
				genFloor[i][ii] * game.imgSize,
				0,
				game.imgSize,
				game.imgSize,
				game.blockSize * ii,
				game.blockSize * i,
				game.blockSize,
				game.blockSize
			);

		}

	}


	//Props
	for(var i = 0; i < genProps.length; i++){

		for(var ii = 0; ii < genProps[i].length; ii++){

			if(genProps[i][ii] != 0){

				canvas.drawImage(
					game.sprite1,	//Img
					allProps[ genProps[i][ii] ].x * game.imgSize,	//X Img
					allProps[ genProps[i][ii] ].y * game.imgSize,	//Y Img
					allProps[ genProps[i][ii] ].width * game.imgSize,	//Width Img
					allProps[ genProps[i][ii] ].height * game.imgSize,	//Height Img
					ii * game.blockSize - (allProps[ genProps[i][ii] ].anchorX * game.blockSize),	//X in Game
					i * game.blockSize - (allProps[ genProps[i][ii] ].anchorY * game.blockSize),	//Y in Game
					allProps[ genProps[i][ii] ].width * game.blockSize,			//Width in Game
					allProps[ genProps[i][ii] ].height * game.blockSize			//Height in Game
				);

			}

		}

	}

	//-Move Props to Block target
	if(props.moving != 0){
		canvas.drawImage(
			game.sprite1,	//Img
			allProps[ props.moving ].x * game.imgSize,	//X Img
			allProps[ props.moving ].y * game.imgSize,	//Y Img
			allProps[ props.moving ].width * game.imgSize,	//Width Img
			allProps[ props.moving ].height * game.imgSize,	//Height Img
			(props.movingX - (allProps[ props.moving ].anchorX * game.blockSize)),	//X in Game
			(props.movingY - (allProps[ props.moving ].anchorY * game.blockSize)),	//Y in Game
			allProps[ props.moving ].width * game.blockSize,			//Width in Game
			allProps[ props.moving ].height * game.blockSize			//Height in Game
		);

		//-Moving
		var targetX = props.moveToCol * game.blockSize;
		var targetY = props.moveToRow * game.blockSize;

		//-Move X
		if(props.movingX < targetX){
			props.movingX += player.speedMove;
		}else if(props.movingX > targetX){
			props.movingX -= player.speedMove;
		}else{
			props.xMoveFinish = true;
		}

		//-Move Y
		if(props.movingY < targetY){
			props.movingY += player.speedMove;
		}else if(props.movingY > targetY){
			props.movingY -= player.speedMove;
		}else{
			props.yMoveFinish = true;
		}
		
		//if move finished, spawn props moving
		if(props.xMoveFinish && props.yMoveFinish){
			//Create Moving Box
			genProps[props.moveToRow][props.moveToCol] = props.moving;
			//Reset value Props moving
			props.moving = 0;
			props.movingX = 0;
			props.movingY = 0;
			props.moveCol = 0;
			props.moveRow = 0;
			props.moveToCol = 0;
			props.moveToRow = 0;
			props.xMoveFinish = false;
			props.yMoveFinish = false;
		}
	}


	//player
	//-Move player to Block target
	var targetX = player.blockX * game.blockSize;
	var targetY = player.blockY * game.blockSize;

	//-Move X
	if(player.x < targetX){
		player.x += player.speedMove;
	}else if(player.x > targetX){
		player.x -= player.speedMove;
	}else{
		player.canMoveX = true;
	}

	//-Move Y
	if(player.y < targetY){
		player.y += player.speedMove;
	}else if(player.y > targetY){
		player.y -= player.speedMove;
	}else{
		player.canMoveY = true;
	}

	canvas.drawImage(game.sprite1, player.imgX, player.imgY, player.imgWidth, player.imgHeight, player.x - (player.width * player.anchorX), player.y - (player.height * player.anchorY), player.width, player.height);
}

function update(){
	draw();

	//Check btn can move or not
	//-up
	if(player_canmove('up', true)){
		btn_up.disabled = false;
	}else{
		btn_up.disabled = true;
	}
	//-down
	if(player_canmove('down', true)){
		btn_down.disabled = false;
	}else{
		btn_down.disabled = true;
	}
	//-left
	if(player_canmove('left', true)){
		btn_left.disabled = false;
	}else{
		btn_left.disabled = true;
	}
	//-right
	if(player_canmove('right', true)){
		btn_right.disabled = false;
	}else{
		btn_right.disabled = true;
	}

	requestAnimationFrame(update);
}
//End


start();
update();

window.onkeyup = input_keyboard;