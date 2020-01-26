let xoff = 0;
let yoff = 1000;
let x = 400;
let y = 400;

function setup() {
  createCanvas(800, 800);
  background(100, 100, 100);
  mic = new p5.AudioIn();
  mic.start();
}


function draw() { 
  var n = noise(xoff);
  xoff += 0.01;
  x += map(n, 0, 1, -1, 1);
  
  n = noise(yoff);
  yoff += 0.01;
  y += map(n, 0, 1, -1, 1);
 
  if (x<0)
   x=0;
  if (x>width)
   x = width;
  if (y<0)
   y=0;
  if (y>height)
   x = height;
   
  //console.log(x);
  micLevel = mic.getLevel();
  console.log(micLevel);
  var C = map(micLevel, 0, 0.0001, 0, 256*256*256);
  
  var B = C % 256;
  var G = ((C-B)/256) % 256;
  var R = ((C-B)/256*256) - G/256;

  stroke(R, G, B);
  ellipse(x, y, 5, 5);
}
