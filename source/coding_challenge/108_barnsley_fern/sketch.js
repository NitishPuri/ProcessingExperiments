

let x = 0, y = 0;

let transform = [
  { a: 0, b: 0, c: 0, d: 0.16, e: 0, f: 0, p: 0.01, color: [255, 255, 255, 255] },
  { a: 0.85, b: 0.04, c: -0.04, d: 0.85, e: 0, f: 1.60, p: 0.85, color: [255, 255, 255, 255] },
  { a: 0.20, b: -0.26, c: 0.23, d: 0.22, e: 0, f: 1.60, p: 0.07, color: [255, 255, 255, 255] },
  { a: -0.15, b: 0.28, c: 0.26, d: 0.24, e: 0, f: 0.44, p: 0.07, color: [255, 255, 255, 255] }
]

function setup() {
  createCanvasCustom();

  background(0);
  // point(x, y)
}

function drawNextPoint() {
  let p = random();
  for (let t of transform) {
    if (p < t.p) {
      let nextX = t.a * x + t.b * y + t.e
      let nextY = t.c * x + t.d * y + t.f

      x = nextX;
      y = nextY;
      break;
    }
    p -= t.p;
  }

  let mx = map(x, -2.1820, 2.6558, 0, width)
  let my = map(y, 0, 9.9983, height, 0)
  point(mx, my);

}

function draw() {
  // background(0);

  strokeWeight(2);
  stroke(255);

  for (let i = 0; i < 100; ++i) {
    drawNextPoint();
  }

}