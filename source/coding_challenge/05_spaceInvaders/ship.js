class Ship {
  constructor() {
    this.x = width / 2
    this.y = height - 20;

    this.xDir = 0;
  }
  move() {
    this.x += this.xDir * 5;
  }

  setDir(dir) {
    this.xDir = dir;
  }

  show() {
    fill(255);
    rectMode(CENTER)
    rect(this.x, this.y, 20, 40);
  }
}