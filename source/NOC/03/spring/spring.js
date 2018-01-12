class Spring {
    constructor(x, y, l) {
        this.anchor = createVector(x, y);
        this.length = l;
        this.k = 0.2;
    }

    connect (m) {
        var force = p5.Vector.sub(m.pos, this.anchor);
        var d = force.mag();
        var stretch = d - this.length;

        force.normalize();
        force.mult(-1 * this.k * stretch);
        m.applyForce(force);
    }

    constrainLength(m, minLength, maxLength) {
        var dir = p5.Vector.sub(m.pos, this.anchor);
        var d = dir.mag();

        if(d < minLength) {
            dir.normalize();
            dir.mult(minLength);
            m.pos = p5.Vector.add(this.anchor, dir);
            m.vel.mult(0);
        }
        else if(d > maxLength) {
            dir.normalize();
            dir.mult(maxLength);
            m.pos = p5.Vector.add(this.anchor, dir);
            m.vel.mult(0);
        }
    }

    display() {
        stroke(0);
        fill(175);
        strokeWeight(2);
        rectMode(CENTER);
        rect(this.anchor.x, this.anchor.y, 10, 10);
    }

    displayLine(m) {
        strokeWeight(2);
        stroke(0);
        line(m.pos.x, m.pos.y, this.anchor.x, this.anchor.y);
    }
}