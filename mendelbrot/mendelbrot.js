let target;
let points = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  target = createVector(0, 0);
  background(100, 100, 100);
  
  
  for (var x=-2;x<2;x+=0.01) {
    for (var y=-2;y<2;y+=0.01) {
      var newPoint = calculatePoint(createVector(x, y));
      grid = mapToGrid(newPoint);
      if (newPoint.mag() > 0.2) {
        points.push(grid);
        //fill(255, 255, 255);
      } else {
        //fill(0, 0, 0);
      }
      //ellipse(grid.x, grid.y, 10, 10);
    }
  }
  
}

function draw() {
  background(100, 100, 100);
  if (keyIsDown(RIGHT_ARROW)) {
    target.x += 0.001;
  }
  if (keyIsDown(LEFT_ARROW)) {
    target.x -= 0.001;
  }
   if (keyIsDown(UP_ARROW)) {
    target.y -= 0.001;
  }
  if (keyIsDown(DOWN_ARROW)) {
    target.y += 0.001;
  }
  
  textSize(20);
  text('TARGET: ' + target, 10, 30);

  
  
  var currentPoint = createVector(0,0);
  for (var index = 0; index<100; ++index) {
    //console.log("currentPoint", currentPoint);
    
    fill(0, 255, 0);
    grid = mapToGrid(currentPoint);
    ellipse(grid.x, grid.y, 5, 5);    
    
    // next point
    var point = currentPoint.copy();
    
    var newX = point.x * point.x - point.y * point.y;
    var newY = 2 * point.x * point.y;
    
    newX += target.x;
    newY += target.y;
    
    currentPoint = createVector(newX, newY);
  }
  text('TARGET: ' + currentPoint.mag(), 10, 60);
  
  var grid = mapToGrid(target);
  fill(255, 120, 40);
  ellipse(grid.x,grid.y, 10, 10);
  
 
  fill(0,0,255);
  for (var i=0; i<points.length; ++i) {
    ellipse(points[i].x,points[i].y, 5, 5);
  }
  
  translate(width/2, height/2);
  strokeWeight(0.3);
  line(-windowWidth/2, 0, windowWidth/2, 0);
  line(0, -windowHeight/2, 0, windowHeight/2);
}

function mapToGrid(t) {
  var x = map(t.x, -2, 2, 0, windowWidth);
  var y = map(t.y, -2, 2, 0, windowHeight);
  
  return createVector(x, y);
}

function mapToMath(t) {
  var x = map(t.x, 0, windowWidth, -2, 2);
  var y = map(t.y, 0, windowHeight, -2, 2);
  
  return createVector(x, y);
}

function calculatePoint(t) {
   var currentPoint = createVector(0,0);
   for (var index = 0; index<100; ++index) { 
    var point = currentPoint.copy();
    
    var newX = point.x * point.x - point.y * point.y;
    var newY = 2 * point.x * point.y;
    
    newX += t.x;
    newY += t.y;
    
    currentPoint = createVector(newX, newY);
  }
  
  return currentPoint;
}

function mouseClicked() {
  // return mapToMath(mouseX, mouseY);
  var x = map(mouseX, 0, windowWidth, -2, 2);
  var y = map(mouseY, 0, windowHeight, -2, 2);
  //target = mapToMath(mouseX, mouseY);
  
  target = createVector(x, y);
  //console.log(target);
}
