let animals = [];
let particles = [];
function uuid() {
  let bytes = window.crypto.getRandomValues(new Uint8Array(32));
  const randomBytes = () => (bytes = bytes.slice(1)) && bytes[0];

  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c => 
      (c ^ randomBytes() & 15 >> c / 4).toString(16)
    );
}

function VirusParticle(location, livespan) {
  this.location = location;
  this.age = 0;
  this.livespan = livespan;
  this.alive = true;
  
  this.update = function() {
     if (!this.alive)
      return;
      
    this.age += 1;
    if (this.age > this.livespan) {
      this.alive = false;    
    }
  };
  
  this.display = function() {
    if (!this.alive)
      return;
      
    var c = color("blue");
    c.setAlpha(40);
     fill(c);
     push();
     translate(500, 500);
     ellipse(this.location.x, this.location.y, 30, 30);
     pop();
  };
}


function Animal() {
  this.c = color(255, 0, 0);
  //console.log(this.c);
  this.id = uuid();
  this.xoff = random(10000);
  this.yoff = random(10000);
  this.location = p5.Vector.random2D().mult(random(300));
  this.age = random(100);
  this.infected = false;
  this.infectedTime = 0;
  this.sick = false;
  this.sickTime = 0;
  this.maxSick = 0;
  this.severity = 0;
  this.immune = false;
  this.dead = false;
  
  this.update = function(particles) {
    if (this.dead) {
      return;
    }
    
    this.velocity = createVector(map(noise(this.xoff), 0, 1, -2, 2), map(noise(this.yoff), 0, 1, -2, 2));
    this.location.add(this.velocity);  
    this.xoff += 0.5;
    this.yoff += 0.5;
    
    if (dist(this.location.x, this.location.y, 500, 500) > 500) {
      var d = createVector(0,0).sub(this.location).normalize().mult(0.02);
      this.location.add(d);
      //this.location = p5.Vector.random2D().mult(random(50));  
    }
    
    if (this.immune) {
      return;
    }
    
    if (this.sick) {
      this.sickTime += 1;
      
      var sickToDead = random(100000);
      if (sickToDead > 99950) {
        
        this.sick = false;
        this.dead = true;
        return;
      }
      
      if (this.sickTime > this.maxSick) {
        this.sick = false;
        this.immune = true;
        return;
      }
        
      if (random(20000) > 19900) {
        particles.push(new VirusParticle(this.location.copy(), 15000));
      }
      
      return;
    }
    
    if (this.infected) {
      this.infectedTime += 1;
      if (this.infectedTime > 250) {
        this.infected = false;
        this.sick = true;
        this.maxSick = random(1000);
      }
        
      return;
    }
    
    for (var x=0;x<particles.length;++x) {
      var p = particles[x];
        if (!p.alive) {
          continue;
        }
       
        if (dist(p.location.x, p.location.y, this.location.x, this.location.y) < 10) {
          //this.c = color(0, (this.c.levels[1]+1)%256, 0);
          this.infected = true;
          break;
        }
    }
    
    
  };
  
  this.display = function() {
     fill(color("yellow"));
     if (this.infected)
       fill(color("orange"));
     if (this.sick)
       fill(color("red"));
     if (this.dead)
       fill(color("white"));
      if (this.immune)
       fill(color("blue"));
       
     push();
     translate(500, 500);
     ellipse(this.location.x, this.location.y, 10, 10);
     pop();
  };
}

function setup() {
  createCanvas(1000, 1000);
  for (var p=0; p<50; ++p) {
    var location = p5.Vector.random2D().mult(random(100));
    particles.push(new VirusParticle(location, 100));
  }
  for (var a=0; a<1000; ++a) {
    animals.push(new Animal());
  }
}


function draw() {
  background(0);
  //console.log(particles.length);
  
  var temp = [];
  for (var p=0; p<particles.length; ++p) {
    if (particles[p].alive) {
       temp.push(particles[p]);
       continue;
     }
  }
  delete particles;
  particles = temp;
  
  for (var p2=0; p2<particles.length; ++p2) {
     particles[p2].update();
     particles[p2].display(); 
  }
  //console.log("number of particles", particles.length);
  var totalSick = 0;
  var totalDead = 0;
  var totalImmune = 0;
  for (var x=0; x<animals.length; ++x) {
     var animal = animals[x];
     if (animal.sick) {
       totalSick += 1;  
     }
     if (animal.immune) {
       totalImmune += 1;  
     }
     if (animal.dead) {
       totalDead += 1;  
     }
     animal.update(particles);
     animal.display(); 
  }
  console.log(totalImmune, totalSick, totalDead);
}
