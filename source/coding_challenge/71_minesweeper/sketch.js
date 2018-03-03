
function index(col, row) {
  if (col < 0 || col >= cols || row < 0 || row >= rows)
    return -1

  return col + row * cols
}

let grid;

let cols = 20;
let rows = 20

let cellSize = 20;

let totalMines = Math.floor(Math.sqrt(cols * rows))

function setup() {
  createCanvasCustom({ w: cols * cellSize + 2, h: rows * cellSize + 2 })
  // Create grid
  grid = Array(cols * rows).fill().map((c, i) => new Cell(i % cols, floor(i / cols)))
  // place mines
  let minesPlaced = 0
  let attemptsRemaining = totalMines * totalMines
  while (minesPlaced < totalMines && attemptsRemaining > 0) {
    let c = random(grid);
    if (!c.mine) {
      c.mine = true
      minesPlaced++
      console.log("Mine placed at cell(" + floor(c.x / cellSize) + "," + floor(c.y / cellSize) + ")")
    }
    else {
      console.log("Already a mine at(" + floor(c.x / cellSize) + "," + floor(c.y / cellSize) + ")")
    }
    attemptsRemaining--
  }
  // count mines
  grid.forEach(c => c.countMines())
}

function draw() {

  background(255)
  grid.forEach(c => c.show())
}

function mousePressed() {
  let i = floor(mouseX / cellSize)
  let j = floor(mouseY / cellSize)
  grid[index(i, j)].reveal()
  if (grid[index(i, j)].mine) {
    gameOver()
  }
}

function gameOver() {
  grid.forEach(c => c.revealed = true)
}

