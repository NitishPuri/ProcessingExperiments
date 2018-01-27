

function setup() {
  createCanvasCustom();
}

var yoff = 0;

function draw() {
  background(0);

  // const x = width/2
  // const y = height/2;
  const r = width/8

  push()
  translate(width/2, height/2);
  beginShape()
  var xoff = 0;
  for(let a = 0; a < TWO_PI; a += 0.1) {
    const offset = map(noise(xoff , yoff), 0, 1, -25, 25)
    const ra = r + offset
    const x = ra * cos(a);
    const y = ra * sin(a);
    vertex(x, y)
    xoff += 0.1
  }
  // fill(255);
  // ellipse(x, y, r)
  endShape()
  pop()

  yoff += 0.1;
}