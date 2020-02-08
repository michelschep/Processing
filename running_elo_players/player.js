function Player(name, elo, pos) {
  this.name = name;
  
  this.position = createVector(10, 20+ pos*110);
  this.velocidad = [];
  this.xelo = random(1000);
  
  for(var d=0;d<=365;d++) {
    var delta = noise(this.xelo);
    this.xelo += 0.1;
    var date = new Date(2020, 1, 1);
    date.setDate(date.getDate() + d);
    elo += map(delta, 0, 1, -20, 20);
    this.velocidad[date.getDate()] = createVector(elo/(24*60),0);
  }
  
  this.update = function(date) {
    this.position.add(this.velocidad[date.getDate()]);
  }
  
  this.display = function(date) {
    //var size = map(this.velocidad[date.getDate()].mag(), 800, 1800, 20, 100);
    fill(255);
    ellipse(this.position.x, this.position.y, 100);
  }
}
