
let synth = undefined;

function setup() {
  // put setup code here
  createCanvasCustom()
  background(255, 0, 200)
  synth = new Tone.Synth()
  synth.oscillator.type = 'sine'
  const gain = new Tone.Gain(0.5);
  gain.toMaster()
  synth.connect(gain)
}

// function getSynth() {
//   // if (synth == undefined) {
//   //   console.log("Synth created.")
//   //   // Tone.context.resume();
//   //   // StartAudioContext(Tone.context)
//   // }
//   // if (Tone.context.state !== "running") {
//   //   console.log("Audio resumed.");
//   // }
//   return synth;
// }

function keyPressed(key) {
  // console.log(key.key)
  if (key.key == 'p') {
    // console.log("Playing.")
    // let synth = getSynth();

    const notes = [
      'C4', 'E4', 'G4',
      'C5', 'E5', 'G5'
    ]

    let index = 0;

    Tone.Transport.scheduleRepeat(repeat, '8n');

    function repeat(time) {
      // let note = notes[int(random(10)) % notes.length];
      let note = notes[index % notes.length];
      synth.triggerAttackRelease(note, '8n', time);
      index++;
    }

    Tone.Transport.start();

    setTimeout(() => {
      Tone.Transport.stop();
    }, 2000);

  }
}

function draw() {
  // put drawing code here
}