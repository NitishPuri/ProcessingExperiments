const ROLL_STATE = 0  // Rolling the die
const MOVE_STATE = 1  // Moving to the next spot
const SNADDER_STATE = 2 // Moving along Snake or Ladder
let state = ROLL_STATE

let tiles = [];
let player;

let rollSum = 0
let gameCount = 1
let avgP;

function setup() {
  createCanvasCustom({ w: 400, h: 400 })
  avgP = createP('')

  let resolution = 40
  let cols = width / resolution
  let rows = height / resolution

  let x = 0
  let y = (rows - 1) * resolution
  let dir = 1
  for (let i = 0; i < cols * rows; i++) {
    let tile = new Tile(x, y, resolution, i, i + 1)
    tiles.push(tile)
    x += resolution * dir
    if (x >= width || x <= -resolution) {
      dir *= -1
      x += resolution * dir
      y -= resolution
    }
  }

  // Pick random Snakes
  for (let i = 0; i < 3; i++) {
    let index = floor(random(cols, tiles.length - 1))
    //  -1 makes in a Snake (drop down a number of spots)
    tiles[index].snadder = -1 * floor(random(index % cols, index - 1))

  }

  // Pick random Ladders
  for (let i = 0; i < 3; i++) {
    let index = floor(random(0, tiles.length - cols))
    //  -1 makes in a Snake (drop down a number of spots)
    tiles[index].snadder = floor(random(cols - (index % cols), tiles.length - index - 1))
  }

  player = new Player()
}

function draw() {
  frameRate(5)
  background(51)

  for (let tile of tiles) {
    tile.show()
  }

  for (let tile of tiles) {
    tile.showSnadders();
  }

  // Rolling the die
  if (state == ROLL_STATE) {
    player.rollDie();
    rollSum++
    player.showPreview()
    state = MOVE_STATE
  } else if (state == MOVE_STATE) {
    player.move()
    if (player.isSnadder()) {
      state = SNADDER_STATE;
    }
    else {
      state = ROLL_STATE
    }
  } else if (state == SNADDER_STATE) {
    player.moveSnadder()
    state = ROLL_STATE
  }

  // Draw the player
  player.show()

  // Is the game over ??
  if (player.spot >= tiles.length - 1) {
    state = ROLL_STATE
    player.reset()
    gameCount++
  }

  // Compute average rolls to complete game
  if (gameCount > 0) {
    avgP.html(rollSum / gameCount)
  }
}