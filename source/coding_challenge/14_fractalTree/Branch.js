class Branch {
  constructor(start, end) {
    this.start = start;
    this.end = end;
    this.finished = false;
  }

  show() {
    stroke(255);
    line(this.start.x, this.start.y, this.end.x, this.end.y);
  }


  branchA() {
    var dir = p5.Vector.sub(this.end, this.start);
    dir.rotate(PI / 4);
    dir.mult(0.67)
    var newEnd = p5.Vector.add(this.end, dir);
    var rightBranch = new Branch(this.end, newEnd);
    return rightBranch;
  }

  branchB() {
    var dir = p5.Vector.sub(this.end, this.start);
    dir.rotate(-PI / 4);
    dir.mult(0.67)
    var newEnd = p5.Vector.add(this.end, dir);
    var rightBranch = new Branch(this.end, newEnd);
    return rightBranch;
  }

}