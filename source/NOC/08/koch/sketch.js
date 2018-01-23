
var t = 0;
var k;

function setup() {
  createCanvasCustom();
  colorMode(HSB)
  frameRate(1)
  k = new KochFractal();
}


function draw() {
  background(51);
  k.render();
  k.nextLevel();
  console.log(k.getCount())
  if(k.getCount() > 5) {
    k.restart();
  }
}
