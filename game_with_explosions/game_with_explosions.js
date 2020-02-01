let particle;
let mic;

function Particle(x, y) {
  this.x =x;
  this.y = y;
  this.exploded = false;

  this.update = function(noise) {

    if (!this.exploded) {
      var n = map(noise, 0, 1, 0, 1000);
      console.log(n);
      if (n < 10) {
        fill(0, 255, 0);
        ellipse(this.x, this.y, 10, 10);
        this.y -= 0.1;
      } else {
        this.exploded = true;
      }
    } 

    if (this.exploded) {
      fill(255, 0, 0);
      ellipse(this.x-5, this.y-5, 5, 5);
      ellipse(this.x+5, this.y-5, 5, 5);
      ellipse(this.x-5, this.y+5, 5, 5);
      ellipse(this.x+5, this.y+5, 5, 5);
    }
  }
}

function setup() {
  createCanvas(800, 600);
  mic = new p5.AudioIn();
  mic.start();
  particle = new Particle(width/2, height-20);
}

function draw() {
  background(0, 0, 0);
  particle.update(mic.getLevel());
}
