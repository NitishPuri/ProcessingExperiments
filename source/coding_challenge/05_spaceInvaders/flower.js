class Flower {
  constructor(x, y) {
    this.x = x
    this.y = y;
    this.r = 30;

    this.xDir = 1;
  }
  grow() {
    this.r += 2;
  }
  shiftDown() {
    this.xDir *= -1;
    this.y += this.r
  }
  move() {
    this.x += this.xDir;
  }
  show() {
    fill(255, 0, 200);
    ellipseMode(CENTER)
    ellipse(this.x, this.y, this.r * 2)
  }
}