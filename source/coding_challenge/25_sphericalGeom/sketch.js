
const total = 50;
let globe = [];

function setup() {
  createCanvasCustom(WEBGL);

  for (let i = 0; i < total + 1; i++) {
    globe[i] = [];
  }
  colorMode(HSB)

  d = (height / 2) / (tan(PI / 6))
  cam = createVector(0, 0, d);
}

let cam;
let d;
let msx = 0, msy = 0;
function mousePressed() {
  msx = mouseX;
  msy = mouseY;
}

function mouseDragged() {
  cam.x += (msx - mouseX) * 0.05;
  cam.y += (msy - mouseY) * 0.05;
  cam.setMag(d);
  // return false;
}

function mouseWheel(ev) {
  d += (ev.delta * 0.1);
  cam.setMag(d);
  return false;
}

function draw() {
  background(0)

  fill(255);
  // lights()

  camera(cam.x, cam.y, cam.z, 0, 0, 0, 0, 1, 0)

  const r = 200;
  // sphere(r)

  for (let i = 0; i < total + 1; i++) {
    const lat = map(i, 0, total, 0, PI);
    // const long = map(i, 0, total, -PI, PI);
    for (let j = 0; j < total + 1; j++) {
      const long = map(j, 0, total, 0, TWO_PI);
      // const lat = map(j, 0, total, -HALF_PI, HALF_PI);
      const x = r * sin(lat) * cos(long);
      const y = r * sin(lat) * sin(long);
      const z = r * cos(lat);
      globe[i][j] = createVector(x, y, z);
    }
  }


  stroke(255);
  noStroke();
  for (let i = 0; i < total; i++) {
    fill(map(i, 0, total, 0, 255 * 6) % 255, 255, 255);
    beginShape(TRIANGLE_STRIP)
    for (let j = 0; j < total + 1; j++) {
      const v1 = globe[i][j];
      const v2 = globe[i + 1][j];
      vertex(v1.x, v1.y, v1.z);
      vertex(v2.x, v2.y, v2.z);
    }
    endShape()
  }
}