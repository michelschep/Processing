
function setup() {

  createCanvas(1000, 1000);
background(0);

  fill(255, 255, 255);
  translate(500, 500);
  scale(1, -1);
  noStroke();
  for (var x=-40;x<40;++x) 
  for (var y=-40;y<40;++y) 
  {
    ellipse(x*10, y*10, 0.7);    
  }
}

function draw() {
  //background(220);
}
