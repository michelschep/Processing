let t = 0;
let spiral1;
let spiral2;
function setup() {
  createCanvas(800, 800);
  background(100, 100, 100);
  spiral1 = random(1);
   spiral2 = random(1);
  console.log(spiral1, spiral2);
}

function X(t, k, l) {
  return 150*((1 - k) * cos(t) + l * cos(t *(1-k)/k)); 
}
function Y(t, k, l) {
  return 150*((1 - k) * sin(t) - l * sin(t *(1-k)/k)); 
}

function draw() {
  ++t;
  translate(300, 300);
  
  x = X(t/100, spiral1, spiral2);
  y = Y(t/100, spiral1, spiral2);
  
  stroke(random(255), random(255), random(255));
  point(x, y);
  //ellipse(x, y, 1, 1);
}
