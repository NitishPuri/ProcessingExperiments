class Neuron {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.connections = [];    
  }
  addConnection(c) {
    this.connections.push(c)
  }
  show() {
    stroke(0);
    strokeWeight(1);
    fill(0);
    ellipse(this.position.x, this.position.y, 16);
    // text('' + this.position.x + ',' + this.position.y, this.position.x, this.position.y)
    this.connections.forEach(c => c.display());
  }
}