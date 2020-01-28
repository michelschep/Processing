let players;
let backhole;
let slider;

let Player = function (position, mass) {
  this.position = position;
  this.mass = mass;
  this.velocity = createVector(0, 0.01);
  this.acceleration = createVector(0, 0);

  this.applyForce = function (force) {
    this.acceleration.add(force);
  }

  this.update = function () {
    if (mass == 500001)
      return;

    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    if (mass > 5000)
      console.log(mass, this.velocity.mag(), this.position.x, this.position.y);
  }

  this.draw = function () {
    var c = map(this.mass, 0, 500001, 256, 0);
    var r = map(this.mass, 0, 500001, 3, 250);
    fill(c, c, c, 100);
    ellipse(this.position.x, this.position.y, r, r);
  }
};


function preload() {
  blackhole = new Player(createVector(windowWidth/2, windowHeight/2), 500001);
  players = [
    blackhole,
    new Player(createVector(500, 500), 20000),
    new Player(createVector(500, 500), 10000),
    new Player(createVector(1000, 100), 2800),
    new Player(createVector(3000, 3000), 2400),
    new Player(createVector(1000, 2000), 2000),
    new Player(createVector(1000, 1000), 1500),
    new Player(createVector(1000, 500), 1200),
    new Player(createVector(130, 130), 1000),
    new Player(createVector(132, 132), 2),
    new Player(createVector(140, 130), 5),
    new Player(createVector(1000, 700), 800),
    new Player(createVector(900, 600), 680),
    new Player(createVector(800, 500), 560),
    new Player(createVector(700, 400), 340),
    new Player(createVector(600, 300), 220),
    new Player(createVector(500, 200), 100),
    new Player(createVector(400, 100), 80),
    new Player(createVector(700, 100), 200),
    new Player(createVector(100, 700), 200),
    new Player(createVector(200, 10), 10),
    new Player(createVector(280, 10), 500),
    new Player(createVector(50, 400), 10)
  ];
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(100);

  slider = createSlider(0, 1, 0.6, 0.001);
  slider.position(10, 10);
  slider.style('width', '500px');
}

function draw() {
  let val = slider.value();
  scale(val);
  console.log(val);
  var G = 0.00020;
  background(100);

  for (var index = 0; index < players.length; ++index) {

    var thisPlayer = players[index];

    for (var other = 0; other < players.length; ++other) {
      if (index == other)
        continue;
      var theOther = players[other];

      var forceDirection = p5.Vector.sub(theOther.position, thisPlayer.position);
      var magnitude = forceDirection.mag();
      if (magnitude < 100)
        continue;

      var distance = magnitude;
      forceDirection.normalize();
      var strength = (G * thisPlayer.mass * theOther.mass) / (distance * distance);
      forceDirection.mult(strength);

      thisPlayer.applyForce(forceDirection);
    }

    players[index].update();
    players[index].draw();
  }
}