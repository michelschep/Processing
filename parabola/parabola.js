var w = 1000;
var h = 1000;
function setup() {
  background(0);
  createCanvas(1000, 1000, WEBGL);
  strokeWeight(2);
  
  line(w/2, 0, w/2, h);
  line(0, h/2, w, h/2);
  
  push();
  translate(500, 500);
  //rotateY(-1);
  ellipse(20, 20, 5, 5);
  pop();
  
}


function draw() {
  
  
}
