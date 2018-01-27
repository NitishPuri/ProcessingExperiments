let oscillators = [];

var params = {
  count: 10,
  randomAmp: true,
  randomVel: true,
  randomPos: true,
  reset: function () {
    oscillators = [];
    var ampBase = createVector(random(20, 50), random(20, 50));
    var velBase = createVector(random(0.01, 0.05), random(0.01, 0.05));
    var posBase = createVector(random(-PI / 2, PI / 2), random(PI / 2, PI / 2));
    for (var i = 0; i < params.count; i++) {

      let pos;
      if (params.randomPos) {
        pos = createVector(random(-PI / 2, PI / 2), random(-PI / 2, PI / 2));
      }
      else {
        pos = createVector(posBase.x + (i + 1), posBase.y + (i + 1));
      }

      let vel;
      if (params.randomVel) {
        vel = createVector(random(-0.05, 0.05), random(-0.05, 0.05));
      }
      else {
        // val = createVector(i*velBase.x, i*velBase.y);
        vel = createVector(velBase.x, velBase.y);
      }

      let amp;
      if (params.randomAmp) {
        amp = createVector(random(-20, width / 2), random(20, height / 2));
      }
      else {
        amp = createVector((i + 1) * ampBase.x, (i + 1) * ampBase.y)
      }

      oscillators[i] = new Oscillator(pos, vel, amp);
    }
  }
}

function setup() {
  var canvas = createCanvasCustom();
  // canvas.parent(select('#sketch'));

  params.reset();

  // var gui = new dat.GUI();
  var gui = new dat.GUI();
  gui.add(params, 'count').min(1).max(20).step(1);
  gui.add(params, 'randomPos');
  gui.add(params, 'randomVel');
  gui.add(params, 'randomAmp');
  gui.add(params, 'reset');
}

function draw() {
  background(100);

  for (var oscillator of oscillators) {
    oscillator.oscillate();
    oscillator.render();
  }
}

