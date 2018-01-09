class Mover {
  constructor(x, y, m) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.mass = m;
    this.damping = 0.98;
    
    this.dragOffset = createVector(0, 0);
    this.dragging = false;
  }

  applyForce(force) {
    var f = p5.Vector.div(force, this.mass);
    this.acc.add(f);
  }

  display() {
    stroke(0);
    strokeWeight(2);
    fill(175)
    if ( this.dragging ) fill(50);
    ellipse(this.pos.x, this.pos.y, this.mass * 2);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.mult(this.damping);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  clicked(mx, my) {
    var d = dist(mx, my, this.pos.x, this.pos.y);
    if(d < this.mass) {
      this.dragging = true;
      this.dragOffset.x = this.pos.x - mx;
      this.dragOffset.y = this.pos.y - my;
    }
  }

  drag(mx, my) {
    if(this.dragging) {
      this.pos.x = mx + this.dragOffset.x;
      this.pos.y = my + this.dragOffset.y;
    }
  }

  stopDragging() {
    this.dragging = false;
  }

  checkEdges() {
    if (this.pos.x > width) {
      this.pos.x = width;
      this.vel.x *= -1;
    }
    else if (this.pos.x < 0) {
      this.pos.x = 0;
      this.vel.x *= -1;
    }
    if (this.pos.y > height) {
      this.pos.y = height;
      this.vel.y *= -1;
    }
    else if (this.pos.y < 0) {
      this.pos.y = 0;
      this.vel.y *= -1;
    }
  }
}
