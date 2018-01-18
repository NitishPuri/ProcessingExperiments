var v;

function setup() {
  createCanvas(windowWidth - 100, windowHeight - 50);
  v = new Vehicle();
}

function draw() {
  background(51);

  var mouse = createVector(mouseX, mouseY);

  fill(127);
  stroke(200);
  strokeWeight(2);
  ellipse(mouse.x, mouse.y, 48, 48);


  v.seek(mouse);
  v.update();
  v.display();
}