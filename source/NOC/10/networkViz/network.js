class Network {
  constructor() {
    this.neurons = []    
  }
  addNeuron(n) {
      this.neurons.push(n)
  }
  connect(a, b) {
    a.addConnection(new Connection(a, b, random(1)));
  }
  show() {
    this.neurons.forEach(n => n.show());
  }
}