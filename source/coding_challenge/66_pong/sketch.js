
let leftScore = 0;
let rightScore = 0;

let ding;

let puck;
let leftPaddle, rightPaddle;

function setup() {
  createCanvasCustom({ w: windowWidth - 10 })

  ding = loadSound('/data/sounds/ding.mp3')
  puck = new Puck()
  leftPaddle = new Paddle(true)
  rightPaddle = new Paddle(false)
}

function draw() {

  background(0)

  puck.checkPaddleRight(rightPaddle)
  puck.checkPaddleLeft(leftPaddle)

  puck.update()
  puck.edges()
  puck.draw()

  leftPaddle.update()
  rightPaddle.update()
  leftPaddle.show()
  rightPaddle.show()

  fill(255)
  textSize(32)
  text(leftScore, 32, 40)
  text(rightScore, width - 64, 40)
}

function keyPressed() {
  let m = 10
  if (key == 'A') {
    leftPaddle.move(-1 * m)
  }
  else if (key == 'Z') {
    leftPaddle.move(m)
  }
  else if (key == 'K') {
    rightPaddle.move(-1 * m)
  }
  else if (key == 'M') {
    rightPaddle.move(m)
  }
}

function keyReleased() {
  if (key == 'A' || key == 'Z') {
    leftPaddle.move(0)
  }
  else if (key == 'K' || key == 'M') {
    rightPaddle.move(0)
  }
}