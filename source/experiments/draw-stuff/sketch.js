var circle = {
  X: 50,
  Y: 10,
  sX: 15,
  sY: 10
}

function setup() {
  // put setup code here
  createCanvasCustom();
  background(200);
  randomSeed(42)
}

function draw() {
  var r = random(200, 255)
  var g = random(0, 100)
  var b = random(100, 200)
  var a = random(100, 100)

  // background(r, g, b);
  // put drawing code here
  fill(r, g, b, a);
  noStroke()

  // circle.X++; 
  // if (circle.X > width) circle.X = 0;
  // circle.Y++;
  // if (circle.Y > height) circle.Y = 0;
  // circle.sX++;
  // if (circle.sX > 30) circle.sX = 1;
  // circle.sY--;
  // if (circle.sY < 0) circle.sY = 30;

  var s = random(15, 25);
  ellipse(mouseX, mouseY, s, s);

  // stroke(b, g, r, 100)
  // strokeWeight(3)
  // line(random(0, width), random(0, height), random(0, width), random(0, height))


  // rect(1, 2, 3, h, [tl], [tr], [br], [bl])
}

function mousePressed() {
  background(250, 250, 100)
}