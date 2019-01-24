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
	
	this.check = function (x1, y1, x2, y2) {
		if (this.pos.x - 6 <= x2 && this.pos.x + 15 >= x1) {
			if (this.pos.y - 1 <= y2 && this.pos.y + 15 >= y1) {
				return(true);
			}
			else {
				return(false);
			}
		}
		else {
			return(false);	
		}
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
var arrayInputs = [
	{min: 0, max: 2}
];
var sectionTalk = [
	"So.", 
	"...",
	"You're Here.",
	"You Finaly Made It.",
	"Was It Worth It?",
	"...",
	". . .",
	"I know What You're Thinking.",
	"Just Another Person to Kill.",
	"Just More LV.",
	"Just More Power.",
	"...",
	". . .",
	".  .  .",
	"Well",
	"...",
	"I'm Afraid You Don't Know Who I Am.",
	"What I'm Capable Of.",
	"Who You've Been Killing All Along.",
	"...",
	"I Won't Stand For It.",
	"You've killed too Many of MY People."
];
var PlayingTalk = [
	"Why do Other People Die?",
	"...",
	"I Force Them Into It."
];
var selectionWords = [
	"* You Attempted to Spare Exception.",
	"* But Nothing Happened.",
	"* You Attempted to Call For Help.",
	"* But Nobody Came.",
	"* "
];




