class Pipe {
  constructor() {

    let spacing = random(40, height / 2)
    let centery = random(spacing, height - spacing)

    this.top = centery - spacing / 2
    this.bottom = centery + spacing / 2
    this.x = width;
    this.w = 30
    this.speed = 1
    this.highlight = false;
  }

  show() {
    fill(255);
    if (this.highlight) {
      fill(255, 0, 0)
    }
    rect(this.x, 0, this.w, this.top)
    rect(this.x, this.bottom, this.w, height - this.bottom)
  }

  update() {
    this.x -= this.speed;
  }

  offscreen() {
    return (this.x < -this.w);
  }

  hits(bird) {
    if (bird.y < this.top || bird.y > this.bottom) {
      if (bird.x > this.x && bird.x < this.x + this.w) {
        this.highlight = true;
        return true;
      }
    }

    return false;
  }

} 