

let params = {
  interactive: true,
  maxIterations: 800,
  colorResolution: 256,
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
  gui.add(params, 'maxIterations').min(100).max(5000).step(10).onChange(loadShader)
  gui.add(params, 'colorResolution').min(100).max(1000).step(10).onChange(loadShader)

  // setInterval(handleMouse, 100);
}

function setMacroOption(src, option, value) {
  let r = new RegExp("(#define " + option + " (.*))", "g");
  let s = "#define " + option + " " + value;
  return src.replace(r, s)
}

function compile(src) {
  // return src;
  // console.log(src)

  console.log("compiling")

  src = setMacroOption(src, 'getColor', params.method);
  src = setMacroOption(src, 'maxIterations', params.maxIterations);
  src = setMacroOption(src, 'colorResolution', params.colorResolution);
  // console.log(src)
  return src;
}