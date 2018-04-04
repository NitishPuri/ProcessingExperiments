
let maxim;

let sample1;
let sample2;
let sample3;
let sample4;

let waveForm1;
let waveForm2;

let playhead = 0;

let notes = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
]

let notes2 = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
]

let numBeats = 16;
let currentBeat = 0;

let bgImg;

let track1 = []
let track2 = []
let track3 = []
let track4 = []

let isPlaying;

let fc, res, attack, release, filterAttack;
let fc2, res2, attack2, release2, filterAttack2;

let transpose = 0;
let transpose2 = 0;

let wavetable = [];
let wavetable2 = [];

// Slider dt, dg, a, r, f, q, fa, o, dt2, dg2, a2, r2, f2, q2, fa2, o2;
// MultiSlider seq, seq2;
let dt, dg, a, r, f, q, fa, o, dt2, dg2, a2, r2, f2, q2, fa2, o2;
let seq, seq2;

function preload() {
  maxim = new Maxim()
  sample1 = maxim.loadFile(resolveUrl('/data/sounds/bd1.wav'), 2048);
  sample2 = maxim.loadFile(resolveUrl('/data/sounds/sn1.wav'), 2048);
  sample3 = maxim.loadFile(resolveUrl('/data/sounds/hh1.wav'), 2048);
  sample4 = maxim.loadFile(resolveUrl('/data/sounds/sn2.wav'), 2048);

  // bgImg = loadImage(resolveUrl('/data/tex/brushdem.jpg'))
}

function setup() {
  var cnv = createCanvasCustom();

  waveForm1 = new Synth()
  waveForm2 = new Synth()

  sample1.setLooping(false);
  sample2.setLooping(false);
  sample3.setLooping(false);
  sample4.setLooping(false);
  //waveform.volume(0);
  //waveform2.volume(0);
  // name, value, min, max, pos.x, pos.y, width, height

  dt = new Slider("delay time", 1, 0, 100, 110, 10, 200, 20, HORIZONTAL);
  dg = new Slider("delay amnt", 1, 0, 100, 110, 30, 200, 20, HORIZONTAL);
  a = new Slider("attack", 1, 0, 100, 110, 50, 200, 20, HORIZONTAL);
  r = new Slider("release", 20, 0, 100, 110, 70, 200, 20, HORIZONTAL);
  f = new Slider("filter", 20, 0, 100, 110, 90, 200, 20, HORIZONTAL);
  q = new Slider("res", 20, 0, 100, 110, 110, 200, 20, HORIZONTAL);
  fa = new Slider("filterAmp", 20, 0, 100, 110, 130, 200, 20, HORIZONTAL);
  o = new Slider("transpose", 0, 1, 80, 110, 150, 200, 20, HORIZONTAL);
  // name,s min, max, pos.x, pos.y, width, height
  seq = new MultiSlider(notes.length, 0, 256, 0, 300, width / 18 / 2, 150, UPWARDS);
  // name, value, min, max, pos.x, pos.y, width, height

  dt2 = new Slider("delay time", 1, 0, 100, 620, 10, 200, 20, HORIZONTAL);
  dg2 = new Slider("delay amnt", 1, 0, 100, 620, 30, 200, 20, HORIZONTAL);
  a2 = new Slider("attack", 1, 0, 100, 620, 50, 200, 20, HORIZONTAL);
  r2 = new Slider("release", 20, 0, 100, 620, 70, 200, 20, HORIZONTAL);
  f2 = new Slider("filter", 20, 0, 100, 620, 90, 200, 20, HORIZONTAL);
  q2 = new Slider("res", 20, 0, 100, 620, 110, 200, 20, HORIZONTAL);
  fa2 = new Slider("filterAmp", 20, 0, 100, 620, 130, 200, 20, HORIZONTAL);
  o2 = new Slider("transpose", 0, 1, 80, 620, 150, 200, 20, HORIZONTAL);
  // name,s min, max, pos.x, pos.y, width, height
  seq2 = new MultiSlider(notes2.length, 0, 256, width / 2, 300, width / 18 / 2, 150, UPWARDS);

  frameRate(30);

  for (let i = 0; i < 514 + 1; i++) {
    wavetable[i] = (i / 512.0) - 0.5;
  }

  track1 = Array(numBeats).fill().map(t => false);
  track2 = Array(numBeats).fill().map(t => false);
  track3 = Array(numBeats).fill().map(t => false);
  track4 = Array(numBeats).fill().map(t => false);

  waveForm1.waveTableSize(514);
  waveForm1.loadWaveTable(wavetable);
  waveForm2.loadWaveTable(wavetable);

  isPlaying = false;

  background(0)
  // rectMode(CENTER)
}

