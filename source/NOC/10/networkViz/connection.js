class Connection {
  constructor(from, to, w) {
    this.weight = w;
    this.a = from;
    this.b = to;

    // To track the animation
    this.sending = false;
    this.sender = createVector();

    // store the output
    this.output = 0;
  }

  show() {
    stroke(0);
    strokeWeight(this.weight * 4)
    line(this.a.position.x, this.a.position.y, this.b.position.x, this.b.position.y)

    if (this.sending) {
      fill(0);
      strokeWeight(1);
      ellipse(this.sender.x, this.sender.y, 16, 16);
    }
  }

  feedforward(val) {
    this.output = val * this.weight;
    this.sender = this.a.position.copy();
    this.sending = true;
  }
  update() {
    if (this.sending) {
      this.sender.x = lerp(this.sender.x, this.b.position.x, 0.1);
      this.sender.y = lerp(this.sender.y, this.b.position.y, 0.1);
      const d = p5.Vector.dist(this.sender, this.b.position);
      if (d < 1) {
        this.b.feedforward(this.output);
        this.sending = false;
      }
    }
  }
}