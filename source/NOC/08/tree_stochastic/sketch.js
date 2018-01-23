
var theta = 0;

function setup() {
  createCanvasCustom();
  newTree();
}


function draw() {
  noLoop();
}

function mousePressed() {
  newTree();
}

function newTree() {
  background(51);

  stroke(255);
  push();
  translate(width/2, height*2/3);
  branch(120);
  pop();
}

function branch(h) {

  const sw = map(h, 2, 120, 1, 5);
  strokeWeight(sw);

  line(0, 0, 0, -h);

  translate(0, -h);
  
  h *= 0.66;

  if( h > 2) {
    const n = Math.floor(random(1, 4));
    for(let i = 0; i < n; i++) {
      const theta = random(-PI/3, PI/3);
      push();
      rotate(theta);
      branch(h);
      pop();
    }
  }
}
