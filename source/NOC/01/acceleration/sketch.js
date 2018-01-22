let movers = [];

function setup() {
  createCanvasCustom();

  for(let i = 0; i < 10; i++) {
    movers[i] = new Mover(random(width), random(height));
  }

}

function draw() {
  background(255, 200);

  for (var mover of movers) {
    mover.update();
    mover.render();
  }
}
