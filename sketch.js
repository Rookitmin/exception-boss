var exception;
var music;
var buttons = {
	fight: {},
	act: {},
	item: {},
	mercy: {},
	select: {
		min: 1,
		max: 2,
		current: 1
	}
};
function preload () {
	exception = loadImage("2018-12-06.png");
	buttons.fight.inactive = loadImage("Fight1.png");
	buttons.fight.active = loadImage("Fight2.png");
	buttons.act.inactive = loadImage("Act1.png");
	buttons.act.active = loadImage("Act2.png");
	buttons.item.inactive = loadImage("Item1.png");
	buttons.item.active = loadImage("Item2.png");
	buttons.mercy.inactive = loadImage("Mercy1.png");
	buttons.mercy.active = loadImage("Mercy2.png");
	soundFormats('mp3', 'ogg');
	music = loadSound('The Undisputed King of Fate.mp3');
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
var attackNum = 0;
var phase = 0;
var PT = false;


function draw() {
	if (fight) {
		if (!music.isPlaying()) {
			music.play();
		}
		if (!PT) {
			background(0);
			NWall.draw();
			SWall.draw();
			EWall.draw();
			WWall.draw();
			image(exception, 150, 10);
			image(buttons.fight.inactive, 0, 340, 100, 40);
			image(buttons.act.inactive, 100, 340, 100, 40);
			image(buttons.item.inactive, 200, 340, 100, 40);
			image(buttons.mercy.inactive, 300, 340, 100, 40);
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
				if (attackNum === 5) {
					WWall.cornerA.x --;
					WWall.cornerB.x --;
					NWall.cornerB.x --;
					SWall.cornerB.x --;
				}
			}
		}
		if (PT) {
			
		}
	}
	if (devMode) {
		fight = true;
	}
}
function keyPressed () {
	if (keyCode === 87 && !PT) {
		speed += 0.5;
		console.log(speed);
	}
	else if (keyCode === 83 && !PT) {
		speed -= 0.5;
		console.log(speed);
	}
	if (keyCode === 37 && PT) {
		
	}
	if (keyCode === 39 && PT) {
		
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
