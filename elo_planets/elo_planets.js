let eloPlanets = [];
let games = [];
let G = 1;
let j;

function Game(p1, p2, s1, s2) {
  this.p1 = p1;
  this.p2 = p2;
  this.s1 = s1;
  this.s2 = s2;
}

function EloPlanet(name, elo, numberOfGames) {
  this.name = name;
  this.elo = elo;  
  this.numberOfGames = numberOfGames;
  this.position = createVector(width/2+map(random(1), 0, 1, -800, 800), height/2+map(random(1), 0, 1, -800, 800));
  //this.position = createVector(width/2, height/2);
  this.speed = createVector(0, 0);
  this.speedNext = createVector(0, 0);
  this.acceleration = createVector(0, 0);

  this.update = function(gms) {
    //console.log(gms);
    for (var y=0; y< gms.length; ++y) {
      var theOther = gms[y].p2;
      var thisPlayer = gms[y].p1;
      var forceDirection = p5.Vector.sub(theOther.position, thisPlayer.position);
      var magnitude = forceDirection.mag();
      var distance = magnitude;

      forceDirection.normalize();
      
      //var strength = (1-(gms[y].s1/(gms[y].s1+gms[y].s2)))*(G * (gms[y].s1+gms[y].s2))/ (distance * distance);
      var strength = (1-(gms[y].s1/(gms[y].s1+gms[y].s2)))*(G * 10000)/ (distance * distance);

      forceDirection.mult(strength);

      var r1 = map(this.elo, 700, 1900, 10, 200);
      var r2 = map(theOther.elo, 700, 1900, 10, 200);
      var r3 = r1 + r2;

      if (distance < r3) {
        //var strength2 = forceDirection.copy().mult(100/r3);
        //console.log("BOEM!!!");
        if (this.s2 > this.s1) {
          this.acceleration.add(forceDirection.copy().normalize().mult(-0.1));
        }
        //this.acceleration.add(this.speed.copy().mult(-1));
        continue;
      }

      this.acceleration.add(forceDirection);
    }

    var centerForce = p5.Vector.sub(createVector(width/2, height/2), this.position); 
    centerForce.normalize().mult(0.001);
    this.acceleration.add(centerForce);
    //this.acceleration.add(createVector(0.00001, 0));
  };

  this.show = function() {
    this.speed.add(this.acceleration);
    //console.log(this.name, this.speed.mag());
    if (this.speed.mag() > 0.88) {
      this.speed.normalize().mult(0.88);  
    }
    
    this.position.add(this.speed);
    
    this.acceleration.mult(0);
    //this.speed.mult(0);

    var r = map(this.elo, 700, 1900, 10, 200);

    fill(255, 0, 0, 100);
    ellipse(this.position.x, this.position.y, r);
    fill(0);
    textSize(20);
    textAlign(CENTER, CENTER);
    text(this.name, this.position.x, this.position.y);
  };
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  var m = new EloPlanet("MS", 1473, 20);
  var g = new EloPlanet("GS", 1327, 30);
  j = new EloPlanet("JF", 1727, 30);

  var i = new EloPlanet("IS", 1358, 30);
  var e = new EloPlanet("EV", 1086, 30);
  var h = new EloPlanet("HO", 1671, 30);
  var t = new EloPlanet("TB", 1060, 30);

  eloPlanets.push(m);
  eloPlanets.push(g);
  eloPlanets.push(j);
  eloPlanets.push(i);
  eloPlanets.push(e);
  eloPlanets.push(h);
  eloPlanets.push(t);

  games.push(new Game(m, g, 50, 29));
  games.push(new Game(g, m, 29, 50));

  games.push(new Game(m, j, 0, 9));
  games.push(new Game(j, m, 9, 0));

  games.push(new Game(j, g, 33, 0));
  games.push(new Game(g, j, 0, 33));

  games.push(new Game(i, e, 31, 1));
  games.push(new Game(e, i, 1, 31));

  games.push(new Game(i, m, 0, 3));
  games.push(new Game(m, i, 3, 0));

  games.push(new Game(i, g, 0, 3));
  games.push(new Game(g, i, 3, 0));

  games.push(new Game(h, j, 5, 13));
  games.push(new Game(j, h, 13, 5));

  games.push(new Game(h, g, 15, 0));
  games.push(new Game(g, h, 0, 15));

  games.push(new Game(h, m, 8, 1));
  games.push(new Game(m, h, 1, 8));
  
  games.push(new Game(t, g, 1, 26));
  games.push(new Game(g, t, 26, 1));
  
  games.push(new Game(t, m, 0, 5));
  games.push(new Game(m, t, 5, 0));
}

function draw() {
  background(0);
  for (var x=0; x< eloPlanets.length; ++x) {
    var list = findGames(eloPlanets[x].name);
    eloPlanets[x].update(list);
  }

  //translate(j.position.x/2, j.position.y/2);

  for (var y=0; y< eloPlanets.length; ++y) {
    eloPlanets[y].show();
  }
}

function findGames(name) {
  var result = [];
  for (var x=0; x<games.length; ++x) {
    //console.log(games[x]);
    if (games[x].p1.name == name) {
      result.push(games[x]);
    }
  }
  return result;
}
