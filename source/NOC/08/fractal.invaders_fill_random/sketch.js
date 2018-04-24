
let grid_size = 5;
let half_grid = Math.ceil(grid_size / 2)

let params = {
  chanceOfBlock: 0.5,
  chanceOfRed: 0.2,
  speed: 50,
  minInvaderSize: 20,
  maxInvaderSize: 500,
  margin: 2,
  play: true,
  background_color: [255, 255, 255],
  block_color: [0, 0, 0],
  accent_color: [255, 0, 0],
  reset() {
    invaders = []
  }
}

let invaders = []

let counter = 0;

function setup() {
  createCanvasCustom();
  stroke(0);
  fill(0);

  let gui = new dat.GUI();
  gui.add(params, 'chanceOfBlock').min(0).max(1).step(0.05)
  gui.add(params, 'chanceOfRed').min(0).max(1).step(0.05)
  gui.add(params, 'speed').min(1).max(100).step(1)
  gui.add(params, 'minInvaderSize').min(10).max(100).step(5)
  gui.add(params, 'maxInvaderSize').min(100).max(600).step(5)
  gui.add(params, 'margin').min(0).max(10).step(1)
  const cf = gui.addFolder("Colors")
  cf.addColor(params, 'background_color')
  cf.addColor(params, 'block_color')
  cf.addColor(params, 'accent_color')
  gui.add(params, 'play')
  gui.add(params, 'reset')

  frameRate(10)
}


function draw() {
  background(params.background_color)

  for (let i = 0; i < params.speed; i++) {
    createInvader();
  }

  invaders.forEach(invader => invader.draw());

  if (params.play && frameCount % 10 == 0) {
    invaders.forEach(invader => invader.randomize());
  }
}

