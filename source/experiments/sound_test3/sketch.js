
var song;
var fft;

function preload() {
  song = loadSound(resolveUrl('/data/daft.mp3'))
}

function setup() {
  var cnv = createCanvasCustom();
  colorMode(HSB)

  bgColor = color(255);

  fft = new p5.FFT();
  song.amp(0.4);


  cnv.mouseClicked(() => {
    if (song.isPlaying()) {
      song.pause();
    }
    else {
      song.loop();
    }
  })
}

function draw() {
  background(0);

  var spectrum = fft.analyze(512);
  noStroke();
  spectrum.forEach((s, i) => {
    const x = map(i, 0, spectrum.length, 0, width);
    const h = -height + map(spectrum[i], 0, 255, height, 0)
    fill(map(i, 0, 513, 0, 360), 255, 255);
    rect(x, height, width / spectrum.length, h)
  })
}