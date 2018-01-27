class Network {
  constructor() {
    this.neurons = []
    this.connections = []
  }
  addNeuron(n) {
    this.neurons.push(n)
  }
  connect(a, b) {
    const c = new Connection(a, b, random(1));
    a.addConnection(c);
    this.connections.push(c);
  }
  feedforward(inputs) {
    inputs.forEach((inp, ind) => this.neurons[ind].feedforward(inp));
  }
  update() {
    this.connections.forEach(c => c.update());
  }
  show() {
    this.neurons.forEach(n => n.show());
    this.connections.forEach(c => c.show());
  }
}