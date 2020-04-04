let p;

function setup() {
  createCanvas(windowWidth, windowHeight);
  p = p5.Vector.random2D().mult(100);  
   background(200, 155, 55);
}


function draw() {
 
  
  //noFill();
  translate(windowWidth/2, windowHeight/2);
  translate(p5.Vector.fromAngle(millis() / 1000, 40));
  strokeWeight(4);
  stroke(101, 10, 100);
  ellipse(p.x, p.y, 20);
}
