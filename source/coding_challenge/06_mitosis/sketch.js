
let cells = [];

function setup() {
  createCanvasCustom();
  for (let i = 0; i < 10; i++) {
    cells.push(new Cell());
  }
}

function draw() {
  background(0);

  cells.forEach(cell => {
    cell.move();
    cell.show();
  })
}

function mousePressed() {
  let newCells = []
  cells.forEach(cell => {
    if (cell.clicked(mouseX, mouseY)) {
      newCells.push(cell.mitosis());
      // newCells.push(cell.mitosis());
    }
  })

  cells = cells.concat(newCells);
}
