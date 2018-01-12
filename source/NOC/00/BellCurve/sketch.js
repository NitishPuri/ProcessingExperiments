var heights;

function setup() {
  createCanvas(windowWidth/2, windowHeight/2);
  heights = new Array(width);
}

function draw() {
  background(255);  

  let m = 0;              // mean of 0
  let sd = map(mouseX, 0, width, 0.4, 2);     // standard deviation based on mouseX

  for(let i = 0; i < heights.length; i++) {
    let xCoord = map(i, 0, width, -3, 3);
    let sq2pi = sqrt(2*PI);
    let xmsq = -1*(xCoord-m)*(xCoord-m)
    let sdsq = 2*sd*sd;
    heights[i] = (1 / (sd*sq2pi)) * (exp(xmsq/sdsq));
  }

  stroke(0);
  strokeWeight(2);
  noFill();
  beginShape();
  for (let i = 0; i < heights.length-1; i++) {
    let x = i; 
    let y = map(heights[i], 0, 1, height-2, 2);
    vertex(x, y);
  }
  endShape();  
}
