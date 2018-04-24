
let grid_size = 5;
let half_grid = Math.ceil(grid_size / 2)

let params = {
  chanceOfBlock: 0.5,
  chanceOfRed: 0.2,
  minDivisionSize: 40,
  maxTries: 50,
  minInvaderSize: 20,
  maxInvaderSize: 500,
  grid_size: 5,
  // half_grid: Math.ceil(grid_size / 2),
  margin: 2,
  play: true,
  reset() {
    invader = createInvader(0, 0, width, height, this.maxInvaderSize)
    grid_size = this.grid_size
    half_grid = Math.ceil(grid_size / 2)
  }
}

let invader;

let counter = 0;

function setup() {
  createCanvasCustom();
  stroke(0);
  fill(0);

  let gui = new dat.GUI();
  gui.add(params, 'chanceOfBlock').min(0).max(1).step(0.05)
  gui.add(params, 'chanceOfRed').min(0).max(1).step(0.05)
  gui.add(params, 'minDivisionSize').min(10).max(100).step(5)
  gui.add(params, 'maxTries').min(10).max(100).step(5)
  gui.add(params, 'minInvaderSize').min(10).max(100).step(5)
  gui.add(params, 'maxInvaderSize').min(200).max(600).step(5)
  gui.add(params, 'grid_size').min(5).max(11).step(1)
  gui.add(params, 'play')
  gui.add(params, 'reset')

  params.reset();

  console.log("Done!!")

  frameRate(1)
}


function draw() {
  background(255)

  if (params.play) {
    invader.randomize();
  }
  invader.draw();
}

