// a reference to our box2d world
var world;

var boundaries = [];
// A list of our boxes
let blob;
let box;

// for mouse joint
let spring;
let skeleton = false;

var params = {
  // wind: 0,
  // gravity: 0.1,
  // mouseAction : 0,
  // environment : 0,
  reset: function () {
    // for(let i = 0; i < boxes.length; i++) {
    //   boxes[i].killBody();
    // }
    // boxes = [];    
    // boxes.push(new Box(width/2, height/2, 20, 20));
    // spring = new Spring();
    // boundaries = []
    // surface = null;
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
  boundaries.push(new Boundary(width / 2, height - 5, width, 10));
  boundaries.push(new Boundary(width / 2, 5, width, 10));
  boundaries.push(new Boundary(width - 5, height / 2, 10, height));
  boundaries.push(new Boundary(5, height / 2, 10, height));

  blob = new Skeleton();
  box = new Box(width / 2, 100, 50, 50);
  spring = new Spring();
}

function draw() {
  background(255);

  var timeStep = 1.0 / 30;
  world.Step(timeStep, 10, 10);

  if(skeleton) {
    blob.displaySkeleton();
  }
  else {
    blob.displayCreature();
  }

  boundaries.forEach(boundary => boundary.display() );

  spring.update(mouseX, mouseY);

  box.display();

  spring.display();

  fill(0);
  stroke(0)
  strokeWeight(1);
  text("Space bar to toggle creature/skeleton.\n Click and drag the box.",
   20, height - 30);
}

function mouseReleased() {
  spring.destroy()
}

function mousePressed() {
  if (box.contains(mouseX, mouseY)) {
    spring.bind(mouseX, mouseY, box.body);
  }
}

function keyPressed() {
  if(key === ' ') {
    skeleton = !skeleton;
  }
}