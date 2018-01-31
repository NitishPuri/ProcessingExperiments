class Drop {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 8;

    this.toDelete = false;
  }
  remove() {
    this.toDelete = true;
  }
  show() {
    fill(150, 0, 200);
    // noStroke()
    ellipseMode(CENTER)
    ellipse(this.x, this.y, this.r * 2)
  }
  move() {
    this.y -= 10;

    if (this.y < -10) this.toDelete = true;
  }
  hits(flower) {
    var d = dist(this.x, this.y, flower.x, flower.y);
    return (d < this.r + flower.r);
  }
}