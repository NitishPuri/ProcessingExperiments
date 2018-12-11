
let synth;

function setup() {
  // put setup code here
  createCanvasCustom()
  background(255, 0, 200)

  synth = new Tone.Synth().toMaster()

}

function keyPressed(key) {
  // console.log(key.key)
  if (key.key == 'p') {
    synth.triggerAttackRelease("C4", "8n")
  }
}

function draw() {
  // put drawing code here
}