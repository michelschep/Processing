function Planet() {
  this.location = createVector(width/2, 0);
  this.speed = createVector(0, 0.05);
  this.acceleration = createVector(0, 0.03);
  
  this.update = function() {
    this.speed.add(this.acceleration);
    this.location.add(this.speed);  
  }
  
  this.display = function() {
    ellipse(this.location.x, this.location.y, 10, 10);  
  }
}
