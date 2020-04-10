let planet;

function setup() {
  createCanvas(500, 500);
  planet = new Planet();
}


function draw() {
  background(10,10,10);
  planet.update();
  planet.display();
}
