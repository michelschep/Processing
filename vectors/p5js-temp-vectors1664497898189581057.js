let sphere;
let speed;
let gravity;

function setup() {
  createCanvas(800, 800);
  sphere = createVector(20, 20);
  speed = createVector(3, 3);
  gravity = createVector(0, 0.1);
}


function draw() {
  background(0);
  speed = p5.Vector.add(speed, gravity);
  sphere = p5.Vector.add(sphere, speed);
  
  ellipse(sphere.x, sphere.y, 10, 10);    
}
