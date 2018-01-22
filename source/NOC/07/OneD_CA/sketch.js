var params = {
  restart : function() {
    ca.restart();
  },
  randomize: function() {
    ca.randomize();
  }
}

var ca;

function setup() {
  createCanvas(windowWidth - 100, windowHeight - 100);  
  ca = new CA([0, 1, 0, 1, 1, 0, 1, 0]);

  var gui = new dat.GUI();
  gui.add(params, 'restart');
  gui.add(params, 'randomize');
}

function draw() {
  background(51);
  ca.display();
  ca.generate();
}