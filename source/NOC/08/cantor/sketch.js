function setup() {
  createCanvasCustom();
  colorMode(HSB)
  frameRate(10)
  // put setup code here
}

var t = 0;

function draw() {
  background(51);
  // noStroke()
  // fill(255, 255, 255);
  // rect(10, 10, 100, 100/3);
  cantor(width * 0.05, 10, width * 0.9);
  // t += 0.005;
  noLoop()
}

function cantor(x, y, len) {
  var h = 30;
  if (len >= 1) {
    noStroke()
    fill(map(len, 0, width, 0, 360), 255, 255);
    rect(x, y, len, h / 3);
    y += h;
    cantor(x, y, len / 3);
    cantor(x + len * 2 / 3, y, len / 3);
  }
}