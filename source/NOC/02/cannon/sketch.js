let mover;

var angle;
var position;
var shot = false;

var params = {
  wind: 0,
  gravity: 0.05,
  reset: function () {
    position = createVector(50, height - 100);
    angle = -PI / 4;
    mover = new Mover(position.x, position.y, random(0.5, 4))
    shot = false;
  }
}

function setup() {
  var canvas = createCanvasCustom();
  // canvas.parent(select('#sketch'));

  params.reset();

  // var gui = new dat.GUI();
  var gui = new dat.GUI();
  gui.add(params, 'wind').min(-0.5).max(0.5).step(0.1);
  gui.add(params, 'gravity').min(0.05).max(0.2).step(0.01);
  gui.add(params, 'reset');
}

function draw() {
  background(100);

  push();
  translate(position.x, position.y);
  rotate(angle);
  rect(0, -5, 50, 10);
  pop();

  if (shot) {
    var wind = createVector(params.wind, 0);
    mover.applyForce(wind);

    mover.applyForce(createVector(0, params.gravity * mover.mass));

    mover.update();

  }

  if (mover.pos.y > height) {
    params.reset();
  }

  mover.render();
  // mover.checkEdges();
}

function keyPressed() {
  console.log(key);
  if (keyCode === RIGHT_ARROW) {
    angle += 0.1;
  }
  else if (keyCode === LEFT_ARROW) {
    angle -= 0.1;
  }
  else if (key === ' ') {
    shot = true;
    var force = p5.Vector.fromAngle(angle);
    force.mult(10);
    mover.applyForce(force);
  }
  else if (key === 'r' || key === 'R') {
    params.reset();
  }
}

