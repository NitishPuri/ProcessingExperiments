class Mover {
  constructor(x, y, m) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.mass = m;
  }

  applyForce(force) {
    var f = p5.Vector.div(force, this.mass);
    this.acc.add(f);
  }

  render() {
    stroke(0);
    strokeWeight(2);
    fill(255)
    ellipse(this.pos.x, this.pos.y, this.mass * 20);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  checkEdges(damping) {
    if (this.pos.x > width) {
      this.pos.x = width;
      this.vel.x *= -1 * damping;
    }
    else if (this.pos.x < 0) {
      this.pos.x = 0;
      this.vel.x *= -1 * damping;
    }
    if (this.pos.y > height) {
      this.pos.y = height;
      this.vel.y *= -1 * damping;
    }
    else if (this.pos.y < 0) {
      this.pos.y = 0;
      this.vel.y *= -1 * damping;
    }
  }
}
