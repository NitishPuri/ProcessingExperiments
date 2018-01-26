var network;

function setup() {
  createCanvasCustom();
  network = new Network()

  // Two inputs
  const x0 = new Neuron(-200, -75);
  const x1 = new Neuron(-200, 75);

  // Two hidden
  const h0 = new Neuron(0, -75);
  const h1 = new Neuron(0, 75);

  // One output
  const y = new Neuron(200, 0);

  // Add to the network
  network.addNeuron(x0);
  network.addNeuron(x1);
  network.addNeuron(h0);
  network.addNeuron(h1);
  network.addNeuron(y);

  // Connect them
  network.connect(x0, h0);
  network.connect(x0, h1);
  network.connect(x1, h0);
  network.connect(x1, h1);
  network.connect(h0, y);
  network.connect(h1, y);
}

function draw() {
  background(200);
  translate(width/2, height/2);
  network.show();
  noLoop();
}