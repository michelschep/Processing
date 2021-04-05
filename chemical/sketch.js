// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for this video: https://youtu.be/BV9ny785UNc

// Written entirely based on
// http://www.karlsims.com/rd.html

// Also, for reference
// http://hg.postspectacular.com/toxiclibs/src/44d9932dbc9f9c69a170643e2d459f449562b750/src.sim/toxi/sim/grayscott/GrayScott.java?at=default

var grid;
var next;
let interA;

var dA = 1;
var dB = 0.5;
var feed = 0.055;
var k = 0.062;

function setup() {
  createCanvas(300, 300);
  pixelDensity(1);
  grid = [];
  next = [];
  for (var x = 0; x < width; x++) {
    grid[x] = [];
    next[x] = [];
    for (var y = 0; y < height; y++) {
      grid[x][y] = {
        a: 1,//random(0,5),
        b: 0,//random(0,0.09)
      };
      next[x][y] = {
        a: 1,//random(0,5),
        b: 0,//random(0, 1)/6
      };
    }
  }

  var block = 5;
  for (u = 1; u < 2; u++) {
    var x1 = 150;//floor(random(50, width-50));
    var y1 = 150;//floor(random(50, height-50));
    for (var i = x1; i < x1 + block; i++) {
      for (var j = y1; j < y1 + block; j++) {
        grid[i][j].b = 1;random(0.1);
      }
    }
  }
  }
 let live = 1;
function draw() {
  background(51);

  
 dA = 0.2597;
 dB = 0.1050;
 feed = 0.09;
 k = 0.058;

 dA = 0.2597;
 dB = 0.1050;
 feed = 0.014;
 k = 0.045;


 dA = 0.2597;
 dB = 0.1050;
 feed = 0.0020;
 k = 0.0330;

 





 // zwart en wat witte stippen
 dA = 0.2097;
 dB = 0.1050;
 feed = 0.0620;
 k = 0.0610;

// spots
  dA = 1;
  dB = 0.5;
  feed = 0.0367;
  k = 0.0649;

 

// doolhof
dA = 0.2097;
dB = 0.1050;
feed = 0.0540;
k = 0.0620;

 

 dA = 0.2097;
 dB = 0.1050;
 feed = 0.0053;
 k = 0.0450;

 
 dA = 0.2097;
 dB = 0.1050;
 feed = 0.0620;
 k = 0.0609;

 dA = 1;
 dB = 0.5;
 feed = 0.0620;
 k = 0.0609;

 // moving waves
 dA = 1;
 dB = 0.65;
 feed = 0.0118;
 k = 0.0475;

  // kikkerdril
dA = 0.2097;
dB = 0.1050;
feed = 0.014;
k = 0.053;

  for (var x = 1; x < width - 1; x++) {
    for (var y = 1; y < height - 1; y++) {
      //dA = (0.2097) + (0.0002)*((x+y)/(width+height));
      //dB = (0.1050) + (0.0002)*((x+y)/(width+height))
      //feed = (0.0540) + (0.0002)*((x+y)/(width+height));
      //k = 0.0620 + (0.0002)*((x+y)/(width+height));
  
    
      var a = grid[x][y].a;
      var b = grid[x][y].b;
      next[x][y].a = a + (dA * laplaceA(x, y) - a * b * b + feed * (1 - a)) * 1;
      next[x][y].b = b + (dB * laplaceB(x, y) + a * b * b - (k + feed) * b) * 1;

      next[x][y].a = constrain(next[x][y].a, 0, 1);
      next[x][y].b = constrain(next[x][y].b, 0, 1);
    }
  }

  loadPixels();
  for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++) {
      var pix = (x + y * width) * 4;
      var a = next[x][y].a;
      var b = next[x][y].b;
      var c = floor((a - b) * 255);
      //var c = map((a-b)*255, -255, 255, 0, 255);

      if (b<= 0.5 && a>= 0.5) {
        interA = lerpColor(color(0, 0, 0), color(255, 0, 0), 1-a);
        //if (b == 0)
        //    interA = color(0,0,0);
      } else {
        interA = lerpColor(color(0, 0, 0), color(255, 0, 0), b);
      }
      //let interB = lerpColor(from, to, 0.66);

      c = constrain(c, 0, 255);
      pixels[pix + 0] = interA.levels[0];
      pixels[pix + 1] = interA.levels[1];
      pixels[pix + 2] = interA.levels[2];
      pixels[pix + 3] = (1-b)*255;//(a-b)*255;

      if (floor(a-b) != 1) {
        //console.log('YEAH',floor(a-b)*255);
      }
      
      let l = lerpColor(color(255,0,0), color(0,0,255), map(floor((a-b)), -1, 1, 0, 1));

      //pixels[pix + 0] = l.r;
      //pixels[pix + 1] = l.g;
      //pixels[pix + 2] = l.b;
      //pixels[pix + 3] = 255;
      
    }
  }
  updatePixels();

  swap();

  //for (var i = 250; i < 250+200; i++) {
  //  for (var j = 250; j < 250+200; j++) {
  //    grid[i][j].b = 1;
  //  }
  //s}
}

function laplaceA(x, y) {
  var sumA = 0;
  sumA += grid[x][y].a * -1;
  sumA += grid[x - 1][y].a * 0.2;
  sumA += grid[x + 1][y].a * 0.2;
  sumA += grid[x][y + 1].a * 0.2;
  sumA += grid[x][y - 1].a * 0.2;
  sumA += grid[x - 1][y - 1].a * 0.05;
  sumA += grid[x + 1][y - 1].a * 0.05;
  sumA += grid[x + 1][y + 1].a * 0.05;
  sumA += grid[x - 1][y + 1].a * 0.05;
  return sumA;
}

function laplaceB(x, y) {
  var sumB = 0;
  sumB += grid[x][y].b * -1;
  sumB += grid[x - 1][y].b * 0.2;
  sumB += grid[x + 1][y].b * 0.2;
  sumB += grid[x][y + 1].b * 0.2;
  sumB += grid[x][y - 1].b * 0.2;
  sumB += grid[x - 1][y - 1].b * 0.05;
  sumB += grid[x + 1][y - 1].b * 0.05;
  sumB += grid[x + 1][y + 1].b * 0.05;
  sumB += grid[x - 1][y + 1].b * 0.05;
  return sumB;
}

function swap() {
  var temp = grid;
  grid = next;
  next = temp;
}