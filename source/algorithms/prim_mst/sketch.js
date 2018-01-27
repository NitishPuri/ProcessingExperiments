var vertices = [];
var edges = []

var params = {
  reset: function () {
    vertices = [];
    edges = []
    for (var i = 0; i < 10; i++) {
      vertices.push(createVector(random(width), random(height)))
    }
    calcMST();
  }
}

function setup() {
  createCanvasCustom()

  var gui = new dat.GUI();
  gui.add(params, 'reset');

  params.reset();
}

function mousePressed() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    var v = createVector(mouseX, mouseY)
    vertices.push(v);

    calcMST();
  }
}

function calcMST() {
  var reached = [];
  var unreached = [];

  for (let i = 0; i < vertices.length; i++) {
    unreached.push(i);
  }

  reached.push(0);
  unreached.splice(0, 1);

  // while there are vertices in the unreached array
  while (unreached.length > 0) {
    var record = 10000;
    var rIndex;
    var uIndex;

    // find a closest pair of points connecting the different groups
    for (var i = 0; i < reached.length; i++) {
      for (var j = 0; j < unreached.length; j++) {
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
    //line(reached[rIndex].x, reached[rIndex].y, unreached[uIndex].x, unreached[uIndex].y)

    reached.push(unreached[uIndex])
    unreached.splice(uIndex, 1);
  }
}

function draw() {
  background(51)


  // Draw vertices
  fill(255)
  stroke(255)
  for (let i = 0; i < vertices.length; i++) {
    const v = vertices[i];
    ellipse(v.x, v.y, 16, 16);
  }

  // Draw edges
  stroke(255);
  strokeWeight(2);
  for (const edge of edges) {
    line(vertices[edge.x].x, vertices[edge.x].y, vertices[edge.y].x, vertices[edge.y].y)
  }
}