function draw() {
  // waveForm1.play();
  // waveForm2.play();

  background(0);
  stroke(255);

  for (let i = 0; i < 5; i++)
    line(0, 500 + (i * height / 12), width, 500 + (i * height / 12));

  for (let i = 0; i < numBeats + 1; i++)
    line(i * width / numBeats, 500, i * width / numBeats, 500 + (4 * height / 12));

  let buttonWidth = width / numBeats;
  let buttonHeight = height / 12;

  for (let i = 0; i < numBeats; i++) {
    noStroke();
    fill(200, 0, 0);

    if (track1[i])
      rect(i * buttonWidth, 500 + (0 * buttonHeight), buttonWidth, buttonHeight);
    if (track2[i])
      rect(i * buttonWidth, 500 + (1 * buttonHeight), buttonWidth, buttonHeight);
    if (track3[i])
      rect(i * buttonWidth, 500 + (2 * buttonHeight), buttonWidth, buttonHeight);
    if (track4[i])
      rect(i * buttonWidth, 500 + (3 * buttonHeight), buttonWidth, buttonHeight);
  }

  if (f.get()) {
    fc = f.get() * 100;
    // waveForm1.setFilter(fc, res); XXX
  }

  if (dt.get()) {
    waveForm1.setDelayTime(dt.get() / 50);
  }

  if (dg.get()) {
    waveForm1.setDelayAmount(dg.get() / 100);
  }

  if (q.get()) {
    res = q.get();
    // waveForm1.setFilter(fc, res);
  }

  if (a.get()) {
    attack = a.get() * 10;
  }

  if (r.get()) {
    release = r.get() * 10;
  }

  if (fa.get()) {
    filterAttack = fa.get() * 10;
  }

  if (o.get()) {
    transpose = Math.floor(o.get());
  }

  dt.display();
  dg.display();
  a.display();
  r.display();
  f.display();
  q.display();
  fa.display();
  o.display();
  seq.display();

  if (f2.get()) {
    fc2 = f2.get() * 100;
    // waveForm2.setFilter(fc2, res2); XXX
  }

  if (dt2.get()) {
    waveForm2.setDelayTime(dt2.get() / 50);
  }

  if (dg2.get()) {
    waveForm2.setDelayAmount(dg2.get() / 100);
  }

  if (q2.get()) {
    res2 = q2.get();
    // waveForm2.setFilter(fc2, res2);
  }

  if (a2.get()) {
    attack2 = a2.get() * 10;
  }

  if (r2.get()) {
    release2 = r2.get() * 10;
  }

  if (fa2.get()) {
    filterAttack2 = fa2.get() * 10;
  }

  if (o2.get()) {
    transpose2 = Math.floor(o2.get());
  }

  dt2.display();
  dg2.display();
  a2.display();
  r2.display();
  f2.display();
  q2.display();
  fa2.display();
  o2.display();
  seq2.display();

  playhead++;
  if (playhead % 4 == 0) {
    waveForm1.ramp(0.5, attack);
    waveForm1.setFrequency(mtof[notes[playhead / 4 % 16] + 30]);
    waveForm1.filterRamp((fc / 100) * (filterAttack * 0.2), attack + release);

    waveForm2.ramp(0.5, attack2);
    waveForm2.setFrequency(mtof[notes2[playhead / 4 % 16] + 30]);
    waveForm2.filterRamp((fc2 / 100) * (filterAttack2 * 0.2), attack2 + release2);

    fill(0, 0, 200, 120);
    rect(currentBeat * buttonWidth, 500, buttonWidth, height);

    if (track1[currentBeat]) {
      sample1.cue(0);
      sample1.play();
    }
    if (track2[currentBeat]) {
      sample2.cue(0);
      sample2.play();
    }
    if (track3[currentBeat]) {
      sample3.cue(0);
      sample3.play();
    }
    if (track4[currentBeat]) {
      sample4.cue(0);
      sample4.play();
    }

    currentBeat++;
    if (currentBeat >= numBeats)
      currentBeat = 0;
  }

  if (playhead % 4 == 1) {
    waveForm1.ramp(0., release);
    waveForm2.ramp(0., release2);
  }
}

function mouseClicked() {
  if (!isPlaying) {
    isPlaying = true;
    sample1.cue(0);
    sample1.play();
  }

  dt.mousePressed();
  dg.mousePressed();
  a.mousePressed();
  r.mousePressed();
  f.mousePressed();
  q.mousePressed();
  o.mousePressed();
  fa.mousePressed();
  seq.mousePressed();

  dt2.mousePressed();
  dg2.mousePressed();
  a2.mousePressed();
  r2.mousePressed();
  f2.mousePressed();
  q2.mousePressed();
  fa2.mousePressed();
  o2.mousePressed();
  seq2.mousePressed();

  let index = Math.floor(mouseX * numBeats / width);
  let track = Math.floor((mouseY - 500) * (12 / height));
  if (track == 0)
    track1[index] = !track1[index];
  if (track == 1)
    track2[index] = !track2[index];
  if (track == 2)
    track3[index] = !track3[index];
  if (track == 3)
    track4[index] = !track4[index];
}

function mouseDragged() {
  if (!isPlaying) {
    isPlaying = true;
    sample1.cue(0);
    sample1.play();
  }
  dt.mouseDragged();
  dg.mouseDragged();
  a.mouseDragged();
  r.mouseDragged();
  f.mouseDragged();
  q.mouseDragged();
  fa.mouseDragged();
  o.mouseDragged();
  seq.mouseDragged();

  dt2.mouseDragged();
  dg2.mouseDragged();
  a2.mouseDragged();
  r2.mouseDragged();
  f2.mouseDragged();
  q2.mouseDragged();
  fa2.mouseDragged();
  o2.mouseDragged();
  seq2.mouseDragged();

  let index = Math.floor(mouseX * numBeats / width);
  let track = Math.floor((mouseY - 500) * (12 / height));
  if (track == 0)
    track1[index] = !track1[index];
  if (track == 1)
    track2[index] = !track2[index];
  if (track == 2)
    track3[index] = !track3[index];
  if (track == 3)
    track4[index] = !track4[index];
}

function mouseReleased() {
  for (let i = 0; i < notes.length; i++) {
    notes[i] = (Math.floor((seq.get(i) / 256) * 12 + transpose));
    notes2[i] = (Math.floor((seq2.get(i) / 256) * 12 + transpose2));
  }
}
