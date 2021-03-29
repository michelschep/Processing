let bar;

function Bar(x, y, a) {
  this.position = createVector(x, y);
  this.angle = a;
  this.angleVelocity = 1;
  this.r = 30;

  this.show = function() {
    push();
    fill(0);
    strokeWeight(0.5);
    translate(this.position.x, this.position.y);
    
    ellipse(0, 0, 5, 5);  
    rotate(this.angle);
    line(-this.r, 0, this.r, 0)
    fill(0, 255, 0);
    ellipse(-this.r, 0, 5, 5);  
    fill(255, 0, 0);
    ellipse(this.r, 0, 5, 5);  
    pop();
  }

  this.update = function() {
    //this.angle += this.angleVelocity;
  }
}

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  bar1 = new Bar(100, 100, -65);
  bar2 = new Bar(160, 180, 5);
}

function draw() {
  background(220);
  
  bar1.update();
  bar2.update();
  bar1.show();
  bar2.show();

  push();
  stroke(1);
  strokeWeight(0.1);
  //line(bar1.position.x, bar1.position.y, bar2.position.x, bar2.position.y);

  var southDelta = createVector(bar1.r * cos(bar1.angle), bar1.r * sin(bar1.angle));
  var south = p5.Vector.add(bar1.position, southDelta);
  //ellipse(south.x, south.y, 10, 10);

  var southDelta2 = createVector(bar2.r * cos(bar2.angle), bar2.r * sin(bar2.angle));
  var south2 = p5.Vector.add(bar2.position, southDelta2);
  //ellipse(south.x, south.y, 10, 10);
  //console.log(south, south2);
  //line(south.x, south.y, south2.x, south2.y);

  var diff = p5.Vector.sub(south, south2).normalize().mult(30);
  var diff2 = p5.Vector.add(south, diff);
  line(south.x, south.y, diff2.x, diff2.y);

  console.log(southDelta.heading());

  //line(bar1.position.x, bar1.position.y, bar2.position.x, bar2.position.y);

  

  pop();
}
