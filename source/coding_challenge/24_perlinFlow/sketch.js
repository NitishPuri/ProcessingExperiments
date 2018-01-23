
var params = {
  increment : 0.01,
  scale : 20,
  flowMag : 1,
  dynamicField : true,
  drawField : false,
  drawBackground : false,
  zOff : 0.0,
  zIncrement : 0.02,
  lod : 8,
  falloff : 0.65,
  noise : true,
  cMode : 0,
  strokeSize : 2,
  reset : function () {
    particles = []
    for(let i = 0; i < 100; i++) {
      particles[i] = new Particle()
    }  
    background(0);  
  },
  changeColorMode : function() {
    if(this.cMode == 0) {
      colorMode(HSB, 360, 255, 255, 1)
      this.cMode = 1
    }
    else {
      colorMode(RGB, 255, 255, 255, 1)
      this.cMode = 0
    }
  }
}

var cols, rows;
var particles = [];

var flowField = [];

var fr;

function setup() {
  createCanvasCustom();
  // colorMode(HSB);

  fr = createP();


  var gui = new dat.GUI();
  gui.add(params, 'noise');
  gui.add(params, 'drawField')
  gui.add(params, 'dynamicField')
  gui.add(params, 'drawBackground')
  gui.add(params, 'reset')
  gui.add(params, 'changeColorMode')
  gui.add(params, 'scale').min(10).max(30).step(1);
  gui.add(params, 'strokeSize').min(1).max(10).step(1);
  gui.add(params, 'flowMag').min(0.01).max(5);
  gui.add(params, 'increment').min(0.01).max(1);
  gui.add(params, 'zIncrement').min(0.001).max(0.1);
  gui.add(params, 'lod').min(0).max(20);
  gui.add(params, 'falloff').min(0.01).max(1);

  params.reset();
  params.changeColorMode();

}

function draw() {
  if(params.drawBackground) {
    background(0, 0.1);  
  }


  noiseDetail(params.lod, params.falloff)

  cols = floor(width/params.scale);
  rows = floor(height/params.scale);

  flowField = [];
  // loadPixels();

  // randomSeed(42)
  let xOff = 0.0;
  for(let x = 0; x < cols; x++) {
    let yOff = 0.0;
    for(let y = 0; y < rows; y++) {

      const index = x + y*cols;      

      var r = noise(xOff, yOff, params.zOff);
      // var r = noise(xOff, yOff);
      // var r = random(1);

      var v = p5.Vector.fromAngle(r*TWO_PI);
      v.mult(params.flowMag);

      flowField[index] = v;

      if(params.drawField) {
        stroke(0,255, 255, 255);
        strokeWeight(2);
        push();
        translate(x*params.scale, y*params.scale);
        rotate(v.heading())
        line(0, 0, params.scale, 0);
        pop();  
      }

      yOff += params.increment;
    }
    xOff += params.increment;
  }


  particles.forEach(p => {
    p.follow(flowField)
    // p.applyForce();
    p.update();
    p.show();
    p.edges();
  })

  // updatePixels();
  if(params.dynamicField) {
    params.zOff += params.zIncrement;
  }

  fr.html("Frame Rate(" + floor(frameRate()) + ") , Particles( " + particles.length + ")" );
}

function mouseDragged() {
  particles.push(new Particle(mouseX, mouseY));
}
