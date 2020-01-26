let Player = function(position) {
  this.position = position;
  this.mass = 10;
};


let players;

function preload() {
  //let url = 'file:///C:/data/github/Processing/spikes/spike_rankings_solar_system/players.json';
  //players = loadJSON(url);

  //players = {list: [ { name: "Michel"}, { name: "Geale"} ]};
  //players = [ new Player(createVector(random(width), random(height)))];
  var player = new Player(createVector(100, 100));
  player.mass = 50;
  players = [ player ];
}

function setup() {
    createCanvas(601, 600);
    background(100);
}


function draw() {
   background(100);
   for (var index=0; index<players.length; ++index) {
       console.log(players[index].position);
       fill(255, 0, 0);
       var player = players[index];
       ellipse(player.position.x, player.position.y, player.mass, player.mass);
   } 
}
