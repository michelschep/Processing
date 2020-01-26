let Player = function(position) {
  this.position = position;
  this.mass = 10;
  this.velocity = createVector(0.03, 0.1);

  this.update = function() {
    this.position.add(this.velocity); 
  }

  this.draw = function() {
       fill(255, 0, 0);
       ellipse(this.position.x, this.position.y, this.mass, this.mass);
  }
};


let players;

function preload() {
  //let url = 'file:///C:/data/github/Processing/spikes/spike_rankings_solar_system/players.json';
  //players = loadJSON(url);

  //players = {list: [ { name: "Michel"}, { name: "Geale"} ]};
  //players = [ new Player(createVector(random(width), random(height)))];
  var player1 = new Player(createVector(100, 100));
  player1.mass = 50;

  var player2 = new Player(createVector(200, 200));
  player2.mass = 30;

  players = [ player1, player2 ];
}

function setup() {
    createCanvas(601, 600);
    background(100);
}

function draw() {
   background(100);
   for (var index=0; index<players.length; ++index) {
       console.log(players[index].position);
       players[index].update();
       players[index].draw();
   } 
}
