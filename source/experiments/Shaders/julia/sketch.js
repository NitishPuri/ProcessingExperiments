

let params = {
  interactive: true,
  method: 'getColorGreen',
  methods: [
    'getColorGreen',
    'getColorWheel'
  ]

}

function setup() {
  console.log("Setting up.");
  let gui = new dat.GUI();
  // gui.add(params, 'interactive');
  gui.add(params, 'method', params.methods).onChange(loadShader)

  // setInterval(handleMouse, 100);
}

function compile(src) {
  // return src;
  console.log(src)
  src = src.replace(/(#define getColor (.*))/g, "#define getColor " + params.method)
  console.log(src)
  return src;
}