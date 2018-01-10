class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(random(-1, 1), random(-1, 0));
    this.acceleration = createVector(0, 0.05);
    this.lifespan = 255;
  }

  run() {
    this.update();
    this.display();
  }

  // applyForce(force) {
  //   var f = p5.Vector.div(force, this.mass);
  //   this.acc.add(f);
  // }

  display() {
    stroke(0, this.lifespan);
    strokeWeight(2);
    fill(127, this.lifespan)
    ellipse(this.position.x, this.position.y, 12);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 2.0;
  }

  isDead() {
    return (this.lifespan <= 0.0);
  }
}
