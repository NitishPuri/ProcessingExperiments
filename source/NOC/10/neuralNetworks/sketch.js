
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

  let nn = new NeuralNetwork(2, 2, 2);
  let inputs = [1, 0];
  let targets = [1, 1];

  let error = nn.train(inputs, targets);
  // console.log(error);
  // inputs.print();
  // targets.print()
  // error.print()

}

function draw() {
}