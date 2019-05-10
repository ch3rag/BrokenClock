const SEGMENT_CAT = 0x0001;
const PIVOT_CAT   = 0x0002;
const BOUND_CAT   = 0x0004;

function Segment(x, y, scale, orientation, status) {

  this.vertices = [];

  let pivotOptions = {
        isStatic: true,
        angle: orientation,
        collisionFilter: {
          category: PIVOT_CAT
        }
  }


  this.pivot = Bodies.rectangle(x, y, 10 * scale, 2 * scale, pivotOptions);


  World.add(world, this.pivot);

  this.vertices.push(createVector(-5 * scale ,0));
  this.vertices.push(createVector(-4 * scale,1 * scale));
  this.vertices.push(createVector(4 * scale,1 * scale));
  this.vertices.push(createVector(5 * scale,0));
  this.vertices.push(createVector(4 * scale,-1 * scale));
  this.vertices.push(createVector(-4 * scale,-1 * scale));

  let segOptions = {
    angle: orientation,
    density: 50,
    friction: 1,
    restitution: 0.6,
    collisionFilter: {
      category: SEGMENT_CAT,
      mask: BOUND_CAT | SEGMENT_CAT
    }
  }

  this.body = Bodies.fromVertices(x, y, this.vertices, segOptions);
  World.add(world, this.body);

  let jointOptionsA = {
    bodyA: this.pivot,
    bodyB: this.body,
    length: 5,
    stiffness:  0.03,
    damping: 1

  }

  let jointOptionsB = {
    bodyA: this.pivot,
    bodyB: this.body,
    length: 5,
    stiffness:  0.03,
    damping: 1
  };

  if(orientation = 0) {
      jointOptionsA.pointA = {x: -5 * scale, y: 0};
      jointOptionsA.pointB = {x: -5 * scale, y: 0};
      jointOptionsB.pointA = {x: 5 * scale, y: 0};
      jointOptionsB.pointB = {x: 5 * scale, y: 0};
  } else {
      jointOptionsA.pointA = {x: 0, y: -5 * scale};
      jointOptionsA.pointB = {x: 0, y: -5 * scale};
      jointOptionsB.pointA = {x: 0, y: 5 * scale};
      jointOptionsB.pointB = {x: 0, y: 5 * scale};
  }

  this.jointA = Contraint.create(jointOptionsA);
  this.jointB = Contraint.create(jointOptionsB);

  //World.add(world, this.jointA);
  //World.add(world, this.jointB);


  this.setStatus = function(status) {
    if(status == 1) {
      World.add(world, this.jointA);
      World.add(world, this.jointB);
    } else {
      World.remove(world, this.jointA);
      World.remove(world, this.jointB);
    }
  }

  this.removeJoint = function() {
    World.remove(world, this.jointA);
    World.remove(world, this.jointB);
    Matter.Body.applyForce(this.body, {x: this.body.position.x, y: this.body.position.y}, {x: random(-300,300), y: random(-300,300)});

  }

  this.draw = function() {

    fill(255, 0, 0);
    let pos = this.body.position;
    let angle  = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    beginShape();
    for(let v of this.vertices) {
      vertex(v.x, v.y);
    }
    endShape(CLOSE);
    pop();
  }
}
