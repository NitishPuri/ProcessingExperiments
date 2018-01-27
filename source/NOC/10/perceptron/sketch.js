
const training = new Array(1000);
let ptron;

let count = 0;

const xMin = -1;
const yMin = -1;
const xMax = 1;
const yMax = 1;

var gui;

var params = {
  m: 0.3,
  b: 0.4,
  x1: 0,
  y1: 0,
  x2: 0,
  y2: 0,
  calcParams: function () {
    let x1 = map(this.x1, 0, width, xMin, xMax);
    let y1 = map(this.y1, height, 0, yMin, yMax);
    let x2 = map(this.x2, 0, width, xMin, xMax);
    let y2 = map(this.y2, height, 0, yMin, yMax);

    this.m = (y2 - y1) / (x2 - x1)
    this.b = (y1 - this.m * x1);

    gui.__controllers.forEach(c => c.updateDisplay());

    prepareTrainingData();
  },
  randomLine: function () {
    this.x1 = random(width);
    this.y1 = random(height);
    this.x2 = random(width);
    this.y2 = random(height);

    gui.__folders['Line'].__controllers.forEach(c => c.updateDisplay());

    this.calcParams();
  },
  restart: function () {
    // ??
  }
}

function prepareTrainingData() {
  for (let i = 0; i < training.length; i++) {
    const x = random(xMin, xMax);
    const y = random(yMin, yMax);
    const answer = (y < f(x)) ? -1 : 1;
    training[i] = {
      input: [x, y, 1],
      output: answer
    };
  }
}

// The function to describe the line.
function f(x) {
  return (params.m * x + params.b);
}

function setup() {
  createCanvasCustom();
  ptron = new Perceptron(3, 0.001);

  gui = new dat.GUI();
  var linegui = gui.addFolder('Line')
  linegui.add(params, 'x1').min(0).max(width).onFinishChange(params.calcParams.bind(params));
  linegui.add(params, 'y1').min(0).max(height).onFinishChange(params.calcParams.bind(params));
  linegui.add(params, 'x2').min(0).max(width).onFinishChange(params.calcParams.bind(params));
  linegui.add(params, 'y2').min(0).max(height).onFinishChange(params.calcParams.bind(params));

  linegui.add(params, 'randomLine')
  gui.add(ptron, 'c').min(0.00001).max(0.1).name('Learning rate')
  gui.add(ptron, 'restart')
  params.randomLine();

  prepareTrainingData();

}

function draw() {
  background(0);

  // The original line
  strokeWeight(2);
  stroke(255);
  let x1 = map(xMin, xMin, xMax, 0, width);
  let y1 = map(f(xMin), yMin, yMax, height, 0);
  let x2 = map(xMax, xMin, xMax, 0, width);
  let y2 = map(f(xMax), yMin, yMax, height, 0);
  // console.log(x1, y1, x2, y2);
  line(x1, y1, x2, y2);

  // The mrkers
  fill(0, 0, 255)
  ellipse(params.x1, params.y1, 10, 10)
  ellipse(params.x2, params.y2, 10, 10)

  // The current guess
  stroke(255, 255, 0);
  strokeWeight(2);
  const weights = ptron.getWeights();
  x1 = xMin;
  y1 = (-weights[2] - weights[0] * x1) / weights[1];
  x2 = xMax;
  y2 = (-weights[2] - weights[0] * x2) / weights[1];

  x1 = map(x1, xMin, xMax, 0, width);
  y1 = map(y1, yMin, yMax, height, 0);
  x2 = map(x2, xMin, xMax, 0, width);
  y2 = map(y2, yMin, yMax, height, 0);

  line(x1, y1, x2, y2);

  ptron.train(training[count].input, training[count].output);
  count = (count + 1) % training.length;


  stroke(255);
  strokeWeight(1);
  training.forEach(t => {
    fill(0, 255, 0);
    if (t.output > 0) fill(255, 0, 0);

    const guess = ptron.feedForward(t.input);
    stroke(0, 255, 0);
    strokeWeight(2);
    if (guess > 0) stroke(255, 0, 0);

    const x = map(t.input[0], xMin, xMax, 0, width);
    const y = map(t.input[1], yMin, yMax, height, 0);
    ellipse(x, y, 8);

    // fill(0, 255, 0);
    // if(t.input[1] > f(t.input[0])) fill(255, 0, 0);
    // ellipse(x, y, 4);
  })
}