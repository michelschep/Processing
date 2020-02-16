let animals = [];

function uuid() {
  let bytes = window.crypto.getRandomValues(new Uint8Array(32));
  const randomBytes = () => (bytes = bytes.slice(1)) && bytes[0];

  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c => 
      (c ^ randomBytes() & 15 >> c / 4).toString(16)
    );
}

function Animal() {
  this.c = color(255, 0, 0);
  console.log(this.c);
  this.id = uuid();
  this.xoff = random(10000);
  this.yoff = random(10000);
  this.location = p5.Vector.random2D().mult(random(200));
  
  this.update = function(animals) {
    for (var x=0;x<animals.length;++x) {
      if (animals[x].id == this.id) {
        continue;
      }
        
      if (dist(animals[x].location.x, animals[x].location.y, this.location.x, this.location.y) < 10) {
        this.c = color(0, (this.c.levels[1]+1)%256, 0); 
        
      }
    }
    
    this.velocity = createVector(map(noise(this.xoff), 0, 1, -2, 2), map(noise(this.yoff), 0, 1, -2, 2));
    
    this.location.add(this.velocity);  
    this.xoff += 0.05;
    this.yoff += 0.05;
  };
  
  this.display = function() {
     fill(this.c);
     //console.log(this.location);
     push();
     translate(500, 500);
     ellipse(this.location.x, this.location.y, 10, 10);
     pop();
  };
}

function setup() {
  createCanvas(1000, 1000);
  for (var a=0; a<100; ++a) {
    animals.push(new Animal());
  }
}


function draw() {
  background(0);
  //console.log(animals);
  for (var x=0; x<animals.length; ++x) {
     //console.log(animals[x]);
     animals[x].update(animals);
     animals[x].display(); 
  }
}
