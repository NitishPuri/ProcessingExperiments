// a reference to our box2d world
var world;

var boundaries = [];
// A list of our boxes
let boxes = [];

var params = {
  // wind: 0,
  // gravity: 0.1,
  // attachToMouse : false,
  reset : function () {
    for(let i = 0; i < boxes.length; i++) {
      boxes[i].killBody();
    }
    boxes = [];
    // boundaries = [];
    // systems = [];
    // systems.push(new ParticleSystem(width/2, height - 50, img));
  }
}

function setup() {
  var canvas = createCanvas(windowWidth - 10, windowHeight - 100);

  // world = createWorld(new box2d.b2Vec2(0, 0));
  world = createWorld();

  // Add boundaries
  boundaries.push(new Boundary(width/4, height-5, width/2 - 50, 10));
  boundaries.push(new Boundary(3*width/4, height-50, width/2 - 50, 10));

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
    // boxes.push(new Lollipop(mouseX, mouseY));
    var p = random(1);
    var t = 1/4;
    if(p < t) {
      boxes.push(new Box(mouseX, mouseY));
    }
    else if( p < 2*t) {
      boxes.push(new Circle(mouseX, mouseY, random(4, 8)));
    }
    else if ( p < 3*t){
      boxes.push(new CustomShape(mouseX, mouseY));
    }
    else {
      boxes.push(new Lollipop(mouseX, mouseY));
    }
  }

  for(let i = 0; i < boundaries.length; i++) {
    boundaries[i].display();
  }

  // var gravity = createVector(0,params.gravity);
  // var wind = createVector(params.wind, 0);
  for(let i = boxes.length-1; i >= 0; i--) {
    boxes[i].display();
    if(boxes[i].done()) {
      boxes.splice(i, 1);
    }
  }
}
