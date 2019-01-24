var createWall = function (x1, y1, x2, y2, bd) {
	this.cornerA = createVector(x1, y1);
	this.cornerB = createVector(x2, y2);
	this.barrier = bd;
	
	this.draw = function () {
		stroke("white");
		strokeWeight(5);
		line(this.cornerA.x, this.cornerA.y, this.cornerB.x, this.cornerB.y);
	}
	
	this.restrain = function () {
		if (this.barrier === "up") {
			if (soul.pos.y < this.cornerA.y) {
				return(true);
			}
			else {
				return(false);
			}
		}
		if (this.barrier === "down") {
			if (soul.pos.y + soul.size * 12 > this.cornerA.y) {
				return(true);
			}
			else {
				return(false);
			}
		}
		if (this.barrier === "left") {
			if (soul.pos.x < this.cornerA.x) {
				return(true);
			}
			else {
				return(false);
			}
		}
		if (this.barrier === "right") {
			if (soul.pos.x + soul.size * 12 > this.cornerA.x) {
				return(true);
			}
			else {
				return(false);
			}
		}
	}
}

var createAttack = function (x, y, w, h, facing, speedX, speedY) {
	this.pos = createVector(x,y);
	this.posB = createVector(x + w, y + h);
	this.size = createVector(w, h);
	this.dir = facing;
	this.speed = createVector(speedX, speedY);
	
	this.draw = function () {
		noFill();
		stroke("white");
		strokeWeight(1);
		rect(this.pos.x, this.pos.y, this.size.x, this.size.y);
	}
	
	this.check = function () {
		if (soul.check(this.pos.x, this.pos.y, this.posB.x, this.posB.y)) {
			hp[0] --;
		}
	}
	
	this.change = function () {
		this.pos.x += this.speed.x;
		this.pos.y += this.speed.y;
		this.posB.x = this.pos.x + this.size.x;
		this.posB.y = this.pos.y + this.size.y;
	}
}
var drawHP = function () {
	fill("red");
	noStroke();
	rect(200, 310, 75, 20);
	fill("yellow");
	rect(200, 310, 75 * hp[0] / hp[1], 20);
	fill("white");
	textSize(12);
	text("HP: " + hp[0] + " / " + hp[1], 285, 325);
}







