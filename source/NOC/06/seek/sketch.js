// http://www.red3d.com/cwr/steer/

let vehicles = [];

let behaviourFunction = function () { };

// Flow field
let flowField;

let path;

var gui;

var params = {
  behaviour: 3,
  behaviours: {
    Seek: 0,
    Arrive: 1,
    Bounds: 2,
    FlowField: 3,
    PathFollowing: 4,
    Separate: 5
  },
  debug: false,
  count: 50,
  arriveThreshold: 50,
  boundary: 25,
  flowFieldResolution: 50,
  flowFieldDynamic: 0,
  desiredSeparationFactor : 2,
  reset() {
    vehicles = [];
    for (let i = 0; i < this.count; i++) {
      const x = random(width);
      const y = random(height);
      const ms = random(2, 5);
      const mf = random(0.1, 0.5);
      vehicles.push(new Vehicle(x, y, ms, mf));
    }
  },
  resetFlow() {
    flowField = new Flowfield(this.flowFieldResolution);
  },
  resetPath() {
    path = new Path();
    path.addPoint(-20, height / 2);
    path.addPoint(random(0, width / 2), random(0, height));
    path.addPoint(random(width / 2, width), random(0, height));
    path.addPoint(width + 20, height / 2);
  },
  init() {
    this.reset();
    this.resetFlow();
    this.resetPath();
    behaviourChanged(this.behaviour);
  }
}

function behaviourChanged(value) {
  if (value == params.behaviours.Seek) {
    behaviourFunction = function () {
      var mouse = createVector(mouseX, mouseY);
      vehicles.forEach(v => v.seek(mouse));
      drawMouse();
    }
  }
  else if (value == params.behaviours.Arrive) {
    behaviourFunction = function () {
      var mouse = createVector(mouseX, mouseY);
      vehicles.forEach(v => v.arrive(mouse, params.arriveThreshold));
      drawMouse();
    }
  }
  else if (value == params.behaviours.Bounds) {
    behaviourFunction = function () {
      vehicles.forEach(v => v.bound(params.boundary));
      drawBounds();
    }
  }
  else if (value == params.behaviours.FlowField) {
    behaviourFunction = function () {
      if ((params.flowFieldDynamic != 0)
        && (frameCount % params.flowFieldDynamic == 0)) {
        flowField.update();
      }
      vehicles.forEach(v => v.followFlow(flowField))
      if (params.debug) {
        flowField.display();
      }
    }
  }
  else if (value == params.behaviours.PathFollowing) {
    behaviourFunction = function () {
      path.display();
      vehicles.forEach(v => v.followPath(path));
    }
  }
  else if (value == params.behaviours.Separate) {
    behaviourFunction = function () {
      vehicles.forEach(v => v.separate(vehicles, params.desiredSeparationFactor))
    }
  }
}

function setup() {
  createCanvas(windowWidth - 100, windowHeight - 50);

  params.init();

  gui = new dat.GUI();

  const gf = gui.addFolder('General');
  gf.add(params, 'behaviour', params.behaviours)
    .onFinishChange(behaviourChanged)
    .name('Behaviour');
  gf.add(params, 'debug').name('Debug(d)');
  gf.add(params, 'count').min(5).max(200).step(5).name('Vehicle Count');
  gf.add(params, 'reset').name('Reset Vehicles(r)');

  const af = gui.addFolder('Arrive');
  af.add(params, 'arriveThreshold')
  .min(10).max(100).step(10).name('Arrive Threshold');

  const bf = gui.addFolder('Bounds');
  bf.add(params, 'boundary').min(10).max(150).step(10);

  const ff = gui.addFolder('Flow Field');
  ff.add(params, 'resetFlow').name('Reset Flow Field(f)');
  ff.add(params, 'flowFieldResolution', [10, 20, 50, 100]).name('Resolution');
  ff.add(params, 'flowFieldDynamic', [0, 30, 60]).name('Dynamic(0 = static)');

  const pf = gui.addFolder('Path Following');
  pf.add(params, 'resetPath').name('Reset Path(p)');

  const sf = gui.addFolder('Separation');
  sf.add(params, 'desiredSeparationFactor')
  .min(2).max(20).step(2).name('Factor');
}

function drawMouse() {
  // Draw mouse
  fill(127);
  stroke(200);
  strokeWeight(2);
  ellipse(mouseX, mouseY, 48, 48);
}

function drawBounds() {
  // Draw bounds
  stroke(175);
  noFill();
  rectMode(CENTER);
  rect(width / 2, height / 2, width - params.boundary * 2, height - params.boundary * 2);
}

function draw() {
  background(51);

  behaviourFunction();

  vehicles.forEach(v => {
    v.update();
    v.display();
  })
}

function keyPressed() {
  if (key == 'r' || key == 'R') {
    params.reset();
  }
  else if (key == 'd' || key === 'D') {
    params.debug = !params.debug;
    gui.__folders.General.__controllers.filter(c => c.property == 'debug')[0].updateDisplay();
  }
  else if (key == 'f' || key == 'F') {
    params.resetFlow();
  }
  else if (key == 'p' || key == 'P') {
    params.resetPath();
  }
}