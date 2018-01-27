class Pendulum {
    constructor() {
        this.pos = createVector(0, 0);
        this.origin = createVector(width / 2, 10);
        this.r = random(100, 200);
        this.angle = PI / 4;
        this.aVelocity = 0;
        this.aAcceleration = 0;

        this.ballR = 48;
        this.damping = 0.995;
        this.dragging = false;
    }

    go() {
        this.update();
        this.drag();
        this.display();
    }

    update() {
        if (!this.dragging) {
            var gravity = 0.4;
            this.aAcceleration = (-1 * gravity / this.r) * sin(this.angle);
            this.aVelocity += this.aAcceleration;
            this.aVelocity *= this.damping;
            this.angle += this.aVelocity;
        }
    }

    drag() {
        if (this.dragging) {
            var diff = p5.Vector.sub(this.origin, createVector(mouseX, mouseY));
            this.angle = atan2(-1 * diff.y, diff.x) - PI / 2;
        }
    }

    display() {
        this.pos.x = this.r * sin(this.angle);
        this.pos.y = this.r * cos(this.angle);
        this.pos.add(this.origin);
        ellipseMode(CENTER);
        fill(175);
        if (this.dragging) fill(0);
        line(this.origin.x, this.origin.y, this.pos.x, this.pos.y);
        ellipse(this.pos.x, this.pos.y, this.ballR);
    }

    clicked(mx, my) {
        var d = dist(mx, my, this.pos.x, this.pos.y);
        if (d < this.ballR) {
            this.dragging = true;
        }
    }

    stopDragging() {
        this.aVelocity = 0;
        this.dragging = false;
    }
}