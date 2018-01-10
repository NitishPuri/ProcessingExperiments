let systems = [];

var params = {
  wind: 0,
  gravity: 0.1,
  reset : function () {
    systems = [];
    systems.push(new ParticleSystem(width/2, 50));
  }
}

function setup() {
  var canvas = createCanvas(windowWidth - 10, windowHeight - 100);

  params.reset();

  var gui = new dat.GUI();
  gui.add(params, 'wind').min(-0.05).max(0.05).step(0.01);
  gui.add(params, 'gravity').min(-0.05).max(0.05).step(0.01);
  gui.add(params, 'reset');
}

function draw() {
  background(255);

  var gravity = createVector(0,params.gravity);
  var wind = createVector(params.wind, 0);
  for (var ps of systems) {
    ps.addParticle();
    ps.applyForce(gravity);
    ps.applyForce(wind);
    ps.run();      
  }
}

function mousePressed() {
  if( mouseX > 0 && mouseX && width && mouseY > 0 && mouseY < height) {
    systems.push(new ParticleSystem(mouseX, mouseY));
  }
}
