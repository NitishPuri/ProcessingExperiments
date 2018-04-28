const createShape = () => {

  frame_counter++;
  if (frame_counter > 1000) {
    frame_counter = 0;
    counter++;
  }

  let size = 0;
  let shape_to_add = undefined;

  if (params.filling == params.fillingTypes.Random) {
    size = floor(random(params.minInvaderSize, params.maxInvaderSize))
  }
  else if (params.filling == params.fillingTypes.Statistical) {
    let area_new = initial_area * pow(counter, -params.c);
    size = sqrt(area_new);
  }

  console.log(`Size::${size}`)
  let attempts = 0;

  while (attempts++ < 1000) {
    let x = random(width);
    let y = random(height);

    let new_shape = new Rect(x, y, size)

    if (x + size > width || y + size > height) {
      continue;
    }

    let intersects = false;
    for (shape of shapes) {
      if (shape.intersect(new_shape)) {
        intersects = true;
        break;
      }
    }

    if (!intersects) {
      shape_to_add = new_shape
      break;
    }
  }

  if (shape_to_add) {
    shape_to_add.randomize();
    shape_to_add.draw();
    shapes.push(shape_to_add)
    counter++;
    frame_counter--;
  }


}

class Shape {
  intersect(other) { return false; }
  draw() { }
}

class Rect extends Shape {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }
  intersect(other) {
    if (this.x > other.x + other.size || other.x > this.x + this.size)
      return false;
    if (this.y > other.y + other.size || other.y > this.y + this.size)
      return false;
    return true;
  }
  draw() {
    rect(this.x, this.y, this.size)
  }
}
