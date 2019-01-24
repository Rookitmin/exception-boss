var exception;
var music;
var dMusic;
var mMusic;
var hp = [150, 150];
var buttons = {
	fight: {},
	act: {},
	item: {},
	mercy: {},
	select: {
		min: 1,
		max: 4,
		current: 1,
		selected: 0
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
	dMusic = loadSound('Death Screen.mp3');
	mMusic = loadSound('File Select Dramatification.mp3');
}
var soul;
var NWall;
var SWall;
var EWall;
var WWall;
var large = {};
var soulPos = [4];
var act1;
var dedArry = [1, 50, true, false];
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
	large.A = createVector(10, 150);
	large.B = createVector(390, 150);
	large.C = createVector(390, 300);
	large.D = createVector(10, 300);
	soulPos.push(createVector(30, 165));
	soulPos.push(createVector(200, 165));
	soulPos.push(createVector(30, 200));
	soulPos.push(createVector(200, 200));
	act1 = new createAttack(100, 200, 20, 50, 0, 0, 0);
	rectMode(CORNER);
}
var fight = false;
var Menu = false;
var dead = false;
var keyDetect = false;
var selectedOption = [];
var speed = 5;
var letters = [];
var devMode = true;
var attackNum = 0;
var cycleWords = {a: false, b: 0};
var phase = 0;
var PT = true;
var menuPhase1 = [
	1,
	[
		{
			text:"* Exception", 
			x: 30, 
			y: 165
		}
	],
	[
		{
			text:"* Check", 
			x: 30, 
			y: 165
		}, 
		{
			text:"* Talk", 
			x: 200, 
			y: 165
		},
		{
			text: "* Call For Help", 
			x: 30,
			y: 200}, 
		{
			text:"* Fear", 
			x: 200, 
			y: 200
		}
	],
	[
		{
			text:"* (+20) hp", 
			x: 30, 
			y: 165
		}, 
		{
			text: "* (+40) hp",
			x: 200,
			y: 165
		}, 
		{
			text: "* (+80) hp",
			x: 30,
			y: 200
		}
	],
	[
		{
			text: "* Spare",
			x: 30,
			y: 165
		}, 
	 	{
			text: "* Flee",
			x: 200,
			y: 165
		}
	]
];
var Options = function () {
	if (buttons.select.selected != 0) {
		for (var i = 0; i < menuPhase1[buttons.select.selected].length; i++) {
			fill(255, 255, 255);
			textSize(15);
			text(menuPhase1[buttons.select.selected][i].text, 
					 menuPhase1[buttons.select.selected][i].x + 15,
					 menuPhase1[buttons.select.selected][i].y + 15);
		}
	}
}
var selected = {button: 0, text: 0};

