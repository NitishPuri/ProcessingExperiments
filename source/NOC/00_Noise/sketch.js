t = 0;

params = {
  increment : 0.001
}

function setup() {
  createCanvas(windowWidth/2, windowHeight/2);

  var gui = new dat.GUI({autoPlace: false});
  var customContainer = select('#guiElement')
  customContainer.child(gui.domElement);
  gui.add(params, 'increment').min(0.001).max(0.1);
}

function draw() {
  background(255);  

  noFill();
  stroke(0);
  strokeWeight(2);
  beginShape();  
  var xOff = t;
  for(let i = 0; i < width; i++) {
    let y = noise(xOff)*height;
    xOff += params.increment;
    vertex(i, y);
  }
  endShape();

  // x = map(x, 0, 1, 0, width-1);
  // ellipse(x, height/2, 10);
  // var x = noise(t);

  t+=params.increment;
}
