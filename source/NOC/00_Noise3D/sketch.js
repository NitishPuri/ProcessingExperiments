
var params = {
  increment : 0.01,
  zOff : 0.0,
  zIncrement : 0.02,
  lod : 8,
  falloff : 0.65,
  noise : true

}

function setup() {
  createCanvas(400, 400);

  var gui = new dat.GUI({autoPlace: false});
  var customContainer = select('#guiElement')
  customContainer.child(gui.domElement)
  gui.add(params, 'noise');
  gui.add(params, 'increment').min(0.01).max(1);
  gui.add(params, 'zIncrement').min(0.01).max(1);
  gui.add(params, 'lod').min(0).max(20);
  gui.add(params, 'falloff').min(0.01).max(1);

  // frameRate(2);

}

function draw() {
  background(0);  

  noiseDetail(params.lod, params.falloff)

  loadPixels();

  var xOff = 0.0;
  for(var x = 0; x < width; x++) {
    xOff += params.increment;
    var yOff = 0.0;
    for(var y = 0; y < height; y++) {
      yOff += params.increment;

      let bright;
      if(params.noise) {
        // console.log("Noise!!")
        bright = noise(xOff, yOff, params.zOff)*255;
      } else{
        bright = random(0, 255);
      }

      // pixels[x + y*width] = color(bright, bright, bright);
      set(x, y, color(bright, bright, bright));
    }
  }

  updatePixels();
  params.zOff += params.zIncrement;
}
