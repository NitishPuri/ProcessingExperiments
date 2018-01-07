t = 0;

function setup() {
  createCanvas(windowWidth/2, windowHeight/2);
}

function draw() {
  background(100);  

  var x = noise(t);

  t+=0.001;

  fill(255);
  x = map(x, 0, 1, 0, width-1);
  ellipse(x, height/2, 10);
}
