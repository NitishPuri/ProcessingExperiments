const TRIANGLE_AREA_COEFF = 4 / Math.sqrt(3);

const createShape = () => {

  // Try to fit a (slightly)smaller shape
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

  // console.log(`Size::${sqrt(area)}`)
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
  constructor() {
    this.h = floor(random(100))
    this.vertices = []
  }
  intersect(other) {
    // Test if the bounding circles intersect
    if (dist(this.x, this.y, other.x, other.y) > (this.radius + other.radius)) {
      return false
    }

    for (let v of this.vertices) {
      if (InsidePolygon(v, other.vertices)) {
        return true;
      }
    }

    for (let v of other.vertices) {
      if (InsidePolygon(v, this.vertices)) {
        return true;
      }
    }

    const n1 = this.vertices.length
    const n2 = other.vertices.length

    for (let i = 0; i < this.vertices.length; i++) {
      for (let j = 0; j < other.vertices.length; j++) {
        if (LineIntersect(
          { p1: this.vertices[i], p2: this.vertices[(i + 1) % n1] },
          { p1: other.vertices[i], p2: other.vertices[(i + 1) % n2] }
        )) {
          return false;
        }
      }
    }
  }
  draw() {
    noStroke()
    if (params.rainbow) {
      fill(this.h, 100, 100)
    }
    else {
      fill(params.block_color)
    }
    beginShape();
    this.vertices.forEach(v => vertex(v.x, v.y))
    endShape(CLOSE);
  }
  clear() {
    if (params.rainbow) {
      fill(0, 0, 100)
    }
    else {
      fill(params.background_color)
    }
    beginShape();
    this.vertices.forEach(v => vertex(v.x, v.y))
    endShape(CLOSE);
  }
  contains(x, y) {
    return InsidePolygon({ x: x, y: y }, this.vertices)
  }
}

class Rect extends Shape {
  constructor(x, y, area) {
    super()

    this.size = sqrt(area);

    this.x = x + this.size / 2;
    this.y = y + this.size / 2;
    this.radius = this.size / 1.414;

    const offset = random(0.7, 0.8);
    const one_offset = 1 - offset;

    this.vertices.push({ x: x, y: y })
    this.vertices.push({ x: x + this.size, y: y })
    this.vertices.push({ x: x + this.size, y: y + this.size })
    this.vertices.push({ x: x, y: y + this.size })

    this.draw = () => {
      super.draw();

      if (params.rainbow) { stroke(0) }
      else { stroke(params.accent_color) }

      line(x, y, x + this.size, y + this.size * offset)
      line(x + this.size, y, x, y + this.size * offset)
      line(x, y + this.size, x + this.size, y + this.size * one_offset)
      line(x + this.size, y + this.size, x, y + this.size * one_offset)
    }
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

class Triangle extends Shape {
  constructor(x, y, area) {
    super()

    let side = sqrt(area * TRIANGLE_AREA_COEFF)
    let r = (2 * side) / (3 * TRIANGLE_AREA_COEFF);

    this.x = x
    this.y = y
    this.radius = 2 * r;

    this.vertices = []
    this.vertices.push({ x: x - side / 2, y: y + r })
    this.vertices.push({ x: x, y: y - this.radius })
    this.vertices.push({ x: x + side / 2, y: y + r })
  }
}
