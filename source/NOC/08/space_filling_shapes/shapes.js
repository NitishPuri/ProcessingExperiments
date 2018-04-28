const createShape = () => {

  frame_counter++;
  if (frame_counter > 1000) {
    frame_counter = 0;
    counter++;
  }

  let area = 0;
  let shape_to_add = undefined;

  if (params.filling == params.fillingTypes.Random) {
    const size = floor(random(params.minSize, params.maxSize))
    area = size * size
  }
  else if (params.filling == params.fillingTypes.Statistical) {
    area = initial_area * pow(counter, -params.c);
  }

  console.log(`Size::${sqrt(area)}`)
  let attempts = 0;

  while (attempts++ < 1000) {
    const x = random(width);
    const y = random(height);

    const new_shape = new shapes.current_shape(x, y, area)

    let intersects = false;
    for (let shape of created_shapes) {
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
    shape_to_add.draw();
    created_shapes.push(shape_to_add)
    counter++;
    frame_counter--;
  }


}

class Shape {
  intersect(other) { return false; }
  draw() { }
  clear() { }
  contains() { return false; }
}

class Rect extends Shape {
  constructor(x, y, area) {
    super()
    this.x = x;
    this.y = y;
    this.size = sqrt(area);
    const offset = random(0.7, 0.8);
    const one_offset = 1 - offset;
    const h = floor(random(100))
    this.draw = () => {

      if (params.rainbow) { fill(h, 100, 100) }
      else { fill(params.block_color) }

      noStroke()
      rect(this.x, this.y, this.size, this.size)

      if (params.rainbow) { stroke(0) }
      else { stroke(params.accent_color) }

      line(this.x, this.y, this.x + this.size, this.y + this.size * offset)
      line(this.x + this.size, this.y, this.x, this.y + this.size * offset)
      line(this.x, this.y + this.size, this.x + this.size, this.y + this.size * one_offset)
      line(this.x + this.size, this.y + this.size, this.x, this.y + this.size * one_offset)
    }
  }
  intersect(other) {
    return (
      this.x < other.x + other.size &&
      other.x < this.x + this.size &&
      this.y < other.y + other.size &&
      other.y < this.y + this.size
    )
  }
  clear() {
    if (params.rainbow) {
      fill(0, 0, 100)
    }
    else {
      fill(params.background_color)
    }
    noStroke()
    rect(this.x, this.y, this.size, this.size)
  }
  contains(x, y) {
    return (x > this.x && x < this.x + this.size && y > this.y && y < this.y + this.size)
  }
}

class Circle extends Shape {
  constructor(x, y, area) {
    super()
    this.x = x
    this.y = y
    this.radius = sqrt(area / PI)
    const h = floor(random(100))
    this.draw = () => {
      if (params.rainbow) {
        fill(h, 100, 100);
      }
      else {
        fill(params.block_color)
      }
      ellipse(this.x, this.y, this.radius * 2)
    }
  }
  intersect(other) {
    return dist(this.x, this.y, other.x, other.y) < (this.radius + other.radius)
  }
  clear() {
    if (params.rainbow) {
      stroke(0, 0, 100)
      fill(0, 0, 100)
    }
    else {
      stroke(params.background_color)
      fill(params.background_color)
    }
    ellipse(this.x, this.y, this.radius * 2)
  }
  contains(x, y) {
    return (dist(this.x, this.y, x, y) < this.radius)
  }
}
