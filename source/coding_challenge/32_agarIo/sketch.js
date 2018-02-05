
var myBlob;
var otherBlobs = []
let zoom = 1;

function setup() {
  createCanvasCustom();
  myBlob = new Blob(0, 0, 64);

  for (let i = 0; i < 50; i++) {
    otherBlobs.push(new Blob(random(-width, width), random(-height, height), 16))
  }
}

function draw() {
  background(0)

  translate(width / 2, height / 2)
  let newZoom = (64 / myBlob.r)
  zoom = lerp(zoom, newZoom, 0.1)
  scale(zoom)
  translate(-myBlob.pos.x, -myBlob.pos.y)

  myBlob.update()
  myBlob.show()

  for (let i = otherBlobs.length - 1; i >= 0; i--) {
    let ob = otherBlobs[i];
    ob.show();
    if (myBlob.eats(ob)) {
      otherBlobs.splice(i, 1)
    }
  }
}