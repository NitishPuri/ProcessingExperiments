var x = 0;
var timer1;
var timer2;
var counter = 0;

function setup() {
  createCanvas(200, 200);
  timer1 = createP('timer 1');
  timer2 = createP('timer 2');

  makeTimer(timer1, 500);
  makeTimer(timer2, 300);
}

function makeTimer(elt, wait) {
  var counter = 0;
  setInterval(timeIt, wait);
  function timeIt() {
    elt.html(counter);
    counter++;
  }
}

function timeIt() {
  timer1.html(counter++);
}

function draw() {
  background(70);
  // line
}