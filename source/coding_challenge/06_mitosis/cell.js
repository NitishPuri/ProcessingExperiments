class Cell {
  constructor(pos, r, c) {
    this.pos = pos || createVector(random(width), random(height));
    this.r = r || 60;
    this.c = c || color(random(100, 255), 0, random(100, 255), 150)
  }

  move() {
    let v = p5.Vector.random2D();
    this.pos.add(v);
  }

  show() {
    noStroke();
    fill(this.c)
    ellipse(this.pos.x, this.pos.y, this.r)
  }

  clicked(mx, my) {
    const d = dist(this.pos.x, this.pos.y, mx, my)
    return (d < this.r)
  }

  mitosis() {
    let offset = p5.Vector.random2D();
    offset.setMag(this.r);
    let cell = new Cell(this.pos.copy().add(offset), this.r * 0.8, this.c)
    this.r /= 2;
    return cell;
  }

  grow() {
    if (random(1) < 0.01) {
      this.r += random(0.1, 2)
    }
  }
}