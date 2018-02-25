
let nn;

let training_data = [
  {
    inputs: [0, 0],
    outputs: [0]
  },
  {
    inputs: [0, 1],
    outputs: [1]
  },
  {
    inputs: [1, 0],
    outputs: [1]
  },
  {
    inputs: [1, 1],
    outputs: [0]
  }
]

function setup() {
  createCanvasCustom({ w: 400, h: 400 });

  nn = new NeuralNetwork(2, 2, 1)
}

function draw() {
  background(0);

  // console.log("Train")
  for (let i = 0; i < 1000; i++) {
    // console.log("ing")
    let data = random(training_data)
    nn.train(data.inputs, data.outputs)
  }

  noStroke()
  let resolution = 10;
  let cols = width / resolution;
  let rows = height / resolution;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x1 = i / cols;
      let x2 = j / rows;
      let inputs = [x1, x2]
      let y = nn.feedforward(inputs)
      fill(y * 255);
      rect(i * resolution, j * resolution, resolution, resolution)
    }
  }


}
