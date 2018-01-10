class ParticleSystem {
    constructor(x, y, l) {
        this.particles = [];
        this.origin = createVector(x, y);
    }

    addParticle() {
        this.particles.push(new Particle(this.origin.x, this.origin.y));
    }

    run() {
        for(let i = this.particles.length - 1; i >= 0; i--) {
            var p = this.particles[i];
            p.run();
            if(p.isDead()) {
                this.particles.splice(i, 1);
            }
        }
    }
}