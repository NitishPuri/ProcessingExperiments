let vertices = [];
let edges = []

let reached = [];
let unreached = [];

const params = {
  numPoints : 100,
  reset() {
    vertices = [];
    edges = []

    reached = [];
    unreached = [];

    vertices = Array(params.numPoints).fill().map(() => 
      createVector(random(width), random(height)))

    unreached = Array(params.numPoints).fill().map((u, i) => i);

    reached.push(0);
    unreached.splice(0, 1);
  }
}

function setup() {
  createCanvasCustom()

  var gui = new dat.GUI();
  gui.add(params, 'numPoints').min(50).max(1000);
  gui.add(params, 'reset');

  params.reset();

  frameRate(10);
}


function calcMST() {
    var record = 100000;
    var rIndex;
    var uIndex;

    // find a closest pair of points connecting the different groups
    for (var j = 0; j < unreached.length; j++) {
      for (var i = 0; i < reached.length; i++) {
        var v1 = vertices[reached[i]];
        var v2 = vertices[unreached[j]];
        var d = dist(v1.x, v1.y, v2.x, v2.y);
        if (d < record) {
          record = d;
          rIndex = i;
          uIndex = j;
        }
      }
    }

    edges.push(createVector(reached[rIndex], unreached[uIndex]));

    reached.push(unreached[uIndex])
    unreached.splice(uIndex, 1);
}

function draw() {
  background(51)

  calcMST();


  // Draw vertices
  fill(255)
  stroke(255)
  for (let i = 0; i < vertices.length; i++) {
    const v = vertices[i];
    const sz = map(params.numPoints, 50, 1000, 16, 8);
    ellipse(v.x, v.y, sz);
  }

  // Draw edges
  stroke(255);
  strokeWeight(2);
  for (const edge of edges) {
    line(vertices[edge.x].x, vertices[edge.x].y, vertices[edge.y].x, vertices[edge.y].y)
  }
}