class Matrix {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.data = [];

    for(let i = 0; i < this.rows; i++) {
      this.data[i] = [];
      for(let j = 0; j < this.cols; j++) {
        this.data[i][j] = 0;
      }
    }
  }

  static fromArray(arr) {
    let m = new Matrix(arr.length, 1);
    for(let i = 0; i < arr.length; i++) {
      m.data[i][0] = arr[i];
    }
    return m;
  }

  toArray() {
    let arr = [];
    this.data.forEach(r => r.forEach(c => arr.push(c) ) )
    return arr;
  }

  static multiply(a, b) {
    if(a.cols != b.rows) {
      console.log('Cols of A must match rows of B');
      return undefined;
    }
    
    let result = new Matrix(a.rows, b.cols);

    for(let i = 0; i < result.rows; i++) {
      for(let j = 0; j < result.cols; j++) {
        let sum = 0
        for(let k = 0; k < a.cols; k++) {
          sum += a.data[i][k]*b.data[k][j];
        }
        result.data[i][j] = sum;
      }
    }

    return result;
  }

  static subtract(a, b) {
    if(a.rows != b.rows || a.cols != b.cols) {
      console.log("Error :: Matrix.subtract")
    }
    let result = new Matrix(a.rows, a.cols);
    for(let i = 0; i < result.rows; i++) {
      for(let j = 0; j < result.cols; j++) {
        result.data[i][j] = a.data[i][j] - b.data[i][j];
      }
    }

    return result;
  }

  multiply(n) {
    this.data.forEach((r, i) => {
      r.forEach((c, j) => {
        this.data[i][j] *= n;
      })
    })
  }

  add(n) {
    if (n instanceof Matrix) {
      this.data.forEach((r, i) => {
        r.forEach((c, j) => {
          this.data[i][j] += n.data[i][j];
        })
      })        
    }
    else{
      this.data.forEach((r, i) => {
        r.forEach((c, j) => {
          this.data[i][j] += n;
        })
      })  
    }
  }

  static transpose(m) {
    let result = new Matrix(m.cols, m.row);
    m.data.forEach((r, i) => {
      r.forEach((c, j) => {
        result.data[j][i] = m.data[i][j]
      })
    })    
    return result;
  }

  map(func) {
    this.data.forEach((r, i) => {
      r.forEach((c, j) => {
        this.data[i][j] = func(this.data[i][j])
      })
    })    
  }

  print() {
    console.table(this.data)
  }
}