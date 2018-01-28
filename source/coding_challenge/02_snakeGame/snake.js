class Snake {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.xSpeed = 1;
    this.ySpeed = 0;

    this.total = 0;
    this.tail = [];

    colorMode(HSB, 255)
  }

  death() {
    this.tail.forEach(t => {
      const d = dist(this.x, this.y, t.x, t.y);
      if (d < 1) {
        console.log("Starting over,..!!")
        fr = 3;
        musicRate = 1
        startOver.play();
        this.total = 0;
        this.tail = [];
        background(255, 0, 0);
      }
    })
  }

  update() {
    if (this.total === this.tail.length) {
      for (let i = 0; i < this.tail.length - 1; i++) {
        this.tail[i] = this.tail[i + 1];
      }
    }
    this.tail[this.total - 1] = createVector(this.x, this.y)

    this.x += this.xSpeed * snakeScl;
    this.y += this.ySpeed * snakeScl;

    if (this.x >= width + snakeScl) this.x = 0;
    else if (this.x < -snakeScl) this.x = width;
    if (this.y >= height + snakeScl) this.y = 0;
    else if (this.y < -snakeScl) this.y = height;

    this.death();


  }

  show() {

    for (let i = 0; i < this.total; i++) {
      fill(map(i, this.total, 0, 10, 255), 255, 255);
      rect(this.tail[i].x, this.tail[i].y, snakeScl, snakeScl);
    }

    fill(0, 255, 255);
    rect(this.x, this.y, snakeScl, snakeScl)
  }
  dir(xSpeed, ySpeed) {
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed
  }
  eat(f) {
    var d = dist(this.x, this.y, f.x, f.y);
    if (d < 2) {
      this.total++;
      return true;
    }
    return false;
  }
}