let pos = -1000;
let run = false;
let column = 20;
let white = 4;

function preload() {
  img = loadImage('Spinning_cube_moving_optical_illusion.jpg');
}

function setup() {
  createCanvas(1000, 1000);
}

function mouseClicked() {
  run = !run;
}

function draw() {
  background(256);
  image(img, 0, 0);
  fill(0);
  for (var x=0; x< 50; ++x) {
    rect(pos+(x*(column+white)), 0, column, height);
  }
  
  if (run) {
    pos++;
  }
}
