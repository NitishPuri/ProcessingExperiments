let spaceship;
let movers = [];

var liquid;

var params = {
  wind: 0,
  moverCount : 5,
  reset : function () {
    spaceship = new Spaceship();
    movers = [];
    for(let i = 0; i < params.moverCount; i++) {
      movers[i] = new Mover(random(width), random(height), random(1, 4));
    }
  }
}

function setup() {
  var canvas = createCanvas(windowWidth - 10, windowHeight - 100);
  // canvas.parent(select('#sketch'));

  params.reset();

  liquid = new Liquid(0, 0, width, height, 0.01);

  // var gui = new dat.GUI();
  var gui = new dat.GUI();
  gui.add(params, 'wind').min(-0.5).max(0.5).step(0.1);
  gui.add(liquid, 'drag').min(0).max(0.1).step(0.01);
  gui.add(params, 'moverCount')
    .min(1).max(10).step(1)
    .onFinishChange(moverCountChanged);
  gui.add(params, 'reset');
}

function moverCountChanged(value) {
  if(params.moverCount > movers.length) {
    for(let i = movers.length; i < params.moverCount; i++){
      movers[i] = new Mover(random(width), random(height), random(1, 4));
    }
  }
  else if(params.moverCount < movers.length) {
    movers.splice(params.moverCount, movers.length-params.moverCount);
  }
}

function draw() {
  background(100);

  liquid.render();

  var wind = createVector(params.wind, 0);

  // Update spaceship.
  spaceship.applyForce(wind);
  if(liquid.contains(spaceship)) {
    var drag = liquid.calculateDrag(spaceship);
    spaceship.applyForce(drag);
  }
  spaceship.update();
  spaceship.checkEdges();

  // Update movers
  for (let i = 0; i < movers.length; i++) {
    let mover = movers[i];
    mover.applyForce(wind);

    if (liquid.contains(mover)) {
      var drag = liquid.calculateDrag(mover);
      mover.applyForce(drag);  
    }

    // 
    var d = dist(mover.pos.x, mover.pos.y, spaceship.pos.x, spaceship.pos.y);
    if(d < (mover.mass*20 + spaceship.r) ) {
      movers[i] = new Mover(random(width), random(height), random(1, 4));
    }    

    mover.update();
    mover.render();
    mover.checkEdges();
  }
  
  // Render spaceship after the movers.!!
  spaceship.render();

  // Keyboard controls.
  if (keyIsPressed) {
    if ( keyCode === RIGHT_ARROW) {
      spaceship.turn(0.03);
    } 
    else if (keyCode === LEFT_ARROW) {
      spaceship.turn(-0.03);
    }
    else if ( key === ' ') {
      spaceship.thrust();
    }
    else if ( key === 'r' || key === 'R') {
      params.reset();
    }
  }
}

