class ParticleSystem {
    constructor(x, y, img_) {
        this.particles = [];
        this.origin = createVector(x, y);
        this.img = img_;
    }

    addParticle() {
        this.particles.push(new Particle(this.origin.x, this.origin.y, this.img));
    }

    run() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            var p = this.particles[i];
            p.run();
            if (p.isDead()) {
                this.particles.splice(i, 1);
            }
        }
    }

    applyForce(f) {
        for (var p of this.particles) {
            p.applyForce(f);
        }
    }
}
