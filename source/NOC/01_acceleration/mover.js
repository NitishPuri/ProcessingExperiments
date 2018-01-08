class Mover {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.topSpeed = 5;
  }

  render() {
    stroke(0);
    strokeWeight(2);
    fill(127, 200);
    ellipse(this.pos.x, this.pos.y, 48);
  }

  update() {
    var mouse = createVector(mouseX, mouseY);
    this.acc = p5.Vector.sub(mouse, this.pos);
    this.acc.normalize();
    this.acc.mult(0.2);


    this.vel.add(this.acc);
    this.vel.limit(this.topSpeed);
    this.pos.add(this.vel);
  }

  checkEdges() {
    // if (this.pos.x > width) {
    //   this.pos.x = width;
    //   this.vel.x *= -1;
    // }
    // else if (this.pos.x < 0) {
    //   this.pos.x = 0;
    //   this.vel.x *= -1;
    // }
    // if (this.pos.y > height) {
    //   this.pos.y = height;
    //   this.vel.y *= -1;
    // }
    // else if (this.pos.y < 0) {
    //   this.pos.y = 0;
    //   this.vel.y *= -1;
    // }
  }
}
