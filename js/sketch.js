let Engine = Matter.Engine;
let World  = Matter.World;
let Bodies = Matter.Bodies;
let Contraint = Matter.Constraint;
let Vector = Matter.Vector;
let MouseConstraint = Matter.MouseConstraint;
let Mouse = Matter.Mouse;


let engine;
let world;

let DECIMAL_EQ_HEX = [];
let floor =  [];

let clock;

function setup() {
  let w = windowWidth;//document.body.clientWidth;
  let h = windowHeight;//document.body.clientHeight - 40;
  let canvas = createCanvas(w, h);
  engine = Engine.create();
  world = engine.world;
  Engine.run(engine);

  DECIMAL_EQ_HEX.push(0x7E);
  DECIMAL_EQ_HEX.push(0x30);
  DECIMAL_EQ_HEX.push(0x6D);
  DECIMAL_EQ_HEX.push(0x79);
  DECIMAL_EQ_HEX.push(0x33);
  DECIMAL_EQ_HEX.push(0x5B);
  DECIMAL_EQ_HEX.push(0x5F);
  DECIMAL_EQ_HEX.push(0x70);
  DECIMAL_EQ_HEX.push(0x7F);
  DECIMAL_EQ_HEX.push(0x7B);
  let scale = (w / 125);
  let x = (w - scale * 109)/2;
  let y = (h/2) - 20 * scale / 2;

  clock = new Clock(x, y, scale);
  clock.update();
  let mouse = Mouse.create(canvas.elt);

  let options = {
    mouse : mouse
  }

  let mConstraint = MouseConstraint.create(engine, options);

  World.add(world, mConstraint);

  floor.push(new Boundary(width/2, height, width, 20, 0));
  floor.push(new Boundary(0, height/2, 20, height, 0));
  floor.push(new Boundary(width/2, 0, width, 20, 0));
  floor.push(new Boundary(width, height/2, 20, height, 0));
  setInterval(updateClock, 2000);
}

function updateClock () {
  clock.update();
}

function draw() {
  background(0);
  clock.draw();
  for(let f of floor) {
    f.draw();
  }
}