function draw() {
	if (dead) {
		if (!dMusic.isPlaying()) {
			dMusic.play();
			if (music.isPlaying()) {
				music.pause();
			}
			if (mMusic.isPlaying()) {
				mMusic.pause();
			}
		}
		if (!dedArry[3]) {
			fill(0, 0, 0, 10);
		}
		else {
			fill(0, 0, 0, 255);
		}
		rect(0, 0, 400, 400);
		fill(255, 255, 255);
		textAlign(CENTER);
		textSize(100);
		text("Game", 200, 150);
		text("Over", 200, 250);
		textSize(30);
		// console.log(dedArry);
		if (dedArry[2]) {
			text("[Press z to Restart]", 200, 350);
			dedArry[0] ++;
		}
		else {
			dedArry[0] --;
			dedArry[3] = true;
		}
		if (dedArry[0] >= dedArry[1]) {
			dedArry[0] --;
			dedArry[2] = false;
		}
		if (dedArry[0] <= 0) {
			dedArry[0] ++;
			dedArry[2] = true;
		}
		Menu = false;
		fight = false;
		if (keyIsDown(90)) {
			fight = true;
			dead = false;
			hp[0] = hp[1];
			dMusic.pause();
			textSize(12);
			textAlign(LEFT);
		}
	}
	if (Menu) {
		if (!mMusic.isPlaying()) {
			mMusic.play();
			if (music.isPlaying()) {
				music.pause();
			}
		}
	}
	else if (fight) {
		if (!music.isPlaying()) {
			music.play();
		}
		if (hp[0] <= 0) {
			dead = true;
		}
		if (!PT) {
			background(0);
			// rect(act1.pos.x, act1.pos.y, act1.size.x, act1.size.y);
			act1.draw();
			act1.change();
			NWall.draw();
			SWall.draw();
			EWall.draw();
			WWall.draw();
			image(exception, 175, 25);
			image(buttons.fight.inactive, 0, 340, 100, 40);
			image(buttons.act.inactive, 100, 340, 100, 40);
			image(buttons.item.inactive, 200, 340, 100, 40);
			image(buttons.mercy.inactive, 300, 340, 100, 40);
			soul.draw();
			// act1.draw();
			// act1.change();
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
			background(0);
			Options();
			if (true) {
				WWall.cornerA = large.B;
				WWall.cornerB = large.C;
				EWall.cornerA = large.A;
				EWall.cornerB = large.D;
				NWall.cornerA = large.A;
				NWall.cornerB = large.B;
				SWall.cornerA = large.C;
				SWall.cornerB = large.D;
			}
			NWall.draw();
			SWall.draw();
			EWall.draw();
			WWall.draw();
			image(exception, 175, 25);
			soul.draw();
			if (buttons.select.current === 1) {
				image(buttons.fight.active, 0, 340, 100, 40);
				image(buttons.act.inactive, 100, 340, 100, 40);
				image(buttons.item.inactive, 200, 340, 100, 40);
				image(buttons.mercy.inactive, 300, 340, 100, 40);
				if (buttons.select.selected === 0) {
					soul.pos.x = 18;
					soul.pos.y = 353;
				}
			}
			if (buttons.select.current === 2) {
				image(buttons.fight.inactive, 0, 340, 100, 40);
				image(buttons.act.active, 100, 340, 100, 40);
				image(buttons.item.inactive, 200, 340, 100, 40);
				image(buttons.mercy.inactive, 300, 340, 100, 40);
				if (buttons.select.selected === 0) {
					soul.pos.x = 118;
					soul.pos.y = 353;
				}
			}
			if (buttons.select.current === 3) {
				image(buttons.fight.inactive, 0, 340, 100, 40);
				image(buttons.act.inactive, 100, 340, 100, 40);
				image(buttons.item.active, 200, 340, 100, 40);
				image(buttons.mercy.inactive, 300, 340, 100, 40);
				if (buttons.select.selected === 0) {
					soul.pos.x = 218;
					soul.pos.y = 353;
				}
			}
			if (buttons.select.current === 4) {
				image(buttons.fight.inactive, 0, 340, 100, 40);
				image(buttons.act.inactive, 100, 340, 100, 40);
				image(buttons.item.inactive, 200, 340, 100, 40);
				image(buttons.mercy.active, 300, 340, 100, 40);
				if (buttons.select.selected === 0) {
					soul.pos.x = 318;
					soul.pos.y = 353;
				}
			}
			soul.draw();
		}
		act1.draw();
		act1.check();
		drawHP();
	}
	if (devMode) {
		fight = true;
		Menu = false;
	}
}
function keyPressed () {
	if (keyDetect) {
		console.log(keyCode);
	}
	if (!dead) {
		if (keyCode === 87 && !PT) {
			speed += 0.5;
			console.log(speed);
		}
		else if (keyCode === 83 && !PT) {
			speed -= 0.5;
			console.log(speed);
		}
		if (PT) {
			if (keyCode === 37  && !cycleWords.a) {
				if (buttons.select.selected === 0) {
					buttons.select.current --;
					if (buttons.select.current < buttons.select.min) {
						buttons.select.current = buttons.select.max;
					}
				}
				else {
					if (menuPhase1[0] - 1 >= 1){
						menuPhase1[0] --;
					}
					else {
						menuPhase1[0] = menuPhase1[buttons.select.selected].length;
					}
					soul.pos = soulPos[menuPhase1[0]];
				}
			}
			if (keyCode === 39 && !cycleWords.a) {
				if (buttons.select.selected === 0) {
					buttons.select.current ++;
					if (buttons.select.current > buttons.select.max) {
						buttons.select.current = buttons.select.min;
					}
				}
				else {
					if (menuPhase1[0] + 1 <= menuPhase1[buttons.select.selected].length){
						menuPhase1[0] ++;
					}
					else {
						menuPhase1[0] = 1;
					}
					soul.pos = soulPos[menuPhase1[0]];
				}
			}
			if (keyCode === 38 && !cycleWords.a) {
				if ( buttons.select.selected != 0) {
					if (menuPhase1[0] - 2 >= 1){
						menuPhase1[0] -= 2;
					}
					else {
						if (menuPhase1[0] === (1 || 3 || 5 || 7)) {
							menuPhase1[0] = menuPhase1[buttons.select.selected].length;
						}
						else {
							menuPhase1[0] = menuPhase1[buttons.select.selected].length - 1;
						}
					}
					soul.pos = soulPos[menuPhase1[0]];
				}
			}
			if (keyCode === 40 && !cycleWords.a) {
				if (buttons.select.selected != 0) {
					if (menuPhase1[0] + 2 <= menuPhase1[buttons.select.selected].length){
						menuPhase1[0] += 2;
					}
					else {
						if (menuPhase1[0] === (1 || 3 || 5 || 7)) {
							menuPhase1[0] = 1;
						}
						else {
							menuPhase1[0] = 2;
						}
					}
					soul.pos = soulPos[menuPhase1[0]];
				}
			}
		}
		if (keyCode === 90 && PT) {
			if (buttons.select.selected === 0) {
				buttons.select.selected = buttons.select.current;
				soul.pos.x = 30;
				soul.pos.y = 165;
			}
			else if (!cycleWords.a) {
				cycleWords.a = true;
				cycleWords.b = 0;
			}
			else {
				if (cycleWords.b > 100) {

				}
				if (devMode) {
					// soul.colour = color(255, 255, 0);
					// soul.colour = color(0, 255, 255);
					soul.colour = color(255, 0, 0);
					// soul.colour = color(0, 255, 0);
				}
			}
		}
		if (keyCode === 88 && PT) {
			if (!cycleWords.a) {
				buttons.select.selected = 0;
				menuPhase1[0] = 1;
				soulPos[1] = createVector(30, 165);
				soulPos[2] = createVector(200, 165);
				soulPos[3] = createVector(30, 200);
				soulPos[4] = createVector(200, 200);
			}
			else {
				cycleWords.b = 100;
			}
		}
		if (key === 'f' && devMode) {
			PT = false;
		}
		if (key === 'r' && devMode) {
			PT = true;
		}
		if (key === 'g' && devMode) {
			keyDetect = false;
		}
		if (key === 't' && devMode) {
			keyDetect = true;
		}
		if (! devMode && !fight) {
			letters.push (key);
			console.log(letters);
		}
		for (var i = 0; i + 2 < letters.length; i++) {
			if (letters[i] === "d" && letters[i + 1] === 'e' && letters[i + 2] === 'v') {
				devMode = true;
			}
		}
	}
}
