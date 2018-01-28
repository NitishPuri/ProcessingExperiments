
var snake;
var snakeScl = 20;

var food;

var eatSound;
var startOver;
var bgMusic;

var fr = 3;
var musicRate = 1;

function preload() {
  eatSound = loadSound('/data/sounds/Alert/Alert-06.mp3')
  startOver = loadSound('/data/sounds/Voice/Male/Voice-Cartoon_Laugh-01.mp3')
  bgMusic = loadSound('/data/sounds/Music/Music-01.mp3')
}

function setup() {
  createCanvasCustom();
  snake = new Snake();
  frameRate(fr)
  bgMusic.play();
  bgMusic.setVolume(0.7);
  pickLocation()
}

function pickLocation() {
  var cols = floor(width / snakeScl);
  var rows = floor(height / snakeScl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(snakeScl);
}

function draw() {
  background(0);

  snake.update();
  snake.show();

  if (snake.eat(food)) {
    fr += 2;
    frameRate(fr)
    bgMusic.rate(musicRate);
    musicRate += 0.01;
    eatSound.play();
    pickLocation();
  }

  fill(255, 0, 255);
  rect(food.x, food.y, snakeScl, snakeScl)

}

function keyPressed() {
  switch (key) {
    case 'I': snake.dir(0, -1); break;
    case 'K': snake.dir(0, 1); break;
    case 'J': snake.dir(-1, 0); break;
    case 'L': snake.dir(1, 0); break;
  }
}

function mousePressed() {
  snake.total++;
}