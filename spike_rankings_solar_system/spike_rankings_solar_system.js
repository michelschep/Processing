let players;
let backhole;

let Player = function (position, mass) {
  this.position = position;
  this.mass = mass;
  this.velocity = createVector(0, 0.01);
  this.acceleration = createVector(0, 0);

  this.applyForce = function (force) {
    this.acceleration.add(force);
  }

  this.update = function () {
    if (mass == 3001)
      return;
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  this.draw = function () {
    var c = map(this.mass, 0, 3000, 256, 0);
    var r = map(this.mass, 0, 3000, 3, 100);
    fill(c, c, c);
    ellipse(this.position.x, this.position.y, r, r);
  }
};


function preload() {
  //let url = 'file:///C:/data/github/Processing/spikes/spike_rankings_solar_system/players.json';
  //players = loadJSON(url);

  blackhole = new Player(createVector(400, 400), 3001);
  //players = {list: [ { name: "Michel"}, { name: "Geale"} ]};
  //players = [ new Player(createVector(random(width), random(height)))];
  players = [
    blackhole,
    new Player(createVector(100, 100), 3000),
    new Player(createVector(130, 130), 200),
    new Player(createVector(132, 132), 2),
    new Player(createVector(140, 130), 5),
    new Player(createVector(700, 700), 200),
    new Player(createVector(700, 100), 200),
    new Player(createVector(100, 700), 200),
    new Player(createVector(200, 10), 10),
    new Player(createVector(280, 10), 500),
    new Player(createVector(50, 400), 10)
  ];
}

function setup() {
  createCanvas(800, 800);
  background(100);
}

function draw() {
  var G = 0.00010;
  background(100);
//  translate(blackhole.position.x / 2, blackhole.position.y / 2);

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
      //console.log(forceDirection);
    }

    players[index].update();
    players[index].draw();
  }
}