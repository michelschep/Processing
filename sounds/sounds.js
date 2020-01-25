let mic;
let record = 0;
let bolletje = 0;
let anderBolletje;
let gravity = 0.5;
let particles = [];
let song;
let position = 0;

function Particle(x, y) {
  this.x = x;
  this.y = y;
  this.yspeed = 1;
  
  this.update = function() {
     this.y += this.yspeed;
     this.yspeed += gravity;
     
     if (this.y > height) {
        this.y = height;
        this.yspeed *= -0.9;
        song.play();
     }
  };
  
  this.show = function() {
      stroke(255, 0, 0);
      ellipse(this.x, this.y, 10, 10);
//      point();
  };
}

function mouseClicked() {
  var anderBolletje = new Particle(mouseX, mouseY);
  particles.push(anderBolletje);
}

function setup() {
  createCanvas(600, 600);
  mic = new p5.AudioIn();
  mic.start();
  song = loadSound('fart.wav');
}

function draw() {
  background(0);
  
  for (var x =0; x< particles.length; ++x) {
    particles[x].update();
    particles[x].show();
  }
  
  micLevel = mic.getLevel()/50;

  //if (micLevel > 0.06) {
    //console.log('OMHOOG');
    //bolletje += micLevel;
  //} else if (micLevel > 0.05)  {
    //console.log('OMLAAG');
    //bolletje -= micLevel;
  //}
  
    //console.log(micLevel, record);

  if (micLevel > record) {
    record = micLevel;
  }
  
  position += micLevel;
  
  stroke(255, 0, 0);
  line(0, constrain(height-record*height, 0, height), width, constrain(height-record*height, 0, height));
  
  fill(255, 0, 0);
  ellipse(width/2, constrain(height-position*height, 0, height), 50, 50);
}
