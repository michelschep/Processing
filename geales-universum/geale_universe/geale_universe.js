var maxR = 200;
var planets = [];
var numberOfParticles = 200;
var qq = 0;
var born = 0;
var dead = 0;

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
  this.speed = ConvertFromPolarToCart(createVector(random(0, 1), random(360)));
  this.acceleration = createVector(0, 0);

  this.name = name;
  this.age = (-1 * 9 * 24);
  this.xoff = random(0, 100000);
  this.yoff = random(0, 100000);
  this.alive = "null";
  this.numberOfChildren = 0;


  this.applyForce = function() {
    //console.log(this.age);
    if (this.alive == "dead") {
      return;
    }

    this.age += 1;

    if (this.age > 0) {
      this.alive = "alive";
    } else {
      return;
    }

    var thisLocation = this.position;

    if (random() > 0.9995) {
      this.alive = "dead";
      ++dead;
      return;
    }

    if (this.alive == "alive") {
      if (this.position.mag() >= 0.9 * maxR) {
        dragStrength = -1 *  this.speed.mag() * this.speed.mag();   
        dragForce = this.speed.copy().normalize().mult(dragStrength);     
        this.acceleration.add(dragForce);
      } else {
        this.xoff += 0.001;
        this.yoff += 0.001;
        var deltax = map(noise(this.xoff), 0, 1, -1, 1);
        var deltay = map(noise(this.yoff), 0, 1, -1, 1);
        this.acceleration.add(createVector(deltax, deltay));
      }
 
      for (var i=0; i<planets.length; ++i) {
        var planet = planets[i];
        if (planet.name == this.name || planet.alive != "alive") {
          continue;
        }

        var otherLocation = planet.position;
        var force = p5.Vector.sub(otherLocation, thisLocation);
        var distance = force.mag();

        if (distance < 1 && (random(1) > 0.90)) {
          var newKid = new Planet(++qq);
          newKid.position = this.position.copy().add(createVector(1, 1));
          planets.push(newKid);  
          this.numberOfChildren += 1;
          planet.numberOfChildren += 1;
          ++born;
          break;
        }
      }

      if (this.numberOfChildren >= 3) {
        this.alive = "dead";
        ++dead;
      }
    }
  }


  this.update = function() {
    if (this.alive != "alive") {
      return;
    }

    this.speed.add(this.acceleration).limit(0.2);
    this.position.add(this.speed);
    this.acceleration.mult(0);
  };

  this.show = function() {

    switch (this.alive) {
    case "null":
      fill(0, 100, 0, 20);
      ellipse(this.position.x, this.position.y, 2, 2);
      break;
    case "alive":
      fill(100, 0, 0);
      ellipse(this.position.x, this.position.y, 3, 3);
      break;
    case "dead":
      fill(0, 0, 0, 20);
      ellipse(this.position.x, this.position.y, 1, 1);

      break;
    }
  };
}

function setup() {
  angleMode(DEGREES);
  createCanvas(1100, 1100);
  for (qq=0; qq<numberOfParticles; ++qq) {
    //console.log("CREATE");
    planets.push(new Planet(qq));
    ++qq;
  }
}

function draw() {
  background(230, 250, 220, 255);
  translate(400, 200);

  scale(1);
  strokeWeight(0);
  fill(255, 255, 225);
  ellipse(0, 0, 2*maxR, 2*maxR);

  var numberAlive = 0;

  for (var i=0; i<planets.length; ++i) {
    if (planets[i].alive == "alive") {
      numberAlive += 1;
    }
    planets[i].applyForce();
  }

  for (var j=0; j<planets.length; ++j) {

    planets[j].update();
    planets[j].show();
  }

  console.log("BORN", born);
  console.log("DEATH", dead);
  console.log("ALIVE", numberAlive);
  console.log("BIRTH DEATH RATIO", 100* born/dead);
}
