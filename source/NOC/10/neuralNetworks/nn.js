function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

// return a random number in range (-1, 1)
function randomize() {
  return Math.random() * 2 - 1
}

class NeuralNetwork {
  constructor(input_nodes, hidden_nodes, output_nodes) {
    this.input_nodes = input_nodes;
    this.hidden_nodes = hidden_nodes;
    this.output_nodes = output_nodes;

    // weights
    this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes);
    this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes);

    // randomize the weights
    this.weights_ih.map(randomize);
    this.weights_ho.map(randomize);

    // bias
    this.bias_h = new Matrix(this.hidden_nodes, 1);
    this.bias_o = new Matrix(this.output_nodes, 1);
    this.bias_h.map(randomize);
    this.bias_o.map(randomize)

  }

  feedforward(input_array) {
    let inputs = Matrix.fromArray(input_array);

    let hidden = Matrix.multiply(this.weights_ih, inputs);
    hidden.add(this.bias_h);

    // activation
    hidden.map(sigmoid);

    let output = Matrix.multiply(this.weights_ho, hidden);
    output.add(this.bias_o);
    output.map(sigmoid);

    return output.toArray();
  }

  train(inputs, targets) {
    let outputs = this.feedforward(inputs)

    outputs = Matrix.fromArray(outputs);
    targets = Matrix.fromArray(targets);

    let output_error = Matrix.subtract(targets, outputs);

    let who_t = Matrix.transpose(this.weights_ho);

    output_error.print();
    who_t.print();
    let hidden_error = Matrix.multiply(who_t, output_error);
  }

}