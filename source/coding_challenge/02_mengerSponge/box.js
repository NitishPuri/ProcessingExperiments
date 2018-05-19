class Box {
  constructor(x, y, z, r) {
    // this.pos = createVector(x, y, z);
    this.pos = THREE.Vector3(x, y, z);
    this.r = r;
  }

  generate() {
    let boxes = []
    const newR = this.r / 3;

    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        for (let k = -1; k < 2; k++) {
          const isZero = (v) => { return (v == 0) ? 1 : 0 }
          const count = isZero(i) + isZero(j) + isZero(k);
          if (count <= 1) {
            const x = this.pos.x + i * newR;
            const y = this.pos.y + j * newR;
            const z = this.pos.z + k * newR;

            const b = new Box(x, y, z, newR)
            boxes.push(b);
          }
        }
      }
    }

    return boxes;
  }

  show() {
    // fill(255);
    // noStroke();
    push();
    translate(this.pos.x, this.pos.y, this.pos.z)
    box(this.r);
    pop();
  }
}