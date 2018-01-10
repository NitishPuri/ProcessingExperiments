let systems = [];

var params = {
//   count: 5,
//   xSpacing: 8,
//   randomAmp : true,
//   randomVel : true,
//   randomPos : true,
  reset : function () {
    systems = [];
    systems.push(new ParticleSystem(width/2, 50));
  }
}

function setup() {
  var canvas = createCanvas(windowWidth - 10, windowHeight - 100);

  params.reset();

  var gui = new dat.GUI();
  gui.add(params, 'reset');
}

function draw() {
  background(255);
  for (var ps of systems) {
    ps.addParticle();
    ps.run();      
  }
}

function mousePressed() {
  systems.push(new ParticleSystem(mouseX, mouseY));
}
