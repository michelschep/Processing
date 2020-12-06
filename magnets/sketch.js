var y = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  fill(255);
  ellipse(100, y++, 5);

  if (y > 400) y = 0;
}
