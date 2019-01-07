
// https://en.wikipedia.org/w/index.php?title=Fourier_series&oldid=517131411
// http://bilimneguzellan.net/purrier-series-meow-and-making-images-speak/
// https://betterexplained.com/articles/an-interactive-guide-to-the-fourier-transform/



let time = 0;
let wave = [];

let params = {
  terms: 5
}

function setup() {
  createCanvasCustom()
  let gui = new dat.GUI();
  gui.add(params, 'terms').min(2).max(15).step(1);
}


function draw() {
  background(0);

  translate(300, 300);
  let radius = 100;

  stroke(255, 255, 0);
  noFill();

  let x = 0, y = 0;
  for(let n = 0; n < params.terms; n++){
    let t = (2*n+1);
    let r = radius * (4 / (t * PI));

    ellipse(x, y, r * 2);

    const px = x, py = y
        
    x += r * cos(t * time);
    y += r * sin(t * time);

    line(px, py, x, y);
  
  }

  wave.unshift(y);

  fill(255 ,100, 100);
  ellipse(x, y, 8);

  line(x, y, 200, y);
  translate(200, 0);

  noFill();
  beginShape();
  wave.forEach((p, i) => vertex(i, p));
  endShape();

  time += 0.04;

  if(wave.length > 500){
    wave.pop();
  }
}