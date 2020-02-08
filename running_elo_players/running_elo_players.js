let startDate;

function setup() {
  startDate = new Date(2020, 1, 1, 0, 0, 0);
  createCanvas(2000, 1000);
  players = [];
  players.push(new Player("name1", 1300, 1));
  players.push(new Player("name2", 1310, 2));
  players.push(new Player("name3", 1210, 3));
  players.push(new Player("name4", 1410, 4));
   players.push(new Player("name5", 1010, 5));
   players.push(new Player("name5", 1810, 6));
}


function draw() {
  startDate.setHours(startDate.getHours() + 1);
  background(0);
  //var columnSize = width/12;
  //for (var month = 1; month <= 12; ++month) {
  //  stroke(0, 0, 255);
  //  strokeWeight(1);
  //  line(month*columnSize, 0, month*columnSize, height);
  //}
  fill(0, 102, 153);
  textSize(32);
  text(startDate, 10, 80);
  
  for (var x=0; x<players.length; ++x) {
     players[x].update(startDate);
     players[x].display();
  }
}
