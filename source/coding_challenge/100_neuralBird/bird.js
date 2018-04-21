class Bird {
  constructor() {
    this.y = height / 2
    this.x = 64;
    this.gravity = 0.6;
    this.lift = -10
    this.vel = 0;
  }

  update() {
    this.y += this.vel;
    this.vel += this.gravity
    this.bounce();
  }

  bounce() {
    if (this.y > height) {
      this.y = height
      this.vel = 0;
    }
    if (this.y < 0) {
      this.y = 0
      this.vel = 0;
    }
  }

  show() {
    fill(255);
    ellipse(this.x, this.y, 32, 32)
  }

  up() {
    this.vel += this.lift
  }
}