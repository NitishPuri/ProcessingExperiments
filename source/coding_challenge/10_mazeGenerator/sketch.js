
let w = 20;
let cols;
let rows;

let grid = [];

let current;
let stack = []

function setup() {
  createCanvasCustom();

  cols = floor(width / w)
  rows = floor(height / w);

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      grid.push(new Cell(i, j))
    }
  }

  // frameRate(10)

  current = grid[0];
}

function draw() {
  background(0);

  current.visited = true;

  // STEP 1
  var next = current.checkNeighbors()
  if (next) {
    next.visited = true;

    // STEP 2
    stack.push(current);

    // STEP 3
    removeWalls(current, next);

    // STEP 4
    current = next;
  }
  else if (stack.length > 0) {
    current = stack.pop();
  }

  grid.forEach(cell => cell.show());
  current.highlight();
}


function removeWalls(a, b) {
  var x = a.i - b.i;
  if (x === 1) {
    a.walls.Left = false;
    b.walls.Right = false;
  }
  else if (x === -1) {
    a.walls.Right = false;
    b.walls.Left = false;
  }

  var y = a.j - b.j;
  if (y === 1) {
    a.walls.Top = false;
    b.walls.Bottom = false;
  }
  else if (y === -1) {
    a.walls.Bottom = false;
    b.walls.Top = false;
  }
}