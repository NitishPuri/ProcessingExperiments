// An Uneven surface boundary
class Surface {
    constructor() {
        this.surface = [];
        this.surface.push(new box2d.b2Vec2(0, height/2));
        this.surface.push(new box2d.b2Vec2(width/2, height/2 + 100));
        this.surface.push(new box2d.b2Vec2(width, height/2));

        for(let i = 0; i < this.surface.length; i++) {
            this.surface[i] = scaleToWorld(this.surface[i]);
        }

        // Put the surface in the world.
        var chain = new box2d.b2ChainShape();
        chain.CreateChain(this.surface, this.surface.length);

        var bd = new box2d.b2BodyDef();
        this.body = world.CreateBody(bd);

        var fd = new box2d.b2FixtureDef();
        fd.shape = chain;

        fd.density = 1.0;
        fd.friction = 0.5;
        fd.restitution = 0.2;

        this.body.CreateFixture(fd);
    }

    // Draw the boundary.
    display() {
        fill(127);
        stroke(0)
        beginShape();
        for(let i = 0; i < this.surface.length; i++) {
            var v = scaleToPixels(this.surface[i]);
            vertex(v.x, v.y);
        }
        vertex(width, height);
        vertex(0, height);
        endShape(CLOSE);
    }
}