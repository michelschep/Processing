function Planet() {
  this.location = createVector(width/2, 0);
  this.speed = createVector(0, 0.1);
  
  this.update = function() {
    this.location.add(this.speed);  
  }
  
  this.display = function() {
    ellipse(this.location.x, this.location.y, 10, 10);  
  }
}
