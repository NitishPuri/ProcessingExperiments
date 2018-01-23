class KochFractal {
  constructor() {
    this.start = createVector(0, height-20);
    this.end = createVector(width, height-20);
    this.lines = [];
    this.count = 0;    

    this.restart();
  }

  nextLevel() {
    this.lines = this.iterate(this.lines);
    this.count++;
  }

  restart() {
    this.count = 0;
    this.lines = [];
    this.lines.push(new KochLine(this.start, this.end));
  }

  getCount() {
    return this.count;
  }

  render() {
    this.lines.forEach(l => l.display());
  }

  iterate(before) {
    var now = [];
    before.forEach(l => {
      var a = l.kochA();
      var b = l.kochB();
      var c = l.kochC();
      var d = l.kochD();
      var e = l.kochE();

      now.push(new KochLine(a, b));
      now.push(new KochLine(b, c));
      now.push(new KochLine(c, d));
      now.push(new KochLine(d, e));
    })

    return now;
  }
}