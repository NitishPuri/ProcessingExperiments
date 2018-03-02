class Paddle {
  constructor(isLeft) {
    this.w = 20;
    this.h = 100;

    this.x = isLeft ? this.w : width - this.w
    this.y = height / 2;

    this.yChange = 0

    this.move = (dy) => this.yChange = dy
  }

  show() {
    fill(255)
    rectMode(CENTER)
    rect(this.x, this.y, this.w, this.h)
  }

  update() {
    this.y += this.yChange
    this.y = constrain(this.y, this.h / 2, height - this.h / 2)
  }
}