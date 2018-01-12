// a reference to our box2d world
var world;

// A list of our boxes
let boxes = [];

var params = {
  // wind: 0,
  // gravity: 0.1,
  // attachToMouse : false,
  reset : function () {
    boxes = [];
    // systems = [];
    // systems.push(new ParticleSystem(width/2, height - 50, img));
  }
}

function setup() {
  var canvas = createCanvas(windowWidth - 10, windowHeight - 100);

  world = createWorld(new box2d.b2Vec2(0, 0));

  params.reset();

  var gui = new dat.GUI();
  // gui.add(params, 'wind').min(-0.05).max(0.05).step(0.01);
  // gui.add(params, 'gravity').min(-0.05).max(0.05).step(0.01);
  // gui.add(params, 'attachToMouse');
  gui.add(params, 'reset');
}

function draw() {
  background(255);

  var timeStep = 1.0/30;
  world.Step(timeStep, 10, 10);

  if(mouseIsPressed) {
    boxes.push(new Box(mouseX, mouseY));
  }

  // var gravity = createVector(0,params.gravity);
  // var wind = createVector(params.wind, 0);
  for (var box of boxes) {
    box.display();
  }
}
