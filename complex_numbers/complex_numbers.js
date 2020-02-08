function setup() {
  createCanvas(1000, 1000); 
  reset();
}

function reset() {
  background(0);
  stroke(256);
  strokeWeight(1);
  translate(width/2, height/2);
  line(-500,0,500,0);
  line(0, -500, 0,500); 

}

function draw() {
 
}

function mouseClicked() {
  reset();
  fill(255, 0, 0);
  //ellipse(mouseX, mouseY, 10, 10);
  
  var mv = createVector(mouseX, mouseY).add(-500, -500);
  ellipse(mv.x, mv.y);
  var angle = mv.heading();//atan(mv.y/mv.x);
  
  textSize(32);
  text("Angle: " + angle, 10, 30);
  text("Pos: (" + mv.x + "," + mv.y + ")", 10, 50); 
  var mag = mv.mag();
}
