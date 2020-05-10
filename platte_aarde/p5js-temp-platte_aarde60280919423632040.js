var r = 0;
var angle = 0;
var front = true;
var sign = 1;
var maxR = 200;
var planets = [];
var q = 0;
var numberOfParticles = 1000;
var size = 300;

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
  this.speed = ConvertFromPolarToCart(createVector(20, random(360)));
  //this.speed = ConvertFromPolarToCart(createVector(1, 0));
  this.acceleration = createVector(0,0);
  this.mass = 1; map(random(10), 0, 10, 1, 80);
  this.circle = 1;
  this.deltaMass = 0;
  
  this.applyForce = function() {
    var thisLocation = this.position;
    var attracted = 0;
    this.deltaMass = 0;
    
    for (var i=0; i<planets.length; ++i) {
      var planet = planets[i];
      if (planet.mass == 0) {
        continue;  
      }
      if (planet.name == this.name) {
        continue;
      }
      

      if (planet.position.z != this.position.z) {
        continue;
      }

      var otherLocation = planet.position;
      var force = p5.Vector.sub(otherLocation, thisLocation);
      var distance = force.mag();
      force.normalize();
      var strength = 0.9 * (this.mass * planet.mass)/(distance*distance);
      
      var repel = distance < (sqrt(this.mass) + sqrt(planet.mass) + 20) && ((this.speed.mag() + planet.speed.mag()) > 8);
      var merge1 = (distance < (sqrt(this.mass) + sqrt(planet.mass) + 15)) && ((this.speed.mag() + planet.speed.mag()) > 15);
      var merge2 = distance < (sqrt(this.mass) + sqrt(planet.mass) + 8);//&& (this.speed.mag() + planet.speed.mag()) > 5;
      
      this.red = 0;
      this.green = 255;
      
      if (!(merge1 || merge2)) {
          
          
        if (repel) {
          //console.log("REPEL");
          force.mult(-1 * strength);
          
        } else {
          //console.log("ATTRACT");
          ++attracted;
          force.mult(strength);
        }
      }
      
      if (merge1) {
          console.log("MERGE");
          //this.circle += 0.01;
          force.mult(strength*1000);
          //this.acceleration.add(planet.acceleration);
                    /*
          if (this.mass > planet.mass) {
            this.deltaMass += planet.mass/2;
          } else {
            this.deltaMass -= this.mass/2;  
          }
          */
          
          /*
          this.mass += 0.2;  
          planet.mass -= 0.2;
          if (planet.mass < 0) {
             planet.mass = 0; 
          }
           if (this.mass > 30) {
             planet.mass = 30; 
          }
          */
      }
      if (merge2) {
          this.red = 255;
          this.green = 0;
          
          if (this.mass > planet.mass) {
            this.deltaMass += planet.mass/2;
          } else {
            this.deltaMass -= this.mass/2;  
          }
      }
        
      this.acceleration.add(force);
    }



    // no add drag force
    // formula = -1 * constant * v2 * v
    var dragStrength = -1 * 0.01 *  this.speed.mag() * this.speed.mag();
    //console.log("speed mag!", this.speed.mag());
    var dragForce = this.speed.copy().normalize().mult(dragStrength);
    //console.log("dragForce", dragForce);
    this.acceleration.add(dragForce);
    
    if (this.position.mag() >= maxR) {
      dragStrength = -1 * 0.35 *  this.speed.mag() * this.speed.mag();
      dragForce = this.speed.copy().normalize().mult(dragStrength);
      this.acceleration.add(dragForce);
    }
  }
  
  this.update = function() {
    this.speed.add(this.acceleration);
    this.speed.limit(11);
    var thisLocation = this.position;   
    thisLocation.add(this.speed);
    var newPolar = thisLocation;
    
    this.position = createVector(newPolar.x, newPolar.y, this.position.z);
    this.acceleration.mult(0);
    this.mass += this.deltaMass;
    if (this.mass < 0) {
       this.mass = 0; 
    }
    
    /*
    this.red = 0;
    this.green = 255;
    if (this.mass < 2) {
      this.red = 255;
      this.green = 0;
    }
    */
    
    if (this.position.mag() >= maxR) {
      //var temp = ConvertFromCartToPolar(this.position);
      //var temp2 = createVector(maxR, (temp.y + 180)%360);
      
      //this.position = ConvertFromPolarToCart(temp2);
      //this.speed.mult(-1);
      /*
      if (this.position.z == -1) {
        this.position.z = 1; 
      } else {
        this.position.z = -1;
      }*/
    } 
    
    //if (this.position.mag() >= 1.5* maxR) {
    //  this.position.x = 0;
    //  this.position.y = 0;
    //}
  }

  this.show = function() {
    var cart = this.position;
    //var x = this.position.x * cos(this.position.y);
    //var y = this.position.x * sin(this.position.y);

    strokeWeight(this.position.z == 1 ? 1 : 0.3);
    //fill(this.red, this.green, 0, this.position.z == 1 ? 255 : 20);
    fill(this.red, this.green, 0);
    //fill(0, 255, 0);
    ellipse(cart.x, cart.y, sqrt(this.mass), sqrt(this.mass));
    
    //console.log(cart.x, cart.y);
  }
}

function setup() {
  angleMode(DEGREES);
  createCanvas(1100, 1100);
  for(qq=0;qq<numberOfParticles;++q) {
    console.log("Planet", qq);
    planets.push(new Planet(qq));
    ++qq;
  }
}

function draw() {
  background(230,250,220, 255);
  translate(400, 300);


  strokeWeight(0);
  fill(255, 255, 255);
  ellipse(0, 0, 2*maxR, 2*maxR);

  for (var i=0; i<planets.length; ++i) {
    if (planets[i].mass == 0) {
      continue;  
    }
    planets[i].applyForce();
  }

  for (var j=0; j<planets.length; ++j) {
    if (planets[j].mass == 0) {
      continue;  
    }
    planets[j].update();
    planets[j].show();
  }
}
