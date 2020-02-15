var w = 1000;
var h = 1000;
function setup() {
  background(0);
  createCanvas(1000, 1000);

  push();
  strokeWeight(0.3);
  translate(500, 500);
  beginShape();
  for(var x=-1.8 ;x<=1.8; x+=0.01) {
    var y = x * x;
    var px = map(x, -2, 2, -250, 250);
    var py = map(y, 0, 4, 0, -500);
    vertex(px,py);
  }
  endShape();
  for(x=-1.8 ;x<=1.8; x+=0.1) {
    var y = x * x;
    var px = map(x, -2, 2, -250, 250);
    var py = map(y, 0, 4, 0, -500);
    fill(255,0,0);
    ellipse(px, py, 4);
  }
  pop();
  strokeWeight(0.04);
  line(w/2, 0, w/2, h);
  line(0, h/2, w, h/2);
}


function draw() {
  
  
}
