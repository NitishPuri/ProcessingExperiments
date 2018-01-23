function setup() {
  createCanvasCustom();
  // put setup code here
}

var t = 0;

function draw() {
  background(51);
  drawCircle(width/2, height/2, width);
  t += 0.005;
  // noLoop()
}

function drawCircle(x, y, r){
  stroke(255);
  // noStroke()
  // noFill();
  fill(map(r, width, 0, 100, 255), map(r, width, 0, 255, 150), 0, map(r, width, 0, 100, 255));
  ellipse(x, y, r);
  if(r > 4) {
    drawCircle(x+20*sin(t), y+5*cos(t), 0.75*r);
  }
}