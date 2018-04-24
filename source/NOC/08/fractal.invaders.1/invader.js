const createInvader = (x, y, w, h, maxSize) => {
  console.log(x, y, w, h)

  noFill()
  stroke(255, 0, 0)
  rect(x, y, w, h)

  // if (w - x < 10 || h - y < 10) {
  if (w < 40 || h < 40) {
    fill(0)
    rect(x, y, w, h)
    // console.log(n_x, n_y, n_size)
    console.log("returning")
    return
  }

  let n_x = floor(random(w));
  let n_y = floor(random(h));
  let n_size = floor(random(min(maxSize, w - n_x, h - n_y)))

  let tries = 0;
  while (n_size < 20 && tries < 50) {
    n_x = floor(random(w));
    n_y = floor(random(h));
    n_size = floor(random(min(maxSize, w - n_x, h - n_y)))
    tries++
  }

  if (tries == 5) {
    // fill(0)
    // rect(x, y, w, h)
    console.log(x + n_x, y + n_y, n_size)
    console.log("returning")
    return
  }

  // console.log(n_x, n_y, n_size)


  // if (counter > 50)
  //   return

  console.log(counter++);
  // if (w > 10 && h > 10) {
  return new Invader(x, y, w, h, n_x, n_y, n_size)
  // }
}

class Invader {
  constructor(x, y, w, h, pos_x, pos_y, size) {
    this.x = x + pos_x;
    this.y = y + pos_y;
    this.size = size

    this.nodes = []

    // this.size = floor(random(min(maxSize, w - this.x, h - this.y)))
    // console.log(this.x, this.y, this.size)

    // let tries = 0;
    // while (this.size < 5 && tries < 5) {
    //   this.size = floor(random(min(maxSize, w - this.x, h - this.y)))
    //   tries++
    // }

    // console.log(this.x, this.y, this.size)

    this.blockSize = (this.size - 2 * MARGIN) / 5

    this.randomize()
    // setInterval(this.randomize(), 2000)

    let maxSize = 500

    this.createChildren = () => {
      this.nodes = []
      this.nodes.push(createInvader(x, y, pos_x + this.size, pos_y, maxSize))
      this.nodes.push(createInvader(x, this.y, pos_x, h - pos_y, maxSize))
      this.nodes.push(createInvader(this.x, this.y + this.size, w - pos_x, h - pos_y - this.size, maxSize))
      this.nodes.push(createInvader(this.x + this.size, y, w - pos_x - this.size, pos_y + this.size, maxSize))

      this.nodes = this.nodes.filter(n => n)

    }

    this.createChildren();

    // this.nodes.push(createInvader(x, y, this.x + this.size, this.y, maxSize))
    // this.nodes.push(createInvader(x, this.y, this.x, h - this.y, maxSize))
    // this.nodes.push(createInvader(this.x, this.y + this.size, w - this.x, h - this.y - this.size, maxSize))
    // this.nodes.push(createInvader(this.x + this.size, y, w - this.x - this.size, this.y + this.size, maxSize))

    // this.nodes = this.nodes.filter(n => n)

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

    stroke(255, 0, 0)
    // noFill()
    fill(255, 0, 0)
    rect(this.x, this.y, this.size, this.size)
    // stroke(0)





    // push()
    // translate(this.x + MARGIN, this.y + MARGIN)
    // for (let j = 0; j < GRID_SIZE; j++) {
    //   for (let i = 0; i < GRID_SIZE; i++) {
    //     let index = ((i > HALF_GRID - 1) ? (GRID_SIZE - 1 - i) : i) + j * HALF_GRID;
    //     if (this.cells[index] > 0) {
    //       fill(0, 255, 0)
    //       if (this.cells[index] > 1)
    //         fill(255, 0, 0)
    //       rect(i * this.blockSize, j * this.blockSize, this.blockSize, this.blockSize);
    //     }
    //   }
    // }
    // pop()

    this.nodes.forEach(n => n.draw())
  }
}
