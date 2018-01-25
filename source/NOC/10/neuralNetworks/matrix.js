class Matrix {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.matrix = [];

    for(let i = 0; i < this.rows; i++) {
      this.matrix[i] = [];
      for(let j = 0; j < this.cols; j++) {
        this.matrix[i][j] = 0;
      }
    }
  }

  multiply(n) {
    this.matrix.forEach((r, i) => {
      r.forEach((c, j) => {
        this.matrix[i][j] *= n;
      })
    })
  }

  add(n) {
    if (n instanceof Matrix) {
      this.matrix.forEach((r, i) => {
        r.forEach((c, j) => {
          this.matrix[i][j] += n.matrix[i][j];
        })
      })        
    }
    this.matrix.forEach((r, i) => {
      r.forEach((c, j) => {
        this.matrix[i][j] += n;
      })
    })
  }

  randomize() {
    this.matrix.forEach((r, i) => {
      r.forEach((c, j) => {
        this.matrix[i][j] = Math.floor(Math.random()*10);
      })
    })    
  }
}