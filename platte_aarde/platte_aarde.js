var r = 0;
var angle = 0;
var front = true;
var sign = 1;
var maxR = 300;
var planets = [];
var q = 0;
var numberOfParticles = 1000;


function ConvertFromPolarToCart(v) {
  var x = v.x * cos(v.y);
  var y = v.x * sin(v.y);
  
  return createVector(x, y);
}

function ConvertFromCartToPolar(v) {
  var x = sqrt(v.x*v.x + v.y*v.y);
  var y = 0;
  
  if (v.x == 0) {
     y = (v.y > 0) ? 270 : 90;
  } else {
    y = atan(v.y/v.x);
  }
  
  return createVector(x, y);
}

function Planet(name) {
  this.position = ConvertFromPolarToCart(createVector(random(maxR), random(360), 1));
  //this.position = ConvertFromPolarToCart(createVector(maxR, 180, 1));
  this.red = 0;
  this.green = 255;
  this.sign = 1;
  this.name = name;
  this.speed = ConvertFromPolarToCart(createVector(0.8, random(360)));
  //this.speed = ConvertFromPolarToCart(createVector(1, 0));
  this.acceleration = createVector(0,0);
  this.mass = 1; 
  this.circle = 1;
  this.deltaMass = 0;
  
  this.applyForce = function() {
    var thisLocation = this.position;
    var attracted = 0;
    this.deltaMass = 0;
    
    var dragStrength;
    var dragForce;
    
    if (this.position.mag() >= maxR) {
      dragStrength = -1 * 250 *  this.speed.mag() * this.speed.mag();   
      dragForce = this.speed.copy().normalize().mult(dragStrength);     
      this.acceleration.add(dragForce);
    } else {
      dragStrength = -1 * 0.005 *  this.speed.mag() * this.speed.mag();  
      dragForce = this.speed.copy().normalize().mult(dragStrength);
      this.acceleration.add(dragForce);
    }
        
        
        this.red = 0;
         this.green = 255;
         
    for (var i=0; i<planets.length; ++i) {
      var planet = planets[i];
      if (planet.mass <= 0) {
        continue;  
      }
      if (planet.name == this.name) {
        continue;
      }

         
      var otherLocation = planet.position;
      var force = p5.Vector.sub(otherLocation, thisLocation);
      var distance = force.mag();
      force.normalize();    
      var drag = distance < (this.mass + planet.mass + 5);    
      var repel = distance < (sqrt(this.mass) + sqrt(planet.mass) + 2);
      var merge = distance < 1.4;//(sqrt(this.mass) + sqrt(planet.mass) + 0.1);
      
      if (merge) {
         var dest = p5.Vector.add(planet.position, planet.speed);
         var targetSpeed = p5.Vector.sub(dest, this.position);
         targetSpeed.normalize().mult(5);
         var targetForce = p5.Vector.sub(targetSpeed, this.speed);
         this.acceleration.add(targetForce);
         this.red = 255;
         this.green = 0;
         continue;
      }
      
      if (repel) {
        var strength = -0.1 * (this.mass * planet.mass)/(distance*distance);
        this.acceleration.add(force.mult(strength));
        continue;
      }
      
      if (drag) {
        var dragStrength1 = -1 * 0.05 *  this.speed.mag() * this.speed.mag();
        var dragForce1 = this.speed.copy().normalize().mult(dragStrength1);
        this.acceleration.add(dragForce1);
        continue;
      }
      
      strength = 0.08 * (this.mass * planet.mass)/(distance*distance);
      this.acceleration.add(force.mult(strength));
    }
  }
  
  this.update = function() {
    this.speed.add(this.acceleration);
    this.speed.limit(3);
    var thisLocation = this.position;   
    thisLocation.add(this.speed);
    var newPolar = thisLocation;
    
    this.position = createVector(newPolar.x, newPolar.y, this.position.z);
    this.acceleration.mult(0);
    //if (this.deltaMass < 0) {
    //  this.deltaMass = 0;
    //}
      
    this.mass += this.deltaMass;
    if (this.mass < 0) {
       this.mass = 0; 
    }
  }

  this.show = function() {
    var cart = this.position;
    
    //strokeWeight(this.position.z == 1 ? 1 : 0.3);
    
    //if (this.mass > 0) {
      //fill(0, 255, 0);
    //} else {
      fill(this.red, this.green, 0);
    //}
    
    ellipse(cart.x, cart.y, 2*sqrt(this.mass), 2*sqrt(this.mass));
  }
}

function setup() {
  angleMode(DEGREES);
  createCanvas(1100, 1100);
  for(qq=0;qq<numberOfParticles;++q) {
    planets.push(new Planet(qq));
    ++qq;
  }
}

function draw() {
  background(230,250,220, 255);
  translate(400, 200);
  if (maxR < 500) {
     //maxR += 0.5; 
  }
  scale(0.7);
  strokeWeight(0);
  fill(255, 255, 255);
  ellipse(0, 0, 2*maxR, 2*maxR);

  for (var i=0; i<planets.length; ++i) {
    if (planets[i].mass <= 0) {
      continue;  
    }
    planets[i].applyForce();
  }

  for (var j=0; j<planets.length; ++j) {
    if (planets[j].mass <= 0) {
      continue;  
    }
    planets[j].update();
    planets[j].show();
  }
}
