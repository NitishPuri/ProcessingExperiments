function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

function dsigmoid(s) {
  return s * (1 - s)
}

// return a random number in range (-1, 1)
function randomize() {
  return Math.random() * 2 - 1
}

class NeuralNetwork {
  constructor(input_nodes, hidden_nodes, output_nodes, lr) {
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

    this.learning_rate = lr

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
    inputs = Matrix.fromArray(inputs);

    let hidden = Matrix.multiply(this.weights_ih, inputs);
    hidden.add(this.bias_h);

    // activation
    hidden.map(sigmoid);

    let outputs = Matrix.multiply(this.weights_ho, hidden);
    outputs.add(this.bias_o);
    outputs.map(sigmoid);

    targets = Matrix.fromArray(targets);

    let output_errors = Matrix.subtract(targets, outputs);

    // Calculate gradients
    let gradients = Matrix.map(outputs, dsigmoid)
    gradients.multiply(output_errors)
    gradients.multiply(this.learning_rate)

    // calculate deltas
    let hidden_T = Matrix.transpose(hidden)
    let weight_ho_deltas = Matrix.multiply(gradients, hidden_T)

    // Adjust the weights by deltas
    this.weights_ho.add(weight_ho_deltas)
    this.bias_o.add(gradients)

    // Calculate the hidden layer gradient
    let who_t = Matrix.transpose(this.weights_ho);
    let hidden_errors = Matrix.multiply(who_t, output_errors);

    let hidden_gradient = Matrix.map(hidden, dsigmoid)
    hidden_gradient.multiply(hidden_errors)
    hidden_gradient.multiply(this.learning_rate)

    // Calculate input->hidden deltas
    let inputs_t = Matrix.transpose(inputs)
    let weigt_ih_deltas = Matrix.multiply(hidden_gradient, inputs_t)

    this.weights_ih.add(weigt_ih_deltas)
    this.bias_h.add(hidden_gradient)

    // output_errors.print();
    // who_t.print();
  }

}