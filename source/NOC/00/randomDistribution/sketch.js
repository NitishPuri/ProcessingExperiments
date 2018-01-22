randomCounts = [];
total = 50;

var params = {
  distribution : 0
}
function setup() {
  createCanvasCustom();

  var gui = new dat.GUI();
  var controller = gui.add(params, 'distribution', {Random: 0, Gaussian : 1});
  controller.onFinishChange(reset);

  reset();

}

function reset() {
  console.log("reset!!")
  for(let i = 0; i < total; i++){
    randomCounts[i] = 0;
  }
}

function draw() {
  background(100);

  let index;
  if(params.distribution == 0) {
    // Random distribution
    index = floor(random(total));
  } else {
    // Gaussian distribution
    index = randomGaussian();
    index = constrain(floor(index*total/5 + total/2), 0, total-1);
  }


  randomCounts[index]++;

  stroke(0);
  strokeWeight(2);
  fill(255);
  var w = width/total;

  for (let i = 0; i < randomCounts.length; i++) {
    rect(i*w, height - randomCounts[i], w-1, randomCounts[i]);    
  }
}
