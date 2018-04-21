
var bird;
var pipes = []

function setup() {
  createCanvasCustom({ w: 500 });
  bird = new Bird();
  pipes.push(new Pipe())
}

function draw() {
  background(0)

  bird.update();
  bird.show();

  for (let i = pipes.length - 1; i >= 0; i--) {
    let p = pipes[i];
    p.update()
    p.show();

    if (p.hits(bird)) {
    }

    if (p.offscreen()) {
      pipes.splice(i, 1)
    }
  }

  if (frameCount % 100 == 0) {
    pipes.push(new Pipe())
  }

}

function keyPressed() {
  if (key === ' ') {
    bird.up()
    return false
  }
}