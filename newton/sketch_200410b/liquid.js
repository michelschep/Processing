function Liquid() {
  this.position = createVector(0, 600);
  this.width = 800;
  this.height = 200;
  
  this.display = function() {
     fill(100,10, 10, 90);
     rect(this.position.x, this.position.y, this.width, this.height); 
  };
}
