var bgColor = 255;

var button;
var slider;

var angle = 0;
var angularSpeed = 0.1;

function setup() {
  // put setup code here
  createCanvas(windowWidth, windowHeight);
  background(200);
  // randomSeed(42)

  button = createButton('Change background');
  button.position(10, windowHeight - 100);
  button.mouseClicked(changeBackground);

  slider = createSlider(5, 30, 10, 1);
  slider.position(10, windowHeight - 50);

  rectMode(CENTER)
}

function changeBackground() {
  bgColor = random(100, 200);
}

function draw() {
  var r = random(200, 255)
  var g = random(0, 100)
  var b = random(100, 200)
  var a = random(200, 255)

  background(bgColor, bgColor, bgColor, 100);
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

  var s = slider.value() + random(10);
  ellipse(mouseX, mouseY, s, s);

  push();
  translate(100, 100);
  rotate(angle);
  fill(g, b, r, a);
  rect(0, 0, 100, 50);
  pop();

  push();
  translate(400, 400);
  rotate(-3 * angle);
  fill(g, r, b, a);
  rect(0, 0, 100, 50);
  pop();

  // stroke(b, g, r, 100)
  // strokeWeight(3)
  // line(random(0, width), random(0, height), random(0, width), random(0, height))

  angle += angularSpeed;

  // rect(1, 2, 3, h, [tl], [tr], [br], [bl])
}

function mousePressed() {
  background(250, 250, 100)
}