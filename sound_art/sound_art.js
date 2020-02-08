let xoff = 0;
let yoff = 1000000;
let x = 1024 / 2;
let y = 1024 / 2;
let nn = 0;
let cn = 0;

function setup() {
  createCanvas(1024, 1024);
  background(100, 100, 100);
  mic = new p5.AudioIn();
  mic.start();
}


function draw() {
  micLevel = mic.getLevel();
  if (micLevel == 0)
    return;

  var r = map(micLevel, 0, 0.8, 5, 100);
  if (r > 100) {
    r = 100;
  }

  var n = noise(xoff);

  nn += micLevel;
  cn += 1;
  var avg = nn / cn;
  console.log("AVG", avg, micLevel);

  xoff += 0.01;
  var d1 = map(n, 0, 1, -0.9, 0.9);
  x += (d1);

  n = noise(yoff);
  yoff += 0.01;
  var d2 = map(n, 0, 1, -0.9, 0.9);
  y += (d2);

  //console.log(d1, d2);

  if (x < 0) {
    xoff += 10;
    x = 0;
  }
  if (x > width) {
    xoff += 10;
    x = width;
  }
  if (y < 0) {
    yoff += 10;
    y = 0;
  }
  if (y > height) {
    yoff += 10;
    y = height;
  }


  var C = map(micLevel, 0, 0.0001, 0, 256 * 256 * 256);


  var B = C % 256;
  var G = ((C - B) / 256) % 256;
  var R = ((C - B) / 256 * 256) - G / 256;

  stroke(R, G, B);
  ellipse(x, y, r, r);
  
  saveFrames('out', 'png', 1, 25);
}
