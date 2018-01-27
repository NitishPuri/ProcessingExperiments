class Perceptron {
  constructor(n, c) {
    this.weights = new Array(n)
    // random weights
    for (let i = 0; i < this.weights.length; i++) {
      this.weights[i] = random(-1, 1);
    }
    // learniing rate
    this.c = c;
    // Activation function
    this.activate = Math.sign
  }

  train(inputs, desired) {
    const guess = this.feedForward(inputs)
    const error = desired - guess;
    this.weights.forEach((w, i, a) => (a[i] += this.c * error * inputs[i]))
  }

  feedForward(inputs) {
    const sum = this.weights.reduce((s, w, i) => (s + (inputs[i] * w)), 0)
    return this.activate(sum);
  }

  restart() {
    for (let i = 0; i < this.weights.length; i++) {
      this.weights[i] = random(-1, 1);
    }
  }

  getWeights() { return this.weights }

}