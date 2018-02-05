class Blob {
  constructor(x, y, r) {
    this.pos = createVector(x, y);
    this.r = r;
    this.vel = createVector(0, 0)
  }

  update() {
    let newVel = createVector(mouseX - width / 2, mouseY - height / 2);
    newVel.setMag(3);
    this.vel.lerp(newVel, 0.1)
    this.pos.add(this.vel)
  }

  show() {
    fill(255);
    ellipse(this.pos.x, this.pos.y, this.r * 2)

  }

  eats(ob) {
    let d = p5.Vector.dist(this.pos, ob.pos)
    if (d < this.r + ob.r) {
      let sum = PI * this.r * this.r + PI * ob.r * ob.r
      this.r = sqrt(sum / PI)
      // this.r += ob.r * 0.2;
      return true;
    }
    return false;
  }
}