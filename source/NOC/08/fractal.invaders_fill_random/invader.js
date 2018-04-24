// let initialArea = width * height

const createInvader = () => {

  let x = random(width);
  let y = random(height);
  let size = floor(random(params.minInvaderSize, params.maxInvaderSize))

  // let c = 1.1;
  // let initialArea = width * height

  // for (let i = 0; i < 10; i++) {
  //   let area_new = initialArea * pow(i, -c);
  //   let new_size = sqrt(area_new);


  // }

  let new_invader = new Invader(x, y, size)

  if (x + size > width || y + size > height) {
    return;
  }

  for (invader of invaders) {
    if (invader.intersect(new_invader)) {
      return;
    }
  }

  new_invader.randomize();

  invaders.push(new_invader)
}

class Invader {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size

    // this.nodes = []

    this.blockSize = (this.size - 2 * params.margin) / grid_size

    // this.randomize()
  }

  intersect(invader) {
    if (this.x > invader.x + invader.size || invader.x > this.x + this.size)
      return false;

    if (this.y > invader.y + invader.size || invader.y > this.y + this.size)
      return false;

    return true;
  }

  randomize() {
    this.cells = Array(grid_size * half_grid).fill().map(() => {
      if (random(1) < params.chanceOfBlock) {
        if (random(1) < params.chanceOfRed) {
          return 2;
        }
        return 1;
      }
      return 0;
    });

    // this.nodes.forEach(n => n.randomize())

  }
  draw() {
    push()
    translate(this.x + params.margin, this.y + params.margin)
    for (let j = 0; j < grid_size; j++) {
      for (let i = 0; i < grid_size; i++) {
        let index = ((i > half_grid - 1) ? (grid_size - 1 - i) : i) + j * half_grid;
        if (this.cells[index] > 0) {
          // fill(0, 0, 0)
          fill(params.block_color)
          if (this.cells[index] > 1)
            fill(params.accent_color)
          rect(i * this.blockSize, j * this.blockSize, this.blockSize, this.blockSize);
        }
      }
    }
    pop()

    // this.nodes.forEach(n => n.draw())
  }
}
