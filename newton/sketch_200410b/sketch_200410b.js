let planet;
let liquid;

function setup() {
  createCanvas(800, 800);
  planet = new Planet();
  liquid = new Liquid();
}

function draw() {
  background(10,10,10);
  planet.update(liquid);
  planet.display();
  liquid.display();
}
