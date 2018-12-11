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
