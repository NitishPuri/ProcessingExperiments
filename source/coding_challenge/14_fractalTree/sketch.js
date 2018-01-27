

var params = {
  angle: 0
}

var tree = [];
var leaves = [];
var count = 0;

function setup() {
  createCanvasCustom();

  var a = createVector(width / 2, height);
  var b = createVector(width / 2, height - 100);

  var root = new Branch(a, b);

  tree[0] = root;

  // params.angle = PI/4;
  // var gui = new dat.GUI()
  // gui.add(params, 'angle').min(0).max(TWO_PI);
}

function mousePressed() {
  var n = tree.length;
  for (var i = 0; i < n; i++) {
    if (tree[i].finished == false) {
      tree.push(tree[i].branchA());
      tree.push(tree[i].branchB());
      tree[i].finished = true;
    }
  }

  count++;
  if (count === 5) {
    for (var i = 0; i < tree.length; i++) {
      if (!tree[i].finished) {
        var leaf = tree[i].end.copy();
        leaves.push(leaf);
      }
    }
  }
}

function draw() {
  background(51);

  tree.forEach(b => b.show());
  leaves.forEach(l => {
    fill(255, 0, 100);
    ellipse(l.x, l.y, 10);
  });
}

