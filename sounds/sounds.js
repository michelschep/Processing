let mic;
let fft;
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
        this.yspeed *= -0.5;
        //song.play();
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

  fft = new p5.FFT();
  fft.setInput(mic);
}

function draw() {
  let spectrum = fft.analyze();
  console.log('drwa');
  var rgb = [0, 0, 0];
  var index = 0;
  for (let i = 0; i < spectrum.length; i++) {
    var q = map(spectrum[i], 0, 255, 0, 255);
    if (q>0) {
      rgb[index%3] = (rgb[index%3] < q) ? q : rgb[index%3];
      ++index;
    }
  }

  background(rgb[0], rgb[1], rgb[2]);
  
/*
  noStroke();
  fill(255, 0, 255);
  for (let i = 0; i< spectrum.length; i++){
    let x = map(i, 0, spectrum.length, 0, width);
    let h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width / spectrum.length, h )
  }
*/

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
