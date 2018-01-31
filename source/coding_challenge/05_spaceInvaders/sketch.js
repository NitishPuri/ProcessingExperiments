
var ship;
var flowers = [];
var drops = [];

function setup() {
  createCanvasCustom();
  ship = new Ship()

  const total = 10;
  const offset = 50;
  for (let i = 0; i < total; i++) {
    flowers.push(new Flower(map(i, 0, total - 1, offset, width - offset), 80));
  }
}

function draw() {
  background(0);

  ship.show();
  ship.move();

  let edge = false;
  flowers.forEach(f => {
    f.show()
    f.move();
    if (f.x >= width || f.x <= 0) {
      edge = true;
    }
  });

  if (edge) {
    flowers.forEach(f => f.shiftDown());
  }

  drops.forEach(d => {
    d.move();
    d.show();
    flowers.forEach(f => {
      if (d.hits(f)) {
        f.grow();
        d.remove();
      }
    })
  })

  for (let i = drops.length - 1; i >= 0; i--) {
    if (drops[i].toDelete) {
      drops.splice(i, 1);
    }
  }
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    ship.setDir(1)
    return false;
  }
  else if (keyCode === LEFT_ARROW) {
    ship.setDir(-1);
    return false;
  }
  else if (key == ' ') {
    drops.push(new Drop(ship.x, ship.y))
    return false;
  }
}
function keyReleased() {
  if (key !== ' ') {
    ship.setDir(0);
  }
}
