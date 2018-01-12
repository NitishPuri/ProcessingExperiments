class Landscape {
  constructor(cellSize, w, h) {
    this.cellSize = cellSize;        // size of each cell
    this.w = w;                      // width of cell
    this.h = h;                      // Height of cell
    this.cols = w/cellSize;          // number of rows
    this.rows = h/cellSize;          // number of rows
    this.zOff = 0.0;                 // perlin noise argument

    this.z = new Array(this.cols);        // using an array to store all the height values
    for (let i = 0; i < this.z.length; i++) {
      this.z[i] = new Array(this.rows);      
    }
  }

  calculate() {
    var xOff = 0;
    for(var i = 0; i < this.cols; i++) {
      var yOff = 0;
      for(var j = 0; j < this.rows; j++) {
        this.z[i][j] = map(noise(xOff, yOff, this.zOff), 0, 1, -120, 120);
        yOff += 0.1;
      }
      xOff += 0.1;
    }
    this.zOff += 0.01;
  }


  // Render landscape as a grid of quads
  render() {
    // Every cell is an individual quad
    // TODO: Use quad strips
    for(var i = 0; i < this.cols - 1; i++) {
      for(var j = 0; j < this.rows - 1; j++) {
        // one quad at a time.
        stroke(0);
        fill(100, 100);
        push();
        beginShape(TRIANGLE_STRIP);
        translate(i*this.cellSize - this.w/2, j*this.cellSize - this.h/2, 0);
        vertex(0, 0, this.z[i][j]);
        vertex(this.cellSize, 0, this.z[i+1][j]);
        vertex(this.cellSize, this.cellSize, this.z[i+1][j+1]);
        vertex(0, this.cellSize, this.z[i][j+1]);
        endShape();
        pop();        
      }
    }  
  }
}

