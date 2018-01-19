// module aliases
var Engine = Matter.Engine,
    // Render = Matter.Render,
    World = Matter.World,
    Constraint = Matter.Constraint,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Events = Matter.Events,
    Bodies = Matter.Bodies;

// create an engine
var engine;
var world;

var particles = []
var plinkos = []
var cols = 11;
var rows = 5;

var boundaries = []

function collision(event) {
  const pairs = event.pairs;
  pairs.forEach(p => {
    const bodyA = p.bodyA;
    const bodyB = p.bodyB;
    // console.log(pairs);
    // console.log(bodyA.label, bodyB.label);

  });
}

function setup() {
  var canvas = createCanvas(windowWidth - 400, windowHeight - 100);
  colorMode(HSB);
  engine = Engine.create();
  world = engine.world;
  world.gravity.y = 2;

  Events.on(engine, 'collisionStart', collision);

  newParticle();

  var spacing = (width) / cols;

  for(let j = 0; j < rows; j++) {
    for(let i = 0; i < cols + 1; i++) {
      let x = i * spacing;
      if(j%2 == 1) {
        x += spacing/2;
      }
      const y = spacing + j * spacing
      var p = new Particle(x, y, 15, true);
      plinkos.push(p);
    }
  }

  const b = new Boundary(width/2, height - 10, width, 20);
  boundaries.push(b);

  for(let i = 0; i < cols + 1; i++) {
    var x = i * spacing;
    var h = 60;
    var w = 10;
    var y = height - 20 - h/2;

    const b = new Boundary(x, y, w, h);
    boundaries.push(b);
  }

  Engine.run(engine);
}

function newParticle() {
  var p = new Particle(width/2, 0, 10, false);
  particles.push(p);
}

function draw() {

  // Engine.update(engine);

  if(frameCount % 30 == 0) {
    newParticle();
  }

  background(51);

  boundaries.forEach(b => b.show());

  for(let i = 0; i < particles.length; i++) {
    const p = particles[i];
    p.show();
    if(p.isOffScreen()) {
      World.remove(world, p.body);
      particles.splice(i--, 1);
    }
  }

  plinkos.forEach(p => p.show());
}

