
var current = 'A';
var count = 0;

var instructions;
var show;

var results = '';

function setup() {
  createCanvas(5, 5);
  instructions = createP('<a href=\'#\'>Click the mouse to generate.</a>');
  instructions.class('clickable');
  instructions.style('padding-left', '1rem');
  instructions.mousePressed(generate);

  results += 'Generation ' + count + ': ' + current + '<br>';
  show = createP(results);
  show.style('padding-left', '1rem');
  show.style('word-wrap', 'break-word');
}

function generate() {
  var next = '';

  const l = current.length;
  for (let i = 0; i < l; i++) {
    const c = current.charAt(i);
    if (c === 'A') {
      next += 'AB';
    }
    else if (c === 'B') {
      next += 'A';
    }
  }

  current = next;
  count++;
  results += 'Generation ' + count + ': ' + current + '<br>';
  show.html(results);
}

