let cities = []
let total = 10;

let recordDistance;
let bestEver;

let order = [];

let totalPermutations;
let count = 0;

function setup() {
  createCanvasCustom();

  for (let i = 0; i < total; i++) {
    cities.push(createVector(random(width), random(height)))
    order.push(i);
  }

  totalPermutations = factorial(total)
  count = 0;

  recordDistance = calcDistance(cities, order);
  console.log(recordDistance)
  bestEver = order.slice();
}

function draw() {
  background(0);

  fill(255);
  cities.forEach(c => ellipse(c.x, c.y, 8, 8))

  stroke(255, 0, 255, 200);
  strokeWeight(4);
  noFill()
  beginShape()
  bestEver.forEach(o => vertex(cities[o].x, cities[o].y));
  endShape()

  stroke(255);
  strokeWeight(1);
  noFill()
  beginShape()
  // cities.forEach(c => vertex(c.x, c.y));
  order.forEach(o => vertex(cities[o].x, cities[o].y));
  endShape()

  printOrder();
  nextOrder();

  const d = calcDistance(cities, order);
  if (d < recordDistance) {
    recordDistance = d
    console.log(recordDistance)
    bestEver = order.slice();
  }
}

function swap(a, i, j) {
  let temp = a[i];
  a[i] = a[j]
  a[j] = temp
}

function calcDistance(points, order) {
  let sum = 0;
  for (let i = 0; i < order.length - 1; i++) {
    const pA = points[order[i]]
    const pB = points[order[i + 1]]
    sum += dist(pA.x, pA.y, pB.x, pB.y)
  }
  return sum
}

function nextOrder() {
  //////
  // Step 1
  let largestI = -1;
  for (let i = 0; i < order.length - 1; i++) {
    if (order[i] < order[i + 1]) {
      largestI = i
    }
  }

  if (largestI == -1) {
    noLoop();
    console.log("finished")
  }

  // Step 2
  let largestJ = -1;
  for (let j = 0; j < order.length; j++) {
    if (order[j] > order[largestI]) {
      largestJ = j
    }
  }

  // Step 3
  swap(order, largestI, largestJ)

  // Step 4 
  let endArray = order.splice(largestI + 1)
  endArray.reverse();
  order = order.concat(endArray)

  count++;
}

function printOrder() {
  textSize(32);
  var s = ''
  // order.forEach(o => s += o)

  // s += ' , '
  s += nf(count * 100 / totalPermutations, 0, 4)
  s += '%'

  fill(255);
  text(s, 20, 50)
}


function factorial(n) {
  if (n == 1) return 1;
  return n * factorial(n - 1)
}