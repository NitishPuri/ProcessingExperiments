var song;
var gui;
var bgColor;
var amp;

var params = {
  volume: 1,
  rate: 1,
  pan: 0,
  play() {
    song.play()
  },
  pause() {
    song.pause();
  },
  stop() {
    song.stop();
  },
  jumpRandom() {
    const len = song.duration();
    const t = random(len);
    console.log("Jumping to :: ", t);
    song.jump(t);
  }
}


function setupGui() {
  console.log("Setting up the gui.")

  bgColor = color(0)

  gui = new dat.GUI()
  gui.add(params, 'volume').min(0).max(1).step(0.01)
    .onChange(value => song.setVolume(value));
  gui.add(params, 'rate').min(0).max(3).step(0.01)
    .onChange(value => song.rate(value));
  gui.add(params, 'pan').min(-1).max(1).step(0.01)
    .onChange(value => song.pan(value));
  gui.add(params, 'play')
  gui.add(params, 'pause')
  gui.add(params, 'stop')
  gui.add(params, 'jumpRandom')
}

function setup() {
  createCanvasCustom();
  bgColor = color(255);
  song = loadSound('/data/rainbow.mp3', setupGui)
  amp = new p5.Amplitude();
}

function draw() {
  background(bgColor);

  const vol = map(amp.getLevel(), 0, 1, 20, 100);
  fill(255, 0, 255);
  ellipse(width / 2, height / 2, vol);
}