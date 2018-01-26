class Neuron {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.connections = [];    

    this.sum = 0;
    this.r = 32;
  }
  fire() {
    this.r = 64;
    this.connections.forEach(c => c.feedforward(this.sum));
  }

  // Receive an input
  feedforward(input) {
    // Accumulate it
    this.sum += input;

    // Activate it
    if(this.sum > 1) {
      this.fire();
      this.sum = 0;
    }
  }
  addConnection(c) {
    this.connections.push(c)
  }
  show() {
    stroke(0);
    strokeWeight(1);
    const b = map(this.r, 32, 64, 0, 500);
    fill(b);
    ellipse(this.position.x, this.position.y, this.r);

    this.r = lerp(this.r, 32, 0.1);
    // text('' + this.position.x + ',' + this.position.y, this.position.x, this.position.y)
  }
}