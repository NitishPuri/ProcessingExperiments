

let params = {
  interactive: true,

}

function setup() {
  console.log("Setting up.");
  // let gui = new dat.GUI();
  // gui.add(params, 'interactive');

  // setInterval(handleMouse, 100);
}

// function handleMouse() {

// }




function compile(src) {
  return src;
  // return src.replace(/(#define func (.*))/g, "#define func " + params.method)
}