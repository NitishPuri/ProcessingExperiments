let landscape;
var theta = 0;

function setup() {
  createCanvas(800, 600, WEBGL);

  landscape = new Landscape(20, 400, 400);
}

function draw() {

  background(200);

  push();
  translate(100, 100, -160);
  rotateX(PI/3);
  rotateZ(theta);
  landscape.render();
  pop();

  landscape.calculate();
  theta += 0.0025;
}