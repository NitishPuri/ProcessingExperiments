let walker;

function setup() {
  createCanvasCustom();
  walker = new Walker();
}

function draw() {
  walker.step();
  walker.render();
}

class Walker {
  constructor() {
    this.x = width/2;
    this.y = height/2;    
  }

  render() {
    stroke(0);
    point(this.x, this.y)
  }

  step() {

    var r = random(1);
    // A 50% chance of moving towards the mouse
    if(r < 0.5) {
      var xDir = (mouseX - this.x);
      var yDir = (mouseY - this.y);

      if(xDir != 0) {
        xDir /= abs(xDir);
      }
      if(yDir != 0) {
        yDir /= abs(yDir);
      }

      this.x += xDir;
      this.y += yDir;
    } else {
      var xDir = floor(random(-2, 2));
      var yDir = floor(random(-2, 2));
      this.x += xDir;
      this.y += yDir;      
    }

    this.x = constrain(this.x, 0, width-1);
    this.y = constrain(this.y, 0, height-1);
  }
}