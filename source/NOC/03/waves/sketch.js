let w;

let theta = 0.0;
let amplitude = [];
let dx = [];
let yValues = [];

var params = {
  count: 5,
  xSpacing: 8,
  randomAmp : true,
  randomVel : true,
  randomPos : true,
  reset : function () {
    w = width + 16;
    for(let i = 0; i < params.count; i++) {
      amplitude[i] = random(10, 30);
      dx[i] = (TWO_PI / random(100, 300)) * params.xSpacing;
    }
  
    yValues = new Array(floor(w/params.xSpacing));
  }
}

function setup() {
  var canvas = createCanvas(windowWidth - 10, windowHeight - 100);

  params.reset();

  // // var gui = new dat.GUI();
  var gui = new dat.GUI();
  gui.add(params, 'count').min(1).max(20).step(1);
  gui.add(params, 'xSpacing').min(5).max(20);
  // gui.add(params, 'randomVel');
  // gui.add(params, 'randomAmp');
  gui.add(params, 'reset');
}

function draw() {
  background(0);
  calcWave();
  renderWave();
}

function calcWave() {
  theta += 0.02;

  for(let i = 0; i < yValues.length; i++) {
    yValues[i] = 0;
  }

  for(let j = 0; j < params.count; j++) {
    let x = theta;
    for(let i = 0; i < yValues.length; i++) {
      if(j%2 == 0) yValues[i] += sin(x) * amplitude[j];
      else yValues[i] += cos(x) * amplitude[j];
      x+= dx[j];
    }
  }
} 

function renderWave() {
  stroke(200, 200, 200, 200);
  fill(200, 200, 200);
  text("Fucnk Youo!!", 10, 10, 500, 500);

  noStroke();
  fill(255, 100);
  ellipseMode(CENTER);
  for(let x = 0; x < yValues.length; x++) {
    ellipse(x*params.xSpacing, height/2 + yValues[x], 16);
  }
}

