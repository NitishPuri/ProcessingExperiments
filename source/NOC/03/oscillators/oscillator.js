class Oscillator {
  constructor(angle, vel, amp) {
    this.angle = angle;
    this.amp = amp;
    this.vel = vel;
    // this.mass = m;
  }

  oscillate() {
    this.angle.add(this.vel);
  }

  render() {
    var x = sin(this.angle.x) * this.amp.x;
    var y = sin(this.angle.y) * this.amp.y;

    push();
    translate(width / 2, height / 2);
    stroke(0);
    strokeWeight(2);
    fill(127, 127);
    line(0, 0, x, y);
    ellipse(x, y, 32, 32);
    pop();
  }
}
