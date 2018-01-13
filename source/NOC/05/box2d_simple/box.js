class Box {
  constructor(x, y) {
    this.size = createVector(16, 16);

    // Define a body
    var bd = new box2d.b2BodyDef();
    bd.type = box2d.b2BodyType.b2_dynamicBody;
    bd.position = scaleToWorld(x, y);

    // Define a fixture
    var fd = new box2d.b2FixtureDef();
    // Fixture holds shape
    fd.shape = new box2d.b2PolygonShape();
    fd.shape.SetAsBox(scaleToWorld(this.size.x/2), scaleToWorld(this.size.y/2));

    // Some physics
    fd.density = 1.0;
    fd.friction = 0.5;
    fd.restitution = 0.2;

    // Create the body
    this.body = world.CreateBody(bd);
    // Attach the ficture
    this.body.CreateFixture(fd);

    this.body.SetLinearVelocity(new box2d.b2Vec2(random(-5, 5), random(2, 5)));
    this.body.SetAngularVelocity(random(-5, 5));
  }

  display() {
    // Get the body's position
    var pos = scaleToPixels(this.body.GetPosition());
    // Get its angle of rotation
    var a = this.body.GetAngleRadians();

    rectMode(CENTER);
    push();
    translate(pos.x, pos.y);
    rotate(a);
    fill(127);
    stroke(0);
    strokeWeight(2);    
    rect(0, 0, this.size.x, this.size.y);
    pop();
  }

  // This function removes the body from box2d world.
  killBody() {
    world.DestroyBody(this.body);
  }

  // Is the particle ready for deletion ? 
  done() {
    var pos = scaleToPixels(this.body.GetPosition());
    if(pos.y > height + this.w*this.h) {
      this.killBody();
      return true;
    }
    return false;
  }




}