
let training_data = [
  {
    inputs: [0, 1],
    targets: [1]
  },
  {
    inputs: [1, 0],
    targets: [1]
  },
  {
    inputs: [0, 0],
    targets: [0]
  },
  {
    inputs: [1, 1],
    targets: [0]
  }
]

var brain;

function setup() {
  // createCanvasCustom();
  noCanvas();

  // let m1 = new Matrix(2, 3);
  // let m2 = new Matrix(3, 2);
  // const r = function(){ return Math.random()*2 - 1 }
  // m1.map(r)
  // m2.map(r)
  // console.table(m1.data);
  // console.table(m2.data);

  // let c = Matrix.multiply(m1, m2)
  // console.table(c.data);

  let nn = new NeuralNetwork(2, 2, 1, 0.1);

  for (let i = 0; i < 20000; i++) {
    let data = random(training_data)
    nn.train(data.inputs, data.targets)
  }

  // guess
  console.log(nn.feedforward([1, 0]))
  console.log(nn.feedforward([0, 1]))
  console.log(nn.feedforward([0, 0]))
  console.log(nn.feedforward([1, 1]))

}

function draw() {
}