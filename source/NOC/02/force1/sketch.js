let movers = [];

var liquid;

var params = {
  wind: 0,
  gravity: 0.01,
  friction: 0,
  drag: 0.01,
  wallDamping: 0.8,
  reset: function () {
    movers = []
    for (var i = 0; i < 25; i++) {
      movers[i] = new Mover(random(width), random(height / 2), random(0.5, 4));
    }
  }
}

function setup() {
  var canvas = createCanvasCustom();
  // canvas.parent(select('#sketch'));

  params.reset();

  liquid = new Liquid(0, height / 2, width, height / 2, 0.1);

  // var gui = new dat.GUI();
  var gui = new dat.GUI();
  gui.add(params, 'wind').min(-0.5).max(0.5).step(0.1);
  gui.add(params, 'gravity').min(0).max(0.1).step(0.01);
  gui.add(params, 'friction').min(0).max(0.1).step(0.01);
  gui.add(liquid, 'drag').min(0).max(0.1).step(0.01);
  gui.add(params, 'wallDamping').min(0.75).max(0.99).step(0.1);
  gui.add(params, 'reset');
}

function draw() {
  background(100);

  liquid.render();

  // console.log(sliders[0].slider.value());

  var wind = createVector(params.wind, 0);

  for (var mover of movers) {
    mover.applyForce(wind);
    mover.applyForce(createVector(0, params.gravity * mover.mass));

    var friction = mover.vel.copy();
    friction.normalize();
    friction.mult(-1 * params.friction);
    mover.applyForce(friction);

    if (liquid.contains(mover)) {
      var drag = liquid.calculateDrag(mover);
      mover.applyForce(drag);
    }

    mover.update();
    mover.render();
    mover.checkEdges(params.wallDamping);
  }
}

