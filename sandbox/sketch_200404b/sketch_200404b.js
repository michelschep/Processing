let p;
let font;
let attractors = [];
let started = false;
let volume = 0;
let x = 0;
let y = 0;
function preload() {
  font = loadFont('assets/inconsolata.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  p = p5.Vector.random2D().mult(100);  
   background(200, 155, 55);
   
   fetch('https://localhost:44336/weatherforecast').then(response => {
    console.log('RESPONSE', response);
  });
}

function draw() {  
  var points = font.textToPoints('Chapi', 10, 80, 100);
  for (x=0;x<points.length; ++x) {
     fill(255);
     point(points[x].x, points[x].y);
  }
  points = font.textToPoints('XXX', 10, 170, 100);
  for (x=0;x<points.length; ++x) {
     fill(255);
     point(points[x].x, points[x].y);
  }
  
  if (mouseIsPressed) {
    if (started) {
      volume += 1;      
    } else {
      started = true;
      volume = 1;
      x = mouseX;
      y = mouseY;
      console.log(x,y);
    }
    
    ellipse(x, y, volume, volume);
  } else {
    if (started) {
      started = false;
    }
  }
  
  
  
  //noFill();
  //translate(windowWidth/2, windowHeight/2);
  //translate(p5.Vector.fromAngle(millis() / 1000, 40));
  //strokeWeight(4);
  //stroke(101, 10, 100);
  //ellipse(p.x, p.y, 20);
  
  
}
