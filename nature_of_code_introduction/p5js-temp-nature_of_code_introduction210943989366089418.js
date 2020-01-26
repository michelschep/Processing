let xoff = 0.0;
let yoff = 1000.0;
let coff1 = 0;
let coff2 = 1000;
let coff3 = 5000;

let x = 250;
let y = 250;

let c1 = 255;
let c2 = 255;
let c3 = 255;

function setup() {
  createCanvas(500, 500);
  background(204);
}


function draw() {
  xoff = xoff + 0.01;
  x += map(noise(xoff), 0, 1, -1, 1);
  
  yoff = yoff + 0.01;
  y += map(noise(yoff), 0, 1, -1, 1);

  coff1 = coff1 + 0.01;
  c1 += map(noise(coff1), 0, 1, -1, 1);
  coff2 = coff2 + 0.01;
  c2 += map(noise(coff2), 0, 1, -1, 1);
coff3 = coff3 + 0.01;
  c3 += map(noise(coff3), 0, 1, -1, 1);

  if (c1< 0)
    c1 = 0;
  if (c1> 255)
    c1 = 255;
if (c2< 0)
    c2 = 0;
  if (c2> 255)
    c2 = 255;
if (c3< 0)
    c3 = 0;
  if (c3> 255)
    c3 = 255;


  if (x< 0)
    x = 0;
  if (x> width)
    x = width;
    if (y< 0)
    y = 0;
  if (y> height)
    y = height;
 
    noStroke();
    fill(c1, c2, c3);
    ellipse(x, y, 5, 5);
}
