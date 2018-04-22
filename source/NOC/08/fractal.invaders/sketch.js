
// const BLOCK_SIZE = 360;
const PIXEL_SIZE = 50;
const GRID_SIZE = 5;
const HALF_GRID = Math.ceil(GRID_SIZE / 2);
const MARGIN = 20;
// let chanceOfBlock = 0.5

let params = {
  chanceOfBlock: 0.5,
  chanceOfRed: 0.2,
}

class Invader {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size
    this.randomize()
    // setInterval(this.randomize(), 2000)
  }
  randomize() {
    this.cells = Array(GRID_SIZE * HALF_GRID).fill().map(() => {
      if (random(1) < params.chanceOfBlock) {
        if (random(1) < params.chanceOfRed) {
          return 2;
        }
        return 1;
      }
      return 0;
    });
  }
  draw() {
    push()
    translate(this.x + MARGIN, this.y + MARGIN)
    for (let j = 0; j < GRID_SIZE; j++) {
      for (let i = 0; i < GRID_SIZE; i++) {
        let index = ((i > HALF_GRID - 1) ? (GRID_SIZE - 1 - i) : i) + j * HALF_GRID;
        if (this.cells[index] > 0) {
          fill(0, 255, 0)
          if (this.cells[index] > 1)
            fill(255, 0, 0)
          rect(i * this.size, j * this.size, this.size, this.size);
        }
      }
    }
    pop()
  }
}

let invaders = [];
let invader;

function setup() {
  createCanvasCustom();
  stroke(0);
  fill(0);

  let gui = new dat.GUI();
  gui.add(params, 'chanceOfBlock').min(0).max(1).step(0.05)
  gui.add(params, 'chanceOfRed').min(0).max(1).step(0.05)

  let block = PIXEL_SIZE * GRID_SIZE + 2 * MARGIN;
  let width_offset = (width % block) / 2;
  let height_offset = (height % block) / 2;
  let x_count = floor(width / block);
  let y_count = floor(height / block);

  for (let i = 0; i < x_count; i++) {
    for (let j = 0; j < y_count; j++) {
      invaders.push(new Invader(width_offset + i * block, height_offset + j * block, PIXEL_SIZE))
    }
  }

  frameRate(1)
}


function draw() {
  background(0);

  invaders.forEach((invader) => {
    invader.randomize()
    invader.draw()
  })
}

