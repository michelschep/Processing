let mic;
let record = 0;

function setup() {
  createCanvas(800, 800);
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  background(0);
  micLevel = mic.getLevel();

  console.log(micLevel, record);

  if (micLevel > record) {
    record = micLevel;
  }
  
  stroke(255, 0, 0);
  line(0, constrain(height-record*height, 0, height), width, constrain(height-record*height, 0, height));
  
  fill(0, 255, 0);
  ellipse(width/2, constrain(height-micLevel*height, 0, height), 50, 50);
}
