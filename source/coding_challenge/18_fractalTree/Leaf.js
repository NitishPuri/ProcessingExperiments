class Leaf {
  constructor() {
    this.position = p5.Vector.random3D();
    this.position.mult(random(width / 2));
    this.position.y -= height / 4;
    this.reached = false;
  }

  show() {
    fill(255);
    noStroke();
    push()
    translate(this.position.x, this.position.y, this.position.z)
    ellipse(0, 0, 4);
    pop()
  }
}