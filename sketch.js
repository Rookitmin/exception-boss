var exception;
var music;
function preload () {
	exception = loadImage("2018-12-06.png");
	soundFormats('mp3', 'ogg');
  music = loadSound('Exception.mp3');
}
var soul;
var NWall;
var SWall;
var EWall;
var WWall;
function setup() {
	music.setVolume(1);
	music.play();
	createCanvas(400, 400);
	background(100);
	colorMode(RGB, 255);
	soul = new CreateSoul(200, 200, 1);
	NWall = new createWall(50, 150, 350, 150, "up");
	SWall = new createWall(50, 300, 350, 300, "down");
	EWall = new createWall(50, 150, 50, 300, "left");
	WWall = new createWall(350, 150, 350, 300, "right");
	rectMode(CORNER);
}
var fight = false;
var speed = 5;
var letters = [];
var devMode = true;
var atackNum = 0;
var phase = 0;

function draw() {
	if (fight) {
		background(0);
		if (!music.isPlaying()) {
			music.play();
		}
		NWall.draw();
		SWall.draw();
		EWall.draw();
		WWall.draw();
		image(exception, 150, 10);
		soul.draw();
		if (keyIsDown(88)) {
			speed = 2.5 / 2;
		}
		else {
			speed = 2.5;
		}
		if (keyIsDown(37) && !EWall.restrain()) {
			soul.update(-speed, 0);
		}
		if (keyIsDown(38) && !NWall.restrain()) {
			soul.update(0, -speed);
		}
		if (keyIsDown(39) && !WWall.restrain()) {
			soul.update(speed, 0);
		}
		if (keyIsDown(40) && ! SWall.restrain()) {
			soul.update(0, speed);
		}
		if (NWall.restrain() && !SWall.restrain()) {
			soul.constrain(0, NWall.cornerA.y);
			if (attackNum === 5) {
				NWall.cornerA.y ++;
				NWall.cornerB.y ++;
				EWall.cornerA.y ++;
				WWall.cornerA.y ++;
			}
		}
		if (SWall.restrain() && !NWall.restrain()) {
			soul.constrain(0, SWall.cornerA.y - soul.size * 12);
			if (attackNum === 5) {
				SWall.cornerA.y --;
				SWall.cornerB.y --;
				EWall.cornerB.y --;
				WWall.cornerB.y --;
			}
		}
		if (EWall.restrain() && !WWall.restrain()) {
			soul.constrain(EWall.cornerA.x, 0); 
			if (attackNum === 5) {
				EWall.cornerA.x ++;
				EWall.cornerB.x ++;
				NWall.cornerA.x ++;
				SWall.cornerA.x ++;
			}
		}
		if (WWall.restrain() && !EWall.restrain()) {
			soul.constrain(WWall.cornerA.x - soul.size * 12, 0);
			if (atackNum === 5) {
				WWall.cornerA.x --;
				WWall.cornerB.x --;
				NWall.cornerB.x --;
				SWall.cornerB.x --;
			}
		}
	}
	if (devMode) {
		fight = true;
	}
}
function keyPressed () {
	if (keyCode === 87) {
		speed += 0.5;
		console.log(speed);
	}
	else if (keyCode === 83) {
		speed -= 0.5;
		console.log(speed);
	}
	if (! devMode) {
		letters.push (key);
		console.log(letters);
	}
	for (var i = 0; i + 2 < letters.length; i++) {
		if (letters[i] === "d" && letters[i + 1] === 'e' && letters[i + 2] === 'v') {
			devMode = true;
		}
	}
}
