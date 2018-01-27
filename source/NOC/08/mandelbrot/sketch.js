
// var xMin = -1;
// var yMin = -1;
// var w = 4;
// var h = 2;

var params = {
  xMin: -2.5,
  yMin: -1,
  w: 4,
  h: 2,
  drawMandelbrot: function () {
    redraw();
  }
}

function setup() {
  // createCanvas(400, 400);
  createCanvasCustom();

  var gui = new dat.GUI();
  gui.add(params, 'xMin')
  gui.add(params, 'yMin')
  gui.add(params, 'w')
  gui.add(params, 'h')
  gui.add(params, 'drawMandelbrot');

}


function draw() {
  // background(0)
  loadPixels();
  var maxIterations = 200;

  var xMax = params.xMin + params.w;
  var yMax = params.yMin + params.h;

  var dx = (xMax - params.xMin) / width;
  var dy = (yMax - params.yMin) / height;

  var y = params.yMin;
  for (let j = 0; j < height; j++) {
    var x = params.xMin;
    for (let i = 0; i < width; i++) {
      var a = x;
      var b = y;
      var n = 0;
      while (n < maxIterations) {
        var aa = a * a;
        var bb = b * b;
        var twoab = 2.0 * a * b;

        a = aa - bb + x;
        b = twoab + y;
        // infinity in our finite world..
        if (aa + bb > 16.0) {
          break; // Bail...
        }
        n++;
      }
      if (n == maxIterations) set(i, j, color(0));
      else set(i, j, color(n * 16 % 255));
      x += dx;
    }
    y += dy;
  }

  updatePixels();
  noLoop();
}
