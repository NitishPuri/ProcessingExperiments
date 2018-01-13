// a reference to our box2d world
var world;

var boundaries = [];
var windmill;
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

  windmill = new Windmill(width/2, 300);

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
    let p = random(1);
    let t = 1/5;
    if(p < t) {
            
      let w = random([4, 8, 12]);
      let h = random([4, 8, 12]);
      boxes.push(new Box(mouseX, mouseY, w, h));
    }
    else if( p < 2*t) {
      boxes.push(new Circle(mouseX, mouseY, random(4, 8)));
    }
    else if ( p < 3*t){
      boxes.push(new CustomShape(mouseX, mouseY));
    }
    else if ( p < 4*t) {
      boxes.push(new Pair(mouseX, mouseY));
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

  windmill.display();
}

function keyPressed(){
  if(key === ' ') {
    windmill.toggleMotor();
  }
}
