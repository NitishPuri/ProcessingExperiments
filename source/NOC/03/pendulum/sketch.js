let pendulum;

// var params = {
//   count: 5,
//   xSpacing: 8,
//   randomAmp : true,
//   randomVel : true,
//   randomPos : true,
//   reset : function () {
//     w = width + 16;
//     for(let i = 0; i < params.count; i++) {
//       amplitude[i] = random(10, 30);
//       dx[i] = (TWO_PI / random(100, 300)) * params.xSpacing;
//     }
  
//     yValues = new Array(floor(w/params.xSpacing));
//   }
// }

function setup() {
  var canvas = createCanvasCustom();

  // params.reset();

  // // var gui = new dat.GUI();
  // var gui = new dat.GUI();
  // gui.add(params, 'count').min(1).max(20).step(1);
  // gui.add(params, 'xSpacing').min(5).max(20);
  // // gui.add(params, 'randomVel');
  // // gui.add(params, 'randomAmp');
  // gui.add(params, 'reset');

  pendulum = new Pendulum();
}

function draw() {
  background(255);
  pendulum.go();
}

function mousePressed() {
  pendulum.clicked(mouseX, mouseY);
}

function mouseReleased() {
  pendulum.stopDragging();
}