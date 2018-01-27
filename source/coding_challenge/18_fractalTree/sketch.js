
var params = {
  reset: function () {
    tree = new Tree();
  }
}

var tree;
var max_dist = 300;
var min_dist = 5;

function setup() {
  createCanvasCustom(WEBGL);
  // createCanvas(300, 400, WEBGL);
  // createCanvasCustom();

  params.reset();

  var gui = new dat.GUI()
  gui.add(params, 'reset')
}

function draw() {
  background(51);

  orbitControl();

  // translate(-width/2, -height/2)
  tree.show();
  tree.grow();

  // fill(200, 200, 0);
  // noStroke();
  // rect(10, 10, width-20, height-20)

}

