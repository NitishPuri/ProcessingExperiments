let spring;
let mover;

var params = {
  //   count: 5,
  //   xSpacing: 8,
  //   randomAmp : true,
  //   randomVel : true,
  //   randomPos : true,
  reset: function () {
    spring = new Spring(width / 2, 10, 100);
    mover = new Mover(width / 2, 100, 24);
  }
}

function setup() {
  var canvas = createCanvasCustom();

  params.reset();

  var gui = new dat.GUI();
  gui.add(spring, 'length').min(50).max(400).step(10);
  gui.add(spring, 'k').min(0.01).max(0.5);
  gui.add(params, 'reset');
}

function draw() {
  background(255);

  var gravity = createVector(0, 2);
  mover.applyForce(gravity);

  spring.connect(mover);
  spring.constrainLength(mover, 30, 800);

  mover.update();
  mover.drag(mouseX, mouseY);

  spring.displayLine(mover);
  mover.display();
  spring.display();

  fill(0);
  text("click on bob to drag", 10, height - 15);
}

function mousePressed() {
  mover.clicked(mouseX, mouseY);
}

function mouseReleased() {
  mover.stopDragging();
}