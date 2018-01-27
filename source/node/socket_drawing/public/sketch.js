
var socket;

function setup() {
  createCanvas(640,360);
  background(51)
  // socket = io.connect('http://localhost:3000')
  socket = io.connect('http://192.168.1.34:3000')
  socket.on('mouse', (data) => {
    console.log(data)
    fill(255, 0, 255, 200);
    noStroke()
    ellipse(data.x, data.y, 16, 16)  
  })
}

function mouseDragged() {

  var data = {
    x : mouseX,
    y : mouseY
  }
  socket.emit('mouse', data);

  fill(255, 200);
  noStroke()
  ellipse(mouseX, mouseY, 16, 16)
}



function draw() {
}

