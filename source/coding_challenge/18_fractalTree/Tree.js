class Tree {
  constructor() {
    this.leaves = [];
    this.branches = [];

    for(var i = 0; i < 300; i++) {
      this.leaves.push(new Leaf());
    }

    var pos = createVector(0, height / 2, 0);
    var dir = createVector(0, -1);
    var root = new Branch(null, pos, dir);
    this.branches.push(root);

    var found = false;
    var current = root;
    while(!found) {
      this.leaves.forEach(l => {
        var d = p5.Vector.dist(current.position, l.position);
        if( d < max_dist) {
          found = true;            
          console.log("Found!!!" , d);
          console.log("After " , this.branches.length , " branches..");
        }
      })

      if(!found) {
        var next = current.next();
        // console.log("Creating a branch..", next.position)
        current = next;
        this.branches.push(current);
      }
  
    }
  }

  grow() {
    this.leaves.forEach( l => {
      var closestBranch = null;
      var record = max_dist;
      for(var j = 0; j < this.branches.length; j++) {
        var branch = this.branches[j];
        var d = p5.Vector.dist(branch.position, l.position);
        if(d < min_dist) {
          l.reached = true;
          closestBranch = null;
          break;
        }
        else if(d < record) {
          closestBranch = branch;
          record = d;
        }

      }
      if(closestBranch != null) {
        var dir = p5.Vector.sub(l.position, closestBranch.position);
        dir.normalize();
        closestBranch.direction.add(dir);
        closestBranch.count++;
        // var newBranch = 
      }    
    })

    for(var i = this.leaves.length-1; i >= 0; i--) {
      if(this.leaves[i].reached) {
        this.leaves.splice(i, 1);
      }
    }

    var bl = this.branches.length
    for(var i = 0; i < bl; i++) {
      var branch = this.branches[i];
      if(branch.count > 0) {
        branch.direction.div(branch.count + 1);
        var rand = p5.Vector.random2D();
        rand.setMag(0.1);
       this.branches.push(branch.next());
        branch.reset();
      }
    }
  }



  show() {
    this.leaves.forEach(l => l.show());
    var i = 0;
    this.branches.forEach(b => {
      var sw = map(i++, 0, this.branches.length, 6, 0);
      b.show(sw)
    });
  }
}