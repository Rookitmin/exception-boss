var CreateSoul = function (x, y, size) {
	this.pos = createVector(x, y);
	this.colour = color(255, 0, 0);
	this.size = size;
	
	this.draw = function () {
		stroke(this.colour);
		strokeWeight(0);
		fill(this.colour);
		rect(this.pos.x - this.size * 5, this.pos.y, this.size * 6, this.size * 2);
		rect(this.pos.x + this.size * 4, this.pos.y, this.size * 6, this.size * 2);
		rect(this.pos.x - this.size * 7, this.pos.y + this.size * 2, this.size * 19, this.size * 5);
		rect(this.pos.x - this.size * 5, this.pos.y + this.size * 7, this.size * 15, this.size * 3);
		rect(this.pos.x - this.size * 2, this.pos.y + this.size * 10, this.size * 10, this.size * 3);
		rect(this.pos.x, this.pos.y + this.size * 12, this.size * 5, this.size * 3);
	}
	
	this.update = function (x, y) {
		this.pos.x += x;
		this.pos.y += y;
	}
	this.constrain = function (x, y) {
		if (x !== 0) {
			this.pos.x = x;
		}
		if (y !== 0) {
			this.pos.y = y;
		}
	}
}
