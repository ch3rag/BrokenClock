function Boundary(x, y, w, h, angle) {

	this.w = w;
	this.h = h;


	let options = {
		friction : 0.6,
		restitution : 1,
		angle : angle,
		isStatic : true,
		collisionFilter: {
      category: SEGMENT_CAT,
      mask: BOUND_CAT | SEGMENT_CAT
    }
	};


	this.body = Bodies.rectangle(x, y, w, h, options);

	World.add(world, this.body);


	this.draw = function() {
		let pos = this.body.position;
		let angle = this.body.angle;

		push();
			translate(pos.x, pos.y);
			rotate(angle);
			noStroke();
			rectMode(CENTER);
			fill(175);
			rect(0, 0, this.w, this.h);
		pop();
	}
}
