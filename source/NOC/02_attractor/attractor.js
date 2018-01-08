class Attractor {
    constructor() {
        this.mass = 20;
        this.pos = createVector(width/2, height/2);
        this.G = 1;
        this.dragOffset = createVector(0, 0);
        this.dragging = false;
        this.rollover = false;
    }

    attract(mover) {
        var force = p5.Vector.sub(this.pos, mover.pos);
        var d = force.mag();
        d = constrain(d, 5.0, 25.0);
        force.normalize();
        var strength = (this.G * this.mass * mover.mass) / (d * d);
        force.mult(strength);
        return force;
    }

    render() {
        ellipseMode(CENTER);
        strokeWeight(4);
        stroke(0);
        if ( this.dragging ) fill(50);
        else if (this.rollover) fill(100);
        else fill(175, 200);
        ellipse(this.pos.x, this.pos.y, this.mass*2);
    }

    clicked(mx, my) {
        var d = dist(mx, my, this.pos.x, this.pos.y);
        if ( d < this.mass) {
            this.dragging = true;
            this.dragOffset.x = this.pos.x - mx;
            this.dragOffset.y = this.pos.y - my;
        }
    }

    hover(mx, my) {
        var d = dist(mx, my, this.pos.x, this.pos.y);
        if ( d < this.mass) {
            this.rollover = true;
        } 
        else {
            this.rollover = false;
        }                
    }

    stopDragging() {
        this.dragging = false;
    }

    drag(mx, my) {
        if(this.dragging) {
            this.pos.x = mx + this.dragOffset.x;
            this.pos.y = my + this.dragOffset.y;
        }
    }
}