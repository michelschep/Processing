function Planet() {
  this.location = createVector(width/2, 0);
  this.speed = createVector(0, 0.05);
  this.acceleration = createVector(0, 0.04);
  
  this.update = function(liquid) {
    var currentSpeed = this.speed.copy();
    
    // apply forces   
    this.speed.add(this.acceleration);
    
    // apply drag force
    if (this.location.y > liquid.position.y) {
      var speed = currentSpeed.mag();
      var C = 0.28;
      var dragForce = currentSpeed.normalize().mult(-1 * speed * speed * C);
      this.speed.add(dragForce);
    }
    
    // apply speed
    this.location.add(this.speed);  
  };
  
  this.display = function() {
    fill(0,255,0);
    ellipse(this.location.x, this.location.y, 20, 20);  
    //line(this.location.x, this.location.y, this.location.x, this.location.y + 20);
  };
}
