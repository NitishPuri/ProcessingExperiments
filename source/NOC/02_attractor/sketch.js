let movers = [];
let attractor;
var G = 1;

var params = {
  wind: 0,
  // gravity: 0.01,
  friction: 0.1,
  // drag: 0.01,
  mutualRepulsion : false,
  reset : function () {
    movers = []
    for (var i = 0; i < 10; i++) {
      movers[i] = new Mover(random(width), random(height/2), random(0.5, 4));
    }      
    attractor = new Attractor();
  }
}

function setup() {
  var canvas = createCanvas(windowWidth - 10, windowHeight - 100);
  // canvas.parent(select('#sketch'));

  params.reset();

  var gui = new dat.GUI({autoPlace: false});
  var gui = new dat.GUI();
  // var customContainer = select('#guiElement')
  // customContainer.child(gui.domElement)
  gui.add(params, 'wind').min(-0.5).max(0.5).step(0.1);
  gui.add(params, 'friction').min(0).max(0.1).step(0.01);
  gui.add(params, 'mutualRepulsion');
  gui.add(params, 'reset');
}

function mousePressed() {
  attractor.clicked(mouseX, mouseY)
}

function mouseReleased() {
  attractor.stopDragging();
}

function draw() {
  background(100);

  attractor.render();
  attractor.drag(mouseX, mouseY);
  attractor.hover(mouseX, mouseY);

  var wind = createVector(params.wind, 0);

  for (var mover of movers) {
    mover.applyForce(wind);
    // mover.applyForce(createVector(0, params.gravity * mover.mass));

    var friction = mover.vel.copy();
    friction.normalize();
    friction.mult(-1 * params.friction);
    mover.applyForce(friction);

    if(params.mutualRepulsion) {
      for (var otherMover of movers) {
        if(mover !== otherMover) {
          mover.applyForce(otherMover.repel(mover));
        }
      }
    }

    mover.applyForce(attractor.attract(mover));

    // if (liquid.contains(mover)) {
    //   var drag = liquid.calculateDrag(mover);
    //   mover.applyForce(drag);  
    // }

    mover.update();
    mover.render();
    mover.checkEdges();
  }
}

