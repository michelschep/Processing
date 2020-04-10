let planet;

function setup() {
  createCanvas(800, 800);
  planet = new Planet();
}


function draw() {
  background(10,10,10);
  planet.update();
  planet.display();
}
