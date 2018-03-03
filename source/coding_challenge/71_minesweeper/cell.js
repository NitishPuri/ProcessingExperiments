class Cell {
  constructor(i, j) {
    this.x = i * cellSize
    this.y = j * cellSize
    this.mine = false
    this.revealed = false
  }
  show() {
    stroke(0);
    noFill();
    rect(this.x, this.y, cellSize, cellSize)
    if (this.revealed) {
      let c = cellSize / 2
      if (this.mine) {
        fill(255, 0, 0)
        ellipse(this.x + c, this.y + c, c, c)
      }
      else {
        fill(200)
        rect(this.x, this.y, cellSize, cellSize)
        if (this.mineCount > 0) {
          textAlign(CENTER)
          fill(0)
          text(this.mineCount, this.x + c, this.y + cellSize - 4)
        }
      }
    }
  }

  countMines() {
    let count = 0;
    if (this.mine) {
      count = -1
    }
    else {
      let ci = floor(this.x / cellSize)
      let cj = floor(this.y / cellSize)
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          let neighbor = grid[index(ci + i, cj + j)]
          if (neighbor && neighbor.mine) {
            count++
          }
        }
      }
    }

    this.mineCount = count
  }

  reveal() {
    this.revealed = true
    if (this.mineCount == 0) {
      // flood fill
      this.floodFill()
    }
  }

  floodFill() {
    let ci = floor(this.x / cellSize)
    let cj = floor(this.y / cellSize)
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        let neighbor = grid[index(ci + i, cj + j)]
        if (neighbor && !neighbor.mine && !neighbor.revealed) {
          neighbor.reveal()
        }
      }
    }
  }
